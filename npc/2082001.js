/*
 * Tommie
 * Leafre | Cabin<To Orbis> (240000110)
 * Leafre Ticketing Usher
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (status >= 0 && mode === 0) {
        cm.sendNext("You must have some business to take care of here then, eh?");
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendSimple("Where ya headed off to, kiddo?\r\n\r\n#L0#Orbis.#l\r\n#L1#Time Temple.#l");
    } else if (status === 1) {
        if (cm.haveItem(4031045)) {
            cm.gainItem(4031045, -1);
            if (selection === 0) {
                cm.warp(200000100);
            } else if (selection === 1) {
                cm.warp(270000100);
            }
            cm.dispose();
            return;
        } else {
            cm.sendNext("Oh no... I don't think you have the ticket with you. I can't let you in without it. Please buy the ticket at the ticketing booth.");
            cm.dispose();
            return;
        }
    }
}
