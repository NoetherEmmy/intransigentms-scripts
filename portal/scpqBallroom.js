/*
 * Portal name: sp00
 * From The Ballroom (5009) to Es Car Go, Go, Go! (5010)
 *
 * Sous Chef PQ
 */

var PartyQuest   = Java.type("net.sf.odinms.net.channel.PartyQuest");
var TimerManager = Java.type("net.sf.odinms.server.TimerManager");

function enter(pi) {
    var p = pi.getPlayer();
    var map = p.getClient().getChannelServer().getMapFactory().getMap(5009);
    var to = p.getClient().getChannelServer().getMapFactory().getMap(5010);
    var pq = p.getPartyQuest();
    var tMan = TimerManager.getInstance();
    
    if (map.dynamicSpawnWorkerCount() === 0 && map.mobCount() === 0) {
        if (pq === null) {
            print("pq === null in scpqBallroom.js");
            return false;
        }
        pq.getMapInstance(map).invokeMethod("cancelStatueTask");

        if (pq.getMapInstance(to) === null) {
            pq.registerMap(to);
        }

        pi.warp(to.getId());
        p.dropMessage("You find your way out of the ballroom in the direction that The Chef went, unsure what to expect.");
        p.dropMessage("Somehow, you still manage to be surprised -- this room appears to be a series of precarious ledges, and small green snails are raining from the ceiling everywhere. Is this room always like this?");

        if (map.playerCount() === 0) {
            pq.unregisterMap(map);
        } else {
            tMan.schedule(function() {
                if (map.playerCount() === 0) {
                    pq.unregisterMap(map);
                }
            }, 5 * 1000);
        }
        return true;
    }
    return false;
}
