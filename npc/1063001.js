/*
 * A Pile of Blue Flowers
 * The Deep Forest Of Patience <Step 4> (105040313)
 */

"use strict";

const Status = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");

let status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (status >= 2 && mode === 0) {
        cm.sendOk("Alright, see you next time.");
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        if (cm.getQuestStatus(2053).equals(Status.STARTED) && !cm.haveItem(4031026)) {
            cm.gainItem(4031026, 20);
            cm.warp(105040300);
        } else {
            const rewards = [4020005,4020006,4020004,4020001,4020003,4020000,4020002];
            cm.gainItem(chooseRandom(rewards), 2);
            cm.warp(105040300);
        }
        cm.dispose();
        return;
    }
}
