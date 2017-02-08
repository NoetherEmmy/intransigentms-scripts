/*
 * Magician Job Instructor
 * Magician 2nd Job Advancement
 * Victoria Road | The Forest North of Ellinia (101020000)
 */

var MapleQuestStatus = Java.type("net.sf.odinms.client.MapleQuestStatus");

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (status === 0 && cm.getQuestStatus(100007).equals(MapleQuestStatus.Status.STARTED)) {
            status = 3;
        }
        if (status === 0) {
            if (cm.getQuestStatus(100007).equals(MapleQuestStatus.Status.COMPLETED)) {
                cm.sendOk("You're truly a hero!");
                cm.dispose();
                return;
            } else if (cm.getQuestStatus(100006).getId() >= MapleQuestStatus.Status.STARTED.getId()) {
                cm.completeQuest(100006);
                if (cm.getQuestStatus(100006).equals(MapleQuestStatus.Status.COMPLETED)) {
                    cm.sendNext("Oh, isn't this a letter from #bGrendel the Really Old#k?");
                }
            } else {
                cm.sendOk("I can show you the way once your ready for it.");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            cm.sendNextPrev("So you want to prove your skills? Very well...");
        } else if (status === 2) {
            cm.sendAcceptDecline("I will give you a chance if you're ready.");
        } else if (status === 3) {
            cm.startQuest(100007);
            cm.sendOk("You will have to collect me #b30 #t4031013##k. Good luck.");
        } else if (status === 4) {
            cm.warp(108000200);
            cm.dispose();
            return;
        }
    }
}
