/*
 * Heena
 * ID: 2101
 *
 * Lower level of the training camp
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
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendYesNo("Are you done with your training? If you wish, I will send you out of here.");
    } else if (status === 1) {
        cm.sendSimple("Would you like to go to Maple Island, or skip Maple Island and go straight to Henesys?\r\n\r\n#L0#I'll go to Maple Island.#l\r\n#L1#I'd rather skip it all.#l\r\n#L2#I'd like some more time to think about it.#l");
    } else if (status === 2) {
        if (selection === 0) {
            cm.warp(40000);
            cm.dispose();
            return;
        } else if (selection === 1) {
            cm.warp(100000000);
            cm.dispose();
            return;
        } else if (selection === 2) {
            cm.dispose();
            return;
        }
    }
}
