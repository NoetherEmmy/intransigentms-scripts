load('nashorn:mozilla_compat.js');
/** 
 * Chun Ji
 * ID: 9000007
 * Map ID: 103010000
 * Quest ID: 2004
 **/

var id = 2004;
var status = 0;

function start() {
	//cm.startCQuest(0);
	//cm.getPlayer().setStoryPoints(4);
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
					cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#Is there something wrong?#l\r\n#L1#(Quietly walk away as if you didn't notice the man crying)#l\r\n#L2#Wassup, Ji?#l");
				}
            } else if (status == 2) {
				if (mode == 0) {
					cm.sendOk(cm.randomText(3));
                    cm.dispose();
					return;
				} else {
					if (selection == 0) {
						cm.sendSimple("#eschnifffffff#n\r\n\r\nO-oh. I just... I've been in a b-bit of grief over here, at least since my brother Baekya died and I-- I never got to give him a proper burial.\r\n\r\n#L0#Aw man, that sucks.#l\r\n#L1#Why can't you give him a proper burial?#l");
					} else if (selection == 1) {
						cm.dispose();
						return;
					} else if (selection == 2) {
						cm.sendNext("...\r\n\r\nGo away.");
						cm.dispose();
						return;
					}
				}
			} else if (status == 3) {
				if (selection == 1) {
					cm.sendSimple("Well, he died down in the depths of #bMesoGear#k. The people at NLC told me that the place is abandoned now -- it's overrun with monsters, and they only let certain s-special people down there for very specific missions, not to give some dead guy a waffle.\r\n\r\n#L0#Wait, what?#l");
				} else if (selection == 0) {
					cm.sendNext("Yeah.\r\n\r\n#eschniff#n");
					cm.dispose();
					return;
				}
			} else if (status == 4) {
				if (mode == 0) {
					cm.sendOk("O-or not...\r\n\r\n#eschniffle#n");
                    cm.dispose();
					return;
				} else {
					cm.sendSimple("Oh. Well, someone who was down there with him was able to e-erect a tombstone where he died, but... we share a tradition in which the deceased are given their favorite food so that they have something to eat in the afterlife, forever after.\r\n\r\nI tried to bring him a #bwaffle#k, but like I said, no dice. I probably would die going d-down there anyways.\r\n\r\n#L0#You wanna put a waffle on his dead body? That's dumb.#l\r\n#L1#Maybe I could bring a waffle down to him for you.#l");
				}
            } else if (status == 5) {
				if (selection == 1) {
					cm.sendAcceptDecline("O-oh my god, really? I-- I would be ecstatic if you could--\r\n\r\nThank you. I can warn you though, the body has been down there long enough that it is likely being decomposed by the nasty stuff down there. If you could, please #bbuy a waffle#k from #bMiki#k at #gNew Leaf City#k (which you can get to from the Kerning City Subway). You can then take it with you down #bBigger Ben#k all the way to the bottom, at the #bEnigma Chamber#k. Then drop the waffle at the #bTombstone#k you should be able to locate there, and #bclean up any infestation#k of his grave for me.");
				} else if (selection == 0) {
					cm.sendNext("Wh-whatever.\r\n\r\n#eschniffle#n");
					cm.dispose();
					return;
				}
			} else if (status == 6) {
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
                cm.sendOk(cm.showReward("#esigh#n\r\n\r\nThank you so much. Here, for your efforts:")); 
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