/*
 * Portal name: exit00
 * From Ventilation Opening (5002) to Ventilation Main Chamber (5003)
 *
 * Sous Chef PQ
 */

function enter(pi) {
    var p = pi.getPlayer();
    var map = p.getClient().getChannelServer().getMapFactory().getMap(5002);
    var to = p.getClient().getChannelServer().getMapFactory().getMap(5003);
    var pq = p.getPartyQuest();

    if (pq.getMapInstance(to) === null) {
        pq.registerMap(to);
    }

    pi.warp(to.getId());

    if (map.playerCount() === 0) {
        pq.unregisterMap(map);
    }
    return true;
}
