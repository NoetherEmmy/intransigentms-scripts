/*
 * Dark Lord
 * Thief Job Advancement
 * Victoria Road | Thieves' Hideout (103000003)
 *
 * Custom Quest 100009, 100011
 */

var MapleJob         = Java.type("net.sf.odinms.client.MapleJob");
var MapleQuestStatus = Java.type("net.sf.odinms.client.MapleQuestStatus");

var status = 0;
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
        cm.sendOk("You know there is no other choice...");
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        if (p.getJob() === MapleJob.BEGINNER) {
            if (p.getLevel() >= 10 && p.getDex() >= 25) {
                cm.sendNext("So you decided to become a #rThief#k?");
            } else {
                cm.sendOk("Train a bit more and I can show you the way of the #rThief#k.");
                cm.dispose();
                return;
            }
        } else if (p.getLevel() >= 30 && p.getJob() === MapleJob.THIEF) {
            if (cm.getQuestStatus(100009).getId() >= MapleQuestStatus.Status.STARTED.getId()) {
                cm.completeQuest(100011);
                if (cm.getQuestStatus(100011) === MapleQuestStatus.Status.COMPLETED) {
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
        } else if (p.getLevel() >= 70 && (p.getJob() === MapleJob.ASSASSIN || p.getJob() === MapleJob.BANDIT)) {
            if (cm.itemQuantity(4000040) >= 1) {
                status = 30;
                cm.sendNext("You have done me right.\r\n\r\nIt is time that you advance further.");
            } else {
                cm.sendOk("Aye, you've gotten stronger. You're yet ready to advance... but I need one more thing from you.\r\n\r\nGo hunt down a #bMushmom#k and bring me back #b1 Mushmom Spore#k.");
                cm.dispose();
                return;
            }
        } else {
            if (p.getLevel() >= 120 && (p.getJob() === MapleJob.HERMIT || p.getJob() === MapleJob.CHIEFBANDIT)) {
                if (cm.itemQuantity(4031323) >= 1) {
                    status = 40;
                    cm.sendNext("Most excellent.\r\n\r\nIt is time that you advance further as a thief.");
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
        cm.sendYesNo("Do you want to become a #rThief#k?");
    } else if (status === 3) {
        if (p.getJob() === MapleJob.BEGINNER) {
            cm.changeJob(MapleJob.THIEF);
        }
        cm.gainItem(1472000, 1);
        cm.gainItem(2070015, 500);
        cm.gainItem(1332067, 1);
        cm.gainItem(1092008, 1);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 11) {
        cm.sendNextPrev("You may be ready to take the next step as a #rAssassin#k or #rBandit#k.");
    } else if (status === 12) {
        cm.sendAcceptDecline("But first I must test your skills. Are you ready?");
    } else if (status === 13) {
        if (cm.haveItem(4031011)) {
            cm.sendOk("Please report this bug on the forums.");
            cm.dispose();
            return;
        } else {
            cm.startQuest(100009);
            cm.sendOk("Go see the #bJob Instructor#k somewhere in the city. He will show you the way.");
            cm.dispose();
            return;
        }
    } else if (status === 21) {
        cm.sendSimple("What do you want to become?#b\r\n#L0#Assassin#l\r\n#L1#Bandit#l#k");
    } else if (status === 22) {
        if (selection === 0) {
            jobName = "Assassin";
            job = MapleJob.ASSASSIN;
        } else {
            jobName = "Bandit";
            job = MapleJob.BANDIT;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 23) {
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, my servant.");
        cm.dispose();
        return;
    } else if (status === 31) {
        if (p.getJob() === MapleJob.ASSASSIN) {
            jobName = "Hermit";
            job = MapleJob.HERMIT;
        } else {
            jobName = "Chief Bandit";
            job = MapleJob.CHIEFBANDIT;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 32) {
        cm.gainItem(4000040, -1);
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 41) {
        if (p.getJob() === MapleJob.HERMIT) {
            jobName = "Night Lord";
            job = MapleJob.NIGHTLORD;
        } else {
            jobName = "Shadower";
            job = MapleJob.SHADOWER;
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
