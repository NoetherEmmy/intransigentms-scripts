/*
 * Commando Jim
 * Singapore | Ruins of Krexel II
 * ID: 9270045
 *
 * Exit NPC for Krexel map
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && (status === 0 || type === 4)) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    switch (status) {
        case 0:
            cm.sendSimple("Yeah, you know what? This is definitely as close as I am getting to that fucking thing.\r\n\r\nI'll just stay back here... you can go near it if you want.\r\n\r\n#L0#I'm gettin' outta here.#l\r\n#L1#Ok, fine.#l");
            break;
        case 1:
            if (selection === 0) {
                cm.warp(541020700);
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
