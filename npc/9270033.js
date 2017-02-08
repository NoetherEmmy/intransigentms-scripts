/*
 * Bob [Ghost Ship]
 * Teleports players to map to fight Capt. Latanica
 *
 * ID: 9270033
 */

var MapleMap = Java.type("net.sf.odinms.server.maps.MapleMap");

var status;
var whiteEss = 4000381;
var blackEss = 4000384;
var cooldownInMinutes = 20;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && (status < 1 || type === 4)) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status < 0) {
        cm.dispose();
        return;
    }
    if (p.getMapId() === 541010060) {
        if (status === 0) {
            if (cm.itemQuantity(whiteEss) > 0) {
                cm.sendYesNo("Ya wanna go in there? To see the big guy?\r\n\r\nWell alright, you're gonna have to give me your White Essence first.");
            } else {
                cm.sendOk("Can't let ya through, kid. Sorry, I don't make the rules. The Capt does.");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            cm.gainItem(whiteEss, -1);
            cm.warp(541010100);
            cm.dispose();
            return;
        }
    } else if (p.getMapId() === 541010100) {
        if (status === 0) {
            if (cm.itemQuantity(whiteEss) < 1) {
                cm.sendYesNo("Ya wanna leave here, kid? Figures.");
            } else {
                cm.sendSimple("Haven't seen the Capt in a while. Maybe with some of that White Essence you've got there...\r\n\r\n#L0#I want to summon the captain.#l\r\n#L1#I want to leave.#l");
            }
        } else if (status === 1) {
            if (selection === 1 || selection < 0) {
                cm.warp(541010060);
                cm.dispose();
                return;
            } else if (selection === 0) {
                var channel = cm.getClient().getChannel();
                if (MapleMap.timeSinceLastLatanica(channel) >= cooldownInMinutes * 60) {
                    cm.gainItem(whiteEss, -1);
                    cm.spawnMonsterInMap(9420513);
                    MapleMap.updateLastLatanica(channel);
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk(
                        "Looks like the Capt's not in at the moment. Probably just taking a break or something... should be back in around\r\n#b" +
                        Math.round(cooldownInMinutes - MapleMap.timeSinceLastLatanica(channel) / 60) +
                        " minutes#k."
                    );
                    cm.dispose();
                    return;
                }
            }
        }
    } else {
        if (status === 0) {
            cm.sendOk("Hey. I'm Bob.");
            cm.dispose();
            return;
        }
    }
}
