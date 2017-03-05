/*
 * Bed NPC | Free Market Entrance
 * ID: 9900000
 *
 * Death penalty removal NPC
 */

var MapleCharacter = Java.type("net.sf.odinms.client.MapleCharacter");

var status;
var deathcost = 5000000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    /*
    if (p.getName() + "" === "Noether") {
        p.incrementDeathPenaltyAndRecalc(5);
        p.dropMessage("5");
        cm.dispose();
        return;
    }
    */
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        if (mode === 0) {
            cm.dispose();
            return;
        }
        var normal = "\t\t\t\t #e. . . z z z Z Z Z z z z . . .#n\r\n";
        var s = "";
        if (p.getDeathPenalty() > 0) {
            s = "\r\n\t\t\t\t #L0#I don't feel so good. I think I'll get some rest...#l";
        }
        cm.sendSimple(normal + s + "\r\n\t\t\t\t #L1#(walk away from the bed)#l");
    } else if (status === 1) {
        if (selection === 0) {
            cm.sendYesNo("\t\t\t\t  #eas you approach the bed to lay down, the bed\r\n\t\t\t\t  rudely sticks a mechanical hand out at you#n\r\n\r\n\t\t\t\t #eyou glance over at the side of the headboard,\r\n\t\t\t\t  where it reads:#n\r\n\r\n\t\t\t\t\t\t#d" + MapleCharacter.makeNumberReadable(deathcost) + " MESOS PER REST#k\r\n\r\n\t\t\t\t Are you willing to pay?");
        } else if (selection === 1) {
            cm.dispose();
            return;
        }
    } else if (status === 2) {
        if (cm.getMeso() >= deathcost) {
            if (p.canStrengthen()) {
                p.updateLastStrengthening();
                cm.gainMeso(-deathcost);
                p.decrementDeathPenaltyAndRecalc(p.getDeathFactor());
                cm.sendNext("\t\t\t\t  #eyou awake the next morning certainly more\r\n\t\t\t\t  refreshed than you were the day before#n");
            } else {
                var time = "" + p.getStrengtheningTimeString();
                var timesplit = time.split(" ");
                var first = timesplit[0];
                var second = timesplit[8];
                var i;
                for (i = 1; i < 8; ++i) {
                    first += " " + timesplit[i];
                }
                for (i = 9; i < timesplit.length; ++i) {
                    second += " " + timesplit[i];
                }
                
                cm.sendOk("\t\t\t\t  " + first + "\r\n\t\t\t\t  " + second);
            }
            cm.dispose();
            return;
        } else {
            cm.sendOk("It looks like you don't have enough mesos. It will cost you at least " + MapleCharacter.makeNumberReadable(deathcost) + " mesos for this treatment.");
            cm.dispose();
            return;
        }
    }
}
