load('nashorn:mozilla_compat.js');
/*
 * YokoYoko
 * ID: 9120023
 *
 * Quest ID: 1017
 */
 
var status = 0;
var id = 1017;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action (mode, type, selection) {
	//cm.getPlayer().dropMessage(6, "status: " + String(status) + " mode: " + String(mode) + " type: " + String(type) + " selection: " + String(selection));
    if (mode == -1) {
        cm.dispose();
		return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
		}
        if (!cm.onQuest()) {
            if (status == 0) {
                if (mode == 0) {
                    cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
                } else if (id - 1000 == cm.getStory()) {
                    cm.sendSimple(cm.selectQuest(id, "I can't feel my hips!"));
                } else {
					cm.sendOk("Yeeeeeeeeeeeeep!");
					cm.dispose();
					return;
				}
            } else if (status == 1) {
				if (mode == 0) {
                    cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
                } else {
					cm.sendAcceptDecline(cm.getPlayer().getCQuest().loadInfo(id));
				}
			} else if (status == 2) {
				if (mode == 0) {
                    cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
                }
				cm.startCQuest(id);
				cm.dispose();
				return;
            }
        } else if (!cm.onQuest(id)) { 
            if (status == 0) { 
                cm.sendYesNo(cm.randomText(4) + cm.getPlayer().getCQuest().getTitle() + cm.randomText(5)); 
            } else if (status == 1) {
                cm.startCQuest(0); 
                cm.dispose();
				return;
            } 
        } else if (cm.onQuest(id) && cm.canComplete()) {
            if (status == 0) {
                cm.sendSimple(cm.selectQuest(id, "Weee, hooo, wee, hooooo...")); 
            } else if (status == 1) {
                cm.sendOk(cm.showReward("Aheeeeee! I've got moons in me drawers.")); 
            } else if (status == 2) {
                cm.rewardPlayer(1, 0);
                cm.getPlayer().sendHint(cm.randomText(6)); 
                cm.dispose(); 
				return;
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) { 
            if (status == 0) { 
                if (mode == 0) { 
                    cm.dispose(); 
                } else { 
                    cm.sendSimple(cm.selectQuest(id, "I can't tell you how many times I've accidentally not the other one, kid. Yikes!")); 
                } 
            } else if (status == 1) { 
                cm.sendYesNo(cm.randomText(7)); 
            } else if (status == 2) { 
                cm.startCQuest(0); 
                cm.dispose(); 
				return;
            } 
        } 
    } 
}