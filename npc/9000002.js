load('nashorn:mozilla_compat.js');
/*
 * Pietro
 * At the end of the Physical Fitness Challenge
 *
 * ID: 9000002
 *
 */
 
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	//cm.getPlayer().dropMessage(6, "status: " + String(status) + " mode: " + String(mode) + " type: " + String(type) + " selection: " + String(selection) + " skill: " + String(skill));
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
	if (status == 0) {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		cm.sendNext("Congratulations on completing the #rPhysical Fitness Challenge#k! Your prize:\r\n\r\n#i4031542#");
	} else if (status == 1) {
		cm.gainItem(4031542, 1);
		cm.warp(105040300, 0);
		cm.dispose();
		return;
	}
}