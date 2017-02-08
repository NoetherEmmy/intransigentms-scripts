/*
 * The Glimmer Man
 * ID: 9201083
 * Quest ID: 2015
 */

var status;
var id = 2015;

function start() {
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
                cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#What?!#l\r\n#L1#Aaaaaaaaaaaa get the fuck away from me!#l\r\n#L2#(walk faster)#l");
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            }
            if (selection === 0) {
                cm.sendAcceptDecline("Gah, calm down, ok? Look, I just need to make a bit of a clearing.\r\n\r\nYou know, those spooky-lookin' trees over in the haunted mansion place. No one's gone inside that mansion for any kind of attraction, or really anything productive, for years. I'm here to reclaim it, but... I need the land cleared so we can drive away the rest of the spooky stuff. I've got some spookbusters I can hire.\r\n\r\nIf you could go in there and hack down #b60 Phantom Tree [2]#k, I could reward you.");
            } else if (selection === 1) {
                cm.dispose();
                return;
            } else if (selection === 2) {
                cm.dispose();
                return;
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
            cm.sendOk(cm.showReward("Ah! Excellent!"));
        } else if (status === 2) {
            cm.rewardPlayer(0, 1);
            cm.gainFame(9);
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
