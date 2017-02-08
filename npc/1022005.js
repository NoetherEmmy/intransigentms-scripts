load('nashorn:mozilla_compat.js');
/*
 * Mr. Wang
 *
 * ID: 1022005
 * Associated quest ID: 1019
 */

var status = 0;
var id = 1019;
 
function start() {
	/*
	if (String(cm.getPlayer().getName()) == "Noether") {
		cm.getPlayer().setStory(19);
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
				cm.sendOk("Fine. I always knew you were a loyalist anyways...");
				cm.dispose();
				return;
			} else if (id - 1000 == cm.getStory()) {
				cm.sendSimple(cm.selectQuest(id, "#emumbles to self#n"));
			} else {
				cm.sendOk("#emumbles to self#n");
				cm.dispose();
				return;
			}
		} else if (status == 1) {
			if (mode == 0) {
				cm.sendOk("Fine. I always knew you were a loyalist anyways...");
				cm.dispose();
				return;
			} else {
				cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#Peaches?#l\r\n#L1#Dances with Balrog? Yeah, fuck that guy, am I right?#l\r\n#L2#(keep walking, ignoring the mumbling man)#l");
			}
		} else if (status == 2) {
			if (mode == 0) {
				cm.sendOk("Fine. I always knew you were a loyalist anyways...");
				cm.dispose();
				return;
			} else {
				switch (selection) {
					case 2:
						cm.dispose();
						return;
					case 0:
						cm.sendSimple("Hm? What?\r\n\r\nYeah, #dpeaches#k. What're you, some kind of loyalist?\r\n\r\n#L0#Uh, duh, yeah.#l\r\n#L1#No, of course not.#l\r\n#L2#SEMPER TROJANUS!#l\r\n#L3#I don't know what you're even talking about.#l");
						break;
					case 1:
						cm.sendSimple("#elooks up, wide-eyed#n\r\n\r\nSo you understand his crimes too, then.\r\n\r\n...Wait. You're not some kind of loyalist spy, are you?\r\n\r\n#L0#Um... maybe?#l\r\n#L1#No, of course not.#l\r\n#L2#SEMPER TEDDIUS!#l\r\n#L3#I actually really have no idea what you're talking about.#l");
						break;
				}
			}
		} else if (status == 3) {
			if (mode == 0) {
				cm.sendOk("Fine. I always knew you were a loyalist anyways...");
				cm.dispose();
				return;
			} else {
				if (selection == 0) {
					cm.sendNext("OFF WITH YOU, BALROGIST SCUM!\r\n\r\n#eMr. Wang lashes out at you with a staff#n");
					cm.damagePlayer(390 + Math.floor(Math.random() * 99), false);
					cm.dispose();
					return;
				} else if (selection == 1 || selection == 3) {
					cm.sendSimple("Alright then, kid. Here's the lowdown:\r\n\r\nEver since #bDances with Balrog#k has been a part of Perion, things have been going sour. I'm not just talking about the harvests, either. You see, #b\"King Balrog\"#k, as he calls himself, forces everyone who grows any kind of crops to only grow squash and beans, and then levies a heavy \"royal tax\" so he can keep all the squash and beans to himself.\r\n\r\nI've been working on growing new drought-resistant fruit cultivars with the new irrigation, but if #bBalrog#k were to know that, he'd have my head put on a spike like the other 2 poor saps who tried to speak out against him. #bBalrog#k only eats squash and beans, and anyone growing anything else means he has nothing good to take from them.\r\n\r\nI need a way to plant a new, subversive underground peach orchard, but I don't exactly have the materials for it.\r\n\r\n#L0#Um, that's pretty illegal. I'm out.#l\r\n#L1#I'd rather not have my head on a spike for some peaches, if that's OK.#l\r\n#L2#What kinds of materials?#l");
				} else if (selection == 2) {
					cm.sendNext("Umm... what?");
					cm.dispose();
					return;
				}
			}
		} else if (status == 4) {
			if (mode == 0) {
				cm.sendOk("Fine. I always knew you were a loyalist anyways...");
				cm.dispose();
				return;
			} else if (selection == 2) {
				cm.sendAcceptDecline("Well, I'm going to need at least #b180#k of the #bPeach Seeds#k. The kind from #bthose damn monkeys#k -- otherwise they won't grow very well. Also I'm gonna need #b60 White Essences#k to use as fertilizer, and if you could #bkill 50 Ice Drakes#k and bring me back their icy scales so I can refrigerate the produce, that would be excellent.");
			} else {
				cm.sendOk("Fine. I always knew you were a loyalist anyways...");
				cm.dispose();
				return;
			}
		} else if (status == 5) {
			if (mode == 0) {
				cm.sendOk("Fine. I always knew you were a loyalist anyways...");
				cm.dispose();
				return;
			} else {
				cm.startCQuest(id);
				cm.dispose();
				return;
			}
		}
	} else if (!cm.onQuest(id)) {
		cm.sendOk("#emumbles to self#n");
		cm.dispose();
		return;
	} else if (cm.onQuest(id) && cm.canComplete()) {
		if (status == 0) {
			cm.sendSimple(cm.selectQuest(id, "#emumbles to self#n"));
		} else if (status == 1) {
			cm.sendOk(cm.showReward("Aha! Thank you so much -- now I can finally grow the resistance! The... peach, resistance! Yes! Peachsistance!"));
		} else if (status == 2) {
			cm.rewardPlayer(1, 0);
			cm.gainFame(6);
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
				cm.sendSimple(cm.selectQuest(id, "#emumbles to self#n"));
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