/*
 * Sealed passage
 * Lilin's Manor: Ventilation Main Chamber
 *
 * ID: 9901007
 */

var MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");

var keyId = 4031217; // Golden Key
var maxPoints = 450;
var thisMap = 5003;
var galaMap = 5004;
var status = 0;
var keysNeeded;
var keyCount;
var totalKeys = 0;
var bottomRect;
var partyIsGathered = false;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();

    if (mode < 0 || !pq.isLeader(p) || (status < 1 && mode === 0)) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    switch (status) {
        case 0:
            keyCount = 10 + 3 * pq.playerCount();
            keysNeeded = 5 + pq.playerCount();
            bottomRect = p.getMap().getPartyQuestInstance().invokeMethod("getBottomRect");
            partyIsGathered = pq.getPlayers()
                                .stream()
                                .allMatch(function(c) { return bottomRect.contains(c.getPosition()); });
            if (partyIsGathered) {
                totalKeys = 0;
                pq.getPlayers()
                  .forEach(function(c) { totalKeys += c.getItemQuantity(keyId, false); });
                if (totalKeys >= keysNeeded) {
                    cm.sendNext("#ewith #b" + totalKeys + "#k keys in hand(s), you grope over the locking mechanism of the sealed passage#n\r\n\r\n#eyou find a spot for many of the keys, and believe that with a little turning you can unseal the passage#n");
                } else {
                    cm.sendOk("#eas you look over the entrance to this sealed passage, you realize that it requires the use of more keys than your party has#n");
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("#enow that you see the configuration of the sealed passage up close, you realize you're going to need as many helping hands as you can get to open it up, even with the proper keys#n");
                cm.dispose();
                return;
            }
            break;
        case 1:
            pq.addPoints(Math.round(totalKeys / keyCount * maxPoints));
            pq.getPlayers()
              .forEach(function(c) { MapleInventoryManipulator.removeAllById(c.getClient(), keyId, false); });
            cm.sendOk("#eas you and your party members collectively turn the sealed passage's mechanisms, the passage is no longer sealed, giving way to an empty library#n");
            pq.registerMap(galaMap);
            cm.warpParty(galaMap);
            pq.getMapInstance(galaMap).setPlayerProperty(p, "enteredFrom", "vent");
            pq.unregisterMap(thisMap);
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
