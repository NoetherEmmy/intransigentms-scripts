load('nashorn:mozilla_compat.js');
/*
 * Cesar
 * ID: 2101014
 */

var status = 0;

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
		if (status == 0) {
			cm.sendOk("Good luck surviving on Victoria Island!");
			cm.dispose();
			return;
		}
	}
}