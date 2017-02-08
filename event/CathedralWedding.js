/*
 * Wedding
 */

var Long               = Java.type("java.lang.Long");
var MaplePacketCreator = Java.type("net.sf.odinms.tools.MaplePacketCreator");
var System             = Java.type("java.lang.System");

var exitMap, altarMap, cakeMap;
var instanceId;
var minPlayers = 1;

function init() {
    var mapFactory = em.getChannelServer().getMapFactory();
    exitMap = mapFactory.getMap(680000500);
    altarMap = mapFactory.getMap(680000210);
    cakeMap = mapFactory.getMap(680000300);
    instanceId = 1;
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup(eim) {
    var instanceName = "CathedralWedding" + instanceId;
    eim = em.newInstance(instanceName);
    instanceId++;

    eim = em.newInstance(instanceName);

    var mf = eim.getMapFactory();

    var map = mf.getMap(680000200);
    // Making the clock continue through all maps
    em.schedule("playerAltar", 3 * 60 * 1000);
    eim.setProperty("hclicked", 0);
    eim.setProperty("wclicked", 0);
    eim.setProperty("entryTimestamp", System.currentTimeMillis() + 3 * 60 * 1000);

    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(680000200);
    player.changeMap(map, map.getPortal(0));

    // 1st -- 20 min; 2nd -- 5 min; 3rd -- 5 min
    //player.getClient().getSession().write(MaplePacketCreator.getClock(1200));
    //player.getClient().getSession().write(MaplePacketCreator.getClock(180));
    player
        .getClient()
        .getSession()
        .write(
            MaplePacketCreator.getClock(
                Math.floor(
                    (Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000
                )
            )
        );
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
}

function playerDisconnected(eim, player) {
    playerExit(eim, player); // Kick him/her
}

function leftParty(eim, player) {
}

function disbandParty(eim) {
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
}

function playerWarpAltar(eim, player) {
    if (
        !player.getName().equals(eim.getProperty("husband")) &&
        !player.getName().equals(eim.getProperty("wife"))
    ) {
        player.changeMap(altarMap, altarMap.getPortal(0));
        player.getClient().getSession().write(MaplePacketCreator.getClock(300));
    } else {
        player.changeMap(altarMap, altarMap.getPortal(2));
        player.getClient().getSession().write(MaplePacketCreator.getClock(300));
        player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Please talk to High Priest John now."));
    }
}

function playerWarpCake(eim, player) {
    player.changeMap(cakeMap, cakeMap.getPortal(0));
    player.getClient().getSession().write(MaplePacketCreator.getClock(300));
}

function playerAltar(eim, player) {
    var iter = em.getInstances().iterator();
    while (iter.hasNext()) {
        eim = iter.next();
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                playerWarpAltar(eim, pIter.next());
            }
        }
        em.schedule("playerCake", 5 * 60 * 1000);
        //eim.dispose();
    }
}

function playerCake(eim, player) {
    var iter = em.getInstances().iterator();
    while (iter.hasNext()) {
        eim = iter.next();
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                playerWarpCake(eim, pIter.next());
            }
        }
        em.schedule("timeOut", 5 * 60 * 1000);
        //eim.dispose();
    }
}

function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    // Wedding? Idk about gifts
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); ++i) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function allMonstersDead(eim) {
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
