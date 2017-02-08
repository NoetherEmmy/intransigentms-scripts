/*
 * Horntail's Schedule (Cafe of Life - Cave Entrance)
 * ID: 2083001
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
    if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendOk("#bMonday#k: Terrorize local villages\r\n#bTuesday#k: Mostly meetings, maybe spend some time with the fam\r\n#bWednesday#k: More fucking meetings (god I hate hump day)\r\n#bThursday#k: Hunt down and cook some human stew for the kids\r\n#bFriday#k: Party hard, motherfuckers\r\n#bSaturday#k: Netflix and kill (some more humans)\r\n#bSunday#k: Clean up the cave");
        cm.dispose();
        return;
    }
}
