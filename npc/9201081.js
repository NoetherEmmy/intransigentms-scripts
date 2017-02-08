/* 
 * Rob
 * Mass eqp delete NPC
 *
 * ID: 9201081
 */

var status = 0;
var firstslot = -1;
var lastslot = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
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
            cm.sendSimple("Select below the first slot you want the equipment inventory selling to begin at. Remember that the item you select will be sold!:\r\n\r\n" + cm.plainEquipList());
        } else if (status === 1) {
            firstslot = selection;
            if (firstslot === -1) {
                cm.dispose();
                return;
            }
            cm.sendSimple("Now, select below the last slot you want to be sold. Remember that this item and all the ones between it and the first one you selected will be sold!:\r\n\r\n" + cm.plainEquipList());
        } else if (status === 2) {
            lastslot = selection;
            if (lastslot === -1) {
                cm.dispose();
                return;
            }
            var temp;
            if (lastslot < firstslot) {
                temp = lastslot;
                lastslot = firstslot;
                firstslot = temp;
            }
            cm.sellSlotRange(firstslot, lastslot);
            
            cm.sendOk("You're all set!");
            cm.dispose();
            return;
        }
    }
}
