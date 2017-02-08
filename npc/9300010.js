load('nashorn:mozilla_compat.js');
/*
 * Mr. Moneybags
 * 
 * ID: 9300010
 */
 
var status = 0;
var id = 8002;
var address = "";

function start() {
	if (cm.getPlayer().getGender() == 0) {
		address = "mister sir";
	} else {
		address = "miss ma'am";
	}
	status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else if (mode == 0 && status == 0) {
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
				cm.sendOk("Fine then.");
				cm.dispose();
				return;
			} else if (cm.getPlayer().getLevel() >= 120 && cm.getPlayer().getItemQuantity(1902005, true) > 0 && cm.getPlayer().getItemQuantity(1902006, true) == 0) {
				cm.sendSimple(cm.selectQuest(id, "Hello " + address + "."));
			} else {
				cm.sendOk("Hello " + address + ".");
				cm.dispose();
				return;
			}
		} else if (status == 1) {
			if (mode == 0) {
				cm.sendOk("Fine then.");
				cm.dispose();
				return;
			} else {
				cm.sendAcceptDecline(cm.getPlayer().getCQuest().loadInfo(id));
			}
		} else if (status == 2) {
			if (mode == 0) {
				cm.sendOk("Fine then.");
				cm.dispose();
				return;
			} else {
				cm.startCQuest(id);
				cm.dispose();
				return;
			}
		}
	} else if (!cm.onQuest(id)) {
		cm.sendOk("Hello " + address + ".");
		cm.dispose();
		return;
	} else if (cm.onQuest(id) && cm.canComplete()) {
		if (status == 0) {
			cm.sendSimple(cm.selectQuest(id, "Hello " + address + "."));
		} else if (status == 1) {
			cm.sendOk(cm.showReward("Thank you so much. #ebows slightly#n Oh, and here's that giant bird I was talking about, if you want it:"));
		} else if (status == 2) {
			cm.rewardPlayer(0, 0);
			cm.gainFame(9);
			cm.getPlayer().sendHint(cm.randomText(6));
			cm.dispose();
			return;
		}
	} else if (cm.onQuest(id) && !cm.canComplete()) {
		if (status == 0) {
			if (mode == 0) {
				cm.dispose();
				return;
			} else {
				cm.sendSimple(cm.selectQuest(id, "Hello " + address + "."));
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