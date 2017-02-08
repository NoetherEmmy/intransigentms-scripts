/*
 * Grendel the Really Old
 * Magician Job Advancement
 * Victoria Road | Magic Library (101000003)
 *
 * Custom quests 100006, 100008, 100100, 100101
 */

var MapleJob         = Java.type("net.sf.odinms.client.MapleJob");
var MapleQuestStatus = Java.type("net.sf.odinms.client.MapleQuestStatus");

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
            if (cm.getLevel() >= 8 && p.getInt() >= 20) {
                cm.sendNext("So you decided to become a #rMagician#k?");
            } else {
                cm.sendOk("Train a bit more and I can show you the way of the #rMagician#k.");
                cm.dispose();
                return;
            }
        } else if (cm.getLevel() >= 30 && cm.getJob().equals(MapleJob.MAGICIAN)) {
            if (cm.getQuestStatus(100006).getId() >= MapleQuestStatus.Status.STARTED.getId()) {
                cm.completeQuest(100008);
                if (cm.getQuestStatus(100008).equals(MapleQuestStatus.Status.COMPLETED)) {
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
        } else if (cm.getLevel() >= 70 && (cm.getJob().equals(MapleJob.IL_WIZARD) || cm.getJob().equals(MapleJob.FP_WIZARD) || cm.getJob().equals(MapleJob.CLERIC))) {
            if (cm.itemQuantity(4000040) >= 1) {
                status = 30;
                cm.sendNext("You have done me right.\r\n\r\nIt is time that you advance further.");
            } else {
                cm.sendOk("Aye, you've gotten stronger. You're yet ready to advance... but I need one more thing from you.\r\n\r\nGo hunt down a #bMushmom#k and bring me back #b1 Mushmom Spore#k.");
                cm.dispose();
                return;
            }
        } else if (cm.getLevel() >= 120 && (cm.getJob().equals(MapleJob.IL_MAGE) || cm.getJob().equals(MapleJob.FP_MAGE) || cm.getJob().equals(MapleJob.PRIEST))) {
            if (cm.itemQuantity(4031323) >= 1) {
                status = 40;
                cm.sendNext("Most excellent.\r\n\r\nIt is time that you advance further as a magician.");
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
    } else if (status === 1) {
        cm.sendNextPrev("It is an important and final choice. You will not be able to turn back.");
    } else if (status === 2) {
        cm.sendYesNo("Do you want to become a #rMagician#k?");
    } else if (status === 3) {
        if (cm.getJob().equals(MapleJob.BEGINNER)) {
            cm.changeJob(MapleJob.MAGICIAN);
        }
        cm.gainItem(1372005, 1);
        cm.gainItem(1092008, 1);
        cm.gainItem(1322032, 1);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 11) {
        cm.sendNextPrev("You may be ready to take the next step as a #rFire/Poison Wizard#k, #rIce/Lightning Wizard#k or #rCleric#k.");
    } else if (status === 12) {
        cm.sendAcceptDecline("But first I must test your skills. Are you ready?");
    } else if (status === 13) {
        if (cm.haveItem(4031009)) {
            cm.sendOk("Please report this bug on the forums.");
        } else {
            cm.startQuest(100006);
            cm.sendOk("Go see the #bJob Instructor#k near Ellinia. He will show you the way.");
        }
    } else if (status === 21) {
        cm.sendSimple("What do you want to become?#b\r\n#L0#Fire/Poison Wizard#l\r\n#L1#Ice/Lightning Wizard#l\r\n#L2#Cleric#l#k");
    } else if (status === 22) {
        if (selection === 0) {
            jobName = "Fire/Poison Wizard";
            job = MapleJob.FP_WIZARD;
        } else if (selection === 1) {
            jobName = "Ice/Lightning Wizard";
            job = MapleJob.IL_WIZARD;
        } else {
            jobName = "Cleric";
            job = Packages.net.sf.odinms.client.MapleJob.CLERIC;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 23) {
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
    } else if (status === 31) {
        if (cm.getJob().equals(MapleJob.IL_WIZARD)) {
            jobName = "Ice/Lightning Mage";
            job = MapleJob.IL_MAGE;
        } else if (cm.getJob().equals(MapleJob.FP_WIZARD)) {
            jobName = "Fire/Poison Mage";
            job = MapleJob.FP_MAGE;
        } else {
            jobName = "Priest";
            job = MapleJob.PRIEST;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 32) {
        cm.gainItem(4000040, -1);
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 41) {
        if (cm.getJob().equals(MapleJob.IL_MAGE)) {
            jobName = "Ice/Lightning Archmage";
            job = MapleJob.IL_ARCHMAGE;
        } else if (cm.getJob().equals(MapleJob.FP_MAGE)) {
            jobName = "Fire/Poison Archmage";
            job = MapleJob.FP_ARCHMAGE;
        } else {
            jobName = "Bishop";
            job = MapleJob.BISHOP;
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
