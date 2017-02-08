/*
 * Nana(H)
 * Henesys (100000000)
 *
 * ID: 9201001
 * Love fairy
 */

var status;
var proofOfLove = 4031367;
var reqItem = [4000001, 40];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode < 0 || (mode === 0 && (status === 0 || type === 4 || type === 12))) {
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
            cm.sendYesNo("Ya all done frolicking in here, kiddo?\r\n\r\nWell, party's over. We're all real nice 'n' married now.");
            break;
        case 1:
            cm.sendNext("Hah! Fat chance!\r\n\r\nThis is #emy#n wedding garden, ya bunch a' trespassin' whippersnappers.");
            break;
        case 2:
            cm.sendOk("#eas Ames talks amongst himself and the imaginary trespasser whippersnappers, you manage to sneak away#n");
            break;
        case 3:
            cm.warp(680000000);
            cm.dispose();
            return;
    }
}
