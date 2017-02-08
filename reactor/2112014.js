/*
 * 2112014.js:
 * Zakum Party Quest Giant Chest - drops a Fire Ore when 7 Keys are dropped in front of it
 */

var Item = Java.type("net.sf.odinms.client.Item");

var itemId = 4001018;

function act() {
    //rm.dropItems();
    var drop = new Item(itemId, 0, 1);
    rm.getReactor()
      .getMap()
      .spawnItemDrop(
          rm.getReactor(),
          rm.getPlayer(),
          drop,
          rm.getReactor().getPosition(),
          false,
          true
      );
}
