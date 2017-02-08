load('nashorn:mozilla_compat.js');
/*
 * Yuse
 * ID: 9120009
 *
 * Quest ID: 1015
 */
 
var status = 0;
var id = 1015;

function start() {
	//cm.getPlayer().setStory(14);
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
        if (!cm.onQuest()) {
            if (status == 0) {
                if (mode == 0) {
                    cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
                } else if (id - 1000 == cm.getStory()) {
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
                } else {
					cm.sendOk(cm.randomText(1));
					cm.dispose();
					return;
				}
            } else if (status == 1) {
				if (mode == 0) {
                    cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
                } else {
					cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#Uhm... wh--why?#l\r\n#L1#(run the fuck away)#l");
				}
			} else if (status == 2) {
				if (mode == 0) {
                    cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
                }
				if (selection == 0) {
					cm.sendAcceptDecline("#eLooks ashamed#n\r\n\r\nI just... I need some #bCucumbers#k. And some #bLeathers#k.\r\n\r\nLook, don't-- don't ask. I just need #b64#k of the cucumbers and #b14#k of the leathers.");
				} else if (selection == 1) {
					cm.dispose();
					return;
				}
            } else if (status == 3) {
				cm.startCQuest(id);
				cm.dispose();
				return;
			}
        } else if (!cm.onQuest(id)) { 
            if (status == 0) { 
                cm.sendYesNo(cm.randomText(4) + cm.getPlayer().getCQuest().getTitle() + cm.randomText(5)); 
            } else if (status == 1) {
                cm.startCQuest(0); 
                cm.dispose();
				return;
            } 
        } else if (cm.onQuest(id) && cm.canComplete()) {
            if (status == 0) {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1))); 
            } else if (status == 1) {
                cm.sendOk(cm.showReward("#ehides away cucumbers and leathers#n Th-- thank you.")); 
            } else if (status == 2) {
                cm.rewardPlayer(1, 0);
				cm.gainFame(20);
                cm.getPlayer().sendHint(cm.randomText(6)); 
                cm.dispose(); 
				return;
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) { 
            if (status == 0) { 
                if (mode == 0) { 
                    cm.dispose(); 
					return;
                } else { 
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1))); 
                } 
            } else if (status == 1) { 
                cm.sendYesNo(cm.randomText(7)); 
            } else if (status == 2) { 
                cm.startCQuest(0); 
                cm.dispose(); 
				return;
            } 
        } 
    } 
}