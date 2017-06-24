/*
 * Pink Balloon
 * LPQ NPC
 * ID: 2040045
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

    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    switch (status) {
        case 0:
            cm.sendSimple("Are you and your party ready to head out? Great!\r\n\r\n#L0#Uhh, actually no. We'd like to stay here a little longer.#l\r\n#L1#For sure.#l");
            break;
        case 1:
            if (selection === 1) {
                const target = eim.getMapInstance(922011100);
                eim.getPlayers().forEach(function(player) {
                    player.changeMap(target, target.getPortal("st00"));
                });
            } else {
                cm.sendOk("O--oh, alright then.");
            }
            cm.dispose();
            return;
    }
}
