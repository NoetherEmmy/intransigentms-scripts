/*
 * High Priest John
 * Amoria (680000000)
 *
 * ID: 9201002
 * Main wedding NPC
 */

var MapleInventoryType        = Java.type("net.sf.odinms.client.MapleInventoryType");
var MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");

var status;
var minLevel = 10;
var maxLevel = 250;
var mySelection = -1;
var rings = [1112001, 1112002, 1112003, 1112005, 1112006];
var eim;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (p.getName() + "" === "Noether") {
        p.dropMessage("" + p.getCurrentMaxHp());
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        if (type === 1 && mode === 0) {
            cm.sendOk("You're not ready to be married yet, eh? Well, come back to me if you don't decide against it.");
        }
        cm.dispose();
        return;
    }

    if (p.getMapId() === 680000000) {
        if (status === 0) {
            cm.sendSimple("Hello, #h #.\r\n#dWhat would you like to do today?#b\r\n\r\n#L0#I want to get married!#l\r\n#L1#I want to see my friend's wedding!#l\r\n#L2#I want to trade a Premium wedding ticket for 5 invitations!#l\r\n#L3#I want to buy a Premium Wedding Ticket for 25,000,000 mesos!#l\r\n#L4#I would like to obtain a wedding permit.#l");
        } else if (status === 1) {
            if (selection === 0) {
                if (cm.getParty() === null) { // No party
                    cm.sendOk("You want to get married? Get in a party with your partner!");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) {  // Not party leader
                    cm.sendOk("Please ask your partner to talk to me.");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = p.getMapId();
                    var levelValid = 0;
                    var alreadyMarried = 0;
                    for (var i = 0; i < party.size(); ++i) {
                        var pPlayer = party.get(i);
                        if (pPlayer.getLevel() >= minLevel && pPlayer.getLevel() <= maxLevel) {
                            levelValid += 1;
                        }
                        if (pPlayer.isMarried() === 1) {
                            alreadyMarried += 1;
                        }
                    }
                    if (party.size() === 2) {
                        if (levelValid === 2 && cm.partyMembersInMap() === 2) {
                            if (alreadyMarried === 0) {
                                if (cm.haveItem(4031374) && cm.haveItem(5251003)) {
                                    // Kick it into action. Slate says nothing here, just warps you in
                                    var em = cm.getEventManager("CathedralWedding");
                                    if (em === null) {
                                        cm.sendOk("It looks like weddings aren't enabled, or the event manager is bugged.");
                                    } else {
                                        // Begin the wedding
                                        em.startInstance(cm.getParty(), p.getMap());
                                        party = p.getEventInstance().getPlayers();
                                        cm.broadcastMessage(
                                            5,
                                            party.get(0).getName() +
                                            " and " +
                                            party.get(1).getName() +
                                            "'s wedding is going to be started in the Cathedral at channel " +
                                            cm.getC().getChannel() +
                                            "."
                                        );
                                        eim = p.getEventInstance();
                                        eim.setProperty("husband", party.get(0).getName());
                                        eim.setProperty("wife", party.get(1).getName());
                                    }
                                } else {
                                    cm.sendOk("Looks like you don't have the items required. Sorry.\r\n\r\n#eRequired:#n\r\n\r\n#i4031374#\r\n#i5251003#");
                                }
                            } else {
                                cm.sendOk("It looks like you're already married.");
                            }
                        } else {
                            cm.sendOk("You two need to be in the same map and be at between levels " + minLevel + " and " + maxLevel + ".");
                        }
                    } else {
                        cm.sendOk("Get in a party with you and #eonly#n your partner.");
                    }
                    cm.dispose();
                    return;
                }
            } else if (selection === 1) {
                if (cm.haveItem(4000174)) {
                    cm.sendGetText("Please enter the name of one of the members of the wedding.");
                } else {
                    cm.sendOk("Looks like the couple who you want to watch haven't given you an Money Envelope Invitation (#i4000174#) yet.");
                    cm.dispose();
                    return;
                }
            } else if (selection === 2) {
                if (cm.haveItem(5251003)) {
                    cm.gainItem(5251003, -1);
                    cm.gainItem(4000174, 5);
                } else {
                    cm.sendOk("You don't have a Premium Wedding Ticket.");
                }
                cm.dispose();
                return;
            } else if (selection === 3) {
                if (cm.getMeso() >= 25000000) {
                    cm.gainMeso(-25000000);
                    cm.gainItem(5251003, 1);
                } else {
                    cm.sendOk("Sorry, you don't have enough mesos.");
                }
                cm.dispose();
                return;
            } else if (selection === 4) {
                if (p.getMarriageQuestLevel() === 50) {
                    cm.sendNext("Please go and visit #bMom and Dad#k in their house. They live somewhere in #bHenesys Hunting Ground II#k.");
                    p.addMarriageQuestLevel();
                } else if (p.getMarriageQuestLevel() === 53) {
                    if (cm.haveItem(4031373, 1)) {
                        cm.sendNext("Very good. Here is my permission.");
                        cm.removeAll(4031373);
                        cm.gainItem(4031374, 1);
                        p.setMarriageQuestLevel(100);
                    } else {
                        cm.sendNext("You haven't got Mom and Dad's blessing.");
                    }
                } else {
                    cm.sendNext("I don't know what you're talking about.");
                }
                cm.dispose();
                return;
            }
        } else if (status === 2) {
            var chr = cm.getCharByName(cm.getText());
            if (chr !== null) {
                if (chr.getMapId() === 680000200) {
                    eim = chr.getEventInstance();
                    eim.registerPlayer(p);
                } else {
                    cm.sendOk("The wedding you would like to attend has not started.");
                }
            } else {
                cm.sendOk("Player was not found.");
            }
            cm.dispose();
            return;
        }
    } else if (p.getMapId() === 680000210) {
        eim = p.getEventInstance();

        var husbandName = eim.getProperty("husband");
        var wifeName = eim.getProperty("wife");

        var husband = cm.getCharByName(husbandName);
        var wife = cm.getCharByName(wifeName);

        var id = p.getId();

        var hclicked = eim.getProperty("hclicked");
        var wclicked = eim.getProperty("wclicked");

        var otherChar = husband.equals(p) ? wife : husband;

        if (husband !== null && wife !== null) {
            if (status === 0) {
                if (id !== husband.getId() && id !== wife.getId()) {
                    cm.sendOk("You are not currently getting married!");
                    cm.dispose();
                    return;
                } else if (p.isMarried() > 0) {
                    cm.sendOk("You have already been married.");
                    cm.dispose();
                    return;
                } else if (hclicked === 1 && husbandName.equals(p.getName())) {
                    cm.sendOk("You've already accepted to marry your partner, ask your partner to accept now.");
                    cm.dispose();
                    return;
                } else if (wclicked === 1 && wifeName.equals(p.getName())) {
                    cm.sendOk("You've already accepted to marry your partner, ask your partner to accept now.");
                    cm.dispose();
                    return;
                } else {
                    cm.sendYesNo("Do you wish to marry your partner?\r\n\r\nThis will be a #efinal decision#n.");
                }
            } else if (status === 1) {
                if (husband.equals(p)) {
                    eim.setProperty("hclicked", 1);
                } else if (wife.equals(p)) {
                    eim.setProperty("wclicked", 1);
                } else {
                    cm.sendOk("Um.\r\n\r\n#d(Report this to a GM.)#k");
                    cm.dispose();
                    return;
                }

                if (+eim.getProperty("hclicked") === 1 && +eim.getProperty("wclicked") === 1) {
                    if (!cm.createMarriage(otherChar.getName())) {
                        cm.sendOk("The system cannot find your partner.");
                        cm.dispose();
                        return;
                    }
                    cm.broadcastMessage(5, "Congratulations to " + husbandName + " and " + wifeName + ". Let these newlyweds know that you're grateful and spam them with love!");
                    cm.removeAll(4031374);
                    MapleInventoryManipulator.removeById(
                        otherChar.getClient(),
                        MapleInventoryType.ETC,
                        4031374,
                        otherChar.getItemQuantity(
                            4031374,
                            false
                        ),
                        false,
                        false
                    );
                    if (cm.makeRing(otherChar.getName(), rings[Math.floor(Math.random() * rings.length)]) <= 0) {
                        cm.sendOk("The system could not find your partner.");
                    }
                    cm.dispose();
                    return;
                }
            }
        }
    }
}
