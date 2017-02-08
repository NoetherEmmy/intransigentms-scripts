/*
 * Kyrin
 * Pirate job instructor
 *
 * ID: 1090000
 */

var MapleJob = Java.type("net.sf.odinms.client.MapleJob");

var status;
var job, jobName;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1 || (mode === 0 && type === 4)) {
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
            if (cm.getLevel() >= 10 && cm.getPlayer().getDex() >= 20) {
                cm.sendNext("So you decided to become a #rPirate#k?");
            } else {
                cm.sendOk("Train a bit more and I can show you the way of the #rPirate#k.");
                cm.dispose();
                return;
            }
        } else if (cm.getLevel() >= 30 && cm.getJob().equals(MapleJob.PIRATE)) {
            if (cm.itemQuantity(4031324) >= 1) {
                status = 20;
                cm.sendNext("I see you have done well. I will allow you to take the next step on your long road.");
            } else {
                status = 10;
                cm.sendNext("The progress you have made is astonishing.");
            }
        } else if (cm.getLevel() >= 70 && (cm.getJob().equals(MapleJob.BRAWLER) || cm.getJob().equals(MapleJob.GUNSLINGER))) {
            if (cm.itemQuantity(4000040) >= 1) {
                status = 30;
                cm.sendNext("You have done right by me.\r\n\r\nIt is time that you advance further.");
            } else {
                cm.sendOk("Aye, you've gotten stronger. You're yet ready to advance... but I need one more thing from you.\r\n\r\nGo hunt down a #bMushmom#k and bring me back #b1 Mushmom Spore#k.");
                cm.dispose();
                return;
            }
        } else {
            if (cm.getLevel() >= 120 && (cm.getJob().equals(MapleJob.MARAUDER) || cm.getJob().equals(MapleJob.OUTLAW))) {
                if (cm.itemQuantity(4031323) >= 1) {
                    status = 40;
                    cm.sendNext("Most excellent.\r\n\r\nIt is time that you advance further as a pirate.");
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
        cm.sendYesNo("Do you want to become a #rPirate#k?");
    } else if (status === 3) {
        if (cm.getJob().equals(MapleJob.BEGINNER)) {
            cm.changeJob(MapleJob.PIRATE);
        }
        cm.gainItem(1482000, 1);
        cm.gainItem(1482999, 1);
        cm.gainItem(1492000, 1);
        cm.gainItem(2330000, 500);
        cm.gainItem(2330000, 500);
        cm.gainItem(2330000, 500);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 11) {
        cm.sendNextPrev("You may be ready to take the next step as a #rBrawler#k or #rGunslinger#k.");
    } else if (status === 12) {
        cm.sendAcceptDecline("But first I must test your skills. Are you ready?");
    } else if (status === 13) {
        if (cm.haveItem(4031324)) {
            cm.sendOk("Please report this bug on the forums.");
        } else {
            cm.sendOk("I will send you to The Back Room, where you must fight cactuses and obtain #b30 Dark Marbles#k, which you can trade in for a #bCaramel#k to give me.");
        }
    } else if (status === 14) {
        cm.warp(2000);
        cm.dispose();
        return;
    } else if (status === 21) {
        cm.sendSimple("What do you want to become?#b\r\n#L0#Brawler#l\r\n#L1#Gunslinger#l");
    } else if (status === 22) {
        if (selection === 0) {
            jobName = "Brawler";
            job = MapleJob.BRAWLER;
        } else if (selection === 1) {
            jobName = "Gunslinger";
            job = MapleJob.GUNSLINGER;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 23) {
        cm.gainItem(4031324, -1);
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
    } else if (status === 31) {
        if (cm.getJob().equals(MapleJob.BRAWLER)) {
            jobName = "Marauder";
            job = MapleJob.MARAUDER;
        } else {
            jobName = "Outlaw";
            job = MapleJob.OUTLAW;
        }
        cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status === 32) {
        cm.gainItem(4000040, -1);
        cm.changeJob(job);
        cm.sendOk("So be it! Now go, and go with pride.");
        cm.dispose();
        return;
    } else if (status === 41) {
        if (cm.getJob().equals(MapleJob.MARAUDER)) {
            jobName = "Buccaneer";
            job = MapleJob.BUCCANEER;
        } else {
            jobName = "Corsair";
            job = MapleJob.CORSAIR;
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
