/*
 * Mong from Kong
 *
 * Quest ID: 1002
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 1002;

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
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Holy shit, yo. The chief brought you all of this for your service:"));
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
