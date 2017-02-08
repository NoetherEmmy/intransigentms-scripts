/*
 * Mr. Hong
 * Kerning City Storage Keeper
 *
 * ID: 1052017
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("Looks like my storage's all used up. Sorry bud.");
    cm.dispose();
    return;
}
