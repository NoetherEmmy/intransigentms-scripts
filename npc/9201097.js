/* 
 * Joko
 * Buy back NPC
 *
 * ID: 9201097
 */

var MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");
var MapleInventoryType           = Java.type("net.sf.odinms.client.MapleInventoryType");
var MapleInventoryManipulator    = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
var MaplePet                     = Java.type("net.sf.odinms.client.MaplePet");
var MaplePacketCreator           = Java.type("net.sf.odinms.tools.MaplePacketCreator");

var status;
var hasTalked = false;
var ii;

function itemGain(item, qty) {
    var id = item.getItemId();
    var type = ii.getInventoryType(id);
    if (type.equals(MapleInventoryType.EQUIP) && !ii.isThrowingStar(id) && !ii.isBullet(id)) {
        item.setQuantity(1);
        if (!cm.getPlayer().getInventory(type).isFull()) {
            MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
        } else {
            return false;
        }
    } else if (MapleInventoryManipulator.checkSpace(cm.getC(), id, qty, "")) {
        if (id >= 5000000 && id <= 5000100) {
            if (qty > 1) {
                qty = 1;
            }
            var petId = MaplePet.createPet(id);
            MapleInventoryManipulator.addById(cm.getC(), id, 1, null, petId);
        } else {
            MapleInventoryManipulator.addById(cm.getC(), id, qty);
        }
    } else {
        return false;
    }
    cm.getC().getSession().write(MaplePacketCreator.getShowItemGain(id, qty, true));
    return true;
}

function start() {
    ii = MapleItemInformationProvider.getInstance();
    status = 0;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i;
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && (status === 0 || type === 4)) {
        cm.dispose();
        return;
    }
    if (mode !== 1) {
        status--;
    }
    switch (status) {
        case 0:
            if (hasTalked) {
                if (selection < 1) {
                    cm.dispose();
                    return;
                }
                var iter = p.readBuyBacks().entrySet().iterator();
                i = 1;
                while (iter.hasNext()) {
                    var next = iter.next();
                    if (i === selection) {
                        if (itemGain(next.getKey(), next.getValue())) {
                            var id = next.getKey().getItemId();
                            var price = ii.getPrice(id);
                            var mesosToTake = Math.floor(Math.max(Math.ceil(price), 0));
                            var realQty;
                            if (!ii.isThrowingStar(id) && !ii.isBullet(id)) {
                                realQty = next.getKey().getQuantity();
                            } else {
                                realQty = 1;
                            }
                            if (price >= 0 && mesosToTake > 0) {
                                p.gainMeso(-mesosToTake * realQty, true);
                            }
                            p.removeBuyBack(next.getKey());
                        } else {
                            cm.sendOk("It looks like your inventory is full at the moment.\r\n\r\nPlease make room for the item(s) you want to buy back, and then come back to me.");
                            cm.dispose();
                            return;
                        }
                        break;
                    }
                    i++;
                }
            }
            i = 1;
            var s = "";
            p.readBuyBacks().entrySet().forEach(function(bb) {
                s += i % 4 === 1 ? "\r\n" : "";
                s += "#L" +
                     i +
                     "##i" +
                     bb.getKey().getItemId() +
                     "# (#b" +
                     bb.getValue() +
                     "#k)#l  ";
                i++;
            });
            cm.sendSimple("Hey, I'm Joko! If you have to come to me, that means your selling habits are getting a little out of control! Let me help with that. Click an item below to buy it back:\r\n\r\n#L0#I'm done buying back items.#l" + s);
            hasTalked = true;
            break;
        default:
            cm.dispose();
            return;
    }
}
