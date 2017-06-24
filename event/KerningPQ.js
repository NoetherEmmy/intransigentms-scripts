/*
 * Kerning PQ
 */

/*
INSERT INTO monsterdrops
(monsterid, itemid, chance)
VALUES
(9300001, 4001007, 5),
(9300000, 4001008, 1),
(9300002, 4001008, 1),
(9300003, 4001008, 1);
*/

"use strict";

let exitMap, instanceId;
const minPlayers = 3;

function init() { // Initial loading
    exitMap = em.getChannelServer().getMapFactory().getMap(103000890);
    em.setProperty("KPQOpen", "true"); // Allows entrance
    em.setProperty("shuffleReactors", "true");
    instanceId = 1;
}

function monsterValue(eim, mobId) { // Killed monster
    return 1; // Returns an amount to add onto kill count
}

function setup() { // Invoked from "EventManager.startInstance()"
    const eim = em.newInstance("KerningPQ"); // Adds a new instance and returns EventInstanceManager
    const eventTime = 30 * 60 * 1000; // 30 mins
    const firstPortal = eim.getMapInstance(103000800).getPortal("next00");
    firstPortal.setScriptName("kpq0");
    em.schedule("timeOut", eim, eventTime); // Invokes "timeOut" in how ever many seconds
    eim.startEventTimer(eventTime); // Sends a clock packet and tags a timer to the players
    return eim; // Returns the new instance
}

function playerEntry(eim, player) { // This gets looped for every player in the party
    const map = eim.getMapInstance(103000800);
    player.changeMap(map, map.getPortal(0)); // We're now in KPQ :D
}

function playerDead(eim, player) {
    eim.unregisterPlayer(player);
}

function playerRevive(eim, player) { // Player presses OK on the death pop up
}

function playerDisconnected(eim, player) {
    const party = eim.getPlayers();
    if (eim.isLeader(player) || party.size() < minPlayers) { // Check for party leader or party size less than minimum players.
        // Boot whole party and end
        for (let i = 0; i < party.size(); ++i) {
            if (party.get(i).equals(player)) {
                removePlayer(eim, player); // Sets map only. Cant possible changeMap because player is offline.
            } else {
                playerExit(eim, party.get(i)); // Removes all other characters from the instance.
            }
        }
        eim.dispose();
    } else { // Not leader
        removePlayer(eim, player); // Sets map only. Cant possible changeMap because player is offline.
    }
}

function leftParty(eim, player) {
    const party = eim.getPlayers();
    if (party.size() < minPlayers) {
        for (let i = 0; i < party.size(); ++i) {
            playerExit(eim,party.get(i));
        }
        eim.dispose();
    } else {
        playerExit(eim, player);
    }
}

function disbandParty(eim) {
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

function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    // KPQ does nothing special with winners
    const party = eim.getPlayers();
    for (let i = 0; i < party.size(); ++i) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}

function dispose() {
    em.schedule("OpenKPQ", 5 * 1000); // 5 seconds?
}

function OpenKPQ() {
    em.setProperty("KPQOpen", "true");
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
