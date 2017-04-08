/*
 * Chrishrama
 * Beyond The Grave | Purgatory
 * ID: 1061000
 *
 * Death NPC
 */

var Arrays   = Java.type("java.util.Arrays");
var IntArray = Java.type("int[]");
var MapleJob = Java.type("net.sf.odinms.client.MapleJob");

var status;
var heirloomCount = 1;
var pastLife, pastLifeLevel;
var itemPlural = "items";
var thisPlural = "these items";
var heirlooms = 0;
var leaveBehind;
var firstTime = true;
var ranOut = false;

function start() {
    pastLife = cm.getPlayer().getLastPastLife().orElse(null);
    if (!pastLife) {
        cm.dispose();
        return;
    }
    pastLifeLevel = pastLife.get(0).intValue();
    if (pastLifeLevel >= 200) {
        heirloomCount = 5;
    } else if (pastLifeLevel >= 120) {
        heirloomCount = 4;
    } else if (pastLifeLevel >= 70) {
        heirloomCount = 3;
    } else if (pastLifeLevel >= 30) {
        heirloomCount = 2;
    } else {
        heirloomCount = 1;
        itemPlural = "item";
        thisPlural = "this item";
    }

    leaveBehind = new IntArray(heirloomCount);
    Arrays.fill(leaveBehind, -1);

    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    status++;

    if (status >= 6 && heirlooms < heirloomCount && !ranOut) {
        status = 5;
        firstTime = false;
    }

    if (status === 0) {
        cm.sendOk("#eWelcome to purgatory, #h #.#n You've fought tirelessly, but it's now that you must rest; you have no choice.");
    } else if (status === 1) {
        cm.resetMaxHpMp();
        cm.sendOk("\"...But I would\r\nnot have you, reader, be deflected from\r\nyour good resolve by hearing from me now\r\nhow God would have us pay the debt we owe.\r\n#bDon't dwell upon the form of punishment#k:\r\nconsider what comes after that; at worst\r\nit cannot last beyond the final Judgment.\"\r\n \t \t (Dante, \"#ePurgatorio#n\" Canto X, 105-111)");
    } else if (status === 2) {
        cm.sendOk(
            "Consider your achievements:\r\n\r\nYou were able to attain #b" +
                (pastLife.get(0).intValue() !== 0 ? pastLife.get(0).intValue() : "???") +
                "#k levels as a #d" +
                (pastLife.get(1) !== null ? MapleJob.getJobName(pastLife.get(1)) : "???") +
                "#k."
        );
    } else if (status === 3) {
        cm.sendOk("Fortunately, you have an heir who wishes to follow in your footsteps. It is now that you must bequeath to your successor what you can salvage.");
    } else if (status === 4) {
        cm.gainMeso(Math.ceil(-0.7 * cm.getMeso())); // Takes away 70% of player's mesos as "death toll"
        cm.sendOk(
            "You must first pay the death toll, but after this you may bequeath your remaining wealth to your successor, along with exactly #b" +
                heirloomCount +
                "#k heirloom " +
                itemPlural +
                ", owing to the power you have achieved this life."
        );
    } else if (status === 5) {
        if (!firstTime) {
            leaveBehind[heirlooms - 1] = selection;
        }
        cm.stripEquips();
        var selectText = "Select a heirloom of your choice:\r\n\r\n" + cm.equipList(leaveBehind);
        if (selectText.length > 43) {
            cm.sendSimple(selectText);
            heirlooms++;
        } else {
            cm.sendOk("You don't have any more items to keep.");
            ranOut = true;
        }
    } else if (status === 6) {
        if (!ranOut) {
            leaveBehind[heirlooms - 1] = selection;
        }
        cm.clearItems(leaveBehind);
        cm.sendSimple(
            "Very well. Your heir will be grateful to recieve " +
                thisPlural +
                ". It's now time to let them take the reins; pacis, mi.\r\n\r\n#L0#I'd like my heir to start in Henesys.#l\r\n#L1#I'd rather my heir start out on Maple Island.#l"
        );
    } else if (status >= 7) {
        if (p.getGender() === 0) {
            cm.gainItem(1060002);
            cm.gainItem(1040010);
        } else {
            cm.gainItem(1061008);
            cm.gainItem(1041010);
        }
        cm.gainItem(1072005);
        cm.gainItem(1092003);
        if (Math.random() < 0.5) {
            cm.gainItem(1312004);
        } else {
            cm.gainItem(1322005);
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
