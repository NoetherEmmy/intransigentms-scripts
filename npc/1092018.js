/*
 * Trash Can | Aboard the Nautilus
 * ID: 1092018
 */

function start() {
    cm.sendNext("A half-written letter... maybe it's important! Should I take a look?");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031839)) {
        cm.sendOk("I've already picked one up. I don't think I'll need to pick up another one.");
        cm.dispose();
        return;
    } else {
        cm.gainItem(4031839, 1);
        cm.sendOk("I can barely make this out... but it reads Kyrin.");
        cm.dispose();
        return;
    }
}
