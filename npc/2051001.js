/*
 * Kay
 * Omega Sector: Silo
 *
 * ID: 2051001
 * Quest ID: 2020
 */

var status;
var id = 2020;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
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
    if (!cm.onQuest()) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk("K, cool conversation.");
                cm.dispose();
                return;
            } else if (id - 2000 === cm.getStoryPoints()) {
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
                cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#Um, what?#l\r\n#L1#(walk away from the strange man who refers to himself in the third person)#l");
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
                cm.startCQuest(id);
                cm.dispose();
                return;
            }
        }
    } else if (!cm.onQuest(id)) {
        cm.sendOk("K.");
        cm.dispose();
        return;
    } else if (cm.onQuest(id) && cm.canComplete()) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "K."));
        } else if (status === 1) {
            cm.sendOk(cm.showReward("Couldn't come quick? Clawing a ckllauwcke currently, Kay couldn't claim to care:"));
        } else if (status === 2) {
            cm.rewardPlayer(0, 1);
            cm.gainFame(11);
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
                cm.sendSimple(cm.selectQuest(id, "K."));
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
