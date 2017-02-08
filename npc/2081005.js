/*
 * Keroben (Cave of Life - Entrance)
 * ID: 2081005
 * Gatekeeper
 */

var Status = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");

var status;
var morph = 2210003;
var questIds = [7301, 7303];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
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
        if (cm.getPlayer().getMorph() === morph) {
            cm.sendYesNo("Uhm, hey. You need to get inside?");
        } else if (cm.itemQuantity(morph) <= 0 && cm.getQuestStatus(questIds[0]).equals(Status.COMPLETED) || cm.getQuestStatus(questIds[1]).equals(Status.COMPLETED)) {
            cm.sendOk("#epeering down once again at the entrance to the Cave of Life, you realize that that same cornian is still stubbornly guarding the opening#n\r\n\r\n#eremembering your past efforts to break in by disguising yourself, you are able to produce the same disguise kit:#n\r\n\r\n#i" + morph + "#");
            cm.gainItem(morph, 1);
            cm.dispose();
            return;
        } else {
            cm.sendOk("Hey! You ain't no fuckin' cornian. Get outta here, shoo!\r\n\r\nThis place is off-limits.");
            cm.dispose();
            return;
        }
    } else if (status === 1) {
        cm.warp(240050000);
        cm.dispose();
        return;
    }
}
