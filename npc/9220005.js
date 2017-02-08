/*
    Roudolph Happyville Warp NPC
*/

function start() {
    cm.sendYesNo("Do you want to go to the Extra Frosty Snow Zone ?#l");
}

function action(mode, type, selection) {
    if (mode > 0) {
        cm.warp(209080000);
    }
    cm.dispose();
}
