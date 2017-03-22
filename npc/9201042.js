/*
 * Mr. Sandman
 * ID: 9201042
 * Quest ID: 2010
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 2010;

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
    if (!cm.onQuest(id)) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "Mmmmph!"));
            } else {
                cm.sendOk("Mmmmph!");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("#elooks sad#n");
                cm.dispose();
                return;
            } else {
                cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#A--are you ok?#l\r\n#L1#(run away)#l");
            }
        } else if (status === 2) {
            if (selection === 0) {
                cm.sendAcceptDecline("#elooks frustrated#n\r\n\r\n#etakes out a piece of paper and marker, beginning to draw out a crude image of what looks to be a #bwhite pig#k and a #bblue-ish cyclopic lizard#k#n\r\n\r\n#ethe sandman adeptly illustrates a sword hacking both of the creatures, and draws arrows out of them, pointing to what looks like an #bornate blue key#k#n\r\n\r\n#eadjacent to the ornate blue key, he writes the number #bLX#k in parentheses#n");
            } else if (selection === 1) {
                cm.dispose();
                return;
            }
        } else if (status === 3) {
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + MapleCQuests.loadQuest(id).getTitle() + cm.randomText(5));
        } else if (status === 1) {
            if (!cm.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "Mmmmph!"));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "#egasp#n\r\n\r\nO--oh may god, I can speak again! Thank you! Take this:"));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainFame(5);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "Mmmmph!"));
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
