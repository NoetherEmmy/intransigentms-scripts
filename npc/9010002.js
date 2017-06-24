/*
 * Mia
 * ID: 9010002
 *
 * Allows players to trade in Maple leaves for NX,
 * option to instead trade for gach tix if all quests
 * are complete, accepts presents, sells cash items,
 * has meso-based store for special items, sells
 * Unripe Onyx Apples, allows trading in vote points
 * for rewards.
 */

"use strict";

const Collectors                   = Java.type("java.util.stream.Collectors");
const MapleInventoryType           = Java.type("net.sf.odinms.client.MapleInventoryType");
const MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");

let status;
const ii = MapleItemInformationProvider.getInstance();
let casheqs;
let cashpage = 0;
let cashtype = 0;
let purchase = 0;
let search = "";
let searchpurchase = false;
const linesperpage = 10;

const casheqtypes = {
    100: ["Hats", 2900],
    101: ["Face accessories", 2250],
    102: ["Eye accessories", 3100],
    103: ["Ear accessories", 2200],
    104: ["Topwears", 2800],
    105: ["Overalls", 4000],
    106: ["Bottomwears", 2000],
    107: ["Shoes", 2000],
    108: ["Gloves", 2250],
    109: ["Shields", 3700],
    110: ["Capes", 3000],
    111: ["Rings", 4000],
    170: ["Weapons", 4100],
    180: ["Pet equips", 1900],
};
const bannedCash = [
    1112500,
    1112501
];
const prizes =
[
  /* ID       chance quantity */
    [2049100, 0.2,     4], /* Chaos scrolls 60% */
    [1002357, 0.15,    1], /* Zakum Helmet (1) */
    [4031519, 0.09375, 1], /* VIP item of choice */
    [2022121, 0.05,    3], /* Gelt chocolates/Subani's cauldrons */
    [2040807, 0.008,   2], /* GM scrolls */
    [2044303, 0.008,   2],
    [2044403, 0.008,   2],
    [2043003, 0.008,   2],
    [2043103, 0.008,   2],
    [2043203, 0.008,   2],
    [2043803, 0.008,   2],
    [2043703, 0.008,   2],
    [2044503, 0.008,   2],
    [2044603, 0.008,   2],
    [2044703, 0.008,   2],
    [2043303, 0.008,   2],
    [2049004, 0.08,    3], /* Innocence scrolls */
    [4001126, 0.2,    26], /* Maple leaves */
    [2340000, 0.13025, 2], /* White scrolls */
];
const otherCash =
[
    5021024,
    5170000,
    5000000,
    5000001,
    5000002,
    5000003,
    5000004,
    5000005,
    5000006,
    5000007,
    5000008,
    5000009,
    5000010,
    5000011,
    5000012,
    5000014,
    5000017,
    5000020,
    5000022,
    5000023,
    5000024,
    5000025,
    5000028,
    5000036,
    5000041,
    5000047,
];
const otherPrice = 5000;
const featUnlockables = {
    23: "So, you uh... sell All-Cure Potions by any chance?",
    31: "I want pet food. A lot of pet food.",
    43: "Got any deals on... VIP Teleport Rocks?"
};
let unlockableselection;
const nxratio = 250;
let gachratio = 4;
const wsratio = 1;
const chairratio = 1;
const appleratio = 3;
const apratio = 10;
const chaosratiovp = 2;
const chaosratiocs = 3;
const gachratiovp = 8;
let fornx = false;
let forgach = false;
let forws = false;
let forapple = false;
let forcash = false;
let forap = false;
let forchaos = false;
let forgachvp = false;
let forother = false;
let forunlockable = false;

function basicType(id) {
    const bt = Math.floor(id / 10000);
    if (bt < 130) {
        return bt;
    } else if (bt >= 180) {
        return 180;
    } else {
        return 170;
    }
}

function getCashList() {
    let cashlist = "";
    for (let i = cashpage * 5 * linesperpage; i < casheqs.length && i < (cashpage + 1) * 5 * linesperpage; ++i) {
        cashlist += "#L" + (i + 3) + "##i" + casheqs[i] + "#" + (i % 5 === 4 ? "\r\n" : "\t");
    }
    return cashlist;
}

