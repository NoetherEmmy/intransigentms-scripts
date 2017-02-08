/*
 * Tombstone (Ludi)
 * ID: 2041024
 * Intermediate death NPC for players level 110+
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode === 1) {
        status++;
    } else if (mode < 0) {
        cm.dispose();
        return;
    } else {
        status--;
    }
    if (status < 0) {
        status = 0;
    }
    if (status === 0) {
        var msg = "";
        if (cm.getJob().getId() === 232) {
            msg += "\r\nOnce your death timer runs out, if your Resurrection skill is working and not on cooldown, you will automatically resurrect yourself.\r\n";
        }
        if (cm.itemQuantity(3992027) >= 1) {
            msg += "\r\n#L0#I would like to melt a Red Candle to revive myself.#l";
        }
        if (msg !== "") {
            cm.sendSimple("Alas, it seems you have lost all your life." + msg + "\r\n#L1#(exit dialogue box)#l");
        } else {
            cm.dispose();
            return;
        }
    } else if (status === 1) {
        if (selection === 0) {
            cm.gainItem(3992027, -1);
            cm.revive();
            cm.dispose();
            return;
        } else if (selection === 1) {
            cm.dispose();
            return;
        }
    } else {
        cm.dispose();
        return;
    }
}
