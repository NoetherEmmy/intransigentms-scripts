/*
 * Pietri | Ludibirum Maze PQ
 *
 * ID: 9103000
 */

var status;
var quant;

function start() {
    quant = cm.itemQuantity(4001106);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status === 0) {
        cm.sendNext("Great job escaping the maze! Did you collect the coupons from the monsters standing in your way at the maze?");
    } else if (status === 1) {
        if (cm.getParty() !== null && cm.isLeader()) {
            if (quant >= 30) {
                cm.sendOk("Good job! you collected #b" + quant + " #t4001106#'s\r\n#kYou may pass on to get your reward");
            } else {
                cm.sendOk("Please go collect more coupons.\r\nYou need at least #b30 Coupons");
                cm.dispose();
                return;
            }
        } else {
            cm.sendPrev("Please tell #byour party leader#k to speak to me after gathering all the coupons from the party members.");
            cm.dispose();
            return;
        }
    } else if (status === 2) {
        var eim = cm.getChar().getEventInstance();
        if (eim !== null) {
            cm.givePartyExp(quant * 50, eim.getPlayers());
            eim.finishPQ();
        } else {
            cm.sendOk("I am broken #r</3#k\r\n\r\nReport this to a GM.");
        }
        cm.dispose();
        return;
    }
}
