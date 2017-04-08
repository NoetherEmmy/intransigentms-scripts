/*
 * Commando Jim
 * Singapore | Ulu City Entrance
 * ID: 9270044
 *
 * Quests 11000, 11001, 11002, 11003
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var ids = [11000, 11001, 11002, 11003];
var onQuest = function(id) {
    return cm.onQuest(id);
};
var canComplete = function(id) {
    return cm.canComplete(id);
};
var selectedIdIndex;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && (status === 0 || type === 4)) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (!ids.some(onQuest)) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else if (!p.hasOpenCQuestSlot()) {
                cm.sendOk("#efiddles around with settings on gun#n");
                cm.dispose();
                return;
            } else if (p.canBeginCQuest(ids[1])) {
                selectedIdIndex = 1;
                cm.sendSimple(cm.selectQuest(ids[selectedIdIndex], "#efiddles around with settings on gun#n"));
            } else if (p.canBeginCQuest(ids[2])) {
                selectedIdIndex = 2;
                cm.sendSimple(cm.selectQuest(ids[selectedIdIndex], "#efiddles around with settings on gun#n"));
            } else if (p.canBeginCQuest(ids[3])) {
                selectedIdIndex = 3;
                cm.sendSimple(cm.selectQuest(ids[selectedIdIndex], "#efiddles around with settings on gun#n"));
            } else {
                cm.sendOk("#efiddles around with settings on gun#n");
                cm.dispose();
                return;
            }
        } else if (selectedIdIndex === 1) {
            if (status === 1) {
                cm.sendYesNo(MapleCQuests.loadQuest(ids[selectedIdIndex]).getInfo());
            } else if (status === 2) {
                cm.sendSimple("Heeeeey, now that's the spirit. We've been looking to expand the #e#rULCER#k#n for quite a while now.\r\n\r\nThat bein' said, I got quite the task for ya. A #ereal#n doozy.\r\n\r\n#L0#Um... could I maybe do something just a tad easier?#l\r\n#L1#Doozies are like, my specialty. My friends even used to call me the, uh, \"The Doozer\".#l");
            } else if (status === 3) {
                if (mode === 0) {
                    cm.sendOk("#egrumbles#n");
                    cm.dispose();
                    return;
                }
                switch (selection) {
                    case 1:
                        cm.sendSimple("Uhh... that's weird.\r\n\r\nAnywho, now that we cleared enough of those pesky Veetrons and Berserkies and Montrecers, we now know that -- you guessed it -- there's even #emore#n crap beyond all that crap.\r\n\r\nAnd it's worse, too. A couple of 'em are like... weird concrete demon-lookin' motherfuckers with big ol' concrete tree-arms. Scared me shitless.\r\n\r\n#L0#Oh, come on... that can't possibly be real.#l\r\n#L1#I once got in a bar fight with a concrete-lookin' guy. I'm sure I could take 'em.#l\r\n#L2#Uhm... actually, I take back what I said about being \"The Doozer.\"#l");
                        break;
                    default:
                        cm.dispose();
                        return;
                }
            } else if (status === 4) {
                if (selection === 2) {
                    cm.sendOk("O--oh...");
                    cm.dispose();
                    return;
                }
                var leadText;
                if (selection === 0) {
                    leadText = "Oh, believe me, it's real.";
                } else {
                    leadText = "I'm not sure that's relevant to --\r\n\r\n#eclears throat#n";
                }
                cm.sendAcceptDecline(leadText + "\r\n\r\nIf you could hunt down\r\n#b100 Slygies#k, #b100 Petrifighters#k,\r\nand bring us back\r\n#b100 Slygie Tails#k and #b100 Moss Rocks#k, well...\r\n\r\n...me and Senor Silencio over here could really use the help.");
            } else if (status === 5) {
                if (!cm.startCQuest(ids[selectedIdIndex])) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            }
        } else if (selectedIdIndex === 2) {
            if (status === 1) {
                cm.sendSimple(MapleCQuests.loadQuest(ids[selectedIdIndex]).getInfo() + "\r\n\r\n#L0#What kind of problem?#l\r\n#L1#A problem? That's it, I'm out.#l");
            } else if (status === 2) {
                if (mode === 0) {
                    cm.sendOk("#egrumbles#n");
                    cm.dispose();
                    return;
                }
                switch (selection) {
                    case 0:
                        cm.sendSimple("Well, the only thing we really know about this big-bad tree-dude (or \"Krexel\" as the kids call it these days) is that he's got the kind of pull and the kind of inertia that can summon all the shit you see here right out of the damned ground.\r\n\r\nWe don't expect to get any kind of reaction, nor do we wanna get close enough to that motherfucker to touch him with a 12-meter pole, unless we have something that can produce a lot of force all at once.\r\n\r\n#L0#Like what?#l");
                        break;
                    default:
                        cm.sendOk("Well, um, ok.");
                        cm.dispose();
                        return;
                }
            } else if (status === 3) {
                cm.sendAcceptDecline("If we can kill #b100 Dukus#k and harvest their #b100 Rafflesias#k, and then hunt down #bone#k of the fabled #bSoul Lanterns#k from #bCapt. Latanica#k, we could build a #e#dMallet#k#n.\r\n\r\nNot just any old mallet, but the kind of mallet you hear about in the old stories of the gods and godesses who ruled Maple before our time.\r\n\r\nWith that, maybe we could investigate this \"Krexel\" guy.");
            } else if (status === 4) {
                if (!cm.startCQuest(ids[selectedIdIndex])) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            }
        } else if (selectedIdIndex === 3) {
            if (status === 1) {
                cm.sendAcceptDecline(MapleCQuests.loadQuest(ids[selectedIdIndex]).getInfo());
            } else if (status === 2) {
                if (!cm.startCQuest(ids[selectedIdIndex])) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            }
        }
    } else if (ids.some(canComplete)) {
        var questIndex = ids.findIndex(canComplete);
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(ids[questIndex], "#efiddles around with settings on gun#n"));
        } else if (status === 1) {
            cm.sendNext(cm.showReward(ids[questIndex], "Well, I'll be damned. Ya did it, kid."));
        } else if (status === 2) {
            cm.rewardPlayer(ids[questIndex]);
            cm.gainFame(8);
            cm.dispose();
            return;
        }
    } else if (ids.some(onQuest) && !ids.some(canComplete)) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(cm.selectQuest(ids[ids.findIndex(onQuest)], "#efiddles around with settings on gun#n"));
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            if (!cm.forfeitCQuestById(ids[ids.findIndex(onQuest)])) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    }
}
