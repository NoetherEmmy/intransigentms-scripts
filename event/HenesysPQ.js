/*
 * Henesys PQ
 */

// Significant maps
//     100000200 - Pig Park
//     910010000 - 1st Stage
//     910010100 - Shortcut
//     910010200 - Bonus
//     910010300 - Exit
// Significant items
//     4001101 - Rice Cake
// Significant monsters
//     9300061 - Bunny
//     9300062 - Flyeye
//     9300063 - Stirge
//     9300064 - Goblin Fires
// Significant NPCs
//     1012112 - Troy
//     1012113 - Tommy
//     1012114 - Growlie
// Map effects
//     Map/Obj/Effect/quest/gate/3 - Warp activation glow
//     quest/party/clear - Clear text
//     Party1/Clear - Clear sound

/* INSERT INTO monsterdrops (monsterid, itemid, chance) VALUES (9300061, 4001101, 1);
 */

load('nashorn:mozilla_compat.js');
importPackage(Packages.net.sf.odinms.world);

var exitMap, instanceId;
var minPlayers = 3;
var pqTime = 600; // 10 Minutes

function init() {
    instanceId = 1;
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    exitMap = em.getChannelServer().getMapFactory().getMap(910010300); // <exit>
    var instanceName = "HenesysPQ" + instanceId;

    var eim = em.newInstance(instanceName);
    
    var mf = eim.getMapFactory();
    
    instanceId++;
    
    var map = mf.getMap(910010300);
    map.shuffleReactors();
    eim.addMapInstance(910010300,map);
    var firstPortal = eim.getMapInstance(910010000).getPortal("next00");
    firstPortal.setScriptName("hpq1");
    // No time limit yet unless it becomes necessary
    //em.schedule("timeOut", 10 * 20000);
    
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(910010300);
    player.changeMap(map, map.getPortal(0));
    
    // TODO: hold time across map changes
    //player.getClient().getSession().write(Packages.net.sf.odinms.tools.MaplePacketCreator.getClock(1800));
}

function playerDead(eim, player) {
    var party, i;
    if (player.isAlive()) { // Don't trigger on death, trigger on manual revive
        if (eim.isLeader(player)) { // Check for party leader
            // Boot whole party and end
            party = eim.getPlayers();
            for (i = 0; i < party.size(); i++) {
                playerExit(eim, party.get(i));
            }
            eim.dispose();
        } else { // Boot dead player
            // If only 2 players are left, uncompletable:
            party = eim.getPlayers();
            if (party.size() < minPlayers) { 
                for (i = 0; i < party.size(); i++) {
                    playerExit(eim,party.get(i));
                }
                eim.dispose();
            }
            else
                playerExit(eim, player);
        }
    }
}

function playerDisconnected(eim, player) {
    var party, i;
    if (eim.isLeader(player)) { // Check for party leader
        // Boot whole party and end
        party = eim.getPlayers();
        for (i = 0; i < party.size(); ++i) {
            if (party.get(i).equals(player)) {
                removePlayer(eim, player);
            }           
            else {
                playerExit(eim, party.get(i));
            }
        }
        eim.dispose();
    } else { // Boot d/ced player
        // If only 2 players are left, uncompletable:
        party = eim.getPlayers();
        if (party.size() < minPlayers) {
            for (i = 0; i < party.size(); ++i) {
                playerExit(eim,party.get(i));
            }
            eim.dispose();
        } else {
            playerExit(eim, player);
        }
    }
}

function leftParty(eim, player) {           
    // If only 2 players are left, uncompletable:
    var party = eim.getPlayers();
    if (party.size() < minPlayers) {
        for (var i = 0; i < party.size(); ++i) {
            playerExit(eim,party.get(i));
        }
        eim.dispose();
    } else {
        playerExit(eim, player);
    }
}

function disbandParty(eim) {
    // Boot whole party and end
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); ++i) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
}

// For offline players
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    //HPQ does nothing special with winners
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); ++i) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function allMonstersDead(eim) {
    // Do nothing; HPQ has nothing to do with monster killing
}

function cancelSchedule() {
}

function timeOut() {
    var iter = em.getInstances().iterator();
    while (iter.hasNext()) {
        var eim = iter.next();
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                playerExit(eim, pIter.next());
            }
        }
        eim.dispose();
    }
}

function dispose() {
}
