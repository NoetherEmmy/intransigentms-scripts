/*  Tylus
	Old warrior 3rd job advancement NPC
	El Nath: Chief's Residence (211000001)
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
	} else {
		if (mode == 0 && status == 1) {
			cm.sendOk("Make up your mind and visit me again.");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		if (status == 0) {
			cm.sendOk("Well, well. If you need to make a job advancement, go and see #bDances with Balrog#k. He will show you the way.");
			cm.dispose();
			return;
		}
	}
}