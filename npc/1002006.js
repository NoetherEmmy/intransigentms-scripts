/*
 * Chef
 * Lith Harbor proper
 *
 * ID: 1002006
 */
 
var status;
var MapleStat = Java.type("net.sf.odinms.client.MapleStat");

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if (status === 0) {
        cm.sendOk("I'm the Chef around here.\r\n\r\nIs it a food item? I'll make the shit out of it.");
        cm.dispose();
        return;
    } else if (status === 1) {
        cm.sendOk("selection = " + selection);
        cm.dispose();
        return;
    }
}
