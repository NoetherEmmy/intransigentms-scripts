/*
 * Lady at the table
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901008
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
                cm.sendOk("#econtinues chewing#n\r\n\r\n...Hmm? Ah; um, you should... try some of this food. #eReally#n good. Yeah.");
            } else {
                cm.sendNext("#econtinues bleeding out onto the table#n");
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
