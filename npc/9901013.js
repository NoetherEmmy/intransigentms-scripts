/*
 * Woman on couch 2
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901013
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
                cm.sendOk("God, I hate parties...");
            } else {
                cm.sendNext("What the hell was that all about?\r\n\r\nLooks like my cue to leave...");
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
