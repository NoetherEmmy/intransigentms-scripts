/*
 * Jean -- Victoria Road | Free Market, Lith Harbor (104000000)
 * Event Assistant
 *
 * ID: 9000001
 */

"use strict";

let status;
const eventname = "Una Nochebuena Sin Muerte";
const help = `#e${eventname}#n is a new event that will be going on from #bDec 9 - Jan 1#k, in which players can hunt for #bChristmas Presents#k from bad guys! In addition, #edrop rates are doubled#n for the duration of the event.\r\n\r\nThe Christmas Presents can be dropped from any monsters. But remember, the spirit of Christmas is in #egift-giving and cooperation#n, so make sure you have friends with you if you want more of that sweet, juicy, holiday spirit.\r\n\r\nOnce you collect some Christmas Presents, trade some to me for some neat-o prizes!\r\n\r\nPlayers may continue Christmas-ing for as long as the event lasts.`;
let prizeid = -1;
const halloweencandy = 4031203;
let trickortreating = false;
const trickortreatchance = 0.08;
const trickortreatprizes = [1002546, 1052155, 1072387];
const markOfTheBeta = 1002419;
const markOfTheGamma = 1002475;
const sayings =
    [ "#eAAAAAAAAAAAAAAAA#n\r\n\r\nJesus, kid. Ya nearly spooked me dead."
    , "Damn, nice candies. I think this is a #etreat#n on the trick-or-treat scale."
    , "You stole these from spectres? Keep up the good work, kid."
    , "Well, you not exactly callow when it comes to trick-or-treating, now are ya?"
    , "Oh, my god. Sour Patch Kids are my fav."
    , "It's not theft when it's from spectres, am I right?"
    , "Oh, my god. Mars Bars are my fav."
    , "This is some high-quality candy, I gotta hand it to ya, kid. But ya need some wardrobe."
    ];

const presents =
    [ 4031439
    , 4031440
    , 4031441
    , 4031442
    , 4031443
    ];
const presentrewards =
    [ [2022340, 4,  3]
    , [5220000, 4,  3]
    , [2022344, 4,  5]
    , [2022277, 8,  4]
    , [2022181, 8,  2]
    , [2022283, 12, 1]
    , [2022179, 12, 1]
    , [2022273, 16, 1]
    , [2022121, 16, 1]
    , [2049100, 20, 1]
    , [2340000, 60, 1]
    , [2049004, 60, 1]
    , [2049122, 75, 1]
    , [0,       80, 1]
    , [4031519, 80, 1]
  //, [5211000, 90, 1]
    ];

