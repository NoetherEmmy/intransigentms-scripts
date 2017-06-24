/*
 * Aqua Balloon
 * LPQ NPC
 * ID: 2040041
 */

"use strict";

let status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();
    const eim = p.getEventInstance();

    if (!eim) {
        cm.warpRandom(922010000);
        cm.dispose();
        return;
    }

    if ("" + eim.getProperty("6stageclear") === "true") {
        cm.sendOk("Haha, looks like you're super done, bro! See ya later, broseph.");
        cm.dispose();
        return;
    }

    cm.sendOk("#e#rPOP!#k#n\r\n\r\nHaha, just kidding bro. I didn't really pop, bro. It's just a prank, haha.");
    cm.dispose();
    return;
}
