/*
 * NPC Name: Mr. Kim
 * Map(s):   Victoria Road | Lith Harbor (104000000)
 * Quest ID: 2005
 */

var id = 2005;
var status = 0;
var address = "";
var rewards =
{
    0:  [1442018, 1302071],
    10: [1302020, 1402006, 1312006, 1412004, 1322015, 1422008, 1432016, 1442015],
    11: [1302020, 1402006, 1312006, 1412004],
    12: [1302020, 1402006, 1322015, 1422008],
    13: [1432016, 1442015],
    20: [1382009],
    21: [1382009],
    22: [1382009],
    23: [1382009],
    30: [1452016, 1462014],
    31: [1452016],
    32: [1462014],
    40: [1472030, 1332020],
    41: [1472030],
    42: [1332020],
    50: [1482020, 1492020],
    51: [1482020],
    52: [1492020]
};
var job = 0;

function start() {
    if (cm.getPlayer().getGender() === 0) {
        address = "sir";
    } else {
        address = "ma'am";
    }
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
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
        if (!cm.onQuest()) {
            if (status === 0) {
                if (mode === 0) {
                    cm.dispose();
                    return;
                } else if (id - 2000 === cm.getStoryPoints()) {
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
                } else {
                    cm.sendOk("Hi there.");
                    cm.dispose();
                    return;
                }
            } else if (status === 1) {
                if (mode === 0) {
                    cm.dispose();
                    return;
                } else {
                    cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#Uhm... no, not at the moment.#l\r\n#L1#Yes, actually.#l");
                }
            } else if (status === 2) {
                if (mode === 0) {
                    cm.sendOk(cm.randomText(3));
                    cm.dispose();
                    return;
                } else {
                    if (selection === 0) {
                        cm.sendSimple("Oh. #esigh#n Ok, good.\r\n\r\nBecause it's not finished yet.\r\n\r\n#L0#I could help you finish it, if you like.#l\r\n#L1#Darn. I'll come back later.#l");
                    } else if (selection === 1) {
                        cm.sendSimple("Ah! I'm terrible sorry, " + address + ", it's not -- it's not ready yet, very sorry.\r\n\r\n#L0#I could help you finish it, if you like.#l\r\n#L1#Darn. I'll come back later.#l");
                    }
                }
            } else if (status === 3) {
                if (selection === 0) {
                    cm.sendAcceptDecline("O -- oh. That'd be very kind, " + address + ". I only need some more stone and iron, really.\r\n\r\nI -- if you could go kill some #bStone Gollems#k and #bIron Hogs#k and bring me back #b10#k of their #bStone Golem Rubble#k and #b3#k of their #bIron Hog's Metal Hooves#k, I could reward you!");
                } else if (selection === 1) {
                    cm.dispose();
                    return;
                }
            } else if (status === 4) {
                cm.startCQuest(id);
                cm.dispose();
                return;
            }
        } else if (!cm.onQuest(id)) {
            if (status === 0) {
                cm.sendYesNo(cm.randomText(4) + cm.getPlayer().getCQuest().getTitle() + cm.randomText(5));
            } else if (status === 1) {
                cm.startCQuest(0);
                cm.dispose();
                return;
            }
        } else if (cm.onQuest(id) && cm.canComplete()) {
            if (status === 0) {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            } else if (status === 1) {
                cm.sendOk(cm.showReward("Ah, yes. Very well done. I will surely soon secure a stone storage safe! Oh, and one more thing..."));
            } else if (status === 2) {
                var choices = "Choose one:\r\n\r\n";
                job = Math.floor(cm.getJob().getId() / 10);
                for (var i = 0; i < rewards[job].length; ++i) {
                    choices += "#L" + i + "##i" + rewards[job][i] + "##l\r\n" + cm.getAllItemStats(rewards[job][i]) + "\r\n\r\n";
                }
                cm.sendSimple(choices);
            } else if (status === 3) {
                cm.rewardPlayer(0, 1);
                cm.gainItem(rewards[job][selection], 1);
                cm.getPlayer().sendHint(cm.randomText(6));
                cm.dispose();
                return;
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) {
            if (status === 0) {
                if (mode === 0) {
                    cm.dispose();
                    return;
                } else {
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
                }
            } else if (status === 1) {
                cm.sendYesNo(cm.randomText(7));
            } else if (status === 2) {
                cm.startCQuest(0);
                cm.dispose();
                return;
            }
        }
    }
}
