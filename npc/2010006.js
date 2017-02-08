/*
 * Trina
 * ID: 2010006
 *
 * Quest ID: 10003
 */

var status;
var id = 10003;
var questNum = 3;
var questNums = [0, 1, 2, 3];

function start() {
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
                var notAlreadyCompleted =
                    !p.getQuestCompletion(questNum) ||
                    questNums.every(function(qn) { return p.getQuestCompletion(qn); });
                if (p.getLevel() >= 120 && notAlreadyCompleted) {
                    cm.sendSimple(cm.selectQuest(id, "#eappears to be busy being angry#n"));
                } else {
                    cm.sendOk("#eappears to be busy being angry#n");
                    cm.dispose();
                    return;
                }
                break;
            case 1:
                cm.sendSimple(p.getCQuest().loadInfo(id) + "\r\n\r\n#L0#(walk away from Trina for fear of her wrath)#l\r\n#L1#Um... H--hey? Trina?#l");
                break;
            case 2:
                switch (selection) {
                    case 1:
                        cm.sendSimple("#eswivels around violently to glare at you with a scowl on her face#n\r\n\r\n#erecognizes you and face lights up#n\r\n\r\nHey, " + p.getName() + "! How're ya doin'?\r\n\r\n#L0#I should ask the same of you. You looked... irritated.#l\r\n#L1#Oh, just, um... passing through, really...#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 3:
                switch (selection) {
                    case 0:
                        cm.sendSimple("Oh.\r\n\r\n#eface visibly flushes#n\r\n\r\nOh, you know, I'm not really an angry person... I just... I guess all of this #bFirst Chair Flehr#k #e#rSHIT--#k#n\r\n\r\n#epauses for a second, blushing again#n\r\n\r\nSorry, hun. I don't mean to be rude! It's just that, for as many generations as #eI've#n been here, the #bFirst Chair#k has moved from hand to hand (or butt to butt, I guess!)\r\n\r\n#egiggles slightly#n\r\n\r\n...plenty of times, but we all know it's really just been the #rsame group#k of people ruling this place!\r\n\r\n#L0#What do you mean?#l");
                        break;
                    default:
                        cm.sendOk("Oh!\r\n\r\n#esmiles brightly#n\r\n\r\nWell, welcome back!");
                        cm.dispose();
                        return;
                }
                break;
            case 4:
                switch (selection) {
                    case 0:
                        cm.sendSimple("Well, if we're being frank, we all know that the only thing Orbis is #breally#k known for is for its #dmithril#k production.\r\n\r\nEveryone works for the mithril mines, the mithril refiners, the mithril toolers, you name it; one way or another, we all do mithril! The 10 or 20 people that control the in-and-out flow of our imports and our exports (exports being mithril, of course!) have chosen the #bFirst Chair#k for as long as anyone can remember.\r\n\r\n#L0#Did they stop having elections or something?#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 5:
                switch (selection) {
                    case 0:
                        cm.sendSimple("Oh, no, we still have those. But I think it should be obvious by now that #ethose#n are a sham!\r\n\r\nNo one likes to say it out loud, but --\r\n\r\n#elooks around and then leans in to whisper#n\r\n\r\nNo one likes working for those #eshitheads#n anyways!--\r\n\r\n#eclears throat#n\r\n\r\nSo! That's why I got together with a few friends to #e#rplan a revolt#k#n!\r\n\r\nThere's only one problem though.\r\n\r\n#L0#What's that?#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 6:
                switch (selection) {
                    case 0:
                        cm.sendSimple("Well, they are the lords of mithril, after all! They've got tooo many fancy shiny weapons for us to mount any kind of resistance. There's only one kind of weapon we know of that can outclass that kind of armory.\r\n\r\n#eeyes flicker#n\r\n\r\nHold on! You know weapons pretty well, right " + p.getName() + "?\r\n\r\n#L0#Well, yeah, I guess.#l\r\n#L1#Oh, no-- I haven't used or researched weapons in a long time.#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 7:
                switch (selection) {
                    case 0:
                        cm.sendAcceptDecline("Nice!\r\n\r\n#egrins#n\r\n\r\nI -- I think that you can get these kinds of weapons, right?\r\n\r\n#edigs through the chest underneath her#n\r\n#eproduces a paper list and puts it into your hands#n\r\n\r\n#ethe list reads as follows:#n" +
                            "\r\n\t #bPinaka#k" +
                            "\r\n\t #bZedbug#k" +
                            "\r\n\t #bConcerto#k" +
                            "\r\n\t #bWhite Nisrock#k" +
                            "\r\n\t #bWhite Neschere#k"
                        );
                        break;
                    default:
                        cm.sendOk("Oh, ok.");
                        cm.dispose();
                        return;
                }
                break;
            case 8:
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
                cm.sendSimple(cm.selectQuest(id, "#eappears to be busy being angry#n")); 
                break;
            case 1:
                cm.sendNext(cm.showReward("Wow!\r\n\r\n#egrins brightly#n\r\n\r\nThanks so much, " + p.getName() + "! Looks like we're all set and ready to #e#rturn this place up-side down#k#n!"));
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
