/*
 * Violet Balloon
 * LPQ NPC
 * ID: 2040044
 */

"use strict";

const MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
const MaplePacketCreator        = Java.type("net.sf.odinms.tools.MaplePacketCreator");

let status;
const passOfDim = 4001022;
const keyOfDim = 4001023;
const keyOfDimNeeded = 1;
const exp = 5950;

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

    if ("" + eim.getProperty("9stageclear") === "true") {
        if (status === 0) {
            cm.sendNext("Well ding fuckin' dong, eh? The witch is dead. Which is great and all, but now I'm out of a job.\r\n\r\nWhy don't you buncha midget heroes head right on outta here, eh? I wouldn't want to keep you away from slaying more scary bad guys.");
            return;
        }
        if (status === 1) {
            jsArray(p.getMap().getCharacters())
                .forEach(player =>
                    MapleInventoryManipulator.removeAllById(
                        player.getClient(),
                        keyOfDim,
                        false
                    )
                );

            jsArray(p.getMap().getCharacters())
                .forEach(player =>
                    MapleInventoryManipulator.removeAllById(
                        player.getClient(),
                        passOfDim,
                        false
                    )
                );

            const target = eim.getMapInstance(922011000);
            p.changeMap(target, target.getPortal("st00"));

            cm.dispose();
            return;
        }
    }

    if (!cm.isLeader()) {
        cm.sendOk("Jesus... good luck with this fella, let me tell ya.\r\n\r\nHe is one big, mean tub of timefluff.");
        cm.dispose();
        return;
    }

    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (p.getMapId() === 922010900) {
        if (p.getItemQuantity(keyOfDim, false) >= keyOfDimNeeded) {
            jsArray(p.getMap().getCharacters())
                .forEach(player =>
                    MapleInventoryManipulator.removeAllById(
                        player.getClient(),
                        keyOfDim,
                        false
                    )
                );

            jsArray(p.getMap().getCharacters())
                .forEach(player =>
                    MapleInventoryManipulator.removeAllById(
                        player.getClient(),
                        passOfDim,
                        false
                    )
                );

            map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
            map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
            map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));

            eim.setProperty("9stageclear", "true");

            cm.givePartyExp(exp, eim.getPlayers());

            cm.dispose();
            return;
        } else {
            cm.sendOk("Jesus... good luck with this fella, let me tell ya.\r\n\r\nHe is one big, mean tub of timefluff.");
            cm.dispose();
            return;
        }
    } else {
        cm.sendOk("Report this to a GM.");
        cm.dispose();
        return;
    }
}
