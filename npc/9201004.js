load('nashorn:mozilla_compat.js');
/*
 * Ames the Wise
 * ID: 9201004
 *
 */

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (status == 0) {
		cm.sendOk("What you you doin' on my lawn, ya damn hooligan?");
	} else if (status == 1) {
		cm.dispose();
		return;
	}
}