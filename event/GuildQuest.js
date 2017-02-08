/*
 * Guild Quest 
 */

load('nashorn:mozilla_compat.js');
 
importPackage(Packages.net.sf.odinms.world);
importPackage(Packages.net.sf.odinms.client);
importPackage(Packages.net.sf.odinms.server.maps);
importPackage(java.lang);

var exitMap;

function init() {
    em.setProperty("shuffleReactors","false");
}

function monsterValue(eim, mobId) { // Should only trigger on Ergoth
    if (mobId === 9300028) { // But, just to be safe...
        var rubian = new Item(4001024, 0, 1);
        var map = eim.getMapInstance(990000900);
        var reactor = map.getReactorByName("boss");
        map.spawnItemDrop(reactor, eim.getPlayers().get(0), rubian, reactor.getPosition(), true, false);
    }
    return -1;
}

function setup(eim) {
    exitMap = em.getChannelServer().getMapFactory().getMap(990001100); // Returning path
    
    // No time limit yet until clock can be visible in all maps
    
    // Shuffle reactors in two maps for stage 3
    eim.getMapInstance(990000501).shuffleReactors();
    eim.getMapInstance(990000502).shuffleReactors();
    
    // Force no-respawn on certain map reactors
    eim.getMapInstance(990000611).getReactorByName("").setDelay(-1);
    eim.getMapInstance(990000620).getReactorByName("").setDelay(-1);
    eim.getMapInstance(990000631).getReactorByName("").setDelay(-1);
    eim.getMapInstance(990000641).getReactorByName("").setDelay(-1);
    
    // Activate three minutes after start
    eim.setProperty("entryTimestamp", System.currentTimeMillis() + (3 * 60000));
    eim.setProperty("canEnter", "true");
    eim.schedule("begin", 60000);
}

function begin(eim) {
    eim.setProperty("canEnter","false");
    eim.schedule("earringcheck", 15000);
    var party = eim.getPlayers();
    //if (party.size() < 6) { //not enough to start
    //        end(eim,"There are no longer enough players to continue, and those remaining shall be warped out.");
    //} else {
    var iter = party.iterator();
    while (iter.hasNext()) {
        iter.next().getClient().getSession().write(Packages.net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,"The quest has begun."));
    }
    //}
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(990000000);
    player.changeMap(map, map.getPortal(0));
    player.getClient().getSession().write(Packages.net.sf.odinms.tools.MaplePacketCreator.getClock((Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000));
    
    // TODO: hold time across map changes
    //player.getClient().getSession().write(Packages.net.sf.odinms.tools.MaplePacketCreator.getClock(1800));
}

function playerRevive(eim, player) {
    var returnMap = 990000200;
    if (eim.getProperty("canEnter").equals("true")) {
        returnMap = 990000000;
    }
    player.setHp(50);
    player.setStance(0);
    player.changeMap(eim.getMapInstance(returnMap), eim.getMapInstance(returnMap).getPortal(0));
    return false;
}

function playerDead(eim, player) {
}

function playerDisconnected(eim, player) {
    var party = eim.getPlayers();
    if (player.getName().equals(eim.getProperty("leader"))) { // Check for party leader
        // Boot all players and end
        var iter = party.iterator();
        while (iter.hasNext()) {
            var pl = iter.next();
            pl.getClient().getSession().write(Packages.net.sf.odinms.tools.MaplePacketCreator.serverNotice(6, "The leader of the instance has disconnected, and the remaining players shall be warped out."));
            if (pl.equals(player)) {
                removePlayer(eim, pl);
            } else {
                eim.unregisterPlayer(pl);
                pl.changeMap(exitMap, exitMap.getPortal(0));
            }
        }
        eim.dispose();
    } else { // Boot d/ced player and check if enough players left
        removePlayer(eim, player);
        if (party.size() < 6) { // Five after player booted
            end(eim, "There are no longer enough players to continue, and those remaining shall be warped out.");
        }
    }
}

function leftParty(eim, player) { // Ignore for GQ
}

function disbandParty(eim) { // Ignore for GQ
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
    var party = eim.getPlayers();
    if (party.size() < 6) { // Five after player booted
        end(eim,"There are no longer enough players to continue, and those remaining shall be warped out.");
    }
}

function end(eim, msg) {
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
        var player = iter.next();
        player.getClient().getSession().write(Packages.net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,msg));
        eim.unregisterPlayer(player);
        player.changeMap(exitMap, exitMap.getPortal(0));
    }
    eim.dispose();
}

// For offline players
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    var iter = eim.getPlayers().iterator();
    var bonusMap = eim.getMapInstance(990001000);
    while (iter.hasNext()) {
        var player = iter.next();
        player.changeMap(bonusMap, bonusMap.getPortal(0));
        player.getClient().getSession().write(Packages.net.sf.odinms.tools.MaplePacketCreator.getClock(40));
    }
    eim.schedule("finish", 40000);
}

function finish(eim) {
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
        var player = iter.next();
        eim.unregisterPlayer(player);
        player.changeMap(exitMap, exitMap.getPortal(0));
    }
    eim.dispose();
}

function allMonstersDead(eim) {
    // Do nothing; GQ has nothing to do with monster killing
}

function cancelSchedule() {
}

function timeOut() {
}

function earringcheck(eim, player) {
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
        var pl = iter.next();
        if (pl.getHp() > 0 && pl.getMapId() > 990000200 && pl.getInventory(MapleInventoryType.EQUIPPED).countById(1032033) === 0) {
            pl.addHP(-30000);
            pl.getMap().broadcastMessage(Packages.net.sf.odinms.tools.MaplePacketCreator.serverNotice(6, pl.getName() + " died from not wearing earrings!"));
        }
    }
    eim.schedule("earringcheck", 15000);
}

function dispose() {
}
