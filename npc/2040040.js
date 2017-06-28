/*
 * Green Balloon
 * LPQ NPC
 * ID: 2040040
 */

"use strict";

const MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
const MaplePacketCreator        = Java.type("net.sf.odinms.tools.MaplePacketCreator");

let status;
const passOfDim = 4001022;
const passOfDimNeeded = 24;
const exp = 3770;

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

    if ("" + eim.getProperty("5stageclear") === "true") {
        cm.sendOk("Ooooh honey, you best get going!\r\n\r\nAlishar waits for no one, sweetheart!");
        cm.dispose();
        return;
    }

    if (!cm.isLeader()) {
        cm.sendOk("Hey, kid. You're lookin' kinda blue.\r\n\r\nOr maybe I'm just really green.");
        cm.dispose();
        return;
    }

    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    switch (p.getMapId()) {
        case 922010500: {
            switch (status) {
                case 0: {
                    if (p.getItemQuantity(passOfDim, false) >= passOfDimNeeded) {
                        cm.sendNext("Mmmmmmmhmmm, you know das what I like.\r\n\r\nGimme them passes, darlin'.");
                    } else {
                        cm.sendOk(`Ya got my passes, darlin'? I need #r${passOfDimNeeded}#k of 'em.`);
                        cm.dispose();
                        return;
                    }
                    break;
                }
                case 1: {
                    jsArray(p.getMap().getCharacters())
                        .forEach(player =>
                            MapleInventoryManipulator.removeAllById(
                                player.getClient(),
                                passOfDim,
                                false
                            )
                        );

                    const map = eim.getMapInstance(p.getMapId());

                    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
                    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
                    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));

                    eim.setProperty("5stageclear", "true");

                    const portal = eim.getMapInstance(p.getMapId() + 100).getPortal("next00");

                    if (portal) {
                        portal.setScriptName("lpq6");
                    }

                    cm.givePartyExp(exp, eim.getPlayers());

                    cm.dispose();
                    return;
                }
            }
            break;
        }
        default:
            cm.sendOk("Report this to a GM.");
            cm.dispose();
            return;
    }
}
