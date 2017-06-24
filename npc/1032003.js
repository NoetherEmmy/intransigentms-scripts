/*
 * Shane
 * Quest ids 1003, 1005
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");
var Status       = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");

var status;
var ids = [1003, 1005];
var rewards = [1082145, 1082146, 1082147, 1082148, 1082149];
var questIds = [2050, 2051];
var forest = false;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    var p = cm.getPlayer();
    var i, reward, rewardlist;
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
    if (p.getMapId() === 103) {
        cm.warp(104);
    } else if (!cm.onQuest(ids[0]) && !cm.onQuest(ids[1])) {
        if (status === 0 && !p.canBeginCQuest(ids[1])) {
            if (mode === 0) {
                cm.sendNext("Good. That makes... at least two of us.\r\n\r\nLook, I need your help. You see, I don't know if you've heard of the \"new big craze\" going around with the kids, and everyone else. A little something called #rBlyaerthimine#k; you might have heard it called \"blue peter\" or \"smurf juice\" or whatever the kids are calling it these days.\r\n\r\nIt used to be easy to get the ingredients, you know. Blyaerthimine isn't just a drug of abuse -- it has legitimate medical usage. But the thing's so damn addictive, on top of being a hallucinogen... it was such a detriment that the local municipalities have started cracking down on all supply sources. You can't just go out there and farm a few blue mushrooms anymore.\r\n\r\nUnfortunately, I was the one with the bright fucking idea to start dealing it to the public and establish a supply chain here to Ellinia, before all this happened. These tweakers are fucking crazy with the demand, and on top of that I still owe... a few people a few debts. But I can't get my hands on any more #bBlue Mushroom Caps#k or #bPure Waters#k anymore. At least, not with #emy own#n hands.");
                status += 2;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[0])) {
                cm.sendSimple(cm.selectQuest(ids[0], cm.randomText(1)));
            } else {
                if (cm.getQuestStatus(questIds[0]).equals(Status.STARTED)) {
                    cm.sendYesNo("Flowers, huh?\r\nWell if some spooky old dude really told you there's flowers up there... who am I to argue?\r\n\r\nWanna go in the #bForest of Patience#k, kiddo?");
                    forest = true;
                } else if (cm.getQuestStatus(questIds[1]).equals(Status.STARTED)) {
                    cm.sendYesNo("Flowers, again?\r\n\r\nGinseng? Oh, it's not -- right. Not a flower. A root. Look, I'm not a fuckin' botanist, aight?\r\n\r\nAnyways, ya wanna go into the #bForest of Patience#k?");
                    forest = true;
                } else {
                    cm.sendOk(cm.randomText(1));
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 0) {
            if (mode !== 0) {
                if (cm.getQuestStatus(questIds[0]).equals(Status.STARTED)) {
                    cm.sendYesNo("Flowers, huh?\r\nWell if some spooky old dude really told you there's flowers up there... who am I to argue?\r\n\r\nWanna go in the #bForest of Patience#k, kiddo?");
                    forest = true;
                } else if (cm.getQuestStatus(questIds[1]).equals(Status.STARTED)) {
                    cm.sendYesNo("Flowers, again?\r\n\r\nGinseng? Oh, it's not -- right. Not a flower. A root. Look, I'm not a fuckin' botanist, aight?\r\n\r\nAnyways, ya wanna go into the #bForest of Patience#k?");
                    forest = true;
                } else {
                    cm.sendSimple(cm.selectQuest(ids[1], cm.randomText(1)));
                }
            } else {
                cm.sendOk("Aw, what a shame.");
                cm.dispose();
                return;
            }
        } else if (status === 1 && forest) {
            if (cm.getQuestStatus(questIds[0]).equals(Status.STARTED)) {
                cm.warp(101000100);
            } else if (cm.getQuestStatus(questIds[1]).equals(Status.STARTED)) {
                cm.warp(101000102);
            }
            cm.dispose();
            return;
        } else if (status === 1 && p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[0])) {
            cm.sendYesNo(MapleCQuests.loadQuest(ids[0]).getInfo());
        } else if (status === 1 && p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[1])) {
            cm.sendAcceptDecline(MapleCQuests.loadQuest(ids[1]).getInfo());
        } else if (status === 2 && p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[0])) {
            cm.sendOk("God damn it. What have I gotten myself into...");
            cm.dispose();
            return;
        } else if (status === 2 && p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[1])) {
            if (!cm.startCQuest(ids[1])) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        } else if (status === 3 && p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[0])) {
            if (mode !== 0) {
                cm.sendAcceptDecline("This is where you come in. If you could... do a bit of the dirty work for me and bring back #b30 Blue Mushroom Caps#k and #b5 Pure Waters#k, I have some stuff stored away I can get you.");
                status++;
            } else {
                cm.sendOk("God damn it. What have I gotten myself into...");
                cm.dispose();
                return;
            }
        } else if (status >= 4 && p.hasOpenCQuestSlot() && p.canBeginCQuest(ids[0])) {
            if (!cm.startCQuest(ids[0])) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(ids[0])) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(ids[0], cm.randomText(1)));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(ids[0], "Oh thank god. Here, take these for your risk:"));
        } else if (status === 2) {
            cm.rewardPlayer(ids[0]);
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(ids[1])) {
        if (p.getMapId() === 104) {
            if (status === 0) {
                cm.sendSimple(cm.selectQuest(ids[1], cm.randomText(1)));
            } else if (status === 1) {
                cm.warp(101000000);
                cm.sendOk(cm.showReward(ids[1], "Thanks, once again. I was... hoping to see you come out alive. And uh, one more thing..."));
            } else if (status === 2) {
                rewardlist = "";
                for (i = 0; i < rewards.length; ++i) {
                    reward = rewards[i];
                    rewardlist += "#L" + i + "##i" + reward + "##l\r\n" + cm.getAllItemStats(reward) + "\r\n\r\n";
                }
                cm.sendSimple("Pick one:\r\n\r\n" + rewardlist);
            } else if (status === 3) {
                cm.gainItem(rewards[selection], 1);
                cm.rewardPlayer(ids[1]);
                cm.dispose();
                return;
            }
        } else {
            if (status === 0) {
                cm.sendOk("Hurry, you must complete the run!");
                cm.dispose();
                return;
            } else if (status === 2) {
                rewardlist = "";
                for (i = 0; i < rewards.length; ++i) {
                    reward = rewards[i];
                    rewardlist += "#L" + i + "##i" + reward + "##l\r\n" + cm.getAllItemStats(reward) + "\r\n\r\n";
                }
                cm.sendSimple("Pick one:\r\n\r\n" + rewardlist);
            } else if (status === 3) {
                cm.gainItem(rewards[selection], 1);
                cm.rewardPlayer(ids[1]);
                cm.dispose();
                return;
            }
        }
    } else {
        if (p.getMapId() === 104) {
            if (status === 0) {
                cm.sendSimple("Go, now! the guardians must be defeated before you can deliver the ingredients!\r\n\r\n#L1#I want to forfeit this quest.#l");
            } else if (status === 1) {
                if (selection === 1) {
                    if (!cm.forfeitCQuestById(ids[1])) {
                        cm.sendOk(cm.randomText(9));
                    }
                    cm.warp(101000000);
                    cm.gainItem(4000009, -30);
                    cm.gainItem(2022000, -5);
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 0) {
            if (cm.onQuest(ids[1])) {
                cm.sendYesNo("Do you want to make the run now? I'm warning you, it could be very dangerous -- and there's no turning back. I'll give you the #bBlue Mushroom Caps#k and #bPure Waters#k you need to deliver, and send you straight away.");
            } else {
                cm.sendOk("Got the stuff yet?");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            cm.gainItem(4000009, 30);
            cm.gainItem(2022000, 5);
            cm.warp(103);
            cm.dispose();
            return;
        }
    }
}
