/*
 * Mia
 * ID: 9010002
 * Allows players to trade in Maple leaves for NX, option to instead trade for gach tix if all quests are complete, accepts presents,
 * sells cash items, has meso-based store for special items, sells Unripe Onyx Apples, allows trading in vote points for rewards.
 */

/* jshint ignore: start */
// seedrandom.min.js
!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/4294967296},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);
/* jshint ignore: end */

var Collectors                   = Java.type("java.util.stream.Collectors");
var MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");

var status;

var cashshields = [[1092056, "Transparent Shield", 2200]];
var cashaccessories = [[1012044, "Mummy Mask", 2400], [1022048, "Transparent Eye Accessory", 1500]];
var cashshoes = [[1071009, "Red Western Walkers [F]", 1500]];
var casheffects = [[5010068, "Return of Angel Wing", 3000]];

var ii;
var casheqs;
var cashpage = 0;
var cashtype = 0;
var purchase = 0;
var search = "";
var searchpurchase = false;
var linesperpage = 10;

var casheqtypes = {
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
    170: ["Weapons", 4100]
};
var prizes =
[
  /* ID       chance quantity */
    [2049122, 0.408, 3], /* Chaos Scroll of Goodness 50% */
    [2049100, 0.14,  8], /* Chaos Scroll 60% */
    [1002357, 0.098, 1], /* Zakum Helmet (1) */
    [4031519, 0.14,  1], /* VIP item of choice */
    [2022121, 0.05,  5], /* Gelt Chocolate/Subani's Cauldron */
    [2040807, 0.007, 2], /* GM scrolls */
    [2044303, 0.007, 2],
    [2044403, 0.007, 2],
    [2043003, 0.007, 2],
    [2043103, 0.007, 2],
    [2043203, 0.007, 2],
    [2043803, 0.007, 2],
    [2043703, 0.007, 2],
    [2044503, 0.007, 2],
    [2044603, 0.007, 2],
    [2044703, 0.007, 2],
    [2043303, 0.007, 2],
    [2049004, 0.08,  5]  /* Innocence Scroll */
];
var chairs =
[
    3010000, /*The Relaxer*/
    3010001, /*Sky-blue Wooden Chair*/
    3010002, /*Green Chair*/
    3010003, /*Red Chair*/
    3010004, /*The Yellow Relaxer*/
    3010005, /*The Red Relaxer*/
    3010006, /*Yellow Chair*/
    3010007, /*Pink Seal Cushion*/
    3010008, /*Blue Seal Cushion*/
    3010009, /*A chair of love*/
    3010010, /*White Seal Cushion*/
    3010011, /*Amorian Relaxer*/
    3010012, /*Warrior Throne*/
    3010013, /*Beach Chair*/
    3010014, /*Moon Star Chair*/
    3010015, /*The Red Relaxer*/
    3010016, /*Grey Seal Cushion*/
    3010017, /*Gold Seal Cushion*/
    3010018, /*Palm Tree Beach Chair*/
    3010019, /*Kadomastsu*/
    3010022, /*White Polar Bear Chair*/
    3010023, /*Brown Polar Bear Chair*/
    3010024, /*Pink Teddy Chair*/
    3010025, /*Under the Maple Tree...*/
    3010040, /*The Stirge Seat*/
    3010041, /*Skull Throne*/
    3011000  /*Fishing Chair*/
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
var otherCash =
[
    5021024
];
var nxratio = 600;
var gachratio = 3;
var wsratio = 1;
var chairratio = 1;
var appleratio = 3;
var apratio = 10;
var chaosratiovp = 2;
var chaosratiocs = 3;
var gachratiovp = 8;
var scrollratio = 3;
var cogratio = 3;
var fornx = false;
var forgach = false;
var forws = false;
var forapple = false;
var forcash = false;
var forap = false;
var forchaos = false;
var forgachvp = false;
var forscroll = false;
var forother = false;
var forcog = false;

function basicType(id) {
    var bt = Math.floor(id / 10000);
    if (bt < 130) {
        return bt;
    } else {
        return 170;
    }
}

function getCashList() {
    var cashlist = "";
    for (var i = cashpage * 5 * linesperpage; i < casheqs.length && i < (cashpage + 1) * 5 * linesperpage; ++i) {
        cashlist += "#L" + (i + 3) + "##i" + casheqs[i] + "#" + (i % 5 === 4 ? "\r\n" : "\t");
    }
    return cashlist;
}

function start() {
    var p = cm.getPlayer();
    ii = MapleItemInformationProvider.getInstance();
    gachratio = cm.completedAllQuests() ? 2 : 3;
    Math.seedrandom("F" + p.getName() + "y" + p.getId() + ":" + p.getMeso() + "#" + p.getHp() + "l", { entropy: true });
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i, vp, cashlist, leavestotrade;
    if (mode === -1) {
        if (forcash && status !== 1) {
            status = 1;
            selection = 2;
        } else {
            cm.dispose();
            return;
        }
    } else {
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
            if (status >= 3 && selection === 2 && mode === 1) {
                status = 1;
                selection = 2;
            } else if (status >= 4 && type === 1 && mode === 1) {
                if (forother) {
                    if (cm.buyWithNx(2700)) {
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
            } else if (search === "id" && type >= 0 && type <= 1 && selection === -1) {
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
            cm.sendSimple("Hi there, I'm Mia. You can cash in your #bmaple leaves#k to me in exchange for gachapon tickets (3:1, or 2:1 if you've done all quests), NX (1:" + nxratio + "), or Onyx Apples (" + appleratio + ":1)!\r\n\r\n#L0#I'd like to trade in my maple leaves for NX.#l\r\n#L1#I'd like to trade in my maple leaves for gachapon tickets.#l\r\n#L7#I'd like to trade in my maple leaves for Unripe Onyx Apples.#l\r\n#L2#I'd like to buy NX equipment.#l\r\n#L3#I heard you sell some items on the side for mesos.#l\r\n#L4#I have a present for you.#l\r\n#L5#I'd like to trade in " + chairratio + " of my vote points for a random chair.#l\r\n#L6#I'd like to trade in some vote points for White Scrolls.#l\r\n#L8#I'd like to trade in some vote points for AP Resets.#l\r\n#L9#I'd like to trade in some vote points for Chaos Scrolls (" + chaosratiovp + ":" + chaosratiocs + ").#l\r\n#L10#I'd like to trade in some vote points for gachapon tickets (1:" + gachratiovp + ").#l\r\n#L11#I'd like to trade in some vote points for Chaos Scrolls of Goodness (" + cogratio + " vote points per CoG).#l");
        } else if (status === 1) {
            if (selection === 0) {
                if (cm.itemQuantity(4001126) < 1) {
                    cm.sendOk("You don't have any maple leaves!");
                    cm.dispose();
                    return;
                } else {
                    cm.sendGetNumber("How many maple leaves would you like to trade in?", cm.itemQuantity(4001126), 1, cm.itemQuantity(4001126));
                }
                fornx = true;
            } else if (selection === 1) {
                if (cm.itemQuantity(4001126) < gachratio) {
                    cm.sendOk("Sorry, it doesn't look like you have enough maple leaves yet!\r\n\r\nThe exchange ratio is #b" + gachratio + "#k maple leaves for #b1#k gachapon ticket.");
                    cm.dispose();
                    return;
                } else {
                    cm.sendGetNumber("How many maple leaves would you like to trade in? (This number will be rounded down to the nearest multiple of " + gachratio + ".)", cm.itemQuantity(4001126) - (cm.itemQuantity(4001126) % gachratio), gachratio, cm.itemQuantity(4001126));
                }
                forgach = true;
            } else if (selection === 2) {
                forcash = true;
                cashpage = 0;
                casheqs = [];
                search = "";
                searchpurchase = false;
                var typestring = "";
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
                    var prize;
                    var prizequantity = 1;
                    var chance = Math.random();
                    var cumulativechance = 0.0;
                    for (i = 0; i < prizes.length; ++i) {
                        cumulativechance += prizes[i][1];
                        if (cumulativechance > chance) {
                            prize = prizes[i][0];
                            prizequantity = prizes[i][2];
                            break;
                        }
                    }
                    if (prize === 0) { // NX
                        var nxamount = Math.floor((Math.random() * 15001) + 9000);
                        cm.sendOk("Oh my god, thank you so much for the present! Here, have this:\r\n\r\n#e#b" + nxamount + " NX gained.#k#n");
                        cm.modifyNx(nxamount);
                        cm.gainItem(3992005, -1);
                        cm.dispose();
                        return;
                    } else if (prize === 1) { // Maple Leaves
                        var leafamount = Math.floor((Math.random() * 10) + 20);
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
                    var totalchairs = chairs.concat(addedchairs);
                    var chairid = totalchairs[Math.floor(Math.random() * totalchairs.length)];
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
                    cm.sendGetNumber("How many maple leaves would you like to trade in? (This number will be rounded down to the nearest multiple of " + appleratio + ".)", cm.itemQuantity(4001126) - (cm.itemQuantity(4001126) % appleratio), appleratio, cm.itemQuantity(4001126));
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
                    cm.sendGetNumber("How many vote points would you like to trade in?\r\n\r\n(" + chaosratiovp + " vote points -> " + chaosratiocs + " Chaos Scrolls)", vp - (vp % 2), 2, vp - (vp % 2));
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
            } else if (selection === 11) {
                vp = p.getVotePoints();
                if (vp >= cogratio) {
                    cm.sendGetNumber("How many Chaos Scrolls of Goodness would you like to trade for?\r\n\r\n(" + cogratio + " vp -> 1 Chaos Scroll of Goodness)", Math.floor(vp / cogratio), 1, Math.floor(vp / cogratio));
                    forcog = true;
                } else {
                    cm.sendOk("I don't think you have enough vote points for this (" + cogratio + " vote points per CoG).");
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 2) {
            if (mode < 1) {
                cm.dispose();
                return;
            } else {
                if (fornx) {
                    if (selection > cm.itemQuantity(4001126)) {
                        cm.sendOk("You don't have that many leaves!");
                        cm.dispose();
                        return;
                    }
                    cm.gainItem(4001126, -1 * selection);
                    cm.modifyNx(selection * nxratio);
                    cm.sendOk("Thank you! You've been awarded with #b" + (selection * nxratio) + "#k NX.");
                    cm.dispose();
                    return;
                } else if (forgach) {
                    leavestotrade = selection - (selection % gachratio);
                    var ticketplural = "ticket";
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
                    cm.sendOk("Thanks! I've given you #b" + (selection * wsratio) + "#k White Scroll" + (selection * wsratio > 1 ? "s" : "") + ".");
                    cm.dispose();
                    return;
                } else if (forapple) {
                    leavestotrade = selection - (selection % appleratio);
                    var appleplural = "Apple";
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
                        case 4:
                            var otherString = "These items cost #d2700 NX#k each. Click an item below to purchase it:\r\n";
                            for (i = 0; i < otherCash.length; ++i) {
                                var id = otherCash[i];
                                otherString += (i % 4 === 0 ? "\r\n" : "") + "#L" + id + "##i" + id + "##l  ";
                            }
                            cm.sendSimple(otherString);
                            forother = true;
                            break;
                        default:
                            casheqs = [];
                            cashpage = 0;
                            cashtype = selection;
                            var casheqlist = cashtype === 170 ? ii.cashEquipsByType(130, 170) : ii.cashEquipsByType(cashtype);
                            if (!p.genderFilter()) {
                                casheqlist.forEach(function(id) { casheqs.push(id); });
                            } else {
                                casheqlist
                                    .stream()
                                    .filter(function(id) {
                                        var gender = Math.floor((id % 10000) / 1000);
                                        return gender > 1 || gender === p.getGender();
                                    })
                                    .forEach(function(id) { casheqs.push(id); });
                            }

                            cm.sendSimple(casheqtypes[cashtype][0] + " cost #d" + casheqtypes[cashtype][1] + " NX#k each. Click an item below to purchase it [#e#gpage " + (cashpage + 1) + "#k#n]:\r\n\r\n#L0##bNext page ->#k#l\r\n#L1##rPrevious page <-#k#l\r\n#L2#I don't want to purchase any of these at the moment.#l\r\n\r\n" + getCashList());
                            break;
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
                    cm.sendOk("Thanks! I've given you #b" + (selection * apratio) + "#k AP Resets.");
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
                    cm.sendOk("Thanks! I've given you\r\n\r\n#i5220000#   #bx" + (selection * gachratiovp) + "#k.");
                    cm.dispose();
                    return;
                } else if (forcog) {
                    vp = p.getVotePoints();
                    if (selection * cogratio > vp) {
                        cm.sendOk("You don't have that many vote points!");
                        cm.dispose();
                        return;
                    }

                    p.setVotePoints(vp - selection * cogratio);
                    cm.gainItem(2049122, selection);
                    cm.sendOk("Thanks! I've given you #b" + selection + "#k Chaos Scrolls of Goodness.");
                    cm.dispose();
                    return;
                }
            }
        } else if (status >= 3) {
            if (forcash) {
                if (search.length > 0) {
                    switch (search) {
                        case "list":
                            var results = ii.cashEquipSearch(cm.getText());
                            if (p.genderFilter()) {
                                results = results
                                            .stream()
                                            .filter(function(id) {
                                                var gender = Math.floor((id % 10000) / 1000);
                                                return gender > 1 || gender === p.getGender();
                                            })
                                            .collect(Collectors.toList());
                            }
                            var resultstring = "";
                            for (i = 0; i < results.size() && i < 30; ++i) {
                                resultstring += "\r\n#L" + results.get(i) + "##i" + results.get(i) + "#\t#r" + casheqtypes[basicType(results.get(i))][1] + " NX#k#l";
                            }
                            if (resultstring.length > 0) {
                                cm.sendSimple("Here are the best matches for your query. Click an item to purchase it:\r\n\r\n#L0#None of these items are what I want.#l\r\n" + resultstring);
                                searchpurchase = true;
                            } else {
                                cm.sendPrev("It doesn't look like your search query turned up any matches!");
                            }
                            break;
                        case "lucky":
                            var t = cm.getText();
                            //print(t);
                            var result = ii.singleCashEquipSearch(t);
                            //print(result);
                            if (result !== 0) {
                                cm.sendSimple("Here is the best match for your query. Click the item to purchase it:\r\n\r\n#L0#This is not quite what I had in mind.#l\r\n\r\n#L" + result + "##i" + result + "#\t#r" + casheqtypes[basicType(result)][1] + " NX#k#l");
                                searchpurchase = true;
                            } else {
                                cm.sendPrev("It doesn't look like your search query turned up any matches!");
                            }
                            break;
                        case "id":
                            if (ii.cashEquipExists(selection)) {
                                purchase = selection;
                                cm.sendYesNo("Are you sure you'd like to purchase  #i" + selection + "#  for #r" + casheqtypes[basicType(selection)][1] + " NX#k?");
                                searchpurchase = true;
                            } else {
                                cm.sendPrev("It looks like none of my NX equipments have that ID.");
                            }
                            break;
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
                            if (forother) {
                                cm.sendYesNo("Are you sure you'd like to purchase  #i" + selection + "#  for #r2700 NX#k?");
                                break;
                            }
                            cm.sendYesNo("Are you sure you'd like to purchase  #i" + casheqs[purchase - 3] + "#  for #r" + casheqtypes[basicType(casheqs[purchase - 3])][1] + " NX#k?");
                            break;
                    }
                }
            } else {
                cm.sendOk("Report this bug using #d@gm#k.");
                cm.dispose();
                return;
            }
        }
    }
}
