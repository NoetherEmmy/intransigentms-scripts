/*
 * Woman 3 (Bystander)
 * Lilin's Manor: The Lobby
 *
 * ID: 9901004
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
            cm.sendOk("Hmph. I guess this isn't so bad...\r\n\r\n#eexhales audibly#n\r\n\r\nWhen is Sabby going to get here, if ever?");
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
