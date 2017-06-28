/*
 * SCPQ script, map ID: 5009
 * The Ballroom
 */

"use strict";

const MapleLifeFactory    = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
const MapleMonsterStats   = Java.type("net.sf.odinms.server.life.MapleMonsterStats");
const MapleReactor        = Java.type("net.sf.odinms.server.maps.MapleReactor");
const MapleReactorFactory = Java.type("net.sf.odinms.server.maps.MapleReactorFactory");
const Point               = Java.type("java.awt.Point");
const Rectangle           = Java.type("java.awt.Rectangle");
const TimerManager        = Java.type("net.sf.odinms.server.TimerManager");

const memoryMonk = 8200001;
const sophiliaDoll = 9400559;
const monsterSpawnDuration = 2 * 60 * 1000;
const reactorId = 9208000;
const reactorPositions =
[
    new Point(-468, -73), new Point(-47, -73),
    new Point(466, -73),  new Point(811, -73)
];
const reactors = [];
const spawnArea = new Rectangle(-556, -80, 1326, 5); // x, y, width, height
let tMan, statueTask, debuffCycleCount;

const rms = a => Math.sqrt(
    a.reduce((accu, x) => accu + x * x, 0) / a.length
);

function init() {
    // Removing all reactors just in case there was a messy dispose last time
    const staleReactorIds = [];
    map.getAllReactors().forEach(r => staleReactorIds.push(r.getObjectId()));
    staleReactorIds.forEach(oid => map.removeReactor(oid));

    map.setDropsDisabled(true);

    tMan = TimerManager.getInstance();

    const playerLevels = [];
    pq.getPlayers().forEach(p => playerLevels.push(p.getLevel()));
    const rmsLevel = rms(playerLevels);
    const partySize = Math.max(playerLevels.length, 3);

    let mobId, spawnRate, overrideStats;
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
        const overrideHp = Math.floor(10 * rmsLevel * rmsLevel - 60 * Math.pow(rmsLevel - 5, 1.5) + 20000);
        overrideStats.setHp(overrideHp);
        overrideStats.setMp(1000);
    }

    map.registerDynamicSpawnWorker(
        mobId,
        spawnArea,
        spawnRate,
        monsterSpawnDuration,
        false,
        0,
        overrideStats
    ).start();

    let toSpawn;
    const initSpawnCount = Math.floor(50000 / spawnRate);
    for (let i = 0; i < initSpawnCount; ++i) {
        const x = Math.floor(spawnArea.x + Math.random() * (spawnArea.getWidth() + 1));
        const y = Math.floor(spawnArea.y + Math.random() * (spawnArea.getHeight() + 1));
        toSpawn = MapleLifeFactory.getMonster(mobId);
        toSpawn.setPosition(new Point(x, y - 1));
        map.spawnMonster(toSpawn);
    }

    reactorPositions.forEach(pos => {
        const r = new MapleReactor(MapleReactorFactory.getReactor(reactorId), reactorId);
        r.setDelay(16 * 1000);
        r.setPosition(pos);
        map.spawnReactor(r);
        reactors.push(r);
    });

    const statueTaskRepeatTime = Math.floor(72 / partySize) * 1000;
    debuffCycleCount = 0;
    statueTask = tMan.register(() => {
        const reactorsDestroyed = reactorPositions.length - map.reactorCount();
        if (reactorsDestroyed < Math.min(2 + debuffCycleCount / 2, 4)) {
            mi.getPlayers().forEach(p => {
                p.dropMessage("The statues in this room exert a strange force over you, crippling your mind.");
                p.giveDebuff(128, 6, 2 * 1000); // Seduce
                p.giveDebuff(120, 12, 12 * 1000 - 100); // Seal
            });
            tMan.schedule(
                () =>
                    mi.getPlayers().forEach(p =>
                        p.giveDebuff(121, 8, 10 * 1000) // Darkness
                    ),
                2 * 1000 + 100
            );
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
    reactors.forEach(r => map.removeReactor(r.getObjectId()));
    reactors.length = 0;

    cancelStatueTask();
    statueTask = null;

    map.disposeAllDynamicSpawnWorkers();

    pq.getPlayers().forEach(p => {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.killAllMonsters(false);
    map.clearDrops();
}
