/*
 * The Glimmer Man
 * ID: 9201083
 * Quest ID: 2015
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 2015;

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
    if (mode === 0 && (status === 0 || type === 4)) {
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
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#What?!#l\r\n#L1#Aaaaaaaaaaaa get the fuck away from me!#l\r\n#L2#(walk faster)#l");
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
                if (!cm.startCQuest(id)) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            }
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
            cm.sendOk(cm.showReward(id, "Ah! Excellent!"));
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
