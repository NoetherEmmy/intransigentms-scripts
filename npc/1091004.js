load('nashorn:mozilla_compat.js');
/*
 * Dondlass
 * Nautilus Port Storage NPC
 *
 * Quest ID: 1020
 */
 
var status = 0;
var id = 1020;
 
function start() {
	/*
	if (String(cm.getPlayer().getName()) == "Noether") {
		cm.getPlayer().setStory(20);
	}
	*/
	status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else if (mode == 0 && status == 0) {
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
				cm.sendOk("#esinks back down#n");
				cm.dispose();
				return;
			} else if (id - 1000 == cm.getStory()) {
				cm.sendSimple(cm.selectQuest(id, "#elooks around nervously while trying to look tough#n"));
			} else {
				cm.sendOk("#elooks around nervously while trying to look tough#n");
				cm.dispose();
				return;
			}
		} else if (status == 1) {
			if (mode == 0) {
				cm.sendOk("#esinks back down#n");
				cm.dispose();
				return;
			} else {
				cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#(continue observing the man)#l\r\n#L1#(keep walking)#l");
			}
		} else if (status == 2) {
			if (mode == 0) {
				cm.sendOk("#esinks back down#n");
				cm.dispose();
				return;
			} else {
				switch (selection) {
					case 1:
						cm.sendOk("#esinks back down#n");
						cm.dispose();
						return;
					case 0:
						cm.sendSimple("#enotices you are still watching and clumsily tries to bring his pipe to his mouth for a puff#n\r\n\r\nHey, kid. What...\r\n\r\nWhat're you lookin' at, punk?\r\n\r\n#L0#(tilt head sideways slightly)#l\r\n#L1#(walk away)#l");
						break;
				}
			}
		} else if (status == 3) {
			if (mode == 0) {
				cm.sendOk("#esinks back down#n");
				cm.dispose();
				return;
			} else {
				switch (selection) {
					case 0:
						cm.sendSimple("#esigh#n\r\n\r\nAlright, look, I don't know why I'm telling you this, but I -- need -- someone's... help?\r\n\r\nI... I mean, I know I look pretty tough and all, but you know, I guess we can't all be #esuper#n tough all the time.\r\n\r\nI need to get my hands on some of that\r\n\r\n#ewhispering#n\r\ntauro horn\r\n\r\nKnow what I'm sayin'?\r\n\r\n#L0#Wait, why would you need Tauro Horn?#l\r\n#L1#Uh-uh. No way, man.#l");
						break;
					case 1:
						cm.sendOk("#esinks back down#n");
						cm.dispose();
						return;
				}
			}
		} else if (status == 4) {
			if (mode == 0) {
				cm.sendOk("#esinks back down#n");
				cm.dispose();
				return;
			} else {
				switch (selection) {
					case 0:
						cm.sendSimple("Oh, you know... I have my #ereasons#n, ya feel me?\r\n\r\n#L0#No, I don't.#l\r\n#L1#Ohhhhhhh. Right.#l");
						break;
					case 1:
						cm.sendOk("O--oh.\r\n\r\n#esinks back down#n");
						cm.dispose();
						return;
				}
			}
		} else if (status == 5) {
			if (mode == 0) {
				cm.sendOk("#esinks back down#n");
				cm.dispose();
				return;
			} else {
				switch (selection) {
					case 0:
						cm.sendAcceptDecline("#elooks ashamed#n\r\n\r\nWell... I mean, it's an aphrodesiac, basically. I know it's illegal, but I need some for myself to take... y'know. #eahem#n\r\n\r\nDo you think you could help me out?");
						break;
					case 1:
						cm.sendAcceptDecline("Y--yeah. Uh, do you think you could help me, maybe, get #b100#k of each so that I can use them for myself?");
						break;
				}
			}
		} else if (status == 6) {
			if (mode == 0) {
				cm.sendOk("#esinks back down#n");
				cm.dispose();
				return;
			} else {
				cm.startCQuest(id);
				cm.dispose();
				return;
			}
		}
	} else if (!cm.onQuest(id)) {
		cm.sendOk("#elooks around nervously while trying to look tough#n");
		cm.dispose();
		return;
	} else if (cm.onQuest(id) && cm.canComplete()) {
		if (status == 0) {
			cm.sendSimple(cm.selectQuest(id, "#elooks around nervously while trying to look tough#n"));
		} else if (status == 1) {
			cm.sendOk(cm.showReward("#esigh#n Oh, gee, thank you. I'm gonna put this to good use..."));
		} else if (status == 2) {
			cm.rewardPlayer(1, 0);
			cm.gainFame(7);
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
				cm.sendSimple(cm.selectQuest(id, "#elooks around nervously while trying to look tough#n"));
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