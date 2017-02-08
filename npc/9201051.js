/*
 * John Barricade
 * ID: 9201051
 *
 * Quest ID: 10000
 */

var status = 0;
var id = 10000;
var questNum = 0;
var questNums = [0, 1, 2, 3];
var address;

function start() {
    address = cm.getPlayer().getGender() === 0 ? "fine young enterprising man" : "fine young spirited woman";
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode >= 1) {
        status++;
    } else if (mode === 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
    if (!cm.onQuest()) {
        switch (status) {
            case 0:
                var notAlreadyCompleted = !p.getQuestCompletion(questNum) || questNums.every(function(qn) { return p.getQuestCompletion(qn); });
                if (p.getLevel() >= 120 && notAlreadyCompleted) {
                    cm.sendSimple(cm.selectQuest(id, "#eappears busy, although it's not clear with what#n"));
                } else {
                    cm.sendOk("#eappears busy, although it's not clear with what#n");
                    cm.dispose();
                    return;
                }
                break;
            case 1:
                cm.sendSimple(p.getCQuest().loadInfo(id) + "\r\n\r\n#L0#Hello.#l\r\n#L1#Um... did you just call me \"sir or ma'am\"?#l\r\n#L2#What are you selling me?#l\r\n#L3#(walk away)#l");
                break;
            case 2:
                switch (selection) {
                    case 0:
                        cm.sendSimple("Say, you look like a " + address + ".\r\n\r\nI've got a proposition for you.\r\n\r\n#L0#Uhhh... ok.#l\r\n#L1#Look, bub. I'm not buying your products. I don't need 'em.#l");
                        break;
                    case 1:
                        cm.sendSimple("#eclears throat#n\r\n\r\nYes. And a fine one at that. Speaking of which: I've got a proposition for you.\r\n\r\n#L0#Uhhh... ok.#l\r\n#L1#Look, bub. I'm not buying your products. I don't need 'em.#l");
                        break;
                    case 2:
                        cm.sendSimple("Ohohoho. No no, it's not that.\r\n\r\nYou just look like a " + address + ". The kind of spirit I could use right now.\r\n\r\nI've got a... proposition for you.\r\n\r\n#L0#Uhhh... ok.#l\r\n#L1#Look, bub. I'm not buying your products. I don't need 'em.#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 3:
                switch (selection) {
                    case 0:
                        cm.sendAcceptDecline("You see, I own a lidium mining operation in Leafre. A fine establishment, really. Made me a lot of money these past few years.\r\n\r\nThe problem is, lidium isn't exactly worth what it used to be, with the new synthetic replacements being so popular and all. So I'm moving on to bigger, better things.\r\n\r\nI don't need the labor of the #bDark Cornian#k miners anymore -- If you could perhaps #r\"lay them off\"#k for me, I could reward you handsomely. Oh, and also, since I'm moving on to #esynthesizing#n lidium, I'm going to need some #bElder Ashes#k as well -- they're the cheapest source of the requisite hydrocarbons.");
                        break;
                    case 1:
                        cm.sendOk("#eshakes head#n");
                        cm.dispose();
                        return;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 4:
                cm.startCQuest(id);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (!cm.onQuest(id)) {
        switch (status) {
            case 0:
                cm.sendYesNo(cm.randomText(4) + p.getCQuest().getTitle() + cm.randomText(5));
                break;
            case 1:
                cm.startCQuest(0);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (cm.canComplete()) {
        switch (status) {
            case 0:
                cm.sendSimple(cm.selectQuest(id, "#eappears busy, although it's not clear with what#n")); 
                break;
            case 1:
                cm.sendNext(cm.showReward("Ah, excellent. I'm so glad you could be here to... #rdispose#k of my workers for me."));
                break;
            case 2:
                p.setQuestCompletion(questNum, true);
                cm.rewardPlayer(0, 0);
                p.sendHint(cm.randomText(6));
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else {
        switch (status) {
            case 0:
                if (mode === 0) {
                    cm.dispose();
                    return;
                } else {
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
                }
                break;
            case 1:
                cm.sendYesNo(cm.randomText(7));
                break;
            case 2:
                cm.startCQuest(0);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    }
}
