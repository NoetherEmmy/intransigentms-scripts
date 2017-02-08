load('nashorn:mozilla_compat.js');
/*
	NPC Name: 		Vikin
	Map(s): 		Victoria Road: Lith Harbor (104000000)
	Quest ID:       2002
*/

var id = 2003;
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
        if (!cm.onQuest()) {
            if (status == 0) {
                if (mode == 0) {
                    cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
                } else if (id - 2000 == cm.getStoryPoints()) {
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
					cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#Uhm... no, not at the moment.#l");
				}
            } else if (status == 2) {
				if (mode == 0) {
					cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
				} else {
					cm.sendSimple("Drat! God damn can't believe I lost another fuckin' map...\r\n\r\n#eunintelligible mumbling#n\r\n\r\n#L0#I could get you some paper, if you want.#l");
				}
			} else if (status == 3) {
				cm.sendAcceptDecline("That'd be great. All I need are some #bm#kapkins, really.\r\n\r\nTell you what. I'll be right here while you go kill #b20 Jr. Wraiths#k and bring me back #b25 Tablecloths#k.");
            } else if (status == 4) {
				cm.startCQuest(id); 
                cm.dispose(); 
			}
        } else if (!cm.onQuest(id)) { 
            if (status == 0) { 
                cm.sendYesNo(cm.randomText(4) + cm.getPlayer().getCQuest().getTitle() + cm.randomText(5)); 
            } else if (status == 1) { 
                cm.startCQuest(0); 
                cm.dispose(); 
            } 
        } else if (cm.onQuest(id) && cm.canComplete()) { 
            if (status == 0) { 
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1))); 
            } else if (status == 1) { 
                cm.sendOk(cm.showReward("Excellent. Now all I have to do is retrace the whole goddamn thing...")); 
            } else if (status == 2) { 
                cm.rewardPlayer(0, 1);
                cm.getPlayer().sendHint(cm.randomText(6)); 
                cm.dispose();
				return;
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) { 
            if (status == 0) { 
                if (mode == 0) { 
                    cm.dispose(); 
                } else { 
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1))); 
                } 
            } else if (status == 1) { 
                cm.sendYesNo(cm.randomText(7)); 
            } else if (status == 2) { 
                cm.startCQuest(0); 
                cm.dispose(); 
            } 
        } 
    } 
}