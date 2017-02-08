/*
 * Man in white suit
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901014
 */

var status = 0;
var combat;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    combat = mi.getPlayerProperty(p, "combat");
    var address = p.getGender === 0 ? "waiter" : "waitress";
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (status < 1 && mode === 0) {
        cm.dispose();
        return;
    }   
    mode === 1 ? ++status : --status;
    switch (status) {
        case 0:
            if (!combat) {
                cm.sendOk("#eabruptly stops singing#n\r\n\r\nOh. Hi.\r\n\r\nAre you the " + address + " around here?");
            } else {
                cm.sendNext("#ecowering in the corner#n");
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
