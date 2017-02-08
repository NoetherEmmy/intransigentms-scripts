load('nashorn:mozilla_compat.js');
/*
 * Statue
 * Orbis Tower : <8th Floor>
 * ID: 2030005
 */
 
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {
		cm.dispose();
		return;
	} else {
		status++;
		switch (status) {
			case 0:
				cm.sendOk("Ooga boogs.");
				cm.dispose();
				return;
			default:
				cm.dispose();
				return;
		}
	}
}