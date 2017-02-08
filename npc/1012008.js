/*
 * NPC: Casey
 * Function: Master of Minigame
 *
 * ID: 1012008
 */

var MapleInventoryManipulator    = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
var MapleInventoryType           = Java.type("net.sf.odinms.client.MapleInventoryType");
var MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");

var status;
var ii;

function start() {
    ii = MapleItemInformationProvider.getInstance();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var c = cm.getC();

    if (!p.isGM() || (mode === 0 && (status < 1 || type === 4))) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    if (status === 0) {
        cm.sendGetText("itemId val1 stat1 val2 stat2 val3 stat3...");
    } else if (status >= 1) {
        var splitted = cm.getText().split(" ").filter(function(s) { return s !== ""; });
        var itemId = +splitted[0];
        if (splitted.length % 2 === 0) {
            cm.sendGetText("Wrong number of arguments.");
            return;
        }

        try {
            var itemType = ii.getInventoryType(itemId);
            if (itemType.equals(MapleInventoryType.EQUIP) && !ii.isThrowingStar(itemId) && !ii.isBullet(itemId)) {
                var item = ii.getEquipById(itemId);
                if (!p.getInventory(itemType).isFull()) {
                    for (var i = 1; i < splitted.length; i += 2) {
                        var stat = splitted[i + 1].toLowerCase();
                        var val = +splitted[i];
                        switch (stat) {
                            case "accuracy":
                            case "acc":
                                item.setAcc(val);
                                break;
                            case "avoidability":
                            case "eva":
                            case "avoid":
                                item.setAvoid(val);
                                break;
                            case "dex":
                                item.setDex(val);
                                break;
                            case "str":
                                item.setStr(val);
                                break;
                            case "hands":
                                item.setHands(val);
                                break;
                            case "luck":
                            case "luk":
                                item.setLuk(val);
                                break;
                            case "int":
                                item.setInt(val);
                                break;
                            case "watt":
                            case "watk":
                                item.setWatk(val);
                                break;
                            case "wdef":
                                item.setWdef(val);
                                break;
                            case "matt":
                            case "matk":
                                item.setMatk(val);
                                break;
                            case "mdef":
                                item.setMdef(val);
                                break;
                            case "maxhp":
                            case "hp":
                                item.setHp(val);
                                break;
                            case "maxmp":
                            case "mp":
                                item.setMp(val);
                                break;
                            case "speed":
                                item.setSpeed(val);
                                break;
                            case "jump":
                                item.setJump(val);
                                break;
                            case "upgradeslots":
                            case "tuc":
                            case "slots":
                                item.setUpgradeSlots(val);
                                break;
                            default:
                                cm.sendGetText("Unrecognized argument: #r" + stat + "#k");
                                return;
                        }
                    }
                    MapleInventoryManipulator.addFromDrop(c, item, false);

                    //var victim = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName("AyeeAyeeRon");
                    //MapleInventoryManipulator.removeAllById(victim.getClient(), item.getItemId(), true);
                    //MapleInventoryManipulator.addFromDrop(victim.getClient(), item, 1);
                    cm.sendGetText("itemId val1 stat1 val2 stat2 val3 stat3...");
                } else {
                    p.dropMessage(1, "Your inventory is full. Please remove an item from your " + type.name().toLowerCase() + " inventory, and then type @mapleadmin into chat to claim the item.");
                    cm.dispose();
                    return;
                }
            } else if (splitted.length === 1) {
                cm.gainItem(itemId, 1);
            } else {
                cm.sendGetText("Can't add stats to non-equip item.");
            }
        } catch (e) {
            cm.sendGetText("#r" + e.message + "#k");
        }
    }
}
