/*
 * Seppy
 * ID: 2041008
 * Ludibrium | Ludibrium (220000000)
 *
 * Quest ID: 1012
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 1012;
var address;
var maleitems =
[
    1050018, 1050051, 1050052, 1050045,
    1050046, 1050047, 1050048, 1050049,
    1052116,
    [1040094, 1060083], [1040095, 1060084],
    [1040096, 1060085], [1040097, 1060086],
    [1040087, 1060076], [1040088, 1060077],
    [1040089, 1060078]
];
var femaleitems =
[
    1051017, 1051037, 1051038, 1051039,
    1051030, 1051031, 1051032, 1051033,
    1051034, 1052116,
    [1041077, 1061076], [1041078, 1061077],
    [1041079, 1061078], [1041080, 1061079],
    [1041087, 1061086], [1041088, 1061087],
    [1041089, 1061088]
];
var itemarray = [];
var mobId1 = 5220003;
var mobId2 = 6230400;

function start() {
    var p = cm.getPlayer();
    address = p.getGender === 0 ? "mister": "miss";
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
                cm.sendSimple(cm.selectQuest(id, "..."));
            } else {
                cm.sendOk("...");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("Just remember then, I'm not responsible for any actions taken against you for your crimes.");
                cm.dispose();
                return;
            }
            cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#W--what? Who are you?#l\r\n#L1#(run away)#l");
        } else if (status === 2) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            var append = "";
            if (selection === 1) {
                cm.damagePlayer(96 + (Math.random() * 40 - 20), false);
                append = "You can't run away from me!\r\n\r\n#eSeppy reaches out a baton and trips you with it#n\r\n\r\n";
            }
            cm.sendAcceptDecline(append + "I'm #bAgent Seppy#k, of the #gLudus Lake Lawkeeping League#k!\r\n\r\nWe've been getting reports of your criminal mercenary activity, " + address + ". But we're willing to forgive your crimes against both Teddies and Trojans in exchange for... a favor.\r\n\r\nYou see, we need to get rid of one of these factions -- we can't uphold the law and keep the peace with these two massive factions and their leaders intact. I need you to seek out a man named #bRydole#k. Speak to him and you will be able to meet up with #beither the head Trojanist or the head Teddy#k. Assassinate one of them, and we will forgive your crimes; you'll be scot free.\r\n\r\nAnd who knows? We might even throw in a little somethin' extra for you as well. What do you say?");
        } else if (status === 3) {
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + MapleCQuests.loadQuest(id).getTitle() + cm.randomText(5));
        } else if (status === 1) {
            if (!cm.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "..."));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Excellent. Here, I threw in a little extra. Oh, and one more thing..."));
        } else if (status === 2) {
            var choices = "Choose one:\r\n\r\n";
            itemarray = p.getGender() === 0 ? maleitems : femaleitems;
            for (var i = 0; i < itemarray.length; ++i) {
                if (itemarray[i] instanceof Array) {
                    choices += "#L" + i + "##i" + itemarray[i][0] + "#   (Comes as a top/bottomwear set) #l\r\n" + cm.getAllItemStats(itemarray[i][0]) + "\r\n\r\n";
                } else {
                    choices += "#L" + i + "##i" + itemarray[i] + "##l\r\n" + cm.getAllItemStats(itemarray[i]) + "\r\n\r\n";
                }
            }
            cm.sendSimple(choices);
        } else if (status === 3) {
            cm.rewardPlayer(id);
            cm.gainFame(12);
            if (itemarray[selection] instanceof Array) {
                for (var j = 0; j < itemarray[selection].length; ++j) {
                    cm.gainItem(itemarray[selection][j], 1);
                }
            } else {
                cm.gainItem(itemarray[selection], 1);
            }
            if (!cm.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(id)) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "..."));
            }
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
