load('nashorn:mozilla_compat.js');
/*
 * Wisp
 * ID: 2040030
 * Quest ID: 1009
 */
 
var id = 1009;
var status = 0;

function start() { 
	//cm.getPlayer().setStory(9);
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
                } else if (id - 1000 == cm.getStory()) {
                    cm.sendSimple(cm.selectQuest(id, "#eflap, flap#n")); 
                } else {
					cm.sendOk("#eflap, flap#n");
					cm.dispose();
					return;
				}
            } else if (status == 1) {
				if (mode == 0) {
					cm.dispose();
					return;
				}
                cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#(wait patiently)#l\r\n#L1#(leave)#l");
			} else if (status == 2) {
				if (mode == 0) {
					cm.dispose();
					return;
				}
				if (selection == 0) {
					cm.sendSimple("Hey, human. What are you looking at? You're not a filthy Teddyist spy, are you?\r\n\r\n#L0#SEMPER TEDDIUS!#l\r\n#L1#No, of course not. Trojans are my friends, duh.#l\r\n#L2#Do I look like I care about Trojans or Teddies?#l")
				} else if (selection == 1) {
					cm.dispose();
					return;
				}
			} else if (status == 3) {
				if (selection == 1) {
					cm.sendAcceptDecline("OK, phewf. I've seen a lot of 'em around lately...\r\n\r\nCome to think of it, I think I have something you can do to further the Trojanist cause. Call it a campaign, call it what you wish. But I need you to #eeliminate#n those two-faced traitors we call #bTeddies#k. If you can kill #b100#k of #bthe panda ones#k and bring back #b45 of their dolls#k, I can see to it that you are justly compensated.");
				} else if (selection == 0) {
					cm.sendNext("#rTEDDYIST SCUM!#k\r\n\r\n#eWisp spits poisonous fairy dust upon you#n");
					cm.damagePlayer(102 + (Math.random() * 40 - 20), false);
					cm.dispose();
					return;
				} else if (selection == 2) {
					cm.sendNext("Go on then, shoo!");
					cm.dispose();
					return;
				}
            } else if (status == 4) {
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
                cm.sendSimple(cm.selectQuest(id, "#eflap, flap#n")); 
            } else if (status == 1) { 
                cm.sendOk(cm.showReward("Yes, this is good. Thank you.")); 
            } else if (status == 2) { 
                cm.rewardPlayer(1, 0);
				cm.gainFame(10);
                cm.getPlayer().sendHint(cm.randomText(6)); 
                cm.dispose(); 
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) { 
            if (status == 0) { 
                if (mode == 0) { 
                    cm.dispose(); 
                } else { 
                    cm.sendSimple(cm.selectQuest(id, "#eflap, flap#n")); 
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