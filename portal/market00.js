/*
 * Return from Free Market Script
 */

var SavedLocationType = Java.type("net.sf.odinms.server.maps.SavedLocationType");

function enter(pi) {
    var returnMap = pi.getPlayer().getSavedLocation(SavedLocationType.FREE_MARKET);
    if (returnMap < 0) {
        returnMap = 100000000; // To fix people who entered the fm trough an unconventional way
    }
    var target = pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(returnMap);
    var targetPortal;

    if (returnMap == 230000000) {
        targetPortal = target.getPortal("market01");
    } else {
        targetPortal = target.getPortal("market00");
    }

    if (targetPortal === null) {
        targetPortal = target.getPortal(0);
    }
    
    if (pi.getPlayer().getMapId() !== target) {
        pi.getPlayer().clearSavedLocation(SavedLocationType.FREE_MARKET);
        pi.getPlayer().changeMap(target, targetPortal);
        return true;
    }
    return false;
}
