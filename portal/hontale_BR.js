var MapleLifeFactory = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
var Point            = Java.type("java.awt.Point");

function enter(pi) {
    var p = pi.getPlayer();
    if (p.getMap().mobCount() > 0) return false;

    if (p.getMapId() + 100 === 240060100) {
        if (p.getParty() === null) {
            p.dropMessage(5, "You aren't in a party.");
            return false;
        }
        var to = pi.getMap(240060100);
        to.killAllMonsters(false);
        pi.getMap(240060200).killAllMonsters(false);

        var spawnRight = MapleLifeFactory.getMonster(8810025);
        to.spawnMonsterOnGroundBelow(spawnRight, new Point(-420, 122));
        to.killMonster(spawnRight, p, true);

        p.getParty()
         .getMembers()
         .stream()
         .filter(function(pchr) {
             return pchr !== null && pchr.isOnline();
         })
         .map(function(pchr) {
             return p.getClient()
                     .getChannelServer()
                     .getPlayerStorage()
                     .getCharacterByName(pchr.getName());
         })
         .filter(function(chr) {
             return chr !== null && !chr.isDead() && chr.getMapId() !== 100;
         })
         .forEach(function(chr) {
             chr.changeMap(240060100);
         });

        return true;
    }

    try {
        pi.warp(p.getMapId() + 100, "st00");
    } catch (e) {
        pi.warp(p.getMapId() + 100);
    }
    return true;
}
