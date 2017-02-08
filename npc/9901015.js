/*
 * Woman in blue dress
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901015
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
                cm.sendOk("I think these fucking boots are cutting off the circulation in my legs...");
            } else {
                cm.sendNext("Jesus Christ! Get away from me, you #emurderer#n!");
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
