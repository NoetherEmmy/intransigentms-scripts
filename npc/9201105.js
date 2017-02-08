load('nashorn:mozilla_compat.js');
/*
 * Sage (teles you back from CWK)
 *
 * ID: 9201105
 */
 
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
	
	if (status == 0) {
		cm.sendYesNo("Would you like to go back to the Nightmare Forest?");
	} else if (status == 1) {
		cm.warp(610020000);
		cm.dispose();
		return;
	}
}