const eventon = false;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();

    if (mode < 0 || mode === 0 && (status === 0 || type === 4)) {
        cm.dispose();
        return;
    }

    status += mode === 1 ? 1 : -1;

    switch (status) {
        case 0: {
            const initdialog =
                eventon ?
                    `Hey there! I'm Jean, the Event Assistant. Right now we're holding an event called:\r\n\r\n#e#r${eventname}#k#n\r\n\r\n#L0#What's the event about?#l\r\n#L4#How much are the different colored presents worth?#l\r\n#L1#I'd like to trade in some presents.#l\r\n#L2#How do I use an EXP bonus?#l\r\n#L3#I was a beta tester.#l\r\n#L5#I was a gamma tester.#l`
                :
                    "Hey there! I'm Jean, the Event Assistant. Right now we're not holding any events.\r\n\r\n#L4#Trick or treat!#l\r\n#L1#I'd like to trade in some presents.#l\r\n#L2#How do I use an EXP bonus?#l\r\n#L3#I was a beta tester.#l\r\n#L5#I was a gamma tester.#l";
            cm.sendSimple(initdialog);
            break;
        }
        case 1: {
            switch (selection) {
                case 0:
                    cm.sendPrev(help);
                    break;
                case 1: {
                    let msg = "";
                    for (let i = 0; i < presentrewards.length; ++i) {
                        let rewardstring = "";
                        if (presentrewards[i][0] === 0) {
                            rewardstring = "#e[Timeless weapon of choice]#n";
                        } else if (presentrewards[i][0] === 1) {
                            rewardstring = "#e[Mastery book of choice]#n";
                        }
                        msg += "#L";
                        msg += i;
                        msg += "#For #b";
                        msg += presentrewards[i][1];
                        msg += "#k points:  ";
                        msg += rewardstring !== "" ? rewardstring : "#i" + presentrewards[i][0] + "#";
                        msg += presentrewards[i][0] === 4031519 ? "(redeemable for VIP item of choice)" : "";
                        msg += "  x";
                        msg += presentrewards[i][2];
                        msg += "#l\r\n";
                    }
                    cm.sendSimple(`Pick yer poison:\r\n\r\n${msg}`);
                    break;
                }
                case 2:
                    cm.sendPrev("#bMaple Administrator#k will allow you to cash in your EXP bonus.\r\n\r\nYou can find her in person or simply type #d@mapleadmin#k in the chat.");
                    break;
                case 3:
                    betaTester(p);
                    return;
                case 4: {
                    if (eventon) {
                        let msg = "";
                        for (let i = 0; i < presents.length; ++i) {
                            msg += "#b";
                            msg += (i + 1) * 2;
                            msg += "#k points, obtained by having #r";
                            msg += i + 1;
                            msg += "#k player";
                            msg += i === 0 ? "" : "s";
                            msg += " in one's party:\r\n#i";
                            msg += presents[i];
                            msg += "#\r\n";
                        }
                        msg += "#b12#k points, obtained by having #r6#k players in one's party:\r\n#i";
                        msg += presents[presents.length - 1];
                        msg += "#   #i";
                        msg += presents[0];
                        msg += "#";

                        cm.sendPrev(msg);
                    } else {
                        if (cm.itemQuantity(halloweencandy) < 1) {
                            cm.sendPrev("#eyou don't appear to have anything ready for trick-or-treating#n");
                            break;
                        }
                        cm.sendGetNumber("#eyou stick our your hand full of candies#n\r\n\r\n#ehow many candies are in your palm?#n", 1, 1, cm.itemQuantity(halloweencandy));
                        trickortreating = true;
                    }
                    break;
                }
                case 5:
                    gammaTester(p);
                    return;
                default:
                    cm.sendOk("Report this error to a GM. (#d@gm <message>#k)");
                    cm.dispose();
                    return;
            }
            break;
        }
        case 2:
            if (trickortreating) {
                trickOrTreat(selection);
            } else {
                presentsPurchase(selection);
            }
            return;
        case 3:
            presentsPurchase(selection);
            return;
        default:
            cm.sendOk("Report this error to a GM. (#d@gm <message>#k)");
            cm.dispose();
            return;
    }
}


/**************************************************************************************/
/**End control flow********************************************************************/
/**************************************************************************************/


function betaTester(p) {
    if (cm.getBetaTester()) {
        cm.gainItem(1002419, 1);
        cm.gainItem(3010036, 1);
        cm.gainItem(3992005, 1);
        cm.modifyNx(20000);
        p.setVotePoints(p.getVotePoints() + 3);
        p.dropMessage("You have gained 3 vote points.");
        cm.sendOk("Thank you so much for participating in the #dIntransigentMS#k beta! I've given you:\r\n\r\n#i1002419#\r\n#i3010036#\r\n#i3992005#\r\n\r\n#r20,000 NX#k\r\n\r\n#b3 vote points#k");
        cm.dispose();
        return;
    }
    if (cm.betaTester() >= 0 && !cm.haveItem(markOfTheBeta, 1, true, true)) {
        cm.gainItem(markOfTheBeta, 1);
        cm.sendOk(`Thanks for beta testing #e#dIntransigentMS#k#n! Here you go:\r\n\r\n#i${markOfTheBeta}#`);
    } else {
        cm.sendOk("It looks like you either aren't a beta tester or you have already redeemed your prizes!");
    }
    cm.dispose();
    return;
}

