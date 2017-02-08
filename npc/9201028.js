/*
 * Malady
 * ID: 9201028
 * Quest IDs: 2000, 2001
 */

var status;
var ids = [2000, 2001];
var rewards = [1102176, 1092052, 1002518, 1012087, 1012111];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
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
    if (!cm.onQuest()) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
            } else if (ids[0] - 2000 === cm.getStoryPoints()) {
                cm.sendSimple(cm.selectQuest(ids[0], "Aheeheeheeeeeeee! "));
            } else if (ids[1] - 2000 === cm.getStoryPoints()) {
                cm.sendSimple(cm.selectQuest(ids[1], "Aheeheeheehooheeheeeee~! "));
            } else {
                cm.sendOk("Aheeheeheeeeeeee!");
                cm.dispose();
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else if (ids[0] - 2000 === cm.getStoryPoints()) {
                cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(ids[0]) + "\r\n\r\n#L0#Just doing a little spying around.#l\r\n#L1#I was wondering if maybe you wanted some help with the brew you're making.#l\r\n#L2#I dunno. It smells good over here.#l");
            } else if (ids[1] - 2000 === cm.getStoryPoints()) {
                cm.sendAcceptDecline(cm.getPlayer().getCQuest().loadInfo(ids[1]));
            }
        } else if (status === 2) {
            if (ids[0] - 2000 === cm.getStoryPoints()) {
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
            } else if (ids[1] - 2000 === cm.getStoryPoints()) {
                cm.startCQuest(ids[1]);
                cm.dispose();
                return;
            }
        } else if (status === 3) {
            cm.startCQuest(ids[0]);
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(ids[0]) && !cm.onQuest(ids[1])) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + cm.getPlayer().getCQuest().getTitle() + cm.randomText(5));
        } else if (status === 1) {
            cm.startCQuest(0);
            cm.dispose();
        }
    } else if (cm.onQuest(ids[0]) && cm.canComplete()) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(ids[0], "Aheeheeheeeeeeee! "));
        } else if (status === 1) {
            cm.sendOk(cm.showReward("Aheeheehee... Thank you, my child. "));
        } else if (status === 2) {
            cm.rewardPlayer(0, 1);
            cm.getPlayer().sendHint(cm.randomText(6));
            cm.dispose();
        }
    } else if (cm.onQuest(ids[1]) && cm.canComplete()) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(ids[1], "Aheeheeheehooheeheeeee~!"));
        } else if (status === 1) {
            cm.sendNext(cm.showReward("Ah! Thanks, kid.\r\n\r\nOh -- and one more thing..."));
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
            cm.rewardPlayer(0, 1);
            cm.getPlayer().sendHint(cm.randomText(6));
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(ids[0]) && !cm.canComplete()) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(ids[0], "Aheeheeheeeeeeee! "));
            }
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            cm.startCQuest(0);
            cm.dispose();
        }
    } else if (cm.onQuest(ids[1]) && !cm.canComplete()) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(ids[1], "Aheeheeheehooheeheeeee~!"));
            }
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            cm.startCQuest(0);
            cm.dispose();
        }
    }
}
