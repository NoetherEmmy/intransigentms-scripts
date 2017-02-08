load('nashorn:mozilla_compat.js');
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Nella - Hidden Street : 1st Accompaniment
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
	
    var mapId = cm.getPlayer().getMapId();
    if (mapId == 103000890) {
        if (status == 0) {
            cm.sendNext("See you next time.");
        } else {
            cm.warp(103000000);
            cm.removeAll(4001007);
            cm.removeAll(4001008);
            cm.dispose();
			return;
        }
    } else {
        if (status == 0) {
            var outText = "Once you leave the map, you'll have to restart the whole quest if you want to try it again.  Do you still want to leave this map?";
            if (mapId == 103000805) {
                outText = "Are you ready to leave this map?";
            }
            cm.sendYesNo(outText);
        } else if (mode == 1) {
            var eim = cm.getChar().getEventInstance(); // Remove them from the PQ!
            if (eim == null) {
                cm.warp(103000890, "st00"); // Warp player
            } else if (cm.isLeader()) {
                eim.disbandParty();
            } else {
                eim.leftParty(cm.getPlayer());
			}
            cm.dispose();
			return;
        }
    }
}