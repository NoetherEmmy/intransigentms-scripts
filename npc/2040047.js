// Sgt Anders (2040047)

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var mapId = p.getMapId();
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (mapId === 922010000) {
        switch (status) {
            case 0:
                cm.sendYesNo("Ya done here, ya buncha kiddoes?\r\n\r\nAlright. Scram.");
                break;
            case 1:
                cm.warpRandom(221024500);
                cm.dispose();
                return;
        }
    }
}
