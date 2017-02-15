/*
 * Portal to boss maps in Neo City
 *
 * Script: TD_Boss_enter
 */

var MapleLifeFactory = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
var Point            = Java.type("java.awt.Point");

var mobs =
{
    240070203: { id: 7220003, cy: 395,  f: 0, fh: 1,  rx0: -161,  rx1: 790,   pos: new Point(570,   392)  },
    240070303: { id: 8220010, cy: 295,  f: 0, fh: 1,  rx0: -233,  rx1: -3,    pos: new Point(-119,  254)  },
    240070403: { id: 8220009, cy: 662,  f: 0, fh: 2,  rx0: -3013, rx1: -2781, pos: new Point(-2889, 653)  },
    240070503: { id: 8220012, cy: 242,  f: 0, fh: 2,  rx0: -385,  rx1: -655,  pos: new Point(201,   234)  },
    240070603: { id: 8220014, cy: -506, f: 0, fh: 21, rx0: -145,  rx1: 340,   pos: new Point(270,   -511) },
};

function enter(pi) {
    var to = pi.getClient()
               .getChannelServer()
               .getMapFactory()
               .getMap(pi.getPlayer().getMapId() + 1);

    if (to.playerCount() < 1) {
        to.killAllMonsters(false);
        to.clearDrops();
    }

    if (to.mobCount() < 1) {
        var mobStats = mobs[to.getId()];
        var myLife = MapleLifeFactory.getMonster(mobStats.id);
        myLife.setCy(mobStats.cy);
        myLife.setF(mobStats.f);
        myLife.setFh(mobStats.fh);
        myLife.setRx0(mobStats.rx0);
        myLife.setRx1(mobStats.rx1);
        myLife.setPosition(mobStats.pos);
        myLife.setHide(false);

        to.spawnMonster(myLife);
    }

    var portalName = "left00";
    if (to.getId() === 240070503) {
        portalName = "under00";
    }

    pi.warp(to.getId(), portalName);
    return true;
}
