load('nashorn:mozilla_compat.js');
/** 
 * Maid
 * ID: 2120003
 * Quest ID: 2007
 **/ 

var status = 0;
var id = 2007;
var address = "";
var rewards = {0:[1422011, 1302049], 10:[1302049, 1402013, 1312012, 1412011, 1322021, 1422014, 1432012, 1442024], 11:[1302049, 1402013, 1312012, 1412011], 12:[1302049, 1402013, 1322021, 1422014], 13:[1432012, 1442024], 20:[1382012, 1382041], 21:[1382012, 1382041], 22:[1382012, 1382041], 23:[1382012, 1382041], 30:[1452022, 1462019], 31:[1452022], 32:[1462019], 40:[1472032, 1332025], 41:[1472032], 42:[1332025], 50:[1482021, 1492021], 51:[1482021], 52:[1492021]};
var job = 0;

function start() {
	//cm.getPlayer().setStoryPoints(7);
	if (cm.getPlayer().getGender == 0) {
		address = "boy";
	} else {
		address = "girl";
	}
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
                    cm.dispose();
					return;
                } else if (id - 2000 == cm.getStoryPoints()) {
                    cm.sendSimple(cm.selectQuest(id, ".....")); 
                } else {
					cm.sendSimple(".....");
				}
            } else if (status == 1) {
				if (mode == 0) {
					cm.dispose();
					return;
				} else {
					cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(id) + "\r\n\r\n#L0#I was just --#l");
				}
			} else if (status == 2) {
				if (mode == 0) {
					cm.sendOk("#esigh#n");
					cm.dispose();
					return;
				} else {
					cm.sendSimple("#rGet out!#k Get out while you c -- can.\r\n\r\n#L0#Oh god, okay.#l\r\n#L1#Wh -- what's wrong?#l");
				}
			} else if (status == 3) {
				if (selection == 0) {
					cm.dispose();
					return;
				} else if (selection == 1) {
					cm.sendAcceptDecline("#esighs shakily#n\r\n\r\nYou haven't been here as long as I have. I've been here in this #rHaunted House#k for longer than you p -- probably think is possible.\r\n\r\nBut I th -- think the place is finally getting to me.\r\n\r\n#elooks upstairs nervously#n\r\n\r\nLook. Y -- you see that #bSteward#k guy up there? He's been here almost as long as I have, b -- but lately he's started to get a little weird. Every time he's in the same room as me, h -- he just stands there, staring at me unblinkingly. And... the other night I woke up in the middle of the night to find him going through all my s -- stuff! As soon as he saw that I had woken, he just vanished! Just l -- like that!\r\n\r\n#eexhales shakily#n\r\n\r\nLook, " + address + ". I've seen a lot of s -- spooky fucking shit in my life, and I have no doubts that this is some supernatural f -- fuckery. If you've g -- got the guts to try to talk to him, I won't stop you. I c -- can't get a single peep out of the man.");
				}
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
                cm.sendSimple(cm.selectQuest(id, ".....")); 
            } else if (status == 1) {
                cm.sendOk(cm.showReward("O -- oh, my god. You defeated that th -- thing that was possessing him? Th... thank you. Oh... and one more thing, if you don't mind --"));
			} else if (status == 2) {
				var choices = "Choose one:\r\n\r\n";
				job = Math.floor(cm.getJob().getId() / 10.0);
				var i = 0;
				for each (itemid in rewards[job]) {
					choices += "#L" + String(i) + "##i" + String(itemid) + "##l\r\n" + cm.getAllItemStats(itemid) + "\r\n\r\n";
					i++;
				}
				cm.sendSimple(choices);
            } else if (status == 3) {
                cm.rewardPlayer(0, 1);
				cm.gainItem(rewards[job][selection], 1);
                cm.getPlayer().sendHint(cm.randomText(6)); 
                cm.dispose(); 
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) {
            if (status == 0) {
                if (mode == 0) {
                    cm.dispose(); 
                } else {
                    cm.sendSimple(cm.selectQuest(id, ".....")); 
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