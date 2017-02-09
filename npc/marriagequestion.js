/*
 * The marriage question
 */

var MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
var MapleInventoryType        = Java.type("net.sf.odinms.client.MapleInventoryType");

var status;
var otherChar;

function start() {
    otherChar = cm.getSender();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        if (type === 1 && mode === 0) {
            otherChar.dropMessage(1, "Your partner has declined your request.");
        } else {
            otherChar.dropMessage(1, "Your partner closed the NPC chat.");
        }
        cm.dispose();
        return;
    }

    if (status === 0) {
        cm.sendNext("Someone in #d" + cm.serverName() + "#k wants to send you a message.");
    } else if (status === 1) {
        cm.sendYesNo("Do you wish to be engaged to #b" + otherChar.getName() + "#k?");
    } else if (status === 2) {
        if (cm.createEngagement(otherChar.getName())) {
            otherChar.dropMessage(1, "Your partner has accepted your request!");
            otherChar.setMarriageQuestLevel(50);
            cm.getPlayer().setMarriageQuestLevel(50);
            if (otherChar.getItemQuantity(2240000, false) > 0) {
                MapleInventoryManipulator.removeById(
                    otherChar.getClient(),
                    MapleInventoryType.USE,
                    2240000,
                    1,
                    false,
                    false
                );
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031358, 1, null);
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031357, 1, null);
                cm.gainItem(4031358, 1);
            } else if (otherChar.getItemQuantity(2240001, false) > 0) {
                MapleInventoryManipulator.removeById(
                    otherChar.getClient(),
                    MapleInventoryType.USE,
                    2240001,
                    1,
                    false,
                    false
                );
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031360, 1, null);
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031359, 1, null);
                cm.gainItem(4031360, 1);
            } else if (otherChar.getItemQuantity(2240002, false) > 0) {
                MapleInventoryManipulator.removeById(
                    otherChar.getClient(),
                    MapleInventoryType.USE,
                    2240002,
                    1,
                    false,
                    false
                );
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031362, 1, null);
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031361, 1, null);
                cm.gainItem(4031362, 1);
            } else if (otherChar.getItemQuantity(2240003, false) > 0) {
                MapleInventoryManipulator.removeById(
                    otherChar.getClient(),
                    MapleInventoryType.USE,
                    2240003,
                    1,
                    false,
                    false
                );
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031364, 1, null);
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031363, 1, null);
                cm.gainItem(4031364, 1);
            }
        } else {
            cm.sendOk("Looks like there was an error forming the engagement.\r\n\r\nMake sure #byou're both on the same channel#k and try again.");
            otherChar.dropMessage(1, "Looks like there was an error forming the engagement.\r\n\r\nMake sure you're both on the same channel and try again.");
        }
        cm.dispose();
        return;
    }
}
