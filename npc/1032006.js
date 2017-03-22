/*
 * Mr. Park
 * Victoria Road | Ellinia (101000000)
 *
 * Quest ID: 8000
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 8000;

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
                cm.sendOk("As you wish.");
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "I swear for the last time, I'm not hiding anything within my clothes."));
            } else {
                cm.sendOk("I swear for the last time, I'm not hiding anything within my clothes.");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("As you wish.");
                cm.dispose();
                return;
            } else {
                cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#What the hell was that noise?!#l\r\n#L1#(stare silently)#l\r\n#L2#Look, I didn't come through here to help out creepy strangers with belching clothes.#l");
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("As you wish.");
                cm.dispose();
                return;
            } else {
                if (selection === 0) {
                    cm.sendNext("#ethe man's face flashes with anger for a moment, until he quickly folds over to subdue the noises from his clothes and shuffles away, looking to make sure no one else is looking#n");
                    cm.dispose();
                    return;
                } else if (selection === 1) {
                    cm.sendSimple("#eclears throat#n\r\n\r\nI--I realize this is going to sound a little crazy to you -- some would say #dcuckoo#k -- but I've been using this storage business partly as a front to hide away my #rpet dragon#k.\r\n\r\n#L0#Your pet WHAT?#l\r\n#L1#What's its name?#l\r\n#L2#(scream and run away)#l");
                } else if (selection === 2) {
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 3) {
            if (selection === 0) {
                cm.sendAcceptDecline("Shhhhhhh, shhh; keep it down. You heard me. A #rdragon#k.\r\n\r\nHer name's #dKuku#k, and lately with the way business has been going and with how much Kuku has been growing, I've been running out of places to keep her hidden away.\r\n\r\nReally, I just want her to be safe; but, for one thing, I can't just give her away to any old person, and for another, I don't have any food that she can be fed with.\r\n\r\nIf you are able to go out by yourself and hunt #b200 Squids#k and bring us back #b250 Butter-Toasted Squids#k (Kuku's favorite dish), I would feel comfortable handing Kuku off to you.");
            } else if (selection === 1) {
                cm.sendAcceptDecline("O--oh. Um.\r\n\r\nHer name's #dKuku#k, and lately with the way business has been going and with how much Kuku has been growing, I've been running out of places to keep her hidden away.\r\n\r\nReally, I just want her to be safe; but, for one thing, I can't just give her away to any old person, and for another, I don't have any food that she can be fed with.\r\n\r\nIf you are able to go out by yourself and hunt #b200 Squids#k and bring us back #b250 Butter-Toasted Squids#k (Kuku's favorite dish), I would feel comfortable handing Kuku off to you.");
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
        cm.sendOk("I swear for the last time, I'm not hiding anything within my clothes.");
        cm.dispose();
        return;
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "I swear for the last time, I'm not hiding anything within my clothes."));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Thank you very much. With any luck, Kuku will learn to enjoy your company."));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainFame(15);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "I swear for the last time, I'm not hiding anything within my clothes."));
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
