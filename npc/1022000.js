/*
 * Dances with Balrog
 * Warrior Job Advancement
 * Victoria Road | Warriors' Sanctuary (102000003)
 *
 * Custom Quest 100003, 100005
 */

"use strict";

const MapleJob = Java.type("net.sf.odinms.client.MapleJob");
const Status   = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");

let status
  , job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
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
            if (cm.getLevel() >= 10 && cm.getPlayer().getStr() >= 35) {
                cm.sendNext("So you decided to become a #rWarrior#k?");
            } else {
                cm.sendOk("Train a bit more and I can show you the way of the #rWarrior#k.");
                cm.dispose();
                return;
            }
        } else if (cm.getLevel() >= 30 && cm.getJob().equals(MapleJob.WARRIOR)) {
            if (cm.getQuestStatus(100003).getId() >= Status.STARTED.getId()) {
                cm.completeQuest(100005);
                if (cm.getQuestStatus(100005) === Status.COMPLETED) {
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
        } else if (cm.getLevel() >= 70 && (cm.getJob().equals(MapleJob.FIGHTER) || cm.getJob().equals(MapleJob.PAGE) || cm.getJob().equals(MapleJob.SPEARMAN))) {
            if (cm.itemQuantity(4000040) >= 1) {
                status = 30;
                cm.sendNext("You have done me right.\r\n\r\nIt is time that you advance further.");
            } else {
                cm.sendOk("Aye, you've gotten stronger. You're yet ready to advance... but I need one more thing from you.\r\n\r\nGo hunt down a #bMushmom#k and bring me back #b1 Mushmom Spore#k.");
                cm.dispose();
                return;
            }
        } else {
            if (cm.getLevel() >= 120 && (cm.getJob().equals(MapleJob.CRUSADER) || cm.getJob().equals(MapleJob.WHITEKNIGHT) || cm.getJob().equals(MapleJob.DRAGONKNIGHT))) {
                if (cm.itemQuantity(4031323) >= 1) {
                    status = 40;
                    cm.sendNext("Most excellent.\r\n\r\nIt is time that you advance further as a warrior.");
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
        cm.sendYesNo("Do you want to become a #rWarrior#k?");
    } else if (status === 3) {
        if (cm.getJob().equals(MapleJob.BEGINNER)) {
            cm.changeJob(MapleJob.WARRIOR);
        }
        cm.gainItem(1402001, 1);
        cm.gainItem(1302007, 1);
        cm.gainItem(1092005, 1);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 11) {
        cm.sendNextPrev("You may be ready to take the next step as a #rFighter#k, #rPage#k or #rSpearman#k.");
    } else if (status === 12) {
        cm.sendAcceptDecline("But first I must test your skills. Are you ready?");
    } else if (status === 13) {
        if (cm.haveItem(4031008)) {
            cm.sendOk("Please report this bug on the forums.");
        } else {
            cm.startQuest(100003);
            cm.sendOk("Go see the #bJob Instructor#k near Perion. He will show you the way.");
        }
    } else if (status === 21) {
        cm.sendSimple("What do you want to become?#b\r\n#L0#Fighter#l\r\n#L1#Page#l\r\n#L2#Spearman#l#k");
    } else if (status === 22) {
        let jobName;
        if (selection === 0) {
            jobName = "Fighter";
            job = MapleJob.FIGHTER;
        } else if (selection === 1) {
            jobName = "Page";
            job = MapleJob.PAGE;
        } else {
            jobName = "Spearman";
            job = MapleJob.SPEARMAN;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 23) {
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
    } else if (status === 31) {
        let jobName;
        if (cm.getJob().equals(MapleJob.FIGHTER)) {
            jobName = "Crusader";
            job = MapleJob.CRUSADER;
        } else if (cm.getJob().equals(MapleJob.PAGE)) {
            jobName = "White Knight";
            job = MapleJob.WHITEKNIGHT;
        } else {
            jobName = "Dragon Knight";
            job = MapleJob.DRAGONKNIGHT;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 32) {
        cm.gainItem(4000040, -1);
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 41) {
        let jobName;
        if (cm.getJob().equals(MapleJob.CRUSADER)) {
            jobName = "Hero";
            job = MapleJob.HERO;
        } else if (cm.getJob().equals(MapleJob.WHITEKNIGHT)) {
            jobName = "Paladin";
            job = MapleJob.PALADIN;
        } else {
            jobName = "Dark Knight";
            job = MapleJob.DARKKNIGHT;
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
