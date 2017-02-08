/*
 * Warp to Utah's Farm | The Forest East Of Henesys
 */

var MapleQuestStatus = Java.type("net.sf.odinms.client.MapleQuestStatus");

var to = 900000000;
var quest = 2073;

function enter(pi) {
    if (pi.getQuestStatus(quest).equals(MapleQuestStatus.Status.STARTED)) {
        pi.warp(to);
        return true;
    }
    return false;
}
