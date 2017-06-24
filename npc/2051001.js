/*
 * Kay
 * ID: 2051001
 * Omega Sector | Silo
 *
 * Quest ID: 2020
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 2020;

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
                cm.sendOk("K, cool conversation.");
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "K."));
            } else {
                cm.sendOk("K.");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("K, cool conversation.");
                cm.dispose();
                return;
            } else {
                cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Um, what?#l\r\n#L1#(walk away from the strange man who refers to himself in the third person)#l");
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("K, cool conversation.");
                cm.dispose();
                return;
            } else {
                switch (selection) {
                    case 1:
                        cm.dispose();
                        return;
                    case 0:
                        cm.sendSimple("Curious? Kay currently cooks the Command coolio's cuisine -- cookery's Kay's calling, confide that.\r\n\r\nCursed be, Kay couldn't keep chronological catalog correctly, countless comestible courses quashed 'cause chronological clumsiness.\r\n\r\n#L0#Sounds like you need a clock.#l");
                        break;
                }
            }
        } else if (status === 3) {
            if (mode === 0) {
                cm.sendOk("K, cool conversation.");
                cm.dispose();
                return;
            } else {
                cm.sendAcceptDecline("A ckllauwcke, correct. A couple, come to consider. #bKlocks#k, #bdarK Klocks#k, 'n' #bCorked Classic Ckllauwckesse#k Kay craves, to catalog cooking completely.");
            }
        } else if (status === 4) {
            if (mode === 0) {
                cm.sendOk("K, cool conversation.");
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
        cm.sendOk("K.");
        cm.dispose();
        return;
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "K."));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Couldn't come quick? Clawing a ckllauwcke currently, Kay couldn't claim to care:"));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainFame(11);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "K."));
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