function gammaTester(p) {
    if (cm.getGammaTester()) {
        cm.gainItem(markOfTheGamma);
        cm.gainItem(3992005);
        cm.gainItem(5390000, 3);
        cm.gainItem(5390001, 3);
        cm.gainItem(5390002, 3);
        cm.gainItem(5041000, 10);
        cm.gainItem(5060000, 5);
        cm.gainItem(5220000, 5);
        cm.modifyNx(25000);
        p.setVotePoints(p.getVotePoints() + 15);
        p.dropMessage(5, "You have gained 15 vote points.");
        cm.sendOk(`Thank you so much for participating in the #dIntransigentMS#k gamma! I've given you:\r\n\r\n#i${markOfTheGamma}#\r\n#i3992005#\r\n#i5390000#  x3\r\n#i5390001#  x3\r\n#i5390002#  x3\r\n#i5041000#  x10\r\n#i5060000#  x5\r\n#i5220000#  x5\r\n\r\n#r25,000 NX#k\r\n\r\n#b15 vote points#k`);
        cm.dispose();
        return;
    }
    if (cm.gammaTester() >= 0 && !cm.haveItem(markOfTheGamma, 1, true, true)) {
        cm.gainItem(markOfTheGamma);
        cm.sendOk(`Thanks for gamma testing #e#dIntransigentMS#k#n! Here you go:\r\n\r\n#i${markOfTheGamma}#`);
    } else {
        cm.sendOk("It looks like you either aren't a gamma tester or you have already redeemed your prizes!");
    }
    cm.dispose();
    return;
}

function trickOrTreat(selection) {
    if (cm.itemQuantity(halloweencandy) < selection) {
        cm.sendOk("#eit doesn't look like you've actually got that many candies#n");
        cm.dispose();
        return;
    }

    const prizes = range(selection).map(() => {
        cm.gainItem(halloweencandy, -1);
        if (Math.random() < trickortreatchance) {
            return chooseRandom(trickortreatprizes);
        }
    }).filter(prize => prize !== undefined);

    if (prizes.length > 0) {
        let prizestring = "";
        for (let i = 0; i < prizes.length; ++i) {
            cm.gainItem(prizes[i], 1);
            prizestring += `\r\n#i${prizes[i]}#`;
        }
        cm.sendOk(`${chooseRandom(sayings)}\r\nHere, have ${prizes.length > 1 ? "these" : "this"}:\r\n${prizestring}`);
    } else {
        cm.sendOk("Sorry, kid. I don't got anything for ya.");
    }
    cm.dispose();
    return;
}


presentrewards.sort((r1, r2) => r1[1] - r2[2]);
const timelessweps =
    [ 1302081
    , 1312037
    , 1322060
    , 1402046
    , 1412033
    , 1422037
    , 1482023
    ];
const masterybooks =
    [ 2290000
    , 2290001
    , 2290002
    , 2290003
    , 2290004
    , 2290005
    , 2290006
    , 2290007
    , 2290008
    , 2290009
    , 2290010
    , 2290011
    , 2290012
    , 2290013
    , 2290014
    , 2290015
    , 2290016
    , 2290017
    , 2290018
    , 2290019
    , 2290020
    , 2290021
    , 2290022
    , 2290023
    , 2290024
    , 2290025
    , 2290026
    , 2290027
    , 2290028
    , 2290029
    , 2290030
    , 2290031
    , 2290032
    , 2290033
    , 2290034
    , 2290035
    , 2290036
    , 2290037
    , 2290038
    , 2290039
    , 2290040
    , 2290041
    , 2290042
    , 2290043
    , 2290044
    , 2290045
    , 2290046
    , 2290047
    , 2290048
    , 2290049
    , 2290050
    , 2290051
    , 2290052
    , 2290053
    , 2290054
    , 2290055
    , 2290056
    , 2290057
    , 2290058
    , 2290059
    , 2290060
    , 2290061
    , 2290062
    , 2290063
    , 2290064
    , 2290065
    , 2290066
    , 2290067
    , 2290068
    , 2290069
    , 2290070
    , 2290071
    , 2290072
    , 2290073
    , 2290074
    , 2290075
    , 2290076
    , 2290077
    , 2290078
    , 2290079
    , 2290080
    , 2290081
    , 2290082
    , 2290083
    , 2290084
    , 2290085
    , 2290086
    , 2290087
    , 2290088
    , 2290089
    , 2290090
    , 2290091
    , 2290092
    , 2290093
    , 2290094
    , 2290095
    , 2290096
    , 2290097
    , 2290098
    , 2290099
    , 2290100
    , 2290101
    , 2290102
    , 2290103
    , 2290104
    , 2290105
    , 2290106
    , 2290107
    , 2290108
    , 2290110
    , 2290111
    , 2290112
    , 2290113
    , 2290114
    , 2290115
    , 2290116
    , 2290117
    , 2290118
    , 2290119
    , 2290120
    , 2290121
    , 2290122
    , 2290123
    , 2290124
    ];
