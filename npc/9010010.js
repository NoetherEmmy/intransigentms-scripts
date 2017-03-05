/*
 * Cassandra
 * ID: 9010010
 *
 * Donator benefits
 */

var MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");

var status;
var chairsPerPage = 40;
var chairs, chairCount, pageSelection;

function start() {
    var p = cm.getPlayer();

    if ("" + p.getName() === "Locust") {
        p.setDonator(1);
    }

    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i;
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && (status === 0 || type === 4 || type === 12)) {
        cm.dispose();
        return;
    } else if (status === 2 && selection === 0) {
        status = 0;
        selection = 1;
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
        if (cm.getPlayer().isDonator() > 0) {
            cm.sendSimple("#eThank you so much for donating to #dIntransigentMS#k#n!\r\nWhat would you like?:\r\n\r\n#L0#Set my account's NX to 900,000.#l\r\n#L1#I want a chair.#l");
        } else {
            cm.sendOk("It doesn't look like you're donated. If you'd like to, please visit\r\n\r\n#bwww.intransigentms.com#k\r\n\r\nIf you've already donated, try relogging, and if that doesn't work, contact a GM.");
            cm.dispose();
            return;
        }
    } else if (status === 1) {
        if (selection === 0) {
            cm.sendOk("You're all set!");
            cm.modifyNx(900000 - cm.getNx(1));
            cm.dispose();
            return;
        } else if (selection === 1) {
            chairs = MapleItemInformationProvider.getInstance().getChairIds();
            chairCount = chairs.size();
            var pageCount = Math.ceil(chairCount / chairsPerPage);
            var pages = "Select a page to choose from:\r\n";
            for (i = 0; i < pageCount; ++i) {
                pages += "\r\n#L" + i + "#Page " + (i + 1) + "#l";
            }
            cm.sendSimple(pages);
        }
    } else if (status === 2) {
        if (selection >= 0) {
            pageSelection = selection;
        }
        var chairList = "";
        var start = chairsPerPage * pageSelection;
        for (i = start; i < start + chairsPerPage && i < chairCount; ++i) {
            chairList += "\r\n#L" + chairs.get(i) + "##i" + chairs.get(i) + "##l";
        }
        cm.sendSimple("Pick a chair of your liking (page #b" + Math.floor(i / 40) + "#k):\r\n\r\n#L0#Go back to the page selection.#l" + chairList);
    } else if (status === 3) {
        cm.sendPrev("Here you go:\r\n\r\n#i" + selection + "#");
        cm.gainItem(selection, 1);
    }
}
