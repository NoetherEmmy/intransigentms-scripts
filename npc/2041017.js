/*
 * Ace of Hearts
 * ID: 2041017
 *
 * Quest ID: 8001
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 8001;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && status === 0) {
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
                cm.sendOk("Fine then.");
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "....."));
            } else {
                cm.sendOk("Mmmmmmmmmmmm...\r\n\r\n#elicks lips#n");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("Fine then.");
                cm.dispose();
                return;
            }
            cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Aw man, that sounds like it really sucks.#l\r\n#L1#(stare silently)#l\r\n#L2#(clear throat and keep walking)#l");
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("Fine then.");
                cm.dispose();
                return;
            }
            if (selection === 0) {
                cm.sendSimple("I... I am just the worst at picking friends. I usually just make up for it by eating lots of #bChocolate Cake#k, but now I've run out of cake too!\r\n\r\n#L0#Maybe you should go get some actual friends or something.#l\r\n#L1#I could be your friend.#l\r\n#L2#Ew... Chocolate Cake? No wonder you're so pudgy.#l");
            } else if (selection === 1) {
                cm.sendSimple("#eahem#n\r\n\r\nI... I am just the worst at picking friends. I usually just make up for it by eating lots of #bChocolate Cake#k, but now I've run out of cake too!\r\n\r\n#L0#Maybe you should go get some actual friends or something.#l\r\n#L1#I could be your friend.#l\r\n#L2#Ew... Chocolate Cake? No wonder you're so pudgy.#l");
            } else if (selection === 2) {
                cm.dispose();
                return;
            }
        } else if (status === 3) {
            if (selection === 0) {
                cm.sendNext("Yeah, I guess... Whatever...");
                cm.dispose();
                return;
            } else if (selection === 1) {
                cm.sendAcceptDecline("W--well... I mean, um,\r\n\r\ndo you think you could maybe get me some of that #bChocolate Cake#k? I really, I mean, at this point I'm just starving. I've been on a #bChocolate#k-#bCake#k-only diet for at least a year now. Just... I need #b2#k.");
            } else if (selection === 2) {
                cm.dispose();
                return;
            }
        } else if (status === 4) {
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        cm.sendOk("Mmmmmmmmmmmm...\r\n\r\n#elicks lips#n");
        cm.dispose();
        return;
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "Mmmmmmmmmmmm...\r\n\r\n#elicks lips#n"));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Thank you so much. #estarts eating#n Oh, and here's a bird I found, if you want it:"));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainFame(12);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(cm.selectQuest(id, "Mmmmmmmmmmmm...\r\n\r\n#elicks lips#n"));
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
