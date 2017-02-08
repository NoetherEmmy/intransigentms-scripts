/*
 * Chrishrama
 * Beyond The Grave | Purgatory
 * ID: 1061000
 * Death NPC
 */

load('nashorn:mozilla_compat.js');

importPackage(Packages.net.sf.odinms.client);

var status;
var heirloomcount = 1;
var pastlife, pastlifelevel;
var itemplural = "items";
var thisplural = "these items";
var heirlooms = 0;
var leavebehind = [];
var firsttime = true;
var ranout = false;

function start() {
    pastlife = cm.getPlayer().getLastPastLife().orElse(null);
    if (!pastlife) {
        cm.dispose();
        return;
    }
    pastlifelevel = pastlife.get(0).intValue();
    if (pastlifelevel >= 120) {
        heirloomcount = 4;
    } else if (pastlifelevel >= 70) {
        heirloomcount = 3;
    } else if (pastlifelevel >= 30) {
        heirloomcount = 2;
    } else {
        heirloomcount = 1;
        itemplural = "item";
        thisplural = "this item";
    }
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    
    if (status >= 6 && heirlooms < heirloomcount && !ranout) {
        status = 5;
        firsttime = false;
    }
    
    if (status === 0) {
        cm.sendOk("#eWelcome to purgatory, #h #.#n You've fought tirelessly, but it's now that you must rest; you have no choice.");
    } else if (status === 1) {
        cm.resetMaxHpMp(cm.getC());
        cm.sendOk("\"...But I would \r\nnot have you, reader, be deflected from \r\nyour good resolve by hearing from me now \r\nhow God would have us pay the debt we owe. \r\n#bDon't dwell upon the form of punishment#k: \r\nconsider what comes after that; at worst \r\nit cannot last beyond the final Judgment.\" \r\n \t \t (Dante, \"#ePurgatorio#n\" Canto X, 105-111)");
    } else if (status === 2) {
        cm.sendOk(
            "Consider your achievements: \r\n\r\nYou were able to attain #b" +
            ((pastlife.get(0) !== null && pastlife.get(0).intValue() !== 0) ? pastlife.get(0).intValue() : "???") +
            "#k levels as a #d" +
            (cm.getPlayer().getJobAchieved() !== null ? cm.getPlayer().getJobAchieved().name() : "???") +
            "#k."
        );
    } else if (status === 3) {
        cm.sendOk("Fortunately, you have an heir who wishes to follow in your footsteps. It is now that you must bequeath to your successor what you can salvage.");
    } else if (status === 4) {
        cm.gainMeso(Math.ceil(-0.7 * cm.getMeso())); // Takes away 70% of player's mesos as "death toll"
        cm.sendOk(
            "You must first pay the death toll, but after this you may bequeath your remaining wealth to your successor, along with exactly #b" +
            heirloomcount +
            "#k heirloom " +
            itemplural +
            ", owing to the power you have achieved this life."
        );
    } else if (status === 5) {
        if (!firsttime) {
            if (selection < 0) {
                selection = 0;
            }
            leavebehind.push(selection);
        }
        cm.stripEquips(cm.getC());
        var t = "Select a heirloom of your choice:\r\n\r\n" +
                cm.equipList(cm.getC(), ((leavebehind.length >= 1) ? leavebehind[0] : -1), ((leavebehind.length >= 2) ? leavebehind[1] : -1), ((leavebehind.length >= 3) ? leavebehind[2] : -1), ((leavebehind.length >= 4) ? leavebehind[3] : -1));
        if (t.length > 43) {
            cm.sendSimple(t);
            heirlooms++;
        } else {
            cm.sendOk("You don't have any more items to keep.");
            ranout = true;
        }
    } else if (status === 6) {
        if (!ranout) {
            if (selection < 0) {
                selection = 0;
            }
            leavebehind.push(selection);
        }
        cm.clearItems(cm.getC(), ((leavebehind.length >= 1) ? leavebehind[0] : -1), ((leavebehind.length >= 2) ? leavebehind[1] : -1), ((leavebehind.length >= 3) ? leavebehind[2] : -1), ((leavebehind.length >= 4) ? leavebehind[3] : -1));
        cm.sendSimple(
            "Very well. Your heir will be grateful to recieve " +
            thisplural +
            ". It's now time to let them take the reins; pacis, mi.\r\n\r\n#L0#I'd like my heir to start in Henesys.#l\r\n#L1#I'd rather my heir start out on Maple Island.#l"
        );
    } else if (status === 7) {
        if (cm.getPlayer().getGender() === 0) {
            cm.gainItem(1060002, 1);
            cm.gainItem(1040010, 1);
        } else {
            cm.gainItem(1061008, 1);
            cm.gainItem(1041010, 1);
        }
        cm.gainItem(1072005, 1);
        cm.gainItem(1092003, 1);
        if (Math.random() < 0.5) {
            cm.gainItem(1312004, 1);
        } else {
            cm.gainItem(1322005, 1);
        }
        cm.gainItem(2000000, 12);
        cm.gainItem(2000003, 10);
        if (selection < 1) {
            cm.warp(100000000);
        } else {
            cm.warp(40000);
        }
        cm.dispose();
        return;
    }
}
