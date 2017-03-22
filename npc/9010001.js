/*
 * Tia
 * ID: 9010001
 *
 * Quest ID: 2002
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 2002;
var reward;

function start() {
    if (Math.floor(cm.getPlayer().getJob().getId() / 100) === 2) {
        reward = 2022068;
    } else {
        reward = 2022069;
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
                cm.sendOk(cm.randomText(3));
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
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Pretty well, how about yourself?#l\r\n#L1#You know what, I #ejust#n remembered I have to be somewhere right now...#l");
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                if (selection === 0) {
                    cm.sendSimple("Oh, I'm just peachy, thanks! Sooooo... I was thinking maybe you could help me out with something.\r\n\r\n#L0#Hah, no way.#l\r\n#L1#Uhm, sure!#l");
                } else if (selection === 1) {
                    cm.sendNext("O--oh. Um, OK. Good luck!");
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 3) {
            if (selection === 1) {
                cm.sendAcceptDecline("Oh my god, thank you! I just had started this microbrewery out here in Perion. Pretty hot and dry out here, you know. Kind of tired of drinking tree sap.\r\n\r\nProblem is, I don't have any bottles to put the product in! I tried asking Mr. Thunder to blow me some bottles out of glass, but he said that he has something \"more important\" that he has to finish, so...\r\n\r\nI heard that over in Singapore they have #bweird little walking trashcan thingies#k that carry around a lot of recycled bottles! If you could go to #gKerning City#k and talk to #bIrene#k, she can take you to #bSingapore#k. If you bring me back #b42 Recycle Water Bottles#k, I can reward you!");
            } else if (selection === 0) {
                cm.sendNext("Wow, rude.");
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
            cm.sendOk(cm.showReward(id, "Yes! Thank you so much. Here, for your efforts you can have some of the brew I made!") + "\r\n#i" + String(reward) + "# 2");
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainItem(reward, 2);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
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
