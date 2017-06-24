/*
 * Mr. Kim
 * Victoria Road | Lith Harbor (104000000)
 * ID: 1002005
 *
 * Quest ID: 2005
 */

"use strict";

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 2005;
var address;
var rewards =
{
    0:  [1422011, 1302049],
    10: [1302049, 1402013, 1312012, 1412011, 1322021, 1422014, 1432012, 1442024],
    11: [1302049, 1402013, 1312012, 1412011],
    12: [1302049, 1402013, 1322021, 1422014],
    13: [1432012, 1442024],
    20: [1382012, 1382041, 1322024],
    21: [1382012, 1382041],
    22: [1382012, 1382041],
    23: [1382012, 1382041, 1322024],
    30: [1452022, 1462019, 1432012, 1332025],
    31: [1452022, 1432012, 1332025],
    32: [1462019],
    40: [1472032, 1332025],
    41: [1472032],
    42: [1332025],
    50: [1482021, 1492021],
    51: [1482021],
    52: [1492021]
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

function action(mode, type, selection) {
    var p = cm.getPlayer();

    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    if (!cm.onQuest(id)) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
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
                cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Uhm... no, not at the moment.#l\r\n#L1#Yes, actually.#l");
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
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + MapleCQuests.loadQuest(id).getTitle() + cm.randomText(5));
        } else if (status === 1) {
            if (!cm.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Ah, yes. Very well done. I will surely soon secure a stone storage safe! Oh, and one more thing..."));
        } else if (status === 2) {
            var choices = "Choose one:\r\n\r\n";
            job = Math.floor(cm.getJob().getId() / 10);
            for (var i = 0; i < rewards[job].length; ++i) {
                choices += "#L" + i + "##i" + rewards[job][i] + "##l\r\n" + cm.getAllItemStats(rewards[job][i]) + "\r\n\r\n";
            }
            cm.sendSimple(choices);
        } else if (status === 3) {
            cm.rewardPlayer(id);
            cm.gainItem(rewards[job][selection], 1);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            if (!cm.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    }
}
