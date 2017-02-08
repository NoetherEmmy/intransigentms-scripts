/*
 * Mike
 * ID: 1040001
 *
 * Quest ID: 10001
 */

var status;
var id = 10001;
var questNum = 1;
var questNums = [0, 1, 2, 3];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode >= 1) {
        status++;
    } else if (mode === 0 && type !== 4) {
        status--;
    } else {
        cm.dispose();
        return;
    }
    if (!cm.onQuest()) {
        switch (status) {
            case 0:
                var notAlreadyCompleted =
                    !p.getQuestCompletion(questNum) ||
                    questNums.every(function(qn) { return p.getQuestCompletion(qn); });
                if (p.getLevel() >= 120 && notAlreadyCompleted) {
                    cm.sendSimple(cm.selectQuest(id, "#esnoring#n"));
                } else {
                    cm.sendOk("#esnoring#n");
                    cm.dispose();
                    return;
                }
                break;
            case 1:
                cm.sendSimple(p.getCQuest().loadInfo(id) + "\r\n\r\n#L0#(walk past the sleeping guard)#l\r\n#L1#Um... hello? Anyone in there?#l\r\n#L2#(walk away form the guard)#l");
                break;
            case 2:
                switch (selection) {
                    case 0:
                        cm.sendSimple("#eas you start walking past the sleeping guard, he appears to wake up#n\r\n\r\nHmmg... Hey! You, there.\r\n\r\n#L0#(stop)#l\r\n#L1#(keep walking)#l");
                        break;
                    case 1:
                        cm.sendSimple("#ethe guard suddenly awakens#n\r\n\r\nHeoreioaiseawrgh --\r\n\r\nAhem.\r\n\r\nWho goes there?\r\n\r\n#L0#I --#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 3:
                switch (selection) {
                    case 0:
                        cm.sendSimple("Ah, fuck it. I mean, you can go in the dungeon if you want, I guess. Just remember it's dangerous, yada yada, protect yourself, etc.\r\n\r\n#eunder breath#n God I hate this...\r\n\r\n#L0#(continue past guard)#l\r\n#L1#Um... what's wrong?#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 4:
                switch (selection) {
                    case 1:
                        cm.sendSimple("Have you ever tried doing literally almost nothing, all day, every day, for weeks? Well, I have now. Being a guard here blows. No one even comes by, and when they do, I'm supposed to just keep them out until they \"indicate they understand the dangers of the dungeon\" or whatever.\r\n\r\nPlus, on top of that they can fire me at pretty much any time, like if someone gets in the dungeon and dies and they think it's my fault, or they just don't like me. This armor isn't even mine... I'd be in rags if I got fired. I honestly just want to go back to mushroom farming back out east again.\r\n\r\nAt least back there we could produce what we needed to survive.\r\n\r\n#L0#Why don't you go back to mushroom farming, then?#l\r\n#L1#That sounds terrible. Bye. (walk past guard)#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 5:
                switch (selection) {
                    case 0:
                        cm.sendSimple("Well, I can't really do that. A couple of lords from Perion vandalized the place, forcibly running all of the farmers out with their militia so that they could use the land for their businesses.\r\n\r\nSo... basically I have no such land to go back to.\r\n\r\nWorse still, all that I had known for my entire life had been mushroom farming, really. Once I was...  ...#eremoved#n from the mushroom fields out east of here, I had nothing and no skills to my name. So here I am, with a rented suit getting paid a measly wage to stand #dhere#k all day. Without even some nice-looking (or even decent-looking) clothes to my name, I'm looking not too great when it comes to finding a nice place to work.\r\n\r\n#L0#I could help you at least get something nice to wear.#l\r\n#L1#That's... awful. Really. I really gotta go though....#l");
                        break;
                    default:
                        cm.sendOk("Oh...");
                        cm.dispose();
                        return;
                }
                break;
            case 6:
                switch (selection) {
                    case 0:
                        cm.sendAcceptDecline("Really? That would be awesome!\r\n\r\nAll I would really need would be something like... a #eBlack#n #bNeos#k, some #eBlack#n #bNeos Pants#k, a #gGreen#k #bValhalla Helmet#k, and some #gGreen#k #bCrescent Boots#k.");
                        break;
                    default:
                        cm.sendOk("Oh...");
                        cm.dispose();
                        return;
                }
                break;
            case 7:
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
                cm.sendSimple(cm.selectQuest(id, "#esnoring#n")); 
                break;
            case 1:
                cm.sendNext(cm.showReward("Wow! You were able to get all of those things? Thanks so much!"));
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
