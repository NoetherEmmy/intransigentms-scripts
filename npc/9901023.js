/*
 * The Chef
 * Lilin's Manor
 *
 * ID: 9901023
 */

var ExpTable                     = Java.type("net.sf.odinms.client.ExpTable");
var JavaMath                     = Java.type("java.lang.Math");
var MapleBuffStat                = Java.type("net.sf.odinms.client.MapleBuffStat");
var MapleCharacter               = Java.type("net.sf.odinms.client.MapleCharacter");
var MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");
var TimerManager                 = Java.type("net.sf.odinms.server.TimerManager");

var status;
var ballroomMap = 5009;
var backestWayMap = 5012;
var onyxApple = 2022179;
var recipeCollection = 4032064;
var str = 0,
    dex = 0,
    int = 0,
    luk = 0;
var choices, finalChoices, ii, tMan;

var prizesAll =
[
    [[2022121, 3], [2022273, 3]], [[2049122, 1]], [[2049100, 4]],
    [[2049004, 3]], [[2340000, 3]], [[5220000, 8]], [[4001126, 25]],
    [[5041000, 10]], [[0, 1]]
];

var prizesLow =
[
    [[2002029, 2]], [[2022277, 2]], [[1082222, 1]], [[1082230, 1]],
    [[1082232, 1]], [[1122010, 1]], [[2041212, 2]], [[1012070, 1]],
    [[1012071, 1]], [[1002728, 1]], [[1002737, 1]], [[1102054, 1]],
    [[1102193, 1]], [[1102191, 1]], [[1050018, 1], [1051017, 1]],
    [[1052169, 1]], [[1052210, 1]], [[1092068, 1]], [[1072427, 1]],
    [[1072428, 1]], [[1072238, 1]]
];

var prizesMid =
[
    [[2022277, 3]], [[1102057, 1]], [[1082222, 1]], [[1082223, 1]],
    [[1122014, 1]], [[1122010, 1]], [[2041212, 2]], [[1012070, 1]],
    [[1012071, 1]], [[1102084, 1]], [[1102086, 1]], [[1102101, 1]],
    [[1102183, 1]], [[1102192, 1]], [[1052169, 1]], [[1052210, 1]],
    [[1072344, 1]], [[1072427, 1]], [[1072428, 1]], [[1072239, 1]]
];

var prizesHigh =
[
    [[2049122, 1]], [[2340000, 3]], [[1102194, 1]], [[2022282, 2]]
];

var multiPrizes =
[
    [[1012058, 1], [1012059, 1], [1012060, 1], [1012061, 1]]
];

Array.prototype.fisherYates = function() {
    for (var i = this.length - 1; i > 0; --i) {
        var swapIndex = Math.floor(JavaMath.random() * (i + 1));
        var temp = this[swapIndex];
        this[swapIndex] = this[i];
        this[i] = temp;
    }
};

