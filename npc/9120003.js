/**
    Hikari - Showa Town(801000000)
**/

var status;
var price = 300;

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
    } else {
        cm.sendOk("Please come back some other time.");
        cm.dispose();
        return;
    }
    if (status === 0) {
        cm.sendYesNo("Would you like to enter the bathhouse? That'll be " + price + " mesos for you.");
    } else if (status === 1) {
        if (cm.getMeso < price) {
            cm.sendOk("Please check and see if you have " + price + " mesos to enter this place.");
            cm.dispose();
            return;
        }
        cm.gainMeso(-price);
        if (cm.getChar().getGender() === 0) {
            cm.warp(801000100);
        } else {
            cm.warp(801000200);
        }
        cm.dispose();
        return;
    }
}
