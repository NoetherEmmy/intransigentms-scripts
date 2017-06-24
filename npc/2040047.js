/*
 * Sgt. Anderson
 * LPQ NPC
 * ID: 2040047
 */

"use strict";

let status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();
    const mapId = p.getMapId();

    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (mapId === 922010000) {
        switch (status) {
            case 0:
                cm.sendYesNo("Ya done here, ya buncha kiddoes?\r\n\r\nAlright. Scram.");
                break;
            case 1:
                cm.warpRandom(221024500);
                cm.dispose();
                return;
        }
    } else {
        const ei = p.getEventInstance();
        switch (status) {
            case 0:
                cm.sendYesNo("Ya wanna leave here? Make sure you and yer smelly friends are all ready to go before you make that choice.");
                break;
            case 1:
                if (ei) {
                    ei.disbandParty();
                } else {
                    cm.warpRandom(922010000);
                }
                cm.dispose();
                return;
        }
    }
}
