/*
 * Sera
 * ID: 2100
 * Starting NPC
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
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendOk("Hey. I'm Sera, nice to meet you.\r\t\r\tWelcome to #dIntransigentMS#k!\r\t\r\tWe are a #rpermadeath#k server, so be very careful not to die. Be on the lookout for ways to defend yourself, and have fun adventuring!");
    } else if (status === 1) {
        cm.sendNext("Uhm...\r\t\r\tActually, hold on a sec. You might need something to protect yourself with and something to keep you healthy.\r\t\r\tLet me just take a look here...");
    } else if (status === 2) {
        cm.sendNext("Aha!\r\t\r\tHere you are, " + (p.getGender() === 0 ? "lad" : "lass") + ". I've got a #dshield#k and some #rpotions#k for you.\r\t\r\tGood luck, then!");
    } else if (status === 3) {
        cm.gainItem(1092003, 1);
        cm.gainItem(2000000, 12);
        cm.gainItem(2000003, 10);
        cm.warp(1);
        cm.dispose();
        return;
    }
}
