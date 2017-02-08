/*
 * Ria
 * ID: 9010003
 * Quest manager
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        status++;
        if (status === 0) {
            cm.sendNext("Hey there, I'm Ria!\r\n\r\nWondering what to do next for your #dIntransigentQuests#k?");
        } else if (status === 1) {
            if (cm.onQuest()) {
                cm.sendOk(cm.showQuestProgress());
            } else if (!cm.completedAllQuests()) {
                cm.sendOk("You have new quest(s) available:\r\n\r\n" + cm.showNextQuest());
            } else {
                cm.sendOk("Congratulations! It looks like you've completed all of the #dIntransigentQuests#k!\r\n\r\nYou now have the ability to trade in your maple leaves for #bgachapon tickets#k with Mia.");
            }
            cm.dispose();
            return;
        }
    }
}

/*
var status = 0;

function start() {
    var em = cm.getEventManager("lolcastle");
    if (em == null || !em.getProperty("entryPossible").equals("true")) {
        cm.sendOk("Hey, I'm Ria!\r\n\r\nCame back to me when the #rField of Judgement#k is open for a bit of fun.");
        cm.dispose();
    } else
    cm.sendNext("Hey, I'm Ria. For a small fee of #b10,000 mesos#k I can send you to the #rField of Judgement#k.");

}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.sendOk("All right, see you next time.");
            cm.dispose();
            return;
        }
        status++;
        if (status == 1)
            cm.sendYesNo("Do you wish to enter the #rField of Judgement#k now?");
        else if (status == 2) {
            var em = cm.getEventManager("lolcastle");
            if (cm.getMeso() < 1000000) {
                cm.sendOk("You do not have enough mesos.");
                cm.dispose();
            } else if (cm.getChar().getLevel() < 21) {
                cm.sendOk("You have to be at least level 21 to enter the #rField of Judgement.#k");
                cm.dispose();
            } else if (cm.getChar().getLevel() >= 21 && cm.getChar().getLevel() < 31)
                em.getInstance("lolcastle1").registerPlayer(cm.getChar());
            else if (cm.getChar().getLevel() >= 31 && cm.getChar().getLevel() < 51)
                em.getInstance("lolcastle2").registerPlayer(cm.getChar());
            else if (cm.getChar().getLevel() >= 51 && cm.getChar().getLevel() < 71)
                em.getInstance("lolcastle3").registerPlayer(cm.getChar());
            else if (cm.getChar().getLevel() >= 71 && cm.getChar().getLevel() < 91)
                em.getInstance("lolcastle4").registerPlayer(cm.getChar());
            else
                em.getInstance("lolcastle5").registerPlayer(cm.getChar());
            cm.gainMeso(-10000);
            cm.dispose();
        }
    }
}
*/
