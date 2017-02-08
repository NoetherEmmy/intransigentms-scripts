/* 
    Thomas Swift
    Amoria warper.
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        if (status >= 0 && mode === 0) {
            cm.sendOk("Ok, feel free to hang around until you're ready to go!");
            cm.dispose();
            return;
        }
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (status === 0) {
            if (p.getMapId() === 100000000) {
                cm.sendYesNo("I can take you to the Amoria Village. Are you ready to go?");
            } else {
                cm.sendYesNo("I can take you back to Henesys. Are you ready to go?");
            }
        } else if (status === 1) {
            if (p.getMapId() === 100000000) {
                cm.warp(680000000, 0);
            } else {
                cm.warp(100000000, 5);
            }
            cm.dispose();
            return;
        }
    }
}
