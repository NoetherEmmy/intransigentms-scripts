/*
 * SCPQ script, map ID: 5010
 * Es Car Go, Go, Go!
 */

var ArrayList    = Java.type("java.util.ArrayList");
var Rectangle    = Java.type("java.awt.Rectangle");
//var TimerManager = Java.type("net.sf.odinms.server.TimerManager");

var greenSnail = 100102;
var spawnArea = new Rectangle(-1544, -600, 2483, 5); // x, y, width, height
var spawnRate = 750;
var fallenYThreshold = 190;
//var tMan, snailKillTask;

function init() {
    //tMan = TimerManager.getInstance();

    map.setDropsDisabled(true);

    mi.listenForPlayerMovement();

    map.registerDynamicSpawnWorker(greenSnail, spawnArea, spawnRate).start();
    
    /*
    snailKillTask = tMan.register(function() {
        var mobs = new ArrayList(map.getAllMonsters());
        var mobCount = mobs.size() + 0;
        var i = 0;
        while (mobCount > 50) {
            map.silentKillMonster(mobs.get(i).getObjectId());
            mobCount--;
            i++;
        }
    }, 3 * 1000, 15 * 1000);
    */
}

function heardPlayerMovement(player, position) {
    if (position.y >= fallenYThreshold) {
        player.changeMap(5010, 0);
    }
}

function dispose() {
    map.disposeAllDynamicSpawnWorkers();

    //snailKillTask.cancel(false);
    //snailKillTask = null;

    pq.getPlayers().forEach(function(p) {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.killAllMonsters(false);
    map.clearDrops();
}
