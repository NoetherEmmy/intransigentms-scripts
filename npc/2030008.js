load('nashorn:mozilla_compat.js');

/* Adobis
 * ID: 2030008 
 *
 * El Nath: The Door to Zakum (211042300)
 * 
 * Zakum Quest NPC 
 *
 * Custom Quest 100200 = whether you can do Zakum
 * Custom Quest 100201 = Collecting Gold Teeth <- indicates it's been started
 * Custom Quest 100203 = Collecting Gold Teeth <- indicates it's finished
 * 4031061 = Piece of Fire Ore  - stage 1 reward
 * 4031062 = Breath of Fire     - stage 2 reward
 * 4001017 = Eye of Fire        - stage 3 reward
 * 4000082 = Zombie's Gold Tooth (stage 3 req)
 */

var status;
var mapId = 211042300;
var stage;
var teethmode;
var minLevel = 50;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        if (mode === 0 && status === 0) {
            cm.dispose();
            return;
        }
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (status === 0) {
            if (cm.getPlayer().getLevel() >= minLevel) {
                if (cm.getQuestStatus(100200) !== Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED &&
                    cm.getQuestStatus(100200) !== Packages.net.sf.odinms.client.MapleQuestStatus.Status.STARTED) {
                    cm.startQuest(100200);
                    cm.sendOk("You want to be permitted to do the Zakum Dungeon Quest? Well, I, #bAdobis#k... judge you to be suitable. You should be safe roaming around the dungeon. Just be careful...");
                    cm.dispose();
                    return;
                } else if (cm.getQuestStatus(100201) === Packages.net.sf.odinms.client.MapleQuestStatus.Status.STARTED) {
                    // If they have gold teeth and the other items, they are good to go
                    teethmode = 1;
                    cm.sendNext("Have you got the items I asked for? This ain't no charity.");
                } else {
                    cm.sendSimple("Beware, for the power of olde has not been forgotten... #b\r\n#L0#Enter the Unknown Dead Mine (Stage 1)#l\r\n#L1#Face the Breath of Lava (Stage 2)#l\r\n#L2#Forging the Eyes of Fire (Stage 3)#l");
                }
                if (cm.getQuestStatus(100201) === Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
                    // They've done the quests
                    teethmode = 2;
                }
            } else {
                cm.sendOk("Please come back to me when you've become stronger. I've seen a few adventurers in my day, and you're far too weak to complete my tasks.");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            // Quest is good to go.
            // If they're working on this quest, he checks for items.
            if (teethmode === 1) {
                // Check for items
                if (cm.haveItem(4031061, 1) && cm.haveItem(4031062, 1) && cm.haveItem(4000082, 30)) { // Take away items, give eyes of fire, complete quest
                    cm.gainItem(4031061, -1);
                    cm.gainItem(4031062, -1);
                    cm.gainItem(4000082, -30);
                    cm.gainItem(4001017, 5);
                    cm.sendNext("Thank you for the teeth!  Next time you see me, I'll have a golden smile! Goodbye and good luck!");
                    cm.completeQuest(100201);
                    cm.completeQuest(100200);
                    cm.dispose();
                } else { // Go get more
                    cm.sendNext("You shtill didn't get me my teef! Howsh a man shupposhed to conshentrate wifout teef?");
                    cm.dispose();
                }
                return;
            }
            if (selection === 0) { // ZPQ
                if (cm.getParty() === null) { // No party
                    cm.sendNext("Please talk to me again when you have formed a party.");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not party leader
                    cm.sendNext("Please have the leader of your party speak with me.");
                    cm.dispose();
                    return;
                } else {
                    // Check each party member, make sure they're above 50 and still in the door map
                    // TODO: add zakum variable to characters, check that instead; less hassle
                    var party = cm.getParty().getMembers();
                    mapId = cm.getPlayer().getMapId();
                    var next = true;

                    for (var i = 0; i < party.size(); ++i) {
                        if ((party.get(i).getLevel() < 50) || (party.get(i).getMapid() !== mapId)) {
                            next = false;
                        }
                    }

                    if (next) {
                        // All requirements met, make an instance and start it up
                        // Cm.startPQ("ZakumPQ");
                        var em = cm.getEventManager("ZakumPQ");
                        if (em === null) {
                            cm.sendOk("This trial is currently under construction.");
                        } else {
                            // Start PQ
                            em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                            
                            // Remove all documents/keys/full fire ore from members
                            party = cm.getPlayer().getEventInstance().getPlayers();
                            cm.removeFromParty(4001015, party);
                            cm.removeFromParty(4001018, party);
                            cm.removeFromParty(4001016, party);
                        }
                        cm.dispose();
                        return;
                    } else {
                        cm.sendNext("Please make sure all of your members are qualified to begin my trials...");
                        cm.dispose();
                        return;
                    }
                }
            } else if (selection === 1) { // Zakum Jump Quest
                stage = 1;
                if (cm.haveItem(4031061) && !cm.haveItem(4031062)) {
                    // Good to go
                    cm.sendYesNo("Would you like to attempt the #bBreath of Lava#k? If you fail, there is a very real chance you will die.");
                } else {
                    if (cm.haveItem(4031062)) {
                        cm.sendNext("You've already got the #bBreath of Lava#k, you don't need to do this stage.");
                    } else {
                        cm.sendNext("Please complete the earlier trials first.");
                    }
                    cm.dispose();
                    return;
                }
            } else if (selection === 2) { // Golden Tooth Collection
                stage = 2;
                if (teethmode === 2 && cm.haveItem(4031061) && cm.haveItem(4031062)) {
                    // Already done it once, they want more
                    cm.sendYesNo("If you want more #bEyes of Fire#k, you need to bring me the same #b30 Zombie's Lost Gold Tooth#k.  Turns out gold dentures don't last long, and I need a new one.\r\nDo you have those teeth for me?");
                } else if (cm.haveItem(4031061) && cm.haveItem(4031062)) {
                    // Check if quest is complete, if so reset it (NOT COMPLETE)
                    cm.sendYesNo("Okay, you've completed the earlier trials. Now, with a little hard work I can get you the #bseeds of Zakum#k necessary to enter combat.\r\n\r\nBut first, my teeth are not as good as they used to be.  You ever seen a dentist in Maplestory?  Well, I heard the Miner Zombies have gold teeth.  I'd like you to collect #b30 Zombie's Lost Gold Tooth#k so I can build myself some dentures.  Then I'll be able to get you the items you desire.\r\n\r\nRequired:\r\n#i4000082##b x30");
                } else {
                    cm.sendNext("Please complete the earlier trials before attempting this one.");
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 2) {
            if (stage === 1) {
                cm.warp(280020000); // Breath of Lava I
                cm.dispose();
                return;
            }
            if (stage === 2) {
                if (teethmode === 2) {
                    if (cm.haveItem(4031061, 1) && cm.haveItem(4031062, 1) && cm.haveItem(4000082, 30)) { // Take away items, give eyes of fire, complete quest
                        cm.gainItem(4031061, -1);
                        cm.gainItem(4031062, -1);
                        cm.gainItem(4000082, -30);
                        cm.gainItem(4001017, 5);
                        cm.sendNext("Thank you for the teeth! Next time you see me, I'll have a golden smile! Goodbye and good luck!");
                        cm.completeQuest(100201);
                        cm.completeQuest(100200);
                        cm.dispose();
                        return;
                    } else {
                        cm.sendNext("You don't have any teeth yet! Don't try to pull a fast one on me.");
                        cm.dispose();
                        return;
                    }
                } else {
                    cm.startQuest(100201);
                    cm.dispose();
                    return;
                }
            }
        }
    }
}