function start() {
    const p = cm.getPlayer();
    gachratio = p.hasFeat(1) ? 3 : 4;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();
    let vp, cashlist, leavestotrade;
    if (mode === -1) {
        /*
        if (forcash && status !== 1) {
            status = 1;
            selection = 2;
        } else {
        */
            cm.dispose();
            return;
        /*}*/
    }
    status++;
    if (forcash) {
        if (searchpurchase) {
            switch (search) {
                case "list":
                case "lucky":
                    if (selection === -1) {
                        cm.dispose();
                        return;
                    } else if (selection === 0) {
                        status = 1;
                        selection = 2;
                    } else {
                        if (cm.buyWithNx(casheqtypes[basicType(selection)][1])) {
                            cm.gainItem(selection, 1);
                            status = 1;
                            selection = 2;
                        } else {
                            cm.sendOk("Sorry, you don't have enough NX to purchase this item.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
                            cm.dispose();
                            return;
                        }
                    }
                    break;
                case "id": // Handled below
                    break;
            }
        }
        if (status >= 3 && search === "id" && selection < 0) {

        }
        if (status >= 3 && selection === 2 && mode === 1) {
            status = 1;
            selection = 2;
        } else if (status >= 4 && type === 1 && mode === 1) {
            if (forother) {
                if (cm.buyWithNx(otherPrice)) {
                    cm.gainItem(purchase, 1);
                    status = 1;
                    selection = 2;
                } else {
                    cm.sendOk("Sorry, you don't have enough NX to purchase this item.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
                    cm.dispose();
                    return;
                }
            } else if (purchase < 1000000) {
                if (cm.buyWithNx(casheqtypes[basicType(casheqs[purchase - 3])][1])) {
                    cm.gainItem(casheqs[purchase - 3], 1);
                    status = 1;
                    selection = 2;
                } else {
                    cm.sendOk("Sorry, you don't have enough NX to purchase this item.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
                    cm.dispose();
                    return;
                }
            } else {
                if (cm.buyWithNx(casheqtypes[basicType(purchase)][1])) {
                    cm.gainItem(purchase, 1);
                    status = 1;
                    selection = 2;
                } else {
                    cm.sendOk("Sorry, you don't have enough NX to purchase this item.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
                    cm.dispose();
                    return;
                }
            }
        } else if (status >= 3 && status <= 4 && type === 0 && mode >= 0 && mode <= 1) {
            status = 1;
            selection = 2;
            mode = 1;
        } else if (search === "id" && /*type >= 0 && type <= 1 &&*/ selection === -1) {
            status = 1;
            selection = 2;
        }
    }
    if (status === 0) {
        if (mode < 1) {
            cm.dispose();
            return;
        }
        forcash = false;
        cm.sendSimple("Hi there, I'm Mia. You can cash in your #bmaple leaves#k to me in exchange for gachapon tickets (4:1, or 3:1 if you've attained the #eAdventuresome completionist#n feat), NX (1:" + nxratio + "), or Unripe Onyx Apples (" + appleratio + ":1)!\r\n\r\n#L0#I'd like to trade in my maple leaves for NX.#l\r\n#L1#I'd like to trade in my maple leaves for gachapon tickets.#l\r\n#L7#I'd like to trade in my maple leaves for Unripe Onyx Apples.#l\r\n#L2#I'd like to buy NX equipment.#l\r\n#L3#I heard you sell some items on the side for mesos.#l\r\n#L4#I have a present for you.#l\r\n#L5#I'd like to trade in " + chairratio + " of my vote points for a random chair.#l\r\n#L6#I'd like to trade in some vote points for White Scrolls.#l\r\n#L8#I'd like to trade in some vote points for AP Resets.#l\r\n#L9#I'd like to trade in some vote points for Chaos Scrolls (" + chaosratiovp + ":" + chaosratiocs + ").#l\r\n#L10#I'd like to trade in some vote points for gachapon tickets (1:" + gachratiovp + ").#l\r\n#L12#I heard you had... something special for me.#l");
    } else if (status === 1) {
        if (selection === 0) {
            if (cm.itemQuantity(4001126) < 1) {
                cm.sendOk("You don't have any maple leaves!");
                cm.dispose();
                return;
            }
            cm.sendGetNumber("How many maple leaves would you like to trade in?", cm.itemQuantity(4001126), 1, cm.itemQuantity(4001126));
            fornx = true;
        } else if (selection === 1) {
            if (cm.itemQuantity(4001126) < gachratio) {
                cm.sendOk("Sorry, it doesn't look like you have enough maple leaves yet!\r\n\r\nThe exchange ratio is #b" + gachratio + "#k maple leaves for #b1#k gachapon ticket.");
                cm.dispose();
                return;
            } else {
                cm.sendGetNumber(`How many maple leaves would you like to trade in? (This number will be rounded down to the nearest multiple of ${gachratio}.)`, cm.itemQuantity(4001126) - cm.itemQuantity(4001126) % gachratio, gachratio, cm.itemQuantity(4001126));
            }
            forgach = true;
        } else if (selection === 2) {
            forcash = true;
            cashpage = 0;
            casheqs = [];
            search = "";
            searchpurchase = false;
            let typestring = "";
            for (type in casheqtypes) {
                typestring += "\r\n#L" + type + "#" + casheqtypes[type][0] + "#l";
            }
            cm.sendSimple("Sure thing! What are you looking for?\r\n\r\n#L0#I'd like to search for an equip.#l\r\n#L1#I'm feeling lucky: show me the closest match to my search.#l\r\n#L2#I know the ID of the equip I want.#l\r\n#L3#I want to toggle the gender filter.#l" + typestring + "\r\n#L4#Other#l");
        } else if (selection === 3) {
            cm.openShop(1000);
            cm.dispose();
            return;
        } else if (selection === 4) {
            if (cm.itemQuantity(3992005) > 0) {
                let prize;
                let prizequantity = 1;
                const chance = Math.random();
                let cumulativechance = 0.0;
                for (let i = 0; i < prizes.length; ++i) {
                    cumulativechance += prizes[i][1];
                    if (cumulativechance > chance) {
                        prize = prizes[i][0];
                        prizequantity = prizes[i][2];
                        break;
                    }
                }
                if (prize === 0) { // NX
                    const nxamount = Math.floor(Math.random() * 15001 + 9000);
                    cm.sendOk("Oh my god, thank you so much for the present! Here, have this:\r\n\r\n#e#b" + nxamount + " NX gained.#k#n");
                    cm.modifyNx(nxamount);
                    cm.gainItem(3992005, -1);
                    cm.dispose();
                    return;
                } else if (prize === 1) { // Maple Leaves
                    const leafamount = Math.floor(Math.random() * 10 + 20);
                    cm.sendOk("Oh my god, thank you so much for the present! Here, have this:\r\n\r\n#i4001126#  x" + leafamount);
                    cm.gainItem(4001126, leafamount);
                    cm.gainItem(3992005, -1);
                    cm.dispose();
                    return;
                } else if (prize === 4031519) { // Christmas present
                    cm.sendOk("Oh my god, thank you so much for the present! Here, have this:\r\n\r\n#i" + prize + "# .\r\n\r\nTurn #ethis#n present in to the Maple Administrator (#d@mapleadmin#k) for a #bVIP item#k of your choice!");
                    cm.gainItem(prize, prizequantity);
                    cm.gainItem(3992005, -1);
                    cm.dispose();
                    return;
                } else if (prize === 2022121) { // Gelt chocolate
                    cm.sendOk("Oh my god, thank you so much for the present! Here, have these:\r\n\r\n#i" + prize + "#  x" + prizequantity + "\r\n#i2022283#  x" + prizequantity);
                    cm.gainItem(prize, prizequantity);
                    cm.gainItem(2022283, prizequantity); // Cauldron
                    cm.gainItem(3992005, -1);
                    cm.dispose();
                    return;
                } else { // Everything else
                    cm.sendOk("Oh my god, thank you so much for the present! Here, have this:\r\n\r\n#i" + prize + "#  x" + prizequantity);
                    cm.gainItem(prize, prizequantity);
                    cm.gainItem(3992005, -1);
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("It doesn't look like you have a present for me.");
                cm.dispose();
                return;
            }
        } else if (selection === 5) {
            if (p.getVotePoints() >= chairratio) {
                vp = p.getVotePoints();
                p.setVotePoints(vp - chairratio);
                const chairs = ii.getChairIds();
                const chairid = chairs.get(Math.floor(Math.random() * chairs.size()));
                cm.sendOk("Thanks for the juicy vote points! Here's a chair:\r\n\r\n#i" + chairid + "#");
                cm.gainItem(chairid, 1);
                cm.dispose();
                return;
            } else {
                cm.sendOk("I don't think you have enough vote points.");
                cm.dispose();
                return;
            }
        } else if (selection === 6) {
            vp = p.getVotePoints();
            if (vp > 0) {
                cm.sendGetNumber("How many vote points would you like to trade in?\r\n\r\n(1 vote point -> " + wsratio + " White Scroll" + (wsratio > 1 ? "s" : "") + ")", vp, 1, vp);
                forws = true;
            } else {
                cm.sendOk("I don't think you have any vote points.");
                cm.dispose();
                return;
            }
        } else if (selection === 7) {
            if (cm.itemQuantity(4001126) < appleratio) {
                cm.sendOk("Sorry, it doesn't look like you have enough maple leaves yet!\r\n\r\nThe exchange ratio is #b" + appleratio + "#k maple leaves for #b1#k Unripe Onyx Apple.");
                cm.dispose();
                return;
            } else {
                cm.sendGetNumber(`How many maple leaves would you like to trade in? (This number will be rounded down to the nearest multiple of ${appleratio}.)`, cm.itemQuantity(4001126) - cm.itemQuantity(4001126) % appleratio, appleratio, cm.itemQuantity(4001126));
            }
            forapple = true;
        } else if (selection === 8) {
            vp = p.getVotePoints();
            if (vp > 0) {
                cm.sendGetNumber("How many vote points would you like to trade in?\r\n\r\n(1 vote point -> " + apratio + " AP Resets)", vp, 1, vp);
                forap = true;
            } else {
                cm.sendOk("I don't think you have any vote points.");
                cm.dispose();
                return;
            }
        } else if (selection === 9) {
            vp = p.getVotePoints();
            if (vp > 1) {
                cm.sendGetNumber(`How many vote points would you like to trade in?\r\n\r\n(${chaosratiovp} vote points -> ${chaosratiocs} Chaos Scrolls)`, vp - vp % 2, 2, vp - vp % 2);
                forchaos = true;
            } else {
                cm.sendOk("I don't think you have enough vote points (" + chaosratiovp + " vote points : " + chaosratiocs + " Chaos Scrolls).");
                cm.dispose();
                return;
            }
        } else if (selection === 10) {
            vp = p.getVotePoints();
            if (vp > 0) {
                cm.sendGetNumber("How many vote points would you like to trade in?\r\n\r\n(1 vote point -> " + gachratiovp + " Gachapon Tickets)", vp, 1, vp);
                forgachvp = true;
            } else {
                cm.sendOk("I don't think you have any vote points.");
                cm.dispose();
                return;
            }
        } else if (selection === 11) { // Unused
        } else if (selection === 12) {
            const selectionStr =
                Object
                    .keys(featUnlockables)
                    .filter(function(fid) {
                        return p.hasFeat(+fid);
                    })
                    .reduce(function(accu, fid) {
                        return accu + "\r\n#L" + fid + "#" + featUnlockables[fid] + "#l";
                    }, "");
            if (selectionStr === "") {
                cm.sendPrev("Oh... ummmm...\r\n\r\nNot sure where you heard that from, hun!");
                return;
            }
            cm.sendSimple("Oh, right! Of course! Just pick one:\r\n" + selectionStr);
            forunlockable = true;
        }
    } else if (status === 2) {
        if (mode < 1) {
            cm.dispose();
            return;
        }
        if (fornx) {
            if (selection > cm.itemQuantity(4001126)) {
                cm.sendOk("You don't have that many leaves!");
                cm.dispose();
                return;
            }
            cm.gainItem(4001126, -1 * selection);
            cm.modifyNx(selection * nxratio);
            cm.sendOk(`Thank you! You've been awarded with #b${selection * nxratio}#k NX.`);
            cm.dispose();
            return;
        } else if (forgach) {
            leavestotrade = selection - selection % gachratio;
            let ticketplural = "ticket";
            if (Math.floor(leavestotrade / gachratio) > 1) {
                ticketplural = "tickets";
            }
            if (leavestotrade > cm.itemQuantity(4001126)) {
                cm.sendOk("You don't have that many leaves!");
                cm.dispose();
                return;
            }

            cm.gainItem(4001126, -1 * leavestotrade);
            cm.gainItem(5220000, Math.round(leavestotrade / gachratio));
            cm.sendOk("Thank you! I've given you #b" + Math.round(leavestotrade / gachratio) + "#k gachapon " + ticketplural + ".");
            cm.dispose();
            return;
        } else if (forws) {
            vp = p.getVotePoints();
            if (selection > vp) {
                cm.sendOk("You don't have that many vote points!");
                cm.dispose();
                return;
            }

            p.setVotePoints(vp - selection);
            cm.gainItem(2340000, selection * wsratio);
            cm.sendOk(`Thanks! I've given you #b${selection * wsratio}#k White Scroll${selection * wsratio > 1 ? "s" : ""}.`);
            cm.dispose();
            return;
        } else if (forapple) {
            leavestotrade = selection - selection % appleratio;
            let appleplural = "Apple";
            if (Math.floor(leavestotrade / appleratio) > 1) {
                appleplural = "Apples";
            }
            if (leavestotrade > cm.itemQuantity(4001126)) {
                cm.sendOk("You don't have that many leaves!");
                cm.dispose();
                return;
            }

            cm.gainItem(4001126, -1 * leavestotrade);
            cm.gainItem(2012008, Math.round(leavestotrade / appleratio));
            cm.sendOk("Thank you! I've given you #b" + Math.round(leavestotrade / appleratio) + "#k Unripe Onyx " + appleplural + ".");
            cm.dispose();
            return;
        } else if (forcash) {
            switch (selection) {
                case 0:
                    search = "list";
                    cm.sendGetText("Enter your search query:");
                    break;
                case 1:
                    search = "lucky";
                    cm.sendGetText("Enter your search query:");
                    break;
                case 2:
                    search = "id";
                    cm.sendGetNumber("Enter the ID of the equip:", 1092161, 1000000, 1702999);
                    break;
                case 3:
                    p.toggleGenderFilter();
                    cm.sendPrev("The gender filter is now turned " + (p.genderFilter() ? "on" : "off") + ".");
                    break;
                case 4: {
                    let otherString = "These items cost #d" + otherPrice + " NX#k each. Click an item below to purchase it:\r\n";
                    for (let i = 0; i < otherCash.length; ++i) {
                        const id = otherCash[i];
                        otherString += (i % 4 === 0 ? "\r\n" : "") + "#L" + id + "##i" + id + "##l  ";
                    }
                    cm.sendSimple(otherString);
                    forother = true;
                    break;
                }
                default: {
                    casheqs = [];
                    cashpage = 0;
                    cashtype = selection;
                    const casheqlist =
                        cashtype === 170 ?
                            ii.cashEquipsByType(130, 170) :
                            cashtype === 180 ?
                                ii.cashEquipsByType(180, 183) :
                                ii.cashEquipsByType(cashtype)
                                  .stream()
                                  .filter(function(id) {
                                      return bannedCash.indexOf(id) === -1;
                                  })
                                  .collect(Collectors.toList());
                    if (!p.genderFilter()) {
                        casheqlist.forEach(function(id) { casheqs.push(id); });
                    } else {
                        casheqlist
                            .stream()
                            .filter(function(id) {
                                const gender = Math.floor(id % 10000 / 1000);
                                return gender > 1 || gender === p.getGender();
                            })
                            .forEach(function(id) { casheqs.push(id); });
                    }

                    cm.sendSimple(casheqtypes[cashtype][0] + " cost #d" + casheqtypes[cashtype][1] + " NX#k each. Click an item below to purchase it [#e#gpage " + (cashpage + 1) + "#k#n]:\r\n\r\n#L0##bNext page ->#k#l\r\n#L1##rPrevious page <-#k#l\r\n#L2#I don't want to purchase any of these at the moment.#l\r\n\r\n" + getCashList());
                    break;
                }
            }
        } else if (forap) {
            vp = p.getVotePoints();
            if (selection > vp) {
                cm.sendOk("You don't have that many vote points!");
                cm.dispose();
                return;
            }

            p.setVotePoints(vp - selection);
            cm.gainItem(5050000, selection * apratio);
            cm.sendOk(`Thanks! I've given you #b${selection * apratio}#k AP Resets.`);
            cm.dispose();
            return;
        } else if (forchaos) {
            vp = p.getVotePoints();
            if (selection > vp) {
                cm.sendOk("You don't have that many vote points!");
                cm.dispose();
                return;
            }

            p.setVotePoints(vp - selection);
            cm.gainItem(2049100, Math.round(selection * chaosratiocs / chaosratiovp));
            cm.sendOk("Thanks! I've given you #b" + Math.round(selection * chaosratiocs / chaosratiovp) + "#k Chaos Scrolls.");
            cm.dispose();
            return;
        } else if (forgachvp) {
            vp = p.getVotePoints();
            if (selection > vp) {
                cm.sendOk("You don't have that many vote points!");
                cm.dispose();
                return;
            }

            p.setVotePoints(vp - selection);
            cm.gainItem(5220000, selection * gachratiovp);
            cm.sendOk(`Thanks! I've given you\r\n\r\n#i5220000#   #bx${selection * gachratiovp}#k.`);
            cm.dispose();
            return;
        } else if (forunlockable) {
            unlockableselection = selection;
            let inv, slotsLeft, mesoLimit, limit;
            switch (selection) {
                case 23:
                    inv = p.getInventory(MapleInventoryType.USE);
                    slotsLeft = inv.getSlotLimit() - inv.getSize();
                    if (slotsLeft < 1) {
                        cm.sendOk("Looks like your use inventory is full already, sorry hun.");
                        cm.dispose();
                        return;
                    }
                    mesoLimit = Math.floor(p.getMeso() / 40000);
                    limit = Math.min(slotsLeft * 100, mesoLimit);
                    cm.sendGetNumber("How many would ya like?\r\nThey're #e#d40,000#k#n mesos a pop.", 1, 1, limit);
                    break;
                case 31:
                    inv = p.getInventory(MapleInventoryType.USE);
                    slotsLeft = inv.getSlotLimit() - inv.getSize();
                    if (slotsLeft < 1) {
                        cm.sendOk("Looks like your use inventory is full already, sorry hun.");
                        cm.dispose();
                        return;
                    }
                    mesoLimit = Math.floor(p.getMeso() / 23);
                    limit = Math.min(slotsLeft * 200, mesoLimit);
                    cm.sendGetNumber("How many cartons would ya like?\r\nThey're #e#d23#k#n mesos a pop.", 1, 1, limit);
                    break;
                case 43:
                    inv = p.getInventory(MapleInventoryType.CASH);
                    slotsLeft = inv.getSlotLimit() - inv.getSize();
                    if (slotsLeft < 1) {
                        cm.sendOk("Looks like your cash inventory is full already, sorry hun.");
                        cm.dispose();
                        return;
                    }
                    mesoLimit = Math.floor(p.getMeso() / 500000);
                    limit = Math.min(slotsLeft * 100, mesoLimit);
                    cm.sendGetNumber("How many rocks do ya want?\r\nThey're #e#d500,000#k#n mesos a pop.", 1, 1, limit);
                    break;
                default:
                    cm.dispose();
                    return;
            }
        }
    } else if (status >= 3) {
        if (forcash) {
            if (search.length > 0) {
                switch (search) {
                    case "list": {
                        let results =
                            ii.cashEquipSearch(cm.getText())
                                .stream()
                                .filter(function(id) {
                                    return bannedCash.indexOf(id) === -1;
                                })
                                .collect(Collectors.toList());
                        if (p.genderFilter()) {
                            results = results
                                        .stream()
                                        .filter(function(id) {
                                            const gender = Math.floor(id % 10000 / 1000);
                                            return gender > 1 || gender === p.getGender();
                                        })
                                        .collect(Collectors.toList());
                        }
                        let resultstring = "";
                        for (let i = 0; i < results.size() && i < 30; ++i) {
                            resultstring += "\r\n#L" + results.get(i) + "##i" + results.get(i) + "#\t#r" + casheqtypes[basicType(results.get(i))][1] + " NX#k#l";
                        }
                        if (resultstring.length > 0) {
                            cm.sendSimple("Here are the best matches for your query. Click an item to purchase it:\r\n\r\n#L0#None of these items are what I want.#l\r\n" + resultstring);
                            searchpurchase = true;
                        } else {
                            cm.sendPrev("It doesn't look like your search query turned up any matches!");
                        }
                        break;
                    }
                    case "lucky": {
                        const t = cm.getText();
                        const result = ii.singleCashEquipSearch(t);
                        if (result !== 0 && bannedCash.indexOf(result) === -1) {
                            cm.sendSimple("Here is the best match for your query. Click the item to purchase it:\r\n\r\n#L0#This is not quite what I had in mind.#l\r\n\r\n#L" + result + "##i" + result + "#\t#r" + casheqtypes[basicType(result)][1] + " NX#k#l");
                            searchpurchase = true;
                        } else {
                            cm.sendPrev("It doesn't look like your search query turned up any matches!");
                        }
                        break;
                    }
                    case "id": {
                        if (ii.cashEquipExists(selection)) {
                            purchase = selection;
                            if (bannedCash.indexOf(purchase) !== -1) {
                                cm.dispose();
                                return;
                            }
                            cm.sendYesNo(`Are you sure you'd like to purchase  #i${selection}#  for #r${casheqtypes[basicType(selection)][1]} NX#k?`);
                            searchpurchase = true;
                        } else {
                            cm.sendPrev("It looks like none of my NX equipments have that ID.");
                        }
                        break;
                    }
                }
            } else {
                if (selection < 0) {
                    if (type !== 1) {
                        cm.dispose();
                        return;
                    } else {
                        selection = 1;
                        cashpage++;
                    }
                }
                switch (selection) {
                    case 0:  // Next page
                        cashpage++;
                        cashlist = getCashList();
                        if (cashlist === "") {
                            cashpage = 0;
                            cashlist = getCashList();
                        }

                        cm.sendSimple(casheqtypes[cashtype][0] + " cost #d" + casheqtypes[cashtype][1] + " NX#k each. Click an item below to purchase it [#e#gpage " + (cashpage + 1) + "#k#n]:\r\n\r\n#L0##bNext page ->#k#l\r\n#L1##rPrevious page <-#k#l\r\n#L2#I don't want to purchase any of these at the moment.#l\r\n\r\n" + cashlist);
                        break;
                    case 1:  // Prev page
                        cashpage--;
                        if (cashpage >= 0) {
                            cashlist = getCashList();
                        } else {
                            cashpage = Math.floor((casheqs.length - 1) / (5 * linesperpage));
                            cashlist = getCashList();
                        }

                        cm.sendSimple(casheqtypes[cashtype][0] + " cost #d" + casheqtypes[cashtype][1] + " NX#k each. Click an item below to purchase it [#e#gpage " + (cashpage + 1) + "#k#n]:\r\n\r\n#L0##bNext page ->#k#l\r\n#L1##rPrevious page <-#k#l\r\n#L2#I don't want to purchase any of these at the moment.#l\r\n\r\n" + cashlist);
                        break;
                    case 2:  // Exit; this should not trigger since it's caught way up there^^^
                        print("Exit selection not caught!");
                        break;
                    default: // Purchase
                        purchase = selection;
                        if (bannedCash.indexOf(purchase) !== -1) {
                            cm.dispose();
                            return;
                        }
                        if (forother) {
                            cm.sendYesNo("Are you sure you'd like to purchase  #i" + selection + "#  for #r" + otherPrice + " NX#k?");
                            break;
                        }
                        cm.sendYesNo("Are you sure you'd like to purchase  #i" + casheqs[purchase - 3] + "#  for #r" + casheqtypes[basicType(casheqs[purchase - 3])][1] + " NX#k?");
                        break;
                }
            }
        } else if (forunlockable) {
            if (selection < 0) {
                cm.dispose();
                return;
            }
            let mesos;
            switch (unlockableselection) {
                case 23:
                    mesos = selection * 40000;
                    cm.gainMeso(-mesos);
                    cm.gainItem(2022178, selection);
                    cm.sendOk("Alrighty, here you go!:\r\n\r\n#i2022178#  x" + selection);
                    cm.dispose();
                    return;
                case 31:
                    mesos = selection * 23;
                    cm.gainMeso(-mesos);
                    cm.gainItem(2120000, selection);
                    cm.sendOk("Alrighty, here you go!:\r\n\r\n#i2120000#  x" + selection);
                    cm.dispose();
                    return;
                case 43:
                    mesos = selection * 500000;
                    cm.gainMeso(-mesos);
                    cm.gainItem(5041000, selection);
                    cm.sendOk("Alrighty, here you go!:\r\n\r\n#i5041000#  x" + selection);
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
        } else {
            cm.sendOk("Report this bug using #d@gm#k.");
            cm.dispose();
            return;
        }
    }
}
