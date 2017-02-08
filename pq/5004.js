/*
 * SCPQ script, map ID: 5004
 * Gala Main Room
 */

var MapleLifeFactory  = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
var MapleMonsterStats = Java.type("net.sf.odinms.server.life.MapleMonsterStats");
var NPCScriptManager  = Java.type("net.sf.odinms.scripting.npc.NPCScriptManager");
var TimerManager      = Java.type("net.sf.odinms.server.TimerManager");

var tMan = TimerManager.getInstance();
var periodicStuns = {};
var dialogueSchedule;

function init() {
    mi.setLevelLimit(48);

    var msg = "The main chamber of the gala is an expansive 3 floors, with giant ceilings, furniture, and people in expensive clothes everywhere. The air hums with the sound of schmoozing and delicate food-eating.";
    if ("" + mi.getPlayerProperty(pq.getLeader(), "enteredFrom") === "vent") {
        msg = "Having safely navigated the vents, you and your party sneak in through the library and find yourselves in the main chamber. " + msg;
    }
    pq.getPlayers().forEach(function(p) { p.dropMessage(msg); });
}

function enemyDialogue() {
    dialogueSchedule = tMan.schedule(function() {
        var npcsm = NPCScriptManager.getInstance();
        /*
        pq.getPlayers().forEach(function(p) {
            if (p.getClient().getCM() !== null) {
                p.getClient().getCM().dispose();
            }
            npcsm.start(p.getClient(), 9901012);
        });
        */
        var leaderClient = pq.getLeader().getClient();
        if (leaderClient.getCM() !== null) {
            leaderClient.getCM().dispose();
        }
        npcsm.start(leaderClient, 9901012);
    }, 500);
}

function periodicStun(player, stunTime, period, duration) {
    var ps = [];
    var stunTask = tMan.register(function() {
        // Level 13 stun for stunTime milliseconds
        player.giveDebuff(123, 13, stunTime);
    }, period);
    var cancelTask = tMan.schedule(function() {
        stunTask.cancel(false);
    }, duration);

    ps.push(stunTask);
    ps.push(cancelTask);
    periodicStuns[player.getName()] = ps;
}

var combat = (function() {
    var hasStarted = false;

    return function(player) {
        mi.setPlayerPropertyIfNotSet(player, "combat", true);
        if (!hasStarted) {
            hasStarted = true;
            pq.getPlayers().forEach(function(p) {
                p.giveDebuff(121, 8,  30 * 1000); // Darkness, 30 sec.
                periodicStun(p, 1000, 5 * 1000, 30 * 1000);
            });

            var mobCount = pq.playerCount() * 2;
            var avgLevel = pq.getPlayers()
                             .stream()
                             .mapToInt(function(p) { return p.getLevel(); })
                             .sum() / pq.getPlayers().size();
            avgLevel = Math.round(avgLevel);
            var aHp = 5 * avgLevel * avgLevel + 2000;
            var dHp = 7 * avgLevel * avgLevel + 2000;

            for (var i = 0; i < mobCount; ++i) {
                var leaderA = MapleLifeFactory.getMonster(9400115);
                var extraD = MapleLifeFactory.getMonster(9400104);
                var leaderAOverride = new MapleMonsterStats();
                var extraDOverride = new MapleMonsterStats();

                leaderA.setHp(aHp);
                extraD.setHp(dHp);
                leaderAOverride.setHp(aHp);
                extraDOverride.setHp(dHp);
                leaderA.setOverrideStats(leaderAOverride);
                extraD.setOverrideStats(extraDOverride);

                var leaderAPos = player.getPosition();
                var extraDPos = player.getPosition();
                leaderAPos.translate(Math.floor(Math.random() * 350 + 50) * (Math.random() < 0.5 ? -1 : 1), 0);
                extraDPos.translate(Math.floor(Math.random() * 350 + 50) * (Math.random() < 0.5 ? -1 : 1), 0);
                mi.getMap().spawnMonsterOnGroundBelow(leaderA, leaderAPos);
                mi.getMap().spawnMonsterOnGroundBelow(extraD, extraDPos);
            }
        }
    };
})();

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
    pq.getPlayers().forEach(function(p) {
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

    for (var n in periodicStuns) {
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