function start() {
    ii = MapleItemInformationProvider.getInstance();
    tMan = TimerManager.getInstance();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();

    if (p.getMapId() === ballroomMap) {
        status++;
    } else {
        if (mode < 1) {
            cm.dispose();
            return;
        }
        status++;
    }

    if (p.getMapId() === ballroomMap) {
        switch (status) {
            case 0:
                cm.sendNext("#eThe Chef is seen swiftly crossing the edge of the ballroom, freshly prepared food items in hand#n");
                break;
            case 1:
                cm.sendNext("#ehe quickly notices you, in passing#n\r\n\r\n#e#rHey!#k#n\r\n\r\n#eyou see The Chef visibly scowl, even from so far across the room#n");
                break;
            case 2:
                cm.sendNext("#e#rThose are the rats trying to steal my fucking recipes!#k#n\r\n\r\n#e#rGet them!!#k#n\r\n\r\n#e#rN O W !#k#n\r\n\r\n#eThe Chef leaves the ballroom, with intent#n");
                break;
            default:
                cm.dispose();
                return;
        }
    } else if (p.getMapId() === backestWayMap) {
        if (mi === null || mi.getPlayerProperty(p, "endedFight")) {
            switch (status) {
                case 0:
                    cm.sendNext("#esoft sobbing sounds can be heard#n");
                    break;
                case 1:
                    cm.sendSimple("#rYOU!#k How -- How could you...\r\n\r\nGo! Get out of my fucking manor and take the god damned recipes, you goons!\r\n\r\n#L0#O--Ok.#l\r\n#L1#I'm pretty sure this is Lilin's manor, actually.#l");
                    break;
                case 2:
                    switch (selection) {
                        case 0:
                            cm.sendNext("#eas you start to leave the manor with the recipes and with your party, you reflect on what you've accomplished#n");
                            break;
                        case 1:
                            cm.sendNext("Not even a #rshred#k of dignity for myself... you sicken me.\r\n\r\n#eas you start to leave the manor with the recipes and with your party, you reflect on what you've accomplished#n");
                            break;
                        default:
                            cm.dispose();
                            return;
                    }
                    break;
                case 3:
                    var pointMulti = Math.max(1.1 + ((pq.getPoints() - 1200) / 1600), 0.4);
                    var rankColor;
                    if (pq.getPoints() >= 2000) {
                        rankColor = "#g";
                    } else if (pq.getPoints() >= 900) {
                        rankColor = "#b";
                    } else {
                        rankColor = "#r";
                    }
                    var exptnl = ExpTable.getExpNeededForLevel(p.getLevel() + 1);
                    var multi = 45 / Math.sqrt(p.getLevel());
                    var exp = Math.min(Math.floor(exptnl * multi * pointMulti), 2147483647);
                    var meso = Math.floor(pointMulti * 3000 * (Math.pow(p.getLevel(), 1.5) + p.getLevel()));

                    var levelPrizes;
                    if (p.getLevel() <= 70) {
                        levelPrizes = prizesLow;
                    } else if (p.getLevel() <= 120) {
                        levelPrizes = prizesMid;
                    } else {
                        levelPrizes = prizesHigh;
                    }
                    var prize1 = prizesAll[Math.floor(JavaMath.random() * prizesAll.length)];
                    var prize2 = levelPrizes[Math.floor(JavaMath.random() * levelPrizes.length)];
                    var prizes = [];
                    prizes = prizes.concat(prize1.map(multiPrizeConvert));
                    prizes = prizes.concat(prize2.map(multiPrizeConvert));
                    var prizeString = prizes.reduce(function(s, prize) {
                        return s + "\r\n#i" + prize[0] + "#  (" + prize[1] + ")";
                    }, "");

                    cm.gainExp(exp);
                    cm.gainMeso(meso);
                    cm.gainItem(recipeCollection, 1);
                    prizes.forEach(function(prize) {
                        cm.gainItem(prize[0], prize[1]);
                    });

                    pq.removePlayer(p, true);

                    cm.sendNext(
                        "#eYour party's final accumulated points: " +
                        rankColor +
                        MapleCharacter.makeNumberReadable(pq.getPoints()) +
                        "#k#n\r\n\r\n" +
                        "#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n" +
                        "#fUI/UIWindow.img/QuestIcon/8/0#  " +
                        MapleCharacter.makeNumberReadable(exp) +
                        "\r\n" +
                        "#fUI/UIWindow.img/QuestIcon/7/0#  " +
                        MapleCharacter.makeNumberReadable(meso) +
                        "\r\n\r\n" +
                        "#i" +
                        recipeCollection +
                        "#  (1)" +
                        prizeString
                    );
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
        } else if (!pq.isLeader(p) || mi.getPlayerProperty(p, "startedFight")) {
            cm.dispose();
            return;
        } else {
            switch (status) {
                case 0:
                    choices =
                    [
                        "An historical place as the founder of a booming food industry?",
                        "Look, it's clear that you're all alone here so you can quit the big-talk.",
                        "It's too late, really. We already got like, a bunch of your recipes.",
                        "(yawn)"
                    ];
                    cm.sendSimple("So... it's you, huh?\r\n\r\nAnother rat trying to start shit and steal my #egod damn recipes#n?\r\n\r\n#rThere's a place for people like you#k.\r\n\r\n" + choiceString(choices));
                    break;
                case 1:
                    switch (selection) {
                        case 0:
                            luk++;
                            choices =
                            [
                                "I'll take my chances.",
                                "Hah. I'll fight your god damned armed guards with my own fists.",
                                "There aren't any guards to be seen around here, so maybe it's best you get to the point.",
                                "Oh, don't worry. I already took care of the guard problem while you weren't looking. (twirl knife in hand)"
                            ];
                            cm.sendSimple("#e#rAHAHAHAHAHAHAHAHA#k#n no.\r\n\r\nI meant the Ossyria jail. I could have my armed guards take you there #eright now#n.\r\n\r\n" + choiceString(choices));
                            break;
                        case 1:
                            str++;
                            choices =
                            [
                                "I think I'll pass. I wouldn't want you to slip, fall, and hurt yourself.",
                                "(size The Chef up and take your weapon[s] out)",
                                "Don't bluff me, boy. I know what you're hiding.",
                                "(invisibly finger the knife under your sleeve)"
                            ];
                            cm.sendSimple("Alone, you say?\r\n\r\nPerhaps that's so. Why don't you try me? I see the anger in your eyes.\r\n\r\nCome at me, big boy.\r\n\r\n" + choiceString(choices));
                            break;
                        case 2:
                            int++;
                            choices =
                            [
                                "Are you sure they weren't the most important ones?",
                                "Give it to me straight, Chef. I'll fight you, right here and now.",
                                "We stole 25, actually.",
                                "And I'll steal many more with my two hands if you don't stop me."
                            ];
                            cm.sendSimple("Oh, #edid#n you, now?\r\n\r\n#emakes a mocking impression#n\r\n\r\nOh, no! Whatever shall I do? These rats have taken a whole #eDOZEN#n of my recipes!!\r\n\r\n" + choiceString(choices));
                            break;
                        case 3:
                            dex++;
                            choices =
                            [
                                "And only one of us isn't worried about the outcome.",
                                "And one of us is determined to end you, right here and now.",
                                "So long as the numbers are against you.",
                                "Oh, I'll show you 'rogue bastard.' (ready self)"
                            ];
                            cm.sendSimple("Oh, believe me. I am equally tired of your antics, you rogue #ebastards#n.\r\n\r\nThe only difference is that #rone of us is determined to end this whole thing right here and now#k.\r\n\r\n" + choiceString(choices));
                            break;
                        default:
                            cm.dispose();
                            return;
                    }
                    break;
                case 2:
                    choices =
                    [
                        "(reach for another item of The Chef's coat in hopes that you can disrupt or distract him)",
                        "(immediately swing at The Chef)",
                        "(you recognize something The Chef mutters under his breath and attempt to disrupt the magic effect that is about to be produced)",
                        "(follow The Chef's gaze and stab directly where the unknown item he is reaching for is located)"
                    ];
                    switch (selection) {
                        case 0:
                            luk++;
                            break;
                        case 1:
                            str++;
                            break;
                        case 2:
                            int++;
                            break;
                        case 3:
                            dex++;
                            break;
                        default:
                            cm.dispose();
                            return;
                    }

                    finalChoices = [];
                    if (luk > 0) {
                        finalChoices.push(choices[0]);
                    }
                    if (str > 0) {
                        finalChoices.push(choices[1]);
                    }
                    if (int > 0) {
                        finalChoices.push(choices[2]);
                    }
                    if (dex > 0) {
                        finalChoices.push(choices[3]);
                    }
                    cm.sendSimple("Ohohohohoho. Fine. Fine.\r\n\r\nI know perfectly well #rwhere this is going#k...\r\n\r\n#ereaches for something on the inside of his coat#n\r\n\r\n" + choiceString(finalChoices));
                    break;
                case 3:
                    var finalChoice = finalChoices[selection];
                    var stat, statType;
                    switch (finalChoice) {
                        case "(reach for another item of The Chef's coat in hopes that you can disrupt or distract him)":
                            stat = p.getTotalLuk();
                            statType = "luk";
                            break;
                        case "(immediately swing at The Chef)":
                            stat = p.getTotalStr();
                            statType = "str";
                            break;
                        case "(you recognize something The Chef mutters under his breath and attempt to disrupt the magic effect that is about to be produced)":
                            stat = p.getTotalInt();
                            statType = "int";
                            break;
                        case "(follow The Chef's gaze and stab directly where the unknown item he is reaching for is located)":
                            stat = p.getTotalDex();
                            statType = "dex";
                            break;
                        default:
                            cm.dispose();
                            return;
                    }
                    var apPerLv = 5;
                    var margin = Math.floor(p.getLevel() - 20 / 2);
                    var totalRoll = stat + JavaMath.random() * margin;
                    var upperThresh = p.getLevel() * apPerLv + margin;
                    var midThresh = p.getLevel() * apPerLv - margin;

                    if (totalRoll >= upperThresh) {
                        var buff = getBuff();
                        pq.getPlayers().forEach(function(player) {
                            buff.applyTo(player);
                        });
                        switch (statType) {
                            case "luk":
                                p.dropMessage("With incredible luck, you manage to grab The Chef's walkie-talkie and smash it on the ground before he can recoil. Hopefully this cripples The Chef's ability to summon reinforcements.");
                                pq.getPlayers().forEach(function(player) {
                                    player.dropMessage("Through unexpected chance, your leader has given your party the upper hand. You have +100 weapon and magic attack.");
                                });
                                break;
                            case "str":
                                p.dropMessage("With your physical prowess, you manage to cripple The Chef as he calls for reinforcements.");
                                pq.getPlayers().forEach(function(player) {
                                    player.dropMessage("By crippling The Chef, your leader has given your party the upper hand. You have +100 weapon and magic attack.");
                                });
                                break;
                            case "int":
                                p.dropMessage("With your knowlege of incantations, you manage to disrupt The Chef's summoning magic and give your party the upper hand.");
                                pq.getPlayers().forEach(function(player) {
                                    player.dropMessage("By disrupting The Chef's magic, your leader has given your party the upper hand. You have +100 weapon and magic attack.");
                                });
                                break;
                            case "dex":
                                p.dropMessage("With a single adroit motion, you hit the unknown item in the dead center with your knife. The Chef looks shocked as he realizes what you've done.");
                                pq.getPlayers().forEach(function(player) {
                                    player.dropMessage("By skewering one of The Chef's special items, your leader has given your party the upper hand. You have +100 weapon and magic attack.");
                                });
                                break;
                        }
                        pq.addPoints(75);
                    } else if (totalRoll >= midThresh) {
                        switch (statType) {
                            case "luk":
                                p.dropMessage("While at first confident, you come across nothing of use upon reaching into The Chef's coat before he can recoil.");
                                break;
                            case "str":
                                p.dropMessage("While at first confident, you strike The Chef -- but only barely.");
                                break;
                            case "int":
                                p.dropMessage("While at first confident, you aren't able to disrupt The Chef's incantations in time to make a difference.");
                                break;
                            case "dex":
                                p.dropMessage("While at first confident, your blade only harmlessly deflects off of the corner of the unknown item.");
                                break;
                        }
                    } else {
                        switch (statType) {
                            case "luk":
                                p.dropMessage("Oh no! It seems luck was not on your side -- that thing you reached for was a canister of noxious gas! Your whole party is affected.");
                                pq.getPlayers().forEach(function(player) {
                                    player.dropMessage("Through unexpected chance, your leader has lost the upper hand. You are affected by noxious gas!");
                                });
                                break;
                            case "str":
                                p.dropMessage("The Chef anticipated your strike, and with a lack of strength you only manage to get yourself thrown backwards into the rest of your party members!");
                                pq.getPlayers().forEach(function(player) {
                                    player.dropMessage("Your leader has been physically defeated, and thrown backwards right on top of you and your other party members! You are left crushed while you and your party members get back up.");
                                });
                                break;
                            case "int":
                                p.dropMessage("Oh no! It seems you weren't adept enough in incantations at all -- you botch your counter-incantation and manage to curse your entire party on accident!");
                                pq.getPlayers().forEach(function(player) {
                                    player.dropMessage("Your party leader has botched an incantation. You and your party members are cursed!");
                                });
                                break;
                            case "dex":
                                p.dropMessage("The Chef anticipated your strike, and with all your clumsiness you only manage to get yourself thrown backwards into the rest of your party members!");
                                pq.getPlayers().forEach(function(player) {
                                    player.dropMessage("Your leader has been out-maneuvered, and thrown backwards right on top of you and your other party members! You are left crushed while you and your party members get back up.");
                                });
                                break;
                        }
                        pq.getPlayers().forEach(function(player) {
                            player.giveDebuff(120, 12, 9 * 1000); // Seal
                            player.giveDebuff(128, 6, 3 * 1000); // Seduce
                        });
                        tMan.schedule(function() {
                            pq.getPlayers().forEach(function(player) {
                                player.giveDebuff(123, 13, 2 * 1000); // Stun
                            });
                        }, 3 * 1000 + 100);
                        pq.addPoints(-75);
                    }
                    mi.invokeMethod("startFight");
                    break;
                default:
                    cm.dispose();
                    return;
            }
        }
    }
}

function choiceString(choices) {
    var selections = choices.map(function(s, i) {
        return "#L" + i + "#" + s + "#l";
    });
    selections.fisherYates();
    return selections.join("\r\n");
}

function getBuff() {
    var mse = ii.getItemEffect(onyxApple);
    mse.removeStatup(MapleBuffStat.WDEF);
    return mse;
}

function multiPrizeConvert(prize) {
    if (prize[0] < multiPrizes.length) {
        var multiPrize = multiPrizes[prize[0]];
        return multiPrize[Math.floor(JavaMath.random() * multiPrize.length)];
    }
    return prize;
}
