/*
 * Robin
 * ID: 2003
 * Maple Island | Snail Hunting Ground I (40000)
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
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendOk("Welcome to Maple Island!");
        cm.dispose();
        return;
    }
}
