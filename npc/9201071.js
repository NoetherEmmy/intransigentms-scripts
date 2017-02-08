/*
 * Sunstone Grave
 * ID: 9201071
 *
 * Summons papu
 */

var MapleLifeFactory = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
var Point            = Java.type("java.awt.Point");
var MaplePortal      = Java.type("net.sf.odinms.server.MaplePortal");
var BossMapMonitor   = Java.type("net.sf.odinms.server.maps.BossMapMonitor");

var status;
var crack = 4031179;
var mobId = 8500000;
var mapId = 220080000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    mode >= 0 ? ++status : --status;
    if (p.getMapId() === 220080001) {
        switch (status) {
            case 0:
                cm.sendYesNo("#eyou look over the front of the tombstone, where it reads \"Here lies Papu\"#n\r\n\r\n#ealthough Papu may be dead, you think that with a bit of luck, some magic, and a piece of crack, you can bring him back to life just to slay him again like the cruel adventurer you are#n");
                break;
            case 1:
                if (cm.itemQuantity(crack) > 0) {
                    if (p.getMap().mobCount() < 1) {
                        cm.gainItem(crack, -1);
                        var mob = MapleLifeFactory.getMonster(mobId);
                        p.getMap().spawnMonsterOnGroudBelow(mob, new Point(-410, -400));
                        cm.changeMusic("Bgm09/TimeAttack");
                        var pMap = cm.getC().getChannelServer().getMapFactory().getMap(mapId);
                        pMap.setReactorState();
                        var portal = pMap.getPortal("sp");
                        portal.setPortalState(MaplePortal.CLOSE);
                        var bmm = new BossMapMonitor(p.getMap(), pMap, portal);
                        cm.sendOk("#ethe Papu is spawned, dude!#n");
                    } else {
                        cm.sendOk("#eit looks like there's already monsters out there, dude#n");
                    }
                } else {
                    cm.sendOk("#eit doesn't look like you have any crack, dude#n");
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else {
        cm.sendOk("#ethe face of the tombstone is smooth and empty, ready to be carved in with a name of the deceased#n");
        cm.dispose();
        return;
    }
}
