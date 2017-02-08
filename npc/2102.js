/*
 * Nina
 * ID: 2102
 * Training Camp II
 * Does nothing
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
    if (status === 0) {
        cm.sendOk("Hey!");
        cm.dispose();
        return;
    }
}
