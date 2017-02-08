/**
    Mr. Gong - Herb Town : Herb Town (251000000)
    ID: 2093003
    Quest ID: 2013
**/

var status;
var id = 2013;
var address = "";

function start() {
    if (cm.getPlayer().getGender() === 0) {
        address = "sir";
    } else {
        address = "miss";
    }
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && (status === 0 || type === 4)) {
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
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else if (id - 2000 === cm.getStoryPoints()) {
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
                cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#What?#l\r\n#L1#Uh, no.#l");
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                if (selection === 0) {
                    cm.sendAcceptDecline("I need! Ginseng. The bellflower, ginseng. Tea, for my joints, you know.\r\n\r\nA #b60 Ginseng-Boiled Waters#k and a #b10 Bellflowers#k would do it!");
                } else if (selection === 1) {
                    cm.sendOk("Oh. Ok.");
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 3) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                cm.startCQuest(id);
                cm.dispose();
                return;
            }
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
            cm.sendOk(cm.showReward("Ah! Thank you " + address + "."));
        } else if (status === 2) {
            cm.rewardPlayer(0, 1);
            cm.gainFame(10);
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
