/*
 * Orange Balloon
 * LPQ NPC
 * ID: 2040037
 */

"use strict";

const MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
const MaplePacketCreator        = Java.type("net.sf.odinms.tools.MaplePacketCreator");

let status;
const passOfDim = 4001022;
const passOfDimNeeded = 15;
const exp = 2520;

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

    if ("" + eim.getProperty("2stageclear") === "true") {
        cm.sendOk("Woohoo! Go team!");
        cm.dispose();
        return;
    }

    if (!cm.isLeader()) {
        cm.sendOk("Hey, kid. You're lookin' kinda blue.\r\n\r\nOr maybe I'm just really orange.");
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
        case 922010200: {
            switch (status) {
                case 0: {
                    if (p.getItemQuantity(passOfDim, false) >= passOfDimNeeded) {
                        cm.sendNext("Wow! Dimension tickets!\r\n\r\nI #eCOULD#n take you up the tower with these, if you wanted.");
                    } else {
                        cm.sendOk(`Tickets! I need #r${passOfDimNeeded}#k!`);
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

                    eim.setProperty("2stageclear", "true");

                    const portal = eim.getMapInstance(p.getMapId() + 100).getPortal("next00");

                    if (portal) {
                        portal.setScriptName("lpq3");
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
