/*
 * Woman on couch 1
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901018
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    var combat = mi.getPlayerProperty(p, "combat");

    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (status < 1 && mode === 0) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    switch (status) {
        case 0:
            if (!combat) {
                cm.sendOk("#eeating mashed potatoes silently#n");
            } else {
                cm.sendNext("#econtinues eating potatoes silently#n");
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
