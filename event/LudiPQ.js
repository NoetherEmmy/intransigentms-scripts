/*
 * Ludi PQ
 */

/*
INSERT INTO monsterdrops
(monsterid, itemid, chance)
VALUES
(9300005, 4001022, 5),
(9300006, 4001022, 4),
(9300007, 4001022, 1),
(9300136, 4001022, 1),
(9300012, 4001023, 1);
*/

"use strict";

let exitMap;

function init() {
    exitMap = em.getChannelServer().getMapFactory().getMap(922010000);
    em.setProperty("LudiPQOpen", "true");
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    const eim = em.newInstance("LudiPQ");
    const pqTime = 60 * 60 * 1000; // 60 minutes
    eim.startEventTimer(pqTime);

    const firstPortal = eim.getMapInstance(922010100).getPortal("next00");
    firstPortal.setScriptName("lpq1");
    em.schedule("timeOut", eim, pqTime);

    return eim;
}

function playerEntry(eim, player) {
    const map = eim.getMapInstance(922010100);
    player.changeMap(map, map.getPortal(0));
}

function playerDead(eim, player) {
}

function playerDisconnected(eim, player) {
    if (eim.isLeader(player)) {
        const party = eim.getPlayers();
        for (let i = 0; i < party.size(); ++i) {
            if (party.get(i).equals(player)) {
                removePlayer(eim, player);
            } else {
                playerExit(eim, party.get(i));
            }
        }
        eim.dispose();
    } else { // Not leader
        removePlayer(eim, player);
    }
}

function leftParty(eim, player) {
    playerExit(eim, player);
}

function disbandParty(eim) {
    // Boot whole party and end
    const party = eim.getPlayers();
    for (let i = 0; i < party.size(); ++i) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
}


function playerFinish(eim, player) {
    const map = eim.getMapInstance(922011100);
    player.changeMap(map, map.getPortal(0));
}

// For offline players
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    const party = eim.getPlayers();
    for (let i = 0; i < party.size(); ++i) {
        playerFinish(eim, party.get(i));
    }
    eim.dispose();
}

function allMonstersDead(eim) {
    // Do nothing; LPQ has nothing to do with monster killing
}

function cancelSchedule() {
}

function timeOut(eim) {
    if (eim) {
        if (eim.getPlayerCount() > 0) {
            const pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                playerExit(eim, pIter.next());
            }
        }
        eim.dispose();
    }
}

 function playerRevive(eim, player) {
     if (eim.isLeader(player)) { // Check for party leader
        const party = eim.getPlayers();
        for (let i = 0; i < party.size(); ++i) {
            playerExit(eim, party.get(i));
        }
        eim.dispose();
    } else {
        playerExit(eim, player);
    }
}

function startBonus(eim) {
    if (eim) {
        if (eim.getPlayerCount() > 0) {
            const pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                if (pIter.next().getMap().getId() === 922011000) {
                    playerFinish(eim, pIter.next());
                }
            }
        }
    }
}

function dispose() {
    em.schedule("LudiPQOpen1", 10 * 1000);
}

function LudiPQOpen1() {
    em.setProperty("LudiPQOpen", "true");
}
