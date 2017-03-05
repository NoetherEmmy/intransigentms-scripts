/*
 * Athena Pierce
 * Bowman Job Advancement
 * Victoria Road | Bowman Instructional School (100000201)
 *
 * Custom quests 100000, 100002
 */

var MapleJob = Java.type("net.sf.odinms.client.MapleJob");
var Status   = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");

var status;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var jobName;
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status === 2) {
        cm.sendOk("Make up your mind and visit me again.");
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        if (cm.getJob().equals(MapleJob.BEGINNER)) {
            if (cm.getLevel() >= 10 && p.getDex() >= 25) {
                cm.sendNext("So have you decided to become a #rBowman#k?");
            } else {
                cm.sendOk("Train a bit more, and I can show you the way of the #rBowman#k.");
                cm.dispose();
                return;
            }
        } else if (cm.getLevel() >= 30 && cm.getJob().equals(MapleJob.BOWMAN)) {
            if (cm.getQuestStatus(100000).getId() >= Status.STARTED.getId()) {
                cm.completeQuest(100002);
                if (cm.getQuestStatus(100002).equals(Status.COMPLETED)) {
                    status = 20;
                    cm.sendNext("I see you have done well. I will allow you to take the next step on your long road.");
                } else {
                    cm.sendOk("Go and see the #rJob Instructor#k.");
                    cm.dispose();
                    return;
                }
            } else {
                status = 10;
                cm.sendNext("The progress you have made is astonishing.");
            }
        } else if (cm.getLevel() >= 70 && (cm.getJob().equals(MapleJob.HUNTER) || cm.getJob().equals(MapleJob.CROSSBOWMAN))) {
            if (cm.itemQuantity(4000040) >= 1) {
                status = 30;
                cm.sendNext("You have done me right.\r\n\r\nIt is time that you advance further.");
            } else {
                cm.sendOk("Aye, you've gotten stronger. You're yet ready to advance... but I need one more thing from you.\r\n\r\nGo hunt down a #bMushmom#k and bring me back #b1 Mushmom Spore#k.");
                cm.dispose();
                return;
            }
        } else {
            if (cm.getLevel() >= 120 && (cm.getJob().equals(MapleJob.RANGER) || cm.getJob().equals(MapleJob.SNIPER))) {
                if (cm.itemQuantity(4031323) >= 1) {
                    status = 40;
                    cm.sendNext("Most excellent.\r\n\r\nIt is time that you advance further as an archer.");
                } else {
                    cm.sendOk("I see... you've gotten stronger. You're almost ready to advance, but I need one more thing from you.\r\n\r\nGo hunt down a #bJr. Balrog#k and bring me back #b1 CO2#k.");
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("You have chosen wisely.");
                cm.dispose();
                return;
            }
        }
    } else if (status === 1) {
        cm.sendNextPrev("It is an important and final choice. You will not be able to turn back.");
    } else if (status === 2) {
        cm.sendYesNo("Do you want to become a #rBowman#k?");
    } else if (status === 3) {
        if (cm.getJob().equals(MapleJob.BEGINNER)) {
            cm.changeJob(MapleJob.BOWMAN);
        }
        cm.gainItem(1452002, 1);
        cm.gainItem(1462047, 1);
        cm.gainItem(2060003, 3000);
        cm.gainItem(2061003, 3000);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
    } else if (status === 11) {
        cm.sendNextPrev("You may be ready to take the next step as a #rHunter#k or #rCrossbowman#k.");
    } else if (status === 12) {
        cm.sendAcceptDecline("But first I must test your skills. Are you ready?");
    } else if (status === 13) {
        if (cm.haveItem(4031010)) {
            cm.sendOk("Please report this bug on the forums.");
        } else {
            cm.startQuest(100000);
            cm.sendOk("Go see the #bJob Instructor#k near Henesys. He will show you the way.");
        }
    } else if (status === 21) {
        cm.sendSimple("What do you want to become?#b\r\n#L0#Hunter#l\r\n#L1#Crossbowman#l#k");
    } else if (status === 22) {
        if (selection === 0) {
            jobName = "Hunter";
            job = MapleJob.HUNTER;
        } else {
            jobName = "Crossbowman";
            job = MapleJob.CROSSBOWMAN;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 23) {
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 31) {
        if (cm.getJob().equals(MapleJob.HUNTER)) {
            jobName = "Ranger";
            job = MapleJob.RANGER;
        } else {
            jobName = "Sniper";
            job = MapleJob.SNIPER;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 32) {
        cm.gainItem(4000040, -1);
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 41) {
        if (cm.getJob().equals(MapleJob.RANGER)) {
            jobName = "Bowmaster";
            job = MapleJob.BOWMASTER;
        } else {
            jobName = "Marksman";
            job = MapleJob.CROSSBOWMASTER;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 42) {
        cm.gainItem(4031323, -1);
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    }
}
