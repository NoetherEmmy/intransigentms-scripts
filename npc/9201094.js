load('nashorn:mozilla_compat.js');
/*
 * Corine
 * ID: 9201094
 * @whodrops NPC
 */

var status = 0;
var typeselection = 0;
var initials = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function start() {
	status = -1;
	action(1, 0, 0);
}

function action (mode, type, selection) {
	//cm.getPlayer().dropMessage(6, "status: " + String(status) + " mode: " + String(mode) + " type: " + String(type) + " selection: " + String(selection));
    if (mode < 1) { // 1
        cm.dispose();
		return;
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
		}
		if (status == 0) {
			cm.sendSimple("Hi, I'm Corine! I can tell you which monsters drop whichever item you're searching for.\r\nWhat kind of item are you interested in?:\r\n\r\n#L0#Use#l\r\n#L1#Equip#l\r\n#L2#Etc#l");
		} else if (status == 1) {
			typeselection = selection;
			var initselectionstr = "";
			for (var i = 0; i < initials.length; ++i) {
				initselectionstr += "#L" + String(i) + "#" + (i != 0 ? initials[i] : "Non-letter character") + "#l\r\n";
			}
			cm.sendSimple("What is the initial letter of the item name?:\r\n\r\n" + initselectionstr);
		} else if (status == 2) {
			if (typeselection == 0) {
				cm.sendSimple(cm.listConsume(initials[selection]));
			} else if (typeselection == 1) {
				cm.sendSimple(cm.listEqp(initials[selection]));
			} else if (typeselection == 2) {
				cm.sendSimple(cm.listEtc(initials[selection]));
			}
		} else if (status == 3) {
			cm.sendOk(cm.whoDrops(selection));
			cm.dispose();
			return;
		}
	}
}