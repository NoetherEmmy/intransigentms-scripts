/*
 * Kenta
 * Zoo Trainer
 *
 * ID: 2060005
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");
var Status       = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");

var status;
var questid = 6002;
var originalmapid = 230000003;
var mapid = 4000;
var hogid = 9300101;
var itemsneeded = [[4000264, 300], [4000267, 200], [4000266, 200]];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i;
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (p.getMap().getId() === originalmapid) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            if (cm.getQuestStatus(questid).equals(Status.COMPLETED) && p.getItemQuantity(1902000, true) === 0) {
                cm.gainItem(1902000, 1);
                cm.sendOk("Wow, you were able to tame the damn hog? Well then here you go:\r\n\r\n#i1902000#\r\nCome back to me later and maybe I can teach you a few more things about monster riding.");
                cm.dispose();
                return;
            } else if (cm.getQuestStatus(questid).equals(Status.STARTED)) {
                cm.sendYesNo("Would you like to go to tame the hog right now?");
            } else if (cm.getQuestStatus(questid).equals(Status.COMPLETED) && p.getLevel() >= 100 && p.getItemQuantity(1902001, true) === 0) {
                var completed = true;
                for (i = 0; i < itemsneeded.length; ++i) {
                    if (cm.itemQuantity(itemsneeded[i][0]) < itemsneeded[i][1]) {
                        completed = false;
                        break;
                    }
                }
                if (completed) {
                    cm.sendOk("Wow! Here's a Silver Hog, you've earned it:\r\n\r\n#i1902001#\r\n\r\n#esigh#n\r\n\r\nFinally I have my toys...");
                    for (i = 0; i < itemsneeded.length; ++i) {
                        cm.gainItem(itemsneeded[i][0], -1 * itemsneeded[i][1]);
                    }
                    cm.gainItem(1902001, 1);
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk("So you want a better hog than this one here? Fine.\r\n\r\nBring me #b300 Rexton Leathers#k, #b200 Wooden Shoulder Pads#k, and #b200 Skull Shoulder Pads#k.\r\n\r\nDon't. As--\r\n\r\nJust trust me, I need them. I have my reasons.");
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("Hey! What's up?");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            var map = cm.getClient().getChannelServer().getMapFactory().getMap(mapid);
            if (map.playerCount() === 0) {
                map.cancelAllPeriodicMonsterDrops();
                map.killAllMonsters(false);
                cm.warp(mapid);
                var hog = cm.getMonster(hogid);
                cm.spawnMonsterInMapAtPos(hog, mapid, 38, -406);
                map.startPeriodicMonsterDrop(p, hog, 60 * 1000, 60 * 60 * 1000);
                cm.dispose();
                return;
            } else {
                cm.sendOk("It looks like someone is taming the Hog right now, actually. Maybe try a different channel?");
                cm.dispose();
                return;
            }
        }
    } else if (p.getMap().getId() === mapid) {
        if (status === 0) {
            cm.sendYesNo("Do you want to go back to the Zoo?");
        } else if (status === 1) {
            cm.warp(originalmapid);
            cm.dispose();
            return;
        }
    }
}
