/*
 * Mr. Pan
 * ID: 2090000
 *
 * Quest ID: 2011
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 2011;
var address;

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
                cm.sendSimple(cm.selectQuest(id, "Hey, what's up?"));
            } else {
                cm.sendOk("Hey, what's up?");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#(stop)#l\r\n#L1#(keep walking)#l");
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("O--oh. Ok.");
                cm.dispose();
                return;
            }
            if (selection === 0) {
                cm.sendSimple("P--please, " + address + ", do you have anything I could eat?\r\n\r\n#L0#I don't know, what can you eat?#l\r\n#L1#No, sorry.#l");
            } else if (selection === 1) {
                cm.dispose();
                return;
            }
        } else if (status === 3) {
            if (selection === 0) {
                cm.sendAcceptDecline("I, um, well, around here, we mostly eat pork. If one were to... go out and, say, kill #b56 Red Porkies#k, #b56 Black Porkies#k, and procure #b20 Acorns#k from the #bChipmunks#k nearby, that would make a precious pork pot pie.");
            } else if (selection === 1) {
                cm.sendOk("O--oh. Ok.");
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
            cm.sendSimple(cm.selectQuest(id, "Hey, what's up?"));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Yes, this is very good. Th--thank you so much."));
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
            } else {
                cm.sendSimple(cm.selectQuest(id, "Hey, what's up?"));
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
