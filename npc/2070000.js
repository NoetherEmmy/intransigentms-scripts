/*
 * Mr. Noh
 * ID: 2070000
 *
 * Quest IDs: 2018, 2019
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var ids = [2018, 2019];
var id = 0;

function start() {
    var p = cm.getPlayer();
    for (var i = 0; i < ids.length; ++i) {
        if (p.canBeginCQuest(ids[i])) {
            id = ids[i];
            break;
        }
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
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id) && id !== 0) {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            } else {
                cm.sendOk(cm.randomText(1));
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                cm.sendAcceptDecline(MapleCQuests.loadQuest(id).getInfo());
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            }
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
            cm.sendOk(cm.showReward(id, "Thank you, very much."));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainFame(10);
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
