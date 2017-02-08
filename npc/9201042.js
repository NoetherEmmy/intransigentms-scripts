load('nashorn:mozilla_compat.js');
/*
 * Mr. Sandman
 * ID: 9201042
 * Quest ID: 2010
 */
 
var id = 2010;
var status = 0;

function start() {
	//cm.getPlayer().setStoryPoints(10);
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
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
                    cm.dispose();
					return;
                } else if (id - 2000 == cm.getStoryPoints()) {
                    cm.sendSimple(cm.selectQuest(id, "Mmmmph!")); 
                } else {
					cm.sendOk("Mmmmph!");
                    cm.dispose();
                    return;
				}
            } else if (status == 1) {
				if (mode == 0) {
					cm.sendOk("#elooks sad#n");
					cm.dispose();
					return;
				} else {
					cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#A--are you ok?#l\r\n#L1#(run away)#l");
				}
			} else if (status == 2) {
				if (selection == 0) {
					cm.sendAcceptDecline("#elooks frustrated#n\r\n\r\n#etakes out a piece of paper and marker, beginning to draw out a crude image of what looks to be a #bwhite pig#k and a #bblue-ish cyclopic lizard#k#n\r\n\r\n#ethe sandman adeptly illustrates a sword hacking both of the creatures, and draws arrows out of them, pointing to what looks like an #bornate blue key#k#n\r\n\r\n#eadjacent to the ornate blue key, he writes the number #bLX#k in parentheses#n");
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
            } 
        } else if (cm.onQuest(id) && cm.canComplete()) { 
            if (status == 0) { 
                cm.sendSimple(cm.selectQuest(id, "Mmmmph!")); 
            } else if (status == 1) {
                cm.sendOk(cm.showReward("#egasp#n\r\n\r\nO--oh may god, I can speak again! Thank you! Take this:")); 
            } else if (status == 2) {
                cm.rewardPlayer(0, 1);
				cm.gainFame(5);
                cm.getPlayer().sendHint(cm.randomText(6));
                cm.dispose(); 
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) { 
            if (status == 0) { 
                if (mode == 0) {
                    cm.dispose(); 
                } else {
                    cm.sendSimple(cm.selectQuest(id, "Mmmmph!"));
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