/*
 * Malady
 * Kerning City
 * ID: 9201028
 *
 * Quest IDs: 2000, 2001
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var ids = [2000, 2001];
var rewards = [1102176, 1092052, 1002518, 1012087, 1012111];

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
    if (!cm.onQuest(ids[0]) && !cm.onQuest(ids[1])) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[0])) {
                cm.sendSimple(cm.selectQuest(ids[0], "Aheeheeheeeeeeee! "));
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[1])) {
                cm.sendSimple(cm.selectQuest(ids[1], "Aheeheeheehooheeheeeee~! "));
            } else {
                cm.sendOk("Aheeheeheeeeeeee!");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[0])) {
                cm.sendSimple(MapleCQuests.loadQuest(ids[0]).getInfo() + "\r\n\r\n#L0#Just doing a little spying around.#l\r\n#L1#I was wondering if maybe you wanted some help with the brew you're making.#l\r\n#L2#I dunno. It smells good over here.#l");
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[1])) {
                cm.sendAcceptDecline(MapleCQuests.loadQuest(ids[1]).getInfo());
            }
        } else if (status === 2) {
            if (p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[0])) {
                if (selection === 0) {
                    cm.sendOk("Ach! What is wrong with you?\r\n\r\n#eGet out!#n");
                    cm.dispose();
                    return;
                } else if (selection === 1) {
                    cm.sendAcceptDecline("O--oh. I guess I could use a bit of help... I'm going to need a lot of components for this one.\r\n\r\nIf you could get me #b20 Octopus legs#k, #b20 Green Mushroom Caps#k, and kill for me #b25 Pigs#k and #b20 Ribbon Pigs#k, I could give ya a fancy reward.");
                } else if (selection === 2) {
                    cm.sendOk("#esniff#n\r\n\r\nWell, thanks, I guess. Now shoo!");
                    cm.dispose();
                    return;
                }
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[1])) {
                if (!cm.startCQuest(ids[1])) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            }
        } else if (status === 3) {
            if (!cm.startCQuest(ids[0])) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(ids[0])) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(ids[0], "Aheeheeheeeeeeee! "));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(ids[0], "Aheeheehee... Thank you, my child. "));
        } else if (status === 2) {
            cm.rewardPlayer(ids[0]);
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(ids[1])) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(ids[1], "Aheeheeheehooheeheeeee~!"));
        } else if (status === 1) {
            cm.sendNext(cm.showReward(ids[1], "Ah! Thanks, kid.\r\n\r\nOh -- and one more thing..."));
        } else if (status === 2) {
            var rewardlist = "";
            var i = 0;
            rewards.forEach(function(reward) {
                rewardlist += "#L" + i + "##i" + reward + "##l\r\n" + cm.getAllItemStats(reward) + "\r\n\r\n";
                i += 1;
            });
            cm.sendSimple("Pick one, my sweet child:\r\n\r\n" + rewardlist);
        } else if (status === 3) {
            cm.gainItem(rewards[selection], 1);
            cm.rewardPlayer(ids[1]);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(cm.selectQuest(ids[1], "Aheeheeheehooheeheeeee~!"));
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            if (!cm.forfeitCQuestById(ids[1])) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    }
}
