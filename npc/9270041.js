load('nashorn:mozilla_compat.js');
/**
	Irene - Ticketing Usher
**/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	//cm.getPlayer().dropMessage(6, "status: " + String(status) + " mode: " + String(mode) + " type: " + String(type) + " selection: " + String(selection));
	if (mode == -1) {
		cm.dispose();
		return;
	} else if (mode == 0 && status == 0) {
		cm.sendNext("I'll be here for a while. Please talk to me again when you change your mind.");
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (status == 0) {
		cm.sendYesNo("Hi there! I am #p"+cm.getNpc()+"# from Singapore Airport. I can take you to #bSingapore#k in no time. Would you like to depart now?");
	} else if (status == 1) {
		cm.warp(540010000, 0);
		cm.dispose();
		return;
	} else if (status == 2) {
		//
	}
}
