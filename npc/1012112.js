/*
 * Tory
 * ID: 1012112
 *
 * Quest ID: 10002
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 10002;
var questNum = 2;
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
    if (!cm.onQuest(id)) {
        switch (status) {
            case 0:
                if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                    cm.sendSimple(cm.selectQuest(id, "#elooks visibly disturbed#n"));
                } else {
                    cm.sendOk("#elooks visibly disturbed#n");
                    cm.dispose();
                    return;
                }
                break;
            case 1:
                cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Hey, um, what's wrong?#l\r\n#L1#'Sup, Tory. (keep walking)#l\r\n#L2#(walk away a bit faster from the strange bunny-suit person)#l");
                break;
            case 2:
                switch (selection) {
                    case 0:
                        cm.sendSimple("#elooks up at you briefly, and then quickly looks back down#n\r\n\r\nOh, um, I...\r\n\r\n...\r\n\r\nErr... I don't know what's so wrong, man.\r\n\r\n#L0#What do you mean?#l\r\n#L1#Well, um, tell me when you figure it out.#l");
                        break;
                    case 1:
                        cm.sendOk("'S--'sup...");
                        cm.dispose();
                        return;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 3:
                switch (selection) {
                    case 0:
                        cm.sendSimple("#esighs#n\r\n\r\nThere are a lot of Bunnyana families that have been here longer than my family and I have. I -- I'm not a historian, but what I do know is that this place\r\n\r\n#emakes a vague gesture with fuzzy right paw#n\r\n\r\nused to have a lot more Bunnyana. In fact, it used to just be us. Now, when the Gnossienne people came ashore here,\r\n\r\n#eappears slightly uncomfortable mentioning the word \"Gnossienne\" to a Gnossienne such as yourself#n\r\n\r\nI mean, they were always -- they have been -- perfectly nice to us Bunnyana, but their way of life was very different from ours.\r\n\r\n#L0#(patiently wait for Tory to finish their explanation)#l\r\n#L1#(interrupt) Bunnyana? What do you mean by that?#l");
                        break;
                    default:
                        cm.sendOk("O--oh... ok...");
                        cm.dispose();
                        return;
                }
                break;
            case 4:
                switch (selection) {
                    case 0:
                        cm.sendSimple("While we were... content, to gather the things we needed to survive and spend our time playing games, making tools, and raising children, the Gnossiennes seemed to want to amass as much of everything as they could muster.\r\n\r\nWhile, I don't think that anyone really sees any problem with this #eper se#n, and certainly no Bunnyana questioned it way back then, I th--think it might have grown into a bit of a problem of its own. Did you know this place used to have huge Ayos plant forests? Like, you know, the stuff we make half of our food out of. All of that was removed once all of the mines and mushroom farms had room made for them out east of here. Me, and everyone I know, are working our butts off to mine some lidium, or make some mushroorigami suits, or whatever, when we could be living off the Ayos plants.\r\n\r\nI mean, sure, their way of doing things is a bit different from ours, but they've never been openly hostile to us and have always provided a way for us to make a living. But I don't know if I can take another one of my Bunnyana friends -- or any Bunnyana at all -- committing suicide. The past 12 years have been especially turbulent, but I -- there's something very, #rvery#k wrong here, and I don't think it's the Bunnyanas.\r\n\r\nI always hear the Gnossiennes saying things, like, \"the Bunnyana are just a melancholic people,\" stuff like that, you know? I don't know; it doesn't seem right, seeing as everyone is know is fine most of the time, right? This -- this is a recent kind of thing.\r\n\r\n#L0#Well, I mean, what can we do about it?#l\r\n#L1#That sucks.#l");
                        break;
                    case 1:
                        cm.sendSimple("Oh, um... yeah\r\n\r\n#eshifts back footing slightly#n\r\n\r\n...you know, people like me.\r\n\r\n#erubs fuzzy paws together and grabs for floppy left ear#n\r\n\r\n#eclears throat#n\r\n\r\n#L0#Oh, right. Yeah.#l\r\n#L2#(walk away from the strange bunny-person)#l");
                        status--;
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            case 5:
                switch (selection) {
                    case 0:
                        cm.sendSimple("Well, I mean...\r\n\r\n#elooks visibly discouraged#n\r\n\r\nI suppose there's not much #eI#n can really do about it. I just... I don't know, I figured I could put on a performance for the rest of the Bunnyanas -- it's a really common thing for us, but everyone's been so in the dumps lately that it hasn't really happened.\r\n\r\nI need a certain kind of costume for what I have in mind, but I have no way to get the parts for it.\r\n\r\n#L0#I could help you get the parts.#l\r\n#L1#That's too bad.#l");
                        break;
                    default:
                        cm.sendOk("Y--yeah...");
                        cm.dispose();
                        return;
                }
                break;
            case 6:
                switch (selection) {
                    case 0:
                        cm.sendAcceptDecline("Wow, really?\r\n\r\n#eface lights up#n\r\n\r\nI... I mean, if it's not too much trouble. I really only need #b30 Typhon Feathers#k, #b3 Lidium#k, and #b25 Orihalcon Ores#k.");
                        break;
                    default:
                        cm.sendOk("Y--yeah...");
                        cm.dispose();
                        return;
                }
                break;
            case 7:
                if (!cm.startCQuest(id)) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (!cm.onQuest(id)) {
        switch (status) {
            case 0:
                cm.sendYesNo(cm.randomText(4) + MapleCQuests.loadQuest(id).getTitle() + cm.randomText(5));
                break;
            case 1:
                if (!p.forfeitCQuestById(id)) {
                    cm.sendOk(cm.randomText(9));
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (cm.canComplete(id)) {
        switch (status) {
            case 0:
                cm.sendSimple(cm.selectQuest(id, "#elooks visibly depressed#n"));
                break;
            case 1:
                cm.sendNext(cm.showReward(id, "O--oh, wow... I mean, I didn't expect... wow! Thank you so much!\r\n\r\n#esmiles for the first time you're aware of#n"));
                break;
            case 2:
                cm.rewardPlayer(id);
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
                if (!cm.forfeitCQuestById(id)) {
                    cm.sendOk(cm.randomText(9));
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    }
}
