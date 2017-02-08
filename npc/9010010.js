/**
 * @Name         Cassandra
 * @NPC:         9010010
 * @Purpose:     Donator benefits
 * @Map:         Many
 */

var MapleDisease = Java.type("net.sf.odinms.client.MapleDisease");
var TimerManager = Java.type("net.sf.odinms.server.TimerManager");

var status;
var chairs =
[
    3010000, /* The Relaxer */
    3010001, /* Sky-blue Wooden Chair */
    3010002, /* Green Chair */
    3010003, /* Red Chair */
    3010004, /* The Yellow Relaxer */
    3010005, /* The Red Relaxer */
    3010006, /* Yellow Chair */
    3010007, /* Pink Seal Cushion */
    3010008, /* Blue Seal Cushion */
    3010009, /* A chair of love */
    3010010, /* White Seal Cushion */
    3010011, /* Amorian Relaxer */
    3010012, /* Warrior Throne */
    3010013, /* Beach Chair */
    3010014, /* Moon Star Chair */
    3010015, /* The Red Relaxer */
    3010016, /* Grey Seal Cushion */
    3010017, /* Gold Seal Cushion */
    3010018, /* Palm Tree Beach Chair */
    3010019, /* Kadomastsu */
    3010022, /* White Polar Bear Chair */
    3010023, /* Brown Polar Bear Chair */
    3010024, /* Pink Teddy Chair */
    3010025, /* Under the Maple Tree... */
    3010040, /* The Stirge Seat */
    3010041, /* Skull Throne */
    3011000  /* Fishing Chair */
];
var addedchairs =
[
    3010036, 3010021, 3010043, 3010045,
    3010046, 3010047, 3010049, 3010052,
    3010055, 3010057, 3010058, 3010060,
    3010061, 3010062, 3010063, 3010064,
    3010065, 3010066, 3010067, 3010068,
    3010072, 3010075, 3010080, 3010092,
    3010095, 3010097, 3010099, 3010108,
    3010109, 3010110, 3010111, 3010113,
    3010114, 3010118, 3010119, 3010126,
    3010127, 3010128, 3010129, 3010130,
    3010131, 3010134, 3010137, 3010139,
    3010152, 3010155, 3010156, 3010161,
    3010170, 3010172, 3011000, 3012005,
    3012010
];

function start() {
    var p = cm.getPlayer();
    
    /*
    if (["Skykitsune", "Skykit", "Skykitsu"].indexOf("" + p.getName()) !== -1) {
        p.setDonator(1);
    }
    */
    if ("" + p.getName() === "") {
        p.setDonator(1);
    }
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && status === 0) {
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
            var chairlist = "";
            var i;
            for (i = 0; i < chairs.length; ++i) {
                chairlist += "#L" + chairs[i] + "##i" + chairs[i] + "##l\r\n";
            }
            for (i = 0; i < addedchairs.length; ++i) {
                chairlist += "#L" + addedchairs[i] + "##i" + addedchairs[i] + "##l\r\n";
            }
            cm.sendSimple("Pick a chair of your liking:\r\n\r\n" + chairlist);
        }
    } else if (status === 2) {
        cm.sendOk("Here you go:\r\n\r\n#i" + selection + "#");
        cm.gainItem(selection, 1);
        cm.dispose();
        return;
    }
}
