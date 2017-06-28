/*
 * SCPQ script, map ID: 5004
 * Gala Main Room
 */

"use strict";

const MapleLifeFactory  = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
const MapleMonsterStats = Java.type("net.sf.odinms.server.life.MapleMonsterStats");
const NPCScriptManager  = Java.type("net.sf.odinms.scripting.npc.NPCScriptManager");
const TimerManager      = Java.type("net.sf.odinms.server.TimerManager");

const tMan = TimerManager.getInstance();
const periodicStuns = {};
let dialogueSchedule;
let hasStarted = false;

function init() {
    mi.setLevelLimit(48);

    let msg = "The main chamber of the gala is an expansive 3 floors, with giant ceilings, furniture, and people in expensive clothes everywhere. The air hums with the sound of schmoozing and delicate food-eating.";
    if ("" + mi.getPlayerProperty(pq.getLeader(), "enteredFrom") === "vent") {
        msg = "Having safely navigated the vents, you and your party sneak in through the library and find yourselves in the main chamber. " + msg;
    }
    pq.getPlayers().forEach(p => p.dropMessage(msg));
}

function enemyDialogue() {
    dialogueSchedule = tMan.schedule(() => {
        const npcsm = NPCScriptManager.getInstance();
        /*
        pq.getPlayers().forEach(function(p) {
            if (p.getClient().getCM() !== null) {
                p.getClient().getCM().dispose();
            }
            npcsm.start(p.getClient(), 9901012);
        });
        */
        const leaderClient = pq.getLeader().getClient();
        if (leaderClient.getCM() !== null) {
            leaderClient.getCM().dispose();
        }
        npcsm.start(leaderClient, 9901012);
    }, 5 * 100);
}

function periodicStun(player, stunTime, period, duration) {
    const ps = [];
    const stunTask = tMan.register(
        // Level 13 stun for stunTime milliseconds
        () => player.giveDebuff(123, 13, stunTime),
        period
    );
    const cancelTask = tMan.schedule(
        () => stunTask.cancel(false),
        duration
    );

    ps.push(stunTask);
    ps.push(cancelTask);
    periodicStuns[player.getName()] = ps;
}

function combat(player) {
    mi.setPlayerPropertyIfNotSet(player, "combat", true);
    if (!hasStarted) {
        hasStarted = true;
        pq.getPlayers().forEach(p => {
            p.giveDebuff(121, 8,  30 * 1000); // Darkness, 30 sec.
            periodicStun(p, 1000, 5 * 1000, 30 * 1000);
        });

        const mobCount = pq.playerCount() * 2;
        const avgLevel =
            Math.round(
                pq.getPlayers()
                  .stream()
                  .mapToInt(p => p.getLevel())
                  .sum() / pq.getPlayers().size()
            );
        const aHp = 5 * avgLevel * avgLevel + 2000;
        const dHp = 7 * avgLevel * avgLevel + 2000;

        for (let i = 0; i < mobCount; ++i) {
            const leaderA = MapleLifeFactory.getMonster(9400115);
            const extraD = MapleLifeFactory.getMonster(9400104);
            const leaderAOverride = new MapleMonsterStats();
            const extraDOverride = new MapleMonsterStats();

            leaderA.setHp(aHp);
            extraD.setHp(dHp);
            leaderAOverride.setHp(aHp);
            extraDOverride.setHp(dHp);
            leaderA.setOverrideStats(leaderAOverride);
            extraD.setOverrideStats(extraDOverride);

            const leaderAPos = player.getPosition();
            const extraDPos = player.getPosition();
            leaderAPos.translate(Math.floor(Math.random() * 350 + 50) * (Math.random() < 0.5 ? -1 : 1), 0);
            extraDPos.translate(Math.floor(Math.random() * 350 + 50) * (Math.random() < 0.5 ? -1 : 1), 0);
            mi.getMap().spawnMonsterOnGroundBelow(leaderA, leaderAPos);
            mi.getMap().spawnMonsterOnGroundBelow(extraD, extraDPos);
        }
    }
}

function mobKilled(mob, killer) {
    pq.addPoints(18);
}

function playerDead(player) {
    if (player.getName() in periodicStuns) {
        periodicStuns[player.getName()][0].cancel(false);
        periodicStuns[player.getName()][1].cancel(false);
        periodicStuns[player.getName()].length = 0;
        delete periodicStuns[player.getName()];
    }
}

function dispose() {
    pq.getPlayers().forEach(p => {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }

        if (p.getName() in periodicStuns) {
            periodicStuns[p.getName()][0].cancel(false);
            periodicStuns[p.getName()][1].cancel(false);
            periodicStuns[p.getName()].length = 0;
            delete periodicStuns[p.getName()];
        }
    });

    for (const n in periodicStuns) {
        if (periodicStuns.hasOwnProperty(n) && periodicStuns[n].length === 2) {
            periodicStuns[n][0].cancel(false);
            periodicStuns[n][1].cancel(false);
            periodicStuns[n].length = 0;
            delete periodicStuns[n];
        }
    }

    map.killAllMonsters(false);
    map.clearDrops();
}
