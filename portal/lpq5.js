/*
 * Ludi PQ: portal from 5th stage to 6th stage
 */

"use strict";

const MapleInventoryManipulator    = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
const MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");

const passOfDim = 4001022;

function enter(pi) {
    const ii = MapleItemInformationProvider.getInstance();
    const eim = pi.getPlayer().getEventInstance();
    const target = eim.getMapInstance(922010600);
    if (eim.getProperty("5stageclear") !== null) {
        const qty = pi.getPlayer().getItemQuantity(passOfDim, false);
        if (qty > 0) {
            MapleInventoryManipulator.removeById(
                pi.getClient(),
                ii.getInventoryType(passOfDim),
                passOfDim,
                qty,
                true,
                false
            );
        }
        pi.getPlayer().changeMap(target, target.getPortal("st00"));
        return true;
    } else {
        return false;
    }
}
