load('nashorn:mozilla_compat.js');
/*
 * Shiny Stone
 * Generator Room (Nautilus)
 * ID: 1092016
 * Questline: Whalians and the Nautilus
 */

importPackage(Packages.net.sf.odinms.client);
importPackage(Packages.net.sf.odinms.server.quest);

var status;
var id = 1092003; // NPC Sharyl's ID

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
    if (cm.getQuestStatus(2166).equals(MapleQuestStatus.Status.STARTED)) {
        if (status === 0) {
            cm.sendOk("You hear a deep, aquatic purring sound as the generator starts up successfully.");
            /*
            for each (req in MapleQuest.getInstance(2166).getCompleteReqs()) {
                cm.getPlayer().dropMessage(6, req.toString());
            }
            */
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            cm.sendOk(".....");
            cm.dispose();
            return;
        }
    }
}
