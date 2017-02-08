/*
 * Kyrin from the 2nd job adv. map (map ID: 2000)
 *
 * ID: 1072008
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
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
    if (cm.getPlayer().getMapId() === 2000) {
        if (status === 0) {
            if (cm.itemQuantity(4031013) >= 30) {
                cm.gainItem(4031013, -30);
                cm.sendOk("Excellent. Here is the caramel you need to make your job advancement.");
                cm.gainItem(4031324);
                cm.warp(120000101);
                cm.dispose();
                return;
            } else {
                cm.sendSimple("It doesn't look like you have enough #bDark Marbles#k for me.\r\n\r\n#L0#Ok, I'll get some more.#l\r\n#L1#Actually, I'd like to just leave.#l");
            }
        } else if (status === 1) {
            if (selection === 0) {
                cm.dispose();
                return;
            } else if (selection === 1) {
                cm.gainItem(4031013, -1 * cm.itemQuantity(4031013));
                cm.warp(120000101);
                cm.dispose();
                return;
            }
        }
    } else {
        cm.sendOk("Hey, I'm Kyrin.");
        cm.dispose();
        return;
    }
}
