/*
 * Mr. Lee
 * Victoria Road | Henesys (100000000)
 *
 * Quest ID: 1001
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 1001;

function start() {
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
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            } else {
                cm.sendOk(cm.randomText(1));
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            cm.sendAcceptDecline(MapleCQuests.loadQuest(id).getInfo());
        } else if (status === 2) {
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
            cm.warp(100000200);
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, cm.randomText(2)));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            }
        } else if (status === 1) {
            if (p.getMapId() === 102) {
                cm.sendSimple("Go on, get him! #eHe's still dangerous!#n\r\n\r\n#L4#I want to leave this place.#l");
            } else {
                cm.sendSimple("Do you want to enter Mano's Lair right now? I'm warning you, #ronce you go in you cannot leave until Mano is subdued#k.\r\n\r\n#L1#Yes.#l\r\n#L2#No.#l\r\n#L3#I want to cancel this quest.#l");
            }
        } else if (status === 2) {
            if (selection === 1) {
                cm.warp(102);
            } else if (selection === 3) {
                if (!cm.forfeitCQuestById(id)) {
                    cm.sendOk(cm.randomText(9));
                }
            } else if (selection === 4 && cm.getPlayer().getMapId() === 102) {
                cm.warp(100000200);
            }
            cm.dispose();
            return;
        }
    }
}
