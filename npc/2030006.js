load('nashorn:mozilla_compat.js');
/*  Holy Stone
	Hidden Street: Holy Ground at the Snowfield (211040401)
	
	Custom quest: 100102
*/

importPackage(Packages.net.sf.odinms.client);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("See you next time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.haveItem(4031058) || !cm.getQuestStatus(100102).equals(MapleQuestStatus.Status.STARTED)) {
				cm.sendOk("I'm a stone.");
				cm.dispose();
			} else {
				cm.sendNext("I'm a stone.");
			}
		} else if (status == 1) {
			cm.sendNextPrev("Give me a #bDark Crystal#k and I will allow you to answer a question which will allow you to obtain the #bNecklace of Wisdom#k.");
		} else if (status == 2) {
			if (!cm.haveItem(4005004)) {
				cm.sendOk("You don't have any #bDark Crystal#ks.");
				cm.dispose();
			} else {
				cm.gainItem(4005004, -1);
				cm.sendSimple("Here is your question: \r\nWhich of these is the correct chemical formula for water?\r\n#L0#H2O2#l\r\n#L1#7#l\r\n#L2#H2O#l\r\n#L3#H3O+#l");
			}
		} else if (status == 3) {
			if (selection == 2) {
				cm.gainItem(4031058, 1);
				cm.sendOk("Indeed. Very wise.");
			} else {
				cm.sendOk("Hah! Incorrect!");
			}
			cm.dispose();
		}
	}
}	