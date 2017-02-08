/*
 * Pata
 * ID: 2090103
 * Quest ID: 1013
 */

var status;
var id = 1013;

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
            } else if (id - 1000 === cm.getStory()) {
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
                cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#Hi. I heard you run a surgical practice around here?#l\r\n#L1#Hey. (keep walking)#l");
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                if (selection === 0) {
                    cm.sendAcceptDecline("Ah, well, almost. You see, I've been meaning to really get it up and running, but we are looking to do more research first.\r\n\r\nOne of our primary texts makes quite a few references to an old text which was, as we found out, permanently lost in the Neo Heuro Library Fire of 556. It's a dead book, now.\r\n\r\nLuckily, have been made aware of a book graveyard not too far from here. If someone were to go there and collect the #bBook Ghosts#k that roam there, and perhaps collect something like #b90#k of their #bOld Papers#k, we might find our lost text after all.\r\n\r\nSay, do you think you could do it?");
                } else if (selection === 1) {
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
            cm.sendOk(cm.showReward("Ehehehe, excellent...")); 
        } else if (status === 2) { 
            cm.rewardPlayer(1, 0);
            cm.gainFame(8);
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
