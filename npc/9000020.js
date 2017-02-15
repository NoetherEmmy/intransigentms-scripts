/*
 * Spinel -- Takes users to Zipangu
 * ID: 9000020
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
    } else if (mode === 0 && status === 0) {
        cm.sendNext("Oh. I'll be here for a while. Talk to me again if you change your mind.");
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (p.getMapId() !== 800000000) {
        if (status === 0) {
            cm.sendYesNo("Hi! I'm #p" + cm.getNpc() + "#. I can take you to #bJapan#k if you'd like. Would you like to go there now?");
        } else if (status === 1) {
            p.setReturnMap(p.getMapId());
            cm.warp(800000000);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            cm.sendYesNo("Hi! I'm #p" + cm.getNpc() + "#. I can take you back to #b#m" + p.getReturnMap() + "##k if you'd like. Would you like to go there now?");
        } else if (status === 1) {
            cm.warp(p.getReturnMap());
            cm.dispose();
            return;
        }
    }
}
