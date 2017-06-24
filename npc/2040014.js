/*
 * Chico
 * ID: 2040014
 * Quest ID: 1008
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 1008;

function start() {
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
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            } else {
                cm.sendOk(cm.randomText(1));
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#What?#l");
        } else if (status === 2) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple("You know, in the toy war. You're either #ewith#n the teddies, or you're #eagainst#n 'em.\r\n\r\n#L0#Oh yeah, of course I'm with the teddies. Duh.#l\r\n#L1#Teddies are lying sacks of shit and you know it.#l\r\n#L2#I'm sorry, I still have no idea what you're talking about and it doesn't sound like something worth discussing.#l");
        } else if (status === 3) {
            if (selection === 0) {
                cm.sendAcceptDecline("Alright, good. Don't want none of that smelly Trojanist scum around here...\r\n\r\nI've got a task for ya. Call it a crusade, call it what ya like. I need you to #eeliminate#n those dirty plastic degenerates we call #bToy Trojans#k. If you can kill #b100#k of 'em and bring back \r\n#b45 of their swords#k, I can see to it that ya get yer just reward.");
            } else if (selection === 1) {
                cm.sendNext("#rTROJANIST SCUM!#k\r\n\r\n#eChico reaches out the bottom of his spear and whacks you in the head with it#n");
                cm.damagePlayer(Math.floor(100 + (Math.random() * 40 - 20)), false);
                cm.dispose();
                return;
            } else if (selection === 2) {
                cm.sendNext("God damn kids these days...");
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
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Yes, this is good. Very good. Take these."));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
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
