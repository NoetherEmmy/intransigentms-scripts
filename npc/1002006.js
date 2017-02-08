load('nashorn:mozilla_compat.js');
/*
 * Chef
 * Lith Harbor proper
 *
 * ID: 1002006
 */
 
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	status++;

	if (status == 0) {
		//cm.sendSimple("#L0#Option 0#l\r\n#L1#Option 1#l");
		cm.sendOk("I'm the Chef around here.\r\n\r\nIs it a food item? I'll make the shit out of it.");
		cm.dispose();
		return;
	} else if (status == 1) {
		cm.sendOk("selection: " + String(selection));
		cm.dispose();
		return;
	}
}