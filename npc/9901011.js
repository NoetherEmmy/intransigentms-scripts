/*
 * Man with ice cream
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901011
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
                cm.sendOk("I think I gained maybe 2 kilos tonight. This ice cream is amazing...\r\n\r\n#essccchchhhchsccllclslcuululullluuuurururrrrrppppp#n");
            } else {
                cm.sendNext("#elies face-down in a pool of his own blood and ice cream#n");
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
