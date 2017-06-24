/*
 * Note on the wall
 * Lilin's Manor: Ventilation Opening
 *
 * ID: 9901006
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (status < 1 && mode === 0) {
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
            cm.sendOk("#ea small note has been crudely scrawled and fastened to the vent wall#n\r\n\r\n#eit reads:#n\r\n\r\n\"Library vent seal fixed.\r\nRequires several of the keys to unlock for human inspection.\"");
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
