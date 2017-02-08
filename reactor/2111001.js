/*
 * 2111001.js: Zakum Altar | Summons Zakum.
 * 
 * Note that Zakum is currently spawned body + 8 arms at once, with no special handling for the body
 * before the arms are defeated. Use caution.
 */

function act() {
    /*
    if (rm.getReactor().getMap().getId() === 910000000) {
        if (rm.getPlayer().getClan !== -1) {
            
        }
    } else {*/
        rm.closeDoor(211042300);
        rm.closePortal(211042300, "sp");
        rm.changeMusic("Bgm06/FinalFight");
        rm.spawnFakeMonster(8800000);
        for (var i = 8800003; i <= 8800010; ++i) {
            rm.spawnMonster(i);
        }
        rm.createMapMonitor(211042300, "sp");
        rm.mapMessage("Zakum is summoned by the force of Eye of Fire.");
    //}
}
