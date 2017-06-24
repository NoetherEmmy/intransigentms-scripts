/*
 * SCPQ script, map ID: 5012
 * The Backest Way
 */

"use strict";

// Math.cbrt polyfill
if (!Math.cbrt) {
    Math.cbrt = function(x) {
        const y = Math.pow(Math.abs(x), 1 / 3);
        return x < 0 ? -y : y;
    };
}

const Collectors        = Java.type("java.util.stream.Collectors");
const MapleLifeFactory  = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
const MapleMonsterStats = Java.type("net.sf.odinms.server.life.MapleMonsterStats");
const Point             = Java.type("java.awt.Point");
const Rectangle         = Java.type("java.awt.Rectangle");
const TimerManager      = Java.type("net.sf.odinms.server.TimerManager");

const anniversaryCake = 9400570;
const theChef = 9901023;
const cakeMob = 9400512;
const puffDaddies = [9400589, 9400590, 9400591];
let puffDaddy;
const spawnRate = 1000 + 500;
const spawnArea = new Rectangle(-103, -618, 2170, 20); // x, y, width, height
let tMan, mobCheckTask, mobsKilled, cakeKillTask;
let playerLevels, rmsLevel, cubemeanLevel, geomeanLevel, harmmeanLevel, partySize;

function rms(a) {
    return Math.sqrt(a.reduce(function(accu, x) {
        return accu + x * x;
    }, 0) / a.length);
}

function geomean(a) {
    return Math.pow(a.reduce(function(accu, x) {
        return accu * x;
    }), 1 / a.length);
}

function harmmean(a) {
	return a.length / a.reduce(function(accu, x) {
		return accu + 1 / x;
	}, 0);
}

function cubemean(a) {
	return Math.cbrt(a.reduce(function(accu, x) {
        return accu + x * x * x;
    }, 0) / a.length);
}

function init() {
    // Housekeeping
    map.setDropsDisabled(true);

    tMan = TimerManager.getInstance();

    // Getting player levels, avg player levels
    playerLevels = [];
    pq.getPlayers().forEach(function(p) {
        playerLevels.push(p.getLevel());
    });
    rmsLevel = rms(playerLevels);
    cubemeanLevel = cubemean(playerLevels);
    geomeanLevel = geomean(playerLevels);
    harmmeanLevel = harmmean(playerLevels);
    partySize = playerLevels.length;

    // Set the level limit to the geometric mean of party member levels
    mi.setLevelLimit(Math.ceil(geomeanLevel));
}

function startFight() {
    // Start spawning boss (Big Puff Daddy)
    if (rmsLevel <= 50) {
        puffDaddy = puffDaddies[0];
    } else if (rmsLevel <= 120) {
        puffDaddy = puffDaddies[1];
    } else {
        puffDaddy = puffDaddies[2];
    }
    const toSpawn = MapleLifeFactory.getMonster(puffDaddy);
    const puffDaddyOverride = new MapleMonsterStats();

    // Override stats
    // HP = floor(max(0, (rmsLevel - 80)^3) * 5 + 50 * partySize * rmsLevel^2 - 1000 * (rmsLevel - 5)^1.5) + 1000
    const puffDaddyHp = Math.floor(50 * partySize * cubemeanLevel * cubemeanLevel - 1000 * Math.pow(cubemeanLevel - 5, 1.5) + 1000 + Math.max(0, Math.pow(cubemeanLevel - 80, 3)) * 5);
    toSpawn.setHp(puffDaddyHp);
    puffDaddyOverride.setHp(puffDaddyHp);

    // Exp
    //var xpToLv = ExpTable.getExpNeededForLevel(Math.floor(harmmeanLevel));

    //var puffDaddyExp = Math.floor((xpToLv / 2) / (Math.floor(harmmeanLevel) / 10));
    const puffDaddyExp = 0;
    puffDaddyOverride.setExp(puffDaddyExp);

    // Apply override stats
    toSpawn.setOverrideStats(puffDaddyOverride);

    // Get position relative to The Chef
    const chefPos = map.getNPCById(theChef).getPosition();
    const spawnPos = new Point(chefPos.x + 50, chefPos.y - 75);
    //toSpawn.setPosition(spawnPos);
    // Spawn!
    map.spawnMonsterOnGroundBelow(toSpawn, spawnPos);

    // Start regularly spawning trash mobs
    map.registerDynamicSpawnWorker(anniversaryCake, spawnArea, spawnRate).start();
    map.registerDynamicSpawnWorker(cakeMob, spawnArea, spawnRate).start();

    // Start task for checking how often trash mobs are killed and debuff accordingly
    mobsKilled = 0;
    mobCheckTask = tMan.register(function() {
        if (mobsKilled < 1.5 * partySize + 1) {
            pq.getPlayers().forEach(function(player) {
                player.giveDebuff(120, 12, 9 * 1000); // Seal
                player.giveDebuff(128, 6, 3 * 1000); // Seduce
            });
            tMan.schedule(function() {
                pq.getPlayers().forEach(function(player) {
                    player.giveDebuff(123, 13, 2 * 1000); // Stun
                });
            }, 3 * 1000 + 100);
        } else if (mobsKilled < 2 * partySize + 1) {
            pq.getPlayers().forEach(function(player) {
                player.giveDebuff(120, 12, 6 * 1000); // Seal
                player.giveDebuff(123, 13, 3 * 1000); // Stun
            });
        } else if (mobsKilled < 2.5 * partySize + 1) {
            pq.getPlayers().forEach(function(player) {
                player.giveDebuff(121, 8, 9 * 1000); // Darkness
                player.giveDebuff(120, 12, 3 * 1000); // Seal
            });
        } else if (mobsKilled < 3 * partySize + 1) {
            pq.getPlayers().forEach(function(player) {
                player.giveDebuff(120, 12, 3 * 1000); // Seal
            });
        }
        mobsKilled = 0;
    }, 10 * 1000, 10 * 1000);

    cakeKillTask = tMan.register(function() {
        const mobs =
            map.getAllMonsters()
               .stream()
               .filter(function(m) {
                   return m.getId() !== puffDaddy;
               }).collect(Collectors.toList());

        let mobCount = mobs.size();
        let i = 0;
        while (mobCount > 65) {
            map.silentKillMonster(mobs.get(i).getObjectId());
            mobCount--;
            i++;
        }
    }, 3 * 1000, 30 * 1000);

    mi.setPropertyForAll("startedFight", true);
}

function mobKilled(mob, attacker) {
    if (mob.getId() === puffDaddy) {
        mobCheckTask.cancel(false);
        mobCheckTask = null;
        map.disposeAllDynamicSpawnWorkers();
        map.killAllMonsters(false);
        cakeKillTask.cancel(false);
        cakeKillTask = null;

        mi.setPropertyForAll("endedFight", true);
    } else if (attacker) {
        mobsKilled++;
    }
}

function dispose() {
    if (mobCheckTask) {
        mobCheckTask.cancel(false);
        mobCheckTask = null;
    }

    if (cakeKillTask) {
        cakeKillTask.cancel(false);
        cakeKillTask = null;
    }

    map.disposeAllDynamicSpawnWorkers();

    map.killAllMonsters(false);
    map.clearDrops();
}