const prizeidprices =
    [ 80
    , 90
    ];

function presentsPurchase(selection) {
    if (selection < 0) {
        cm.dispose();
        return;
    }
    const p = cm.getPlayer();
    const quantities = [];
    let pointcount = 0;
    //const i;
    for (let i = 0; i < presents.length; ++i) {
        quantities.push(cm.itemQuantity(presents[i]));
        pointcount += cm.itemQuantity(presents[i]) * ((i + 1) * 2);
    }
    if (prizeid === -1 && presentrewards[selection][0] === 5211000) {
        if (p.getExpBonus()) {
            cm.sendOk("It looks like you're already using this item!");
            cm.dispose();
            return;
        } else if (cm.itemQuantity(5211000) > 3) {
            cm.sendOk("It looks like you've already got this item!");
            cm.dispose();
            return;
        }
    }
    if (prizeid !== -1 && pointcount < prizeidprices[prizeid] || prizeid < 0 && pointcount < presentrewards[selection][1]) {
        cm.sendOk(`You don't have enough presents to trade for this item, sorry.\r\n\r\nYour total present points: #r${pointcount}#k.`);
        cm.dispose();
        return;
    } else if (prizeid === -1 && presentrewards[selection][0] === 0) {
        prizeid = 0;
        let timelesslist = "Select the Timeless item you'd like:\r\n\r\n";
        for (let i = 0; i < timelessweps.length; ++i) {
            timelesslist += `#L${i}##i${timelessweps[i]}##l\r\n`;
        }
        cm.sendSimple(timelesslist);
    } else if (prizeid === -1 && presentrewards[selection][0] === 1) {
        prizeid = 1;
        let mblist = "Select the Mastery Book you'd like:\r\n\r\n";
        for (let i = 0; i < masterybooks.length; ++i) {
            mblist += `#L${i}##i${masterybooks[i]}##l\r\n`;
        }
        cm.sendSimple(mblist);
    } else {
        const quantitytotake = [0, 0, 0, 0, 0];
        let change = 0;
        const pointsneeded = prizeid < 0 ? presentrewards[selection][1] : prizeidprices[prizeid];
        let accumulatedpoints = 0;
        for (let i = 4; i >= 0; --i) {
            if (pointsneeded - accumulatedpoints >= (i + 1) * 2) {
                let numtotake = Math.floor((pointsneeded - accumulatedpoints) / ((i + 1) * 2));
                if (numtotake > quantities[i]) {
                    numtotake = quantities[i];
                }
                quantitytotake[i] += numtotake;
                accumulatedpoints += numtotake * ((i + 1) * 2);
            }
        }
        if (pointsneeded - accumulatedpoints !== 0) {
            for (let i = 4; i >= 0; --i) {
                while (quantitytotake[i] < quantities[i] && accumulatedpoints < pointsneeded) {
                    quantitytotake[i]++;
                    accumulatedpoints += (i + 1) * 2;
                }
            }
        }
        if (pointsneeded - accumulatedpoints > 0) {
            cm.sendOk("There was an error receiving your presents. Please tell a GM about this.");
            cm.dispose();
            return;
        }
        change = -1 * (pointsneeded - accumulatedpoints);
        for (let i = 0; i < quantitytotake.length; ++i) {
            cm.gainItem(presents[i], -1 * quantitytotake[i]);
        }
        cm.gainItem(presents[0], Math.round(change / 2));
        let prizeitem, prizequantity;
        if (prizeid < 0) {
            prizeitem = presentrewards[selection][0];
            prizequantity = presentrewards[selection][2];
        } else if (prizeid === 0) {
            prizeitem = timelessweps[selection];
            prizequantity = 1;
        } else if (prizeid === 1) {
            prizeitem = masterybooks[selection];
            prizequantity = 1;
        }
        cm.gainItem(prizeitem, prizequantity, true, true);
        let changestring = "";
        if (change > 0) {
            const changePresentCount = Math.round(change / 2);
            changestring = `Oh, and here's your change:\r\n#i${presents[0]}#  x${changePresentCount}`;
        }
        cm.sendOk(`Here you go!:\r\n\r\n#i${prizeitem}#  x${prizequantity}\r\n${changestring}`);
        cm.dispose();
        return;
    }
}
