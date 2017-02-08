/*
 * Mue | Leafre Ticketing Booth (240000100)
 * ID: 2082000
 */

var status;
var cost = 30000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    }
    if (mode === 0) {
        cm.sendNext("You must have some business to take care of here then, eh?");
        cm.dispose();
        return;
    }
    if (status === 0) {
        cm.sendYesNo("Hello, I'm in charge of selling tickets for the ship ride to\r\n#bOrbis#k and to the #bTime Temple#k. A ticket will cost you #b" + cost + " mesos#k.\r\n\r\nWould you like to purchase #i4031045#?");
    } else if (status === 1) {
        if (cm.getMeso() >= cost && cm.canHold(4031045)) {
            cm.gainItem(4031045, 1);
            cm.gainMeso(-cost);
        } else {
            cm.sendOk("Are you sure you have #b" + cost + " mesos#k? If so, then I urge you to check your etc. inventory, and see if it's full or not.");
        }
        cm.dispose();
        return;
    }
}
