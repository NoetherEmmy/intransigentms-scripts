/*
 * Sid
 * ID: 11000
 * Unknown map
 * Unknown function
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1 || mode === 0) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    
    if (status === 0) {
        cm.sendOk("Heya, I'm Sid.");
        cm.dispose();
        return;
    } else if (status === 1) {

    }
}
