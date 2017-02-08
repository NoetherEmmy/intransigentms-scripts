load('nashorn:mozilla_compat.js');
/*
	NPC Name: 		Mr. Lee
	Map(s): 		Victoria Road : Henesys (100000000)
	Quest ID:       1001
*/

var id = 1001;

function start() {
	//cm.getPlayer().setStory(1);
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
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
                } else if (id - 1000 == cm.getStory()) {
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
                } else {
					cm.sendOk(cm.randomText(1));
					cm.dispose();
					return;
				}
            } else if (status == 1) {
                cm.sendAcceptDecline(cm.getPlayer().getCQuest().loadInfo(id));
            } else if (status == 2) {
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
				cm.warp(100000200, 0);
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            } else if (status == 1) {
                cm.sendOk(cm.showReward(cm.randomText(2)));
            } else if (status == 2) {
                cm.rewardPlayer(1, 0);
                cm.getPlayer().sendHint(cm.randomText(6));
                cm.dispose();
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) {
            if (status == 0) {
                if (mode == 0) {
                    cm.dispose();
                } else {
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
                }
            } else if (status == 1) {
				if (cm.getPlayer().getMapId() == 102) {
					cm.sendSimple("Go on, get him! #eHe's still dangerous!#n\r\n\r\n#L4#I want to leave this place.#l");
				} else {
					cm.sendSimple("Do you want to enter Mano's Lair right now? I'm warning you, #ronce you go in you cannot leave until Mano is subdued#k.\r\n\r\n#L1#Yes.#l\r\n#L2#No.#l\r\n#L3#I want to cancel this quest.#l");
				}
            } else if (status == 2) {
				if (selection == 1) {
					cm.warp(102, 0);
					cm.dispose();
					return;
				} else if (selection == 3) {
					cm.startCQuest(0);
					cm.dispose();
				} else if (selection == 4 && cm.getPlayer().getMapId() == 102) {
					cm.warp(100000200, 0);
					cm.dispose();
				} else {
					cm.dispose();
				}
            }
        }
    }
}