/*
 * from Ruins of Krexel I  (541020700)
 * to   Ruins of Krexel II (541020800)
 *
 * Name: boss00
 * ID: 6
 */

function enter(pi) {
	var to = pi.getClient()
	           .getChannelServer()
	           .getMapFactory()
	           .getMap(541020800);
    if (to.playerCount() < 1) {
    	to.resetReactors();
    	to.killAllMonsters(false);
    	to.clearDrops();
    }
    pi.warp(541020800);
    return true;
}
