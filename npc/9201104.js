/*
 * Sage [1]
 * Valley of Heroes 1
 *
 * ID: 9201104
 */
 
var status;
var resurrection = 2321006;
var samsara = 5121000;
var elanvital = 4031485;
var choice = -1;
var goingthere = false;

function start() {
    var p = cm.getPlayer();
    if (p.getMap().getId() === 610020000) {
        goingthere = true;
    }
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    var p = cm.getPlayer();
    var go, extra;
    if (mode === -1) {
        cm.dispose();
        return;
    }
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
        if (mode === 0) {
            cm.dispose();
            return;
        }
        if (
            (
                (p.getJob().getId() === 232 && p.getSkillLevel(resurrection) > 0) ||
                (p.getJob().getId() === 512 && p.getSkillLevel(samsara) > 0 && p.getTotalInt() >= 750)
            ) &&
            cm.itemQuantity(elanvital) < 3
        ) {
            extra = "";
            if (goingthere) {
                go = "I want to go to Crimsonwood Keep.";
                extra = "\r\n#L3#I want to go back to the Phantom Forest.#l";
            } else {
                go = "I want to go back to the Phantom Forest.";
            }
            cm.sendSimple("#estatue stares at you stonily#n\r\n\r\n#L2#" + go + "#l\r\n#L0#I want you to recharge my Resurrection/Samsara skill.#l" + extra + "\r\n#L1#(walk away)#l");
        } else {
            extra = "";
            if (goingthere) {
                go = "I want to go to Crimsonwood Keep.";
                extra = "\r\n#L3#I want to go back to the Phantom Forest.#l";
            } else {
                go = "I want to go back to the Phantom Forest.";
            }
            cm.sendSimple("#estatue stares at you stonily#n\r\n\r\n#L2#" + go + "#l" + extra + "\r\n#L1#(walk away)#l");
        }
    } else if (status === 1) {
        choice = selection;
        if (selection === 0) {
            cm.sendYesNo("That will cost you #r100 Maple Leaves#k and #b100,000,000 mesos#k.\r\n\r\nDo you have these things for me right now?");
        } else if (selection === 1) {
            cm.dispose();
            return;
        } else if (selection === 2) {
            if (goingthere) {
                go = "Crimsonwood Keep";
            } else {
                go = "Phantom Forest";
            }
            cm.sendYesNo("Are you sure you want to go to #r" + go + "#k?");
        } else if (selection === 3) {
            cm.warp(610020000);
            cm.dispose();
            return;
        }
    } else if (status === 2) {
        if (choice === 0) {
            if (cm.itemQuantity(4001126) >= 100 && p.getMeso() >= 100000000) {
                if (p.canElanRecharge()) {
                    p.updateLastElanRecharge();
                    cm.gainItem(4001126, -100);
                    cm.gainMeso(-100000000);
                    cm.gainItem(elanvital, 3 - cm.itemQuantity(elanvital));
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk(p.getElanRechargeTimeString());
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("It doesn't look like you have the right things to give me.");
                cm.dispose();
                return;
            }
        } else if (choice === 2) {
            if (goingthere) {
                cm.warp(610020002);
            } else {
                cm.warp(610020000);
            }
            cm.dispose();
            return;
        }
    }
}
