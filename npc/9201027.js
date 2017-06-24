/*
 * Nana(P)
 * Perion (102000000)
 *
 * ID: 9201027
 * Love fairy
 * Quest ID: 1018
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 1018;
var proofOfLove = 4031369;
var reqItem = [4000018, 40];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (!cm.onQuest(id) && (!p.hasOpenCQuestSlot() || !p.canBeginCQuest(id))) {
        if (mode === 1) {
            status++;
        } else if (type === 0 && mode === 0) {
            status--;
        } else {
            if (type === 1 && mode === 0) {
                cm.sendOk("Maybe another time?");
            }
            cm.dispose();
            return;
        }

        var mqLvl = p.getMarriageQuestLevel();
        switch (mqLvl) {
            case 0:
                switch (status) {
                    case 0:
                        cm.sendNext("Hey, nice to meet you! I'm Nana, the Fairy from Amoria. I'm waiting for you to prove your devotion to your loved one by obtaining a #rProof of Love#k!");
                        break;
                    case 1:
                        cm.sendNextPrev("To start, you'll have to venture to Amoria to find my good friend, #bMoony the Ringmaker#k.");
                        break;
                    case 2:
                        cm.sendNextPrev("Even if you are not interested in marriage yet, Amoria is open for everyone!\r\n\r\nGo visit #bThomas Swift#k at Henesys if you wanna head to Amoria. If you are interested in weddings, be sure to speak with #dAmes the Wise#k once you get there!");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 1:
                switch (status) {
                    case 0:
                        if (cm.itemQuantity(proofOfLove) > 0) {
                            cm.sendOk("I hope you like the #rProof of Love#k I've made you!");
                            cm.dispose();
                            return;
                        }
                        if (cm.itemQuantity(reqItem[0]) >= reqItem[1]) {
                            cm.sendNext("Wow, you're back! Do you have the stuff?");
                        } else {
                            cm.sendYesNo("So, you want a #rProof of Love#k, huh?");
                        }
                        break;
                    case 1:
                        if (cm.itemQuantity(reqItem[0]) >= reqItem[1]) {
                            cm.sendOk("Oh my god, yes. I am going to make #eso many#n little wooden people with these! Very sturdy.\r\n\r\nHere, take this:  #i" + proofOfLove + "#");
                            cm.gainItem(reqItem[0], -reqItem[1]);
                            cm.gainItem(proofOfLove, 1);
                            cm.dispose();
                            return;
                        } else {
                            cm.sendAcceptDecline("Oh! Oh! I know!\r\n\r\nI've been wanting to make some super-duper #bwooden targets#k to use my cute little lovearrows on, you know. But, I need the wood, of course! I think there are some animals around here that drop wooden bits? Stumps, maybe?\r\n\r\nWell.\r\n\r\nI think #rtheir sturdy little trunks#k look delightful! What do you say? Could you get me\r\n\r\n\t  #i" + reqItem[0] + "#  #bx" + reqItem[1] + "#k?");
                        }
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            default:
                cm.sendOk("#r<3#k");
                cm.dispose();
                return;
        }
        return;
    }
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
                cm.sendOk("Hm. Fine.");
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "Hi, sweetie."));
            } else {
                cm.sendOk("Hi, sweetie.");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("Hm. Fine.");
                cm.dispose();
                return;
            } else {
                cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Oh, I was just... you know, I had this important thing, that, I have to do. Right now.#l\r\n#L1#Just came back to Perion to take a little look around, really.#l\r\n#L2#Come to think of it, I think I came to the wrong place.#l\r\n#L3#Oh just, um, stopped in to say hello.#l");
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("Hm. Fine.");
                cm.dispose();
                return;
            } else {
                switch (selection) {
                    case 0:
                        cm.sendOk("Oh, of course dear. Don't get yourself killed, ok?");
                        cm.dispose();
                        return;
                    case 2:
                        cm.sendOk("Oh dear. Well um... I hope you find your way back, dearest!");
                        cm.dispose();
                        return;
                    case 1:
                    case 3:
                        cm.sendSimple("Oh, that's great, dear! You know, I was just hoping someone would be around here to help me with this itty bitty task of mine...\r\n\r\n#L0#What kind of task?#l\r\n#L1#Sounds hard. I'm out.#l");
                        break;
                }
            }
        } else if (status === 3) {
            if (mode === 0) {
                cm.sendOk("Hm. Fine.");
                cm.dispose();
                return;
            } else {
                if (selection === 0) {
                    cm.sendSimple("Oh, you know me and my projects...\r\n\r\n#egiggles nervously#n\r\n\r\nI just, oh it's no big deal, really. All I need is #b40 Rashes#k, #b40 Dark Rashes#k, and #b60 Anesthetic Powder#k and #b60 Curse Powder#k, that's all.\r\n\r\n#L0#Why would you need poisonou--#l");
                } else if (selection === 1) {
                    cm.sendOk("Oh. Well, um, ok then hun.");
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 4) {
            if (mode === 0) {
                cm.sendOk("Hm. Fine.");
                cm.dispose();
                return;
            } else {
                cm.sendAcceptDecline("Oh, hush!\r\n\r\n#esticks out tongue playfully#n\r\n\r\nYou know I wouldn't ask you to do something I wouldn't also do myself! It's just...\r\n\r\nI have... a #dcertain special someone#k that I have to, um, #dtake care of#k, ok? No big deal, hun.");
            }
        } else if (status === 5) {
            if (mode === 0) {
                cm.sendOk("Hm. Fine.");
                cm.dispose();
                return;
            } else {
                if (!cm.startCQuest(id)) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            }
        }
    } else if (!cm.onQuest(id)) {
        cm.sendOk("Hi, sweetie.");
        cm.dispose();
        return;
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "Hi, sweetie."));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Aww, you're such a sweetheart. Thank you! #eclears throat#n"));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainFame(9);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "Hi, sweetie."));
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
