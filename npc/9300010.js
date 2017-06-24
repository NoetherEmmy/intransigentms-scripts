/*
 * Mr. Moneybags
 * ID: 9300010
 *
 * Quest ID: 8002
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 8002;
var address;

function start() {
    if (cm.getPlayer().getGender() === 0) {
        address = "mister sir";
    } else {
        address = "miss ma'am";
    }
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && status === 0) {
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
                cm.sendOk("Fine then.");
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "Hello " + address + "."));
            } else {
                cm.sendOk("Hello " + address + ".");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("Fine then.");
                cm.dispose();
                return;
            } else {
                cm.sendAcceptDecline(MapleCQuests.loadQuest(id).getInfo());
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("Fine then.");
                cm.dispose();
                return;
            } else {
                if (!cm.startCQuest(id)) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            }
        }
    } else if (!cm.onQuest(id)) {
        cm.sendOk("Hello " + address + ".");
        cm.dispose();
        return;
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "Hello " + address + "."));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Thank you so much. #ebows slightly#n Oh, and here's that giant bird I was talking about, if you want it:"));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainFame(9);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "Hello " + address + "."));
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
