/*
 * Maid
 * Phantom Forest | Haunted House (682000000)
 * ID: 2120003
 *
 * Quest ID: 2007
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 2007;
var address;
var rewards =
{
    0:  [1442018, 1302071],
    10: [1302020, 1402006, 1312006, 1412004, 1322015, 1422008, 1432016, 1442015],
    11: [1302020, 1402006, 1312006, 1412004],
    12: [1302020, 1402006, 1322015, 1422008],
    13: [1432016, 1442015],
    20: [1382009, 1322027],
    21: [1382009],
    22: [1382009],
    23: [1382009, 1322027],
    30: [1452016, 1462014, 1432016, 1332020],
    31: [1452016, 1432016, 1332020],
    32: [1462014],
    40: [1472030, 1332020],
    41: [1472030],
    42: [1332020],
    50: [1482020, 1492020],
    51: [1482020],
    52: [1492020]
};
var job = 0;

function start() {
    if (cm.getPlayer().getGender === 0) {
        address = "boy";
    } else {
        address = "girl";
    }
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (!cm.onQuest(id)) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "....."));
            } else {
                cm.sendOk(".....");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#I was just --#l");
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("#esigh#n");
                cm.dispose();
                return;
            }
            cm.sendSimple("#rGet out!#k Get out while you c -- can.\r\n\r\n#L0#Oh god, okay.#l\r\n#L1#Wh -- what's wrong?#l");
        } else if (status === 3) {
            if (selection === 0) {
                cm.dispose();
                return;
            } else if (selection === 1) {
                cm.sendAcceptDecline("#esighs shakily#n\r\n\r\nYou haven't been here as long as I have. I've been here in this #rHaunted House#k for longer than you p -- probably think is possible.\r\n\r\nBut I th -- think the place is finally getting to me.\r\n\r\n#elooks upstairs nervously#n\r\n\r\nLook. Y -- you see that #bSteward#k guy up there? He's been here almost as long as I have, b -- but lately he's started to get a little weird. Every time he's in the same room as me, h -- he just stands there, staring at me unblinkingly. And... the other night I woke up in the middle of the night to find him going through all my s -- stuff! As soon as he saw that I had woken, he just vanished! Just l -- like that!\r\n\r\n#eexhales shakily#n\r\n\r\nLook, " + address + ". I've seen a lot of s -- spooky fucking shit in my life, and I have no doubts that this is some supernatural f -- fuckery. If you've g -- got the guts to try to talk to him, I won't stop you. I c -- can't get a single peep out of the man.");
            }
        } else if (status === 4) {
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "....."));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "O -- oh, my god. You defeated that th -- thing that was possessing him? Th... thank you. Oh... and one more thing, if you don't mind --"));
        } else if (status === 2) {
            var choices = "Choose one:\r\n\r\n";
            job = Math.floor(p.getJob().getId() / 10);
            var i = 0;
            rewards[job].forEach(function(itemid) {
                choices += "#L" + i + "##i" + itemid + "##l\r\n" + cm.getAllItemStats(itemid) + "\r\n\r\n";
                i++;
            });
            cm.sendSimple(choices);
        } else if (status === 3) {
            cm.rewardPlayer(id);
            cm.gainItem(rewards[job][selection], 1);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(cm.selectQuest(id, "....."));
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            if (!cm.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    }
}
