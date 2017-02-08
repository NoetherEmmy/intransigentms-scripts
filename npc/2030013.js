/* 
 * Adobis - El Nath: Entrance to Zakum Altar (211042400)
 * ID: 2030013 
 *
 * Start of Zakum Bossfight
 */

load('nashorn:mozilla_compat.js');

var status = 0;
var minLevel = 50;
var maxPlayers = 30;
var state;

function getEimForString(em, name) {
    var stringId = "Zakum" + name;
    return em.getInstance(stringId);
}

function start() {
    status = -1;
    action(1, 0, 0);
}
 
function action(mode, type, selection) {
    var p = cm.getPlayer();
    var eim;
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
        if (p.getMapId() === 211041900) {
            switch (status) {
                case 0:
                    cm.sendYesNo("It looks like you got booted from the game while fighting Zakum!\r\n\r\nIf any of your party members are still inside the altar fighting him, I can warp you to them right now.\r\n\r\nPressing #bYes#k below will cause you to be warped to those party members (if any) after 10 seconds. Pressing #bNo#k will prevent entrance back into the fight.");
                    p.setZakDc(false);
                    break;
                case 1:
                    var pt = p.getParty();
                    if (pt !== null) {
                        var ptChars = pt.getMembers();
                        var targetChar = null;
                        for (var i = 0; i < ptChars.size(); ++i) {
                            if (ptChars.get(i).getMapid() === 280030000) {
                                targetChar = cm.getC()
                                               .getChannelServer()
                                               .getPlayerStorage()
                                               .getCharacterById(ptChars.get(i).getId());
                                break;
                            }
                        }
                        if (targetChar !== null) {
                            p.setForcedWarp(targetChar, 1000 * 10);
                            p.dropMessage("You will be warped in 10 seconds.");
                            p.sendHint("You will be warped in 10 seconds.");
                        } else {
                            cm.sendOk("Sorry, looks like none of your party members are fighting Zakum at the moment!");
                        }
                    } else {
                        cm.sendOk("Sorry, it looks like you're not in a party!");
                    }
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
        } else if (status === 0) {
            // req: 50+, completed quest (these shouldn't be in the map at all, actually)
            if ((p.getLevel() < minLevel || 
                cm.getQuestStatus(100200) !== Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) &&
                !p.isGM()) {
                // refuse to do so
                cm.warp(211042300);
                cm.sendOk("Please come back when you're prepared for the battle. You should not be here yet.");
                cm.dispose();
                return;
            }
            /*
            if (cm.getBossLog('ZAKUM') > 2) {
                // do nothing; entered more than twice
                cm.sendOk("You have entered the Zakum Altar more than twice today. You may not enter until tomorrow.");
                cm.dispose();
                return;
            }
            */
            // TODO fix: if (p.getMap().getMonsters().size() <= 0) {
            cm.sendSimple("The battle to defeat Zakum begins here. What would you like to do? #b\r\n#L0#Start a new Zakum Battle#l\r\n#L1#Join your group's Zakum Battle#l");
            // } else {
            //     cm.sendOk("Zakum is temporarily disabled.");
            //     cm.dispose();
            //     return;
            // }
        } else if (status === 1) {
            state = selection;
            if (selection === 0) { // Start
                cm.sendGetText("In order to start the Zakum Battle, you need to choose a name for your instance. This is the password that lets your members join, so tell it to everybody who wants to participate in the battle.");
            } else if (selection === 1) { // Join
                cm.sendGetText("In order to join a Zakum Battle, you need to enter the password. If you don't know what it is, please ask the person leading the battle.");
            }
        } else if (status === 2) {
            var em = cm.getEventManager("ZakumBattle");
            var passwd = cm.getText();
            if (em === null) {
                cm.sendOk("This trial is currently under construction.");
            } else {
                if (state === 0) { // Leader
                    if (getEimForString(em, passwd) !== null) {
                        // possible other checks for validity here? eg. alphanumeric only
                        cm.sendOk("You may not use that password.");
                    } else { // start Zakum Battle
                        eim = em.newInstance("Zakum" + passwd);
                        em.startInstance(eim); // (eim, p.getName());
                        // em.startInstance(cm.getParty(),p.getMap());
                        eim.registerPlayer(p);
                        // cm.setBossLog('ZAKUM');
                        // send map message that user X has started instance?
                    }
                }
                if (state === 1) { // Member
                    eim = getEimForString(em, passwd);
                    if (eim === null) {
                        cm.sendOk("There is currently no battle registered under that name.");
                    } else {
                        if (eim.getProperty("canEnter").toLowerCase() === "true") {
                            if (eim.getPlayers().size() < maxPlayers) {
                                eim.registerPlayer(p);
                                // cm.setBossLog('ZAKUM');
                            } else {
                                cm.sendOk("I'm sorry, but that battle is currently full. Please wait to join another one.");
                            }
                        } else {
                            cm.sendOk("I'm sorry, but that battle is currently in progress. Please return later.");
                        }
                    }
                }
            }
            cm.dispose();
            return;
        }
    }
}
