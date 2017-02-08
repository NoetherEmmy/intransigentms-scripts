load('nashorn:mozilla_compat.js');
/**
	Dolphin - Pier on the Beach (251000100)
**/

var status = 0;
var menu;
var cost = 10000;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendNext("Hmmm... too busy to go right now? If you do feel like going, though, come back and find me.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("Would you like to go to #b#m230000000##k now? The price is #b" + cost + " mesos#k.");
		} else if (status == 1) {
			if(cm.getMeso() < cost) {
				cm.sendOk("I don't think you have enough money...");
			} else {
				cm.gainMeso(-cost);
				cm.warp(230000000);
			}
			cm.dispose();
		}
	}
}
