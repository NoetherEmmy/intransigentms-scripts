/*
 * SCPQ script, map ID: 5009
 * The Ballroom
 */

var JavaMath            = Java.type("java.lang.Math");
var MapleLifeFactory    = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
var MapleMonsterStats   = Java.type("net.sf.odinms.server.life.MapleMonsterStats");
var MapleReactor        = Java.type("net.sf.odinms.server.maps.MapleReactor");
var MapleReactorFactory = Java.type("net.sf.odinms.server.maps.MapleReactorFactory");
var Point               = Java.type("java.awt.Point");
var Rectangle           = Java.type("java.awt.Rectangle");
var TimerManager        = Java.type("net.sf.odinms.server.TimerManager");

var memoryMonk = 8200001;
var sophiliaDoll = 9400559;
var monsterSpawnDuration = 2 * 60 * 1000;
var reactorId = 9208000;
var reactorPositions =
[
    new Point(-468, -73), new Point(-47, -73),
    new Point(466, -73),  new Point(811, -73)
];
var reactors = [];
var spawnArea = new Rectangle(-556, -80, 1326, 5); // x, y, width, height
var tMan, statueTask, debuffCycleCount;

Array.prototype.fisherYates = function() {
    for (var i = this.length - 1; i > 0; --i) {
        var swapIndex = Math.floor(JavaMath.random() * (i + 1));
        var temp = this[swapIndex];
        this[swapIndex] = this[i];
        this[i] = temp;
    }
};

function rms(a) {
    return Math.sqrt(a.reduce(function(accu, x) {
        return accu + x * x;
    }, 0) / a.length);
}

function init() {
    // Removing all reactors just in case there was a messy dispose last time
    var staleReactorIds = [];
    map.getAllReactors().forEach(function(r) {
        staleReactorIds.push(r.getObjectId());
    });
    staleReactorIds.forEach(function(oid) {
        map.removeReactor(oid);
    });

    map.setDropsDisabled(true);

    tMan = TimerManager.getInstance();

    var playerLevels = [];
    pq.getPlayers().forEach(function(p) {
        playerLevels.push(p.getLevel());
    });
    var rmsLevel = rms(playerLevels);
    var partySize = Math.max(playerLevels.length, 3);

    var mobId, spawnRate, overrideStats;
    if (rmsLevel < 80) {
        mobId = sophiliaDoll;
        spawnRate = Math.floor(5 * 1000 / (partySize / 3));
        mi.setLevelLimit(35);
        overrideStats = null;
    } else {
        mobId = memoryMonk;
        spawnRate = Math.floor(6 * 1000 / (partySize / 3));
        mi.setLevelLimit(75);
        overrideStats = new MapleMonsterStats();
        var overrideHp = Math.floor(10 * rmsLevel * rmsLevel - 60 * Math.pow(rmsLevel - 5, 1.5) + 20000);
        overrideStats.setHp(overrideHp);
        overrideStats.setMp(1000);
    }

    map.registerDynamicSpawnWorker(mobId, spawnArea, spawnRate, monsterSpawnDuration, false, 0, overrideStats).start();

    var toSpawn;
    var initSpawnCount = Math.floor(50000 / spawnRate);
    for (var i = 0; i < initSpawnCount; ++i) {
        var x = Math.floor(spawnArea.x + JavaMath.random() * (spawnArea.getWidth() + 1));
        var y = Math.floor(spawnArea.y + JavaMath.random() * (spawnArea.getHeight() + 1));
        toSpawn = MapleLifeFactory.getMonster(mobId);
        toSpawn.setPosition(new Point(x, y - 1));
        map.spawnMonster(toSpawn);
    }

    reactorPositions.forEach(function(pos) {
        var r = new MapleReactor(MapleReactorFactory.getReactor(reactorId), reactorId);
        r.setDelay(16 * 1000);
        r.setPosition(pos);
        map.spawnReactor(r);
        reactors.push(r);
    });

    var statueTaskRepeatTime = Math.floor(72 / partySize) * 1000;
    debuffCycleCount = 0;
    statueTask = tMan.register(function() {
        var reactorsDestroyed = reactorPositions.length - map.reactorCount();
        if (reactorsDestroyed < Math.min(2 + debuffCycleCount / 2, 4)) {
            mi.getPlayers().forEach(function(p) {
                p.dropMessage("The statues in this room exert a strange force over you, crippling your mind.");
                p.giveDebuff(128, 6, 2 * 1000); // Seduce
                p.giveDebuff(120, 12, 12 * 1000 - 100); // Seal
            });
            tMan.schedule(function() {
                mi.getPlayers().forEach(function(p) {
                    p.giveDebuff(121, 8, 10 * 1000); // Darkness
                });
            }, 2 * 1000 + 100);
        }
        debuffCycleCount++;
    }, statueTaskRepeatTime, statueTaskRepeatTime);
}

function mobKilled(mob, attacker) {
    if (mob.getId() === memoryMonk) {
        pq.addPoints(18);
    } else if (mob.getId() === sophiliaDoll) {
        pq.addPoints(12);
    }
}

function cancelStatueTask() {
    try {
        statueTask.cancel(false);
    } catch (e) {
        print(e);
    }
}

function dispose() {
    reactors.forEach(function(r) {
        map.removeReactor(r.getObjectId());
    });
    reactors.length = 0;

    cancelStatueTask();
    statueTask = null;

    map.disposeAllDynamicSpawnWorkers();

    pq.getPlayers().forEach(function(p) {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.killAllMonsters(false);
    map.clearDrops();
}
