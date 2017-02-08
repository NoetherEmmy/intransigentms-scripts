load('nashorn:mozilla_compat.js');
/**
	Spinel - Takes users to Zipangu
**/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else if (mode == 0 && status == 0) {
		cm.sendNext("Oh. I'll be here for a while. Talk to me again if you change your mind.");
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (cm.getPlayer().getMapId() != 800000000) {
		if (status == 0) {
			cm.sendYesNo("Hi! I'm #p"+cm.getNpc()+"#. I can take you to #bJapan#k if you'd like. Would you like to go there now?");
		} else if (status == 1) {
			cm.getPlayer().setReturnMap(cm.getPlayer().getMapId());
			cm.warp(800000000, 0);
			cm.dispose();
			return;
		} else if (status == 2) {
			//
		}
	} else {
		if (status == 0) {
			cm.sendYesNo("Hi! I'm #p"+cm.getNpc()+"#. I can take you back to #b#m" + cm.getPlayer().getReturnMap() + "##k if you'd like. Would you like to go there now?");
		} else if (status == 1) {
			cm.warp(cm.getPlayer().getReturnMap(), 0);
			cm.dispose();
			return;
		} else if (status == 2) {
			//
		}
	}
}
