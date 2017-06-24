/*
 * Sky-Blue Balloon
 * LPQ NPC
 * ID: 2040042
 */

"use strict";

const MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
const MaplePacketCreator        = Java.type("net.sf.odinms.tools.MaplePacketCreator");

let status;
const passOfDim = 4001022;
const passOfDimNeeded = 3;
const exp = 4620;

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

    if ("" + eim.getProperty("7stageclear") === "true") {
        cm.sendOk("#esniffle#n\r\n\r\nBye.");
        cm.dispose();
        return;
    }

    if (!cm.isLeader()) {
        cm.sendOk("Hey, kid. You're lookin' kinda blue.\r\n\r\nSame.");
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
        case 922010700: {
            switch (status) {
                case 0: {
                    if (p.getItemQuantity(passOfDim, false) >= passOfDimNeeded) {
                        cm.sendNext("#esigh#n\r\n\r\nOk... leave me now.");
                    } else {
                        cm.sendOk(`Do... do you have the things? Or?\r\n\r\n#esniffle#n\r\n\r\nI need #r${passOfDimNeeded}#k passes, or something. I don't know.`);
                        cm.dispose();
                        return;
                    }
                    break;
                }
                case 1: {
                    jsArray(p.getMap().getCharacters())
                        .forEach(function(player) {
                            MapleInventoryManipulator.removeAllById(
                                player.getClient(),
                                passOfDim,
                                false
                            );
                        });

                    const map = eim.getMapInstance(p.getMapId());

                    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
                    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
                    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));

                    eim.setProperty("7stageclear", "true");

                    const portal = eim.getMapInstance(p.getMapId() + 100).getPortal("next00");

                    if (portal) {
                        portal.setScriptName("lpq8");
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
