/*
 * Cloto -- Hidden Street | 1st Accompaniment
 */

var Rectangle          = Java.type("java.awt.Rectangle");
var MaplePacketCreator = Java.type("net.sf.odinms.tools.MaplePacketCreator");

var status, curMap;
var questions =
[
    "Here's the question. Collect the same number of coupons as the minimum level required to make the first job advancement as warrior.",
    "Here's the question. Collect the same number of coupons as the minimum amount of STR needed to make the first job advancement as a warrior.",
    "Here's the question. Collect the same number of coupons as the minimum amount of INT needed to make the first job advancement as a magician.",
    "Here's the question. Collect the same number of coupons as the minimum amount of DEX needed to make the first job advancement as a bowman.",
    "Here's the question. Collect the same number of coupons as the minimum amount of DEX needed to make the first job advancement as a thief.",
    "Here's the question. Collect the same number of coupons as the minimum level required to advance to 2nd job."
];
var qanswers = [10, 35, 20, 25, 25, 30];
var party;
var preamble; // We dont even need this
var stage2Rects =
[
    new Rectangle(-755, -132, 4, 218), new Rectangle(-721, -340, 4, 166),
    new Rectangle(-586, -326, 4, 150), new Rectangle(-483, -181, 4, 222)
];
var stage3Rects =
[
    new Rectangle(608, -180, 140, 50), new Rectangle(791, -117, 140, 45),
    new Rectangle(958, -180, 140, 50), new Rectangle(876, -238, 140, 45),
    new Rectangle(702, -238, 140, 45)
];
var stage4Rects =
[
    new Rectangle(910, -236, 35, 5), new Rectangle(877, -184, 35, 5),
    new Rectangle(946, -184, 35, 5), new Rectangle(845, -132, 35, 5),
    new Rectangle(910, -132, 35, 5), new Rectangle(981, -132, 35, 5)
];
var stage2combos =
[
    [0, 1, 1, 1], [1, 0, 1, 1], [1, 1, 0, 1], [1, 1, 1, 0]
];
var stage3combos =
[
    [0, 0, 1, 1, 1], [0, 1, 0, 1, 1], [0, 1, 1, 0, 1],
    [0, 1, 1, 1, 0], [1, 0, 0, 1, 1], [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0], [1, 1, 0, 0, 1], [1, 1, 0, 1, 0],
    [1, 1, 1, 0, 0]
];
var stage4combos =
[
    [0, 0, 0, 1, 1, 1], [0, 0, 1, 0, 1, 1], [0, 0, 1, 1, 0, 1],
    [0, 0, 1, 1, 1, 0], [0, 1, 0, 0, 1, 1], [0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1], [0, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 0], [1, 0, 0, 0, 1, 1], [1, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 0], [1, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0],
    [1, 0, 1, 1, 0, 0], [1, 1, 0, 0, 0, 1], [1, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 0], [1, 1, 1, 0, 0, 0]
];

var eye   = 9300002;
var necki = 9300000;
var slime = 9300003;
var monsterIds =
[
    eye,   eye,   eye,
    necki, necki, necki, necki, necki, necki,
    slime
];

var prizeScrolls =
[
    2040914, /* Scroll for Shield for Weapon Att. */
    2040919, /* Scroll for Shield for Magic Att. */
    2040804, /* Scroll for Gloves for ATT */
    2040817, /* Scroll for Gloves for Magic Att. */
    2040526, /* Scroll for Overall Armor for INT */
    2041016, /* Scroll for Cape for INT 60% */
    2041019, /* Scroll for Cape for DEX 60% */
    2040411, /* Scroll for Topwear for LUK 30% */
    2040407, /* Scroll for Topwear for STR 30% */
    2040611, /* Scroll for Bottomwear for DEX 30% */
];

var prizePotions =
[
    [2022178, 20], // All Cure Potion
    [2022340, 10], // Blastrojuice
    [2022107, 40], // Blue Malady's Candy
    [2022105, 70], // Green Malady's Candy
    [2020027, 6],  // Candy Basket
    [2022262, 8],  // Cranberry Sauce
    [2022302, 6],  // Party Bear
    [5041000, 3]   // VIP Teleport Rock
];

var prizeEquips =
[
    1092068, // Stone Shield
    1472111, // Maple Pyrope Skanda
    1482073, // Maple Pyrope Knuckle
    1492073, // Maple Pyrope Shooter
    1302142, // Maple Pyrope Sword
    1312056, // Maple Pyrope Axe
    1322084, // Maple Pyrope Hammer
    1332114, // Maple Pyrope Halfmoon
    1372071, // Maple Pyrope Wand
    1382093, // Maple Pyrope Staff
    1402085, // Maple Pyrope Rohen
    1412055, // Maple Pyrope Battle Axe
    1422057, // Maple Pyrope Maul
    1432075, // Maple Pyrope Spear
    1442104, // Maple Pyrope Hellslayer
    1452100, // Maple Pyrope Bow
    1462085, // Maple Pyrope Crow
    1302064, // Maple Glory Sword
    1402039, // Maple Soul Rohen
    1312032, // Maple Steel Axe
    1412027, // Maple Demon Axe
    1322054, // Maple Havoc Hammer
    1422029, // Maple Belzet
    1452045, // Maple Kandiva Bow
    1462040, // Maple Nishada
    1472055, // Maple Skanda
    1332055, // Maple Dark Mate
    1332056, // Maple Asura Dagger
    1432040, // Maple Soul Spear
    1442051, // Maple Karstan
    1372034, // Maple Shine Wand
    1382039, // Maple Wisdom Staff
    1482022, // Maple Golden Claw
    1492022  // Maple Cannon Shooter
];

function start() {
    var p = cm.getPlayer();
    status = -1;
    var mapId = p.getMapId();

    if (mapId === 103000800) {
        curMap = 1;
    } else if (mapId === 103000801) {
        curMap = 2;
    } else if (mapId === 103000802) {
        curMap = 3;
    } else if (mapId === 103000803) {
        curMap = 4;
    } else if (mapId === 103000804) {
        curMap = 5;
    }

    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === 1) {
        status++;
    } else if (type === 0 && mode === 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    var complete, qstring, question, eim;
    if (curMap === 1) { // First stage
        if (cm.isLeader()) {
            eim = p.getEventInstance();
            if (eim === null || eim === undefined) {
                cm.dispose();
                return;
            }
            party = eim.getPlayers();
            preamble = eim.getProperty("leader1stpreamble");
            if (preamble === null) {
                cm.sendNext("Hello. Welcome to the first stage. Look around and you'll see Ligators wandering around. When you defeat them, they will cough up a #bcoupon#k. Every member of the party other than the leader should talk to me, geta  question, and gather up the same number of #bcoupons#k as the answer to the question I'll give to them.\r\nIf you gather up the right amount of #bcoupons#k, I'll give the #bpass#k to that player. Once all the party members other than the leader gather up the #bpasses#k and give them to the leader, the leader will hand over the #bpasses#k to me, clearing the stage in the process. The faster you take care of the stages, the more stages you'll be able to challenge. So I suggest you take care of things quickly and swiftly. Well then, best of luck to you.");
                eim.setProperty("leader1stpreamble", "done");
                cm.dispose();
                return;
            } else {
                complete = eim.getProperty(curMap + "stageclear");
                if (complete !== null) {
                    cm.sendNext("Please hurry on to the next stage, the portal opened!");
                    cm.dispose();
                    return;
                } else {
                    var numpasses = party.size() - 1; // All the players in the party need to get a pass besides the leader.
                    var strpasses = "#b" + numpasses + " passes#k";
                    if (!cm.haveItem(4001008, numpasses)) {
                        cm.sendNext(
                            "I'm sorry, but you are short on the number of passes. You need to give me the right number of passes; it should be the number of members of your party minus the leader, " +
                            strpasses +
                            " to clear the stage. Tell your party members to solve the questions, gather up the passes, and give them to you."
                        );
                        cm.dispose();
                        return;
                    } else {
                        cm.sendNext(
                            "You gathered up " +
                            strpasses +
                            "! Congratulations on clearing the stage! I'll make the portal that sends you to the next stage. There's a time limit on getting there, so please hurry. Best of luck to you all!"
                        );
                        clear(1, eim, cm);
                        cm.givePartyExp(400, party);
                        cm.gainItem(4001008, -numpasses);
                        cm.dispose();
                        return;
                    }
                }
            }
        } else { // Not leader
            eim = p.getEventInstance();
            if (eim === null || eim === undefined) {
                cm.dispose();
                return;
            }
            pstring = "member1stpreamble" + p.getId();
            preamble = eim.getProperty(pstring);
            if (status === 0) {
                if (preamble === null) {
                    qstring = "member1st" + p.getId();
                    question = eim.getProperty(qstring);
                    if (question === null) {
                        // Select a random question to ask the player.
                        var questionNum = Math.floor(Math.random() * questions.length);
                        eim.setProperty(qstring, questionNum);
                    }
                    cm.sendNext("Here, you need to collect #bcoupons#k by defeating the same number of Ligators as the answer to the questions asked individually.");
                } else { // Otherwise, check for stage completed
                    complete = eim.getProperty(curMap + "stageclear");
                    if (complete !== null) { // Stage completed
                        cm.sendNext("Please hurry on to the next stage, the portal is open!");
                        cm.dispose();
                        return;
                    } else {
                        // Reply to player correct/incorrect response to the question they have been asked
                        qstring = "member1st" + p.getId();
                        var passstring = "member1stpass" + p.getId();
                        var gotpass = "" + eim.getProperty(passstring) === "done";
                        var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
                        var qcorr = cm.itemQuantity(4001007);
                        if (gotpass) {
                            cm.sendNext("Make sure to give your pass to your party leader so you can advance to the next stage.");
                        } else if (numcoupons === qcorr) {
                            cm.sendNext("That's the right answer! For that you have just received a #bpass#k. Please hand it to the leader of the party.");
                            cm.gainItem(4001007, -numcoupons);
                            cm.gainItem(4001008, 1);
                            eim.setProperty(passstring, "done");
                        } else {
                            cm.sendNext("I'm sorry, but that is not the right answer! Please have the correct number of coupons in your inventory.");
                            //p.dropMessage("" + numcoupons);
                        }
                    }
                    cm.dispose();
                    return;
                }
            } else if (status === 1) {
                if (preamble === null) {
                    qstring = "member1st" + p.getId();
                    question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                } else { // Shouldn't happen, if it does then just dispose
                    cm.dispose();
                    return;
                }
            } else if (status === 2) { // Preamble completed
                eim.setProperty(pstring, "done");
                cm.dispose();
                return;
            }
        } // End first map scripts
    } else if (2 <= curMap && 4 >= curMap) {
        rectanglestages(cm);
    } else if (curMap === 5) { // Final stage
        eim = p.getEventInstance();
        if (eim === null || eim === undefined) {
            cm.dispose();
            return;
        }
        var stage5done = eim.getProperty("5stageclear");
        if (stage5done === null) {
            if (cm.isLeader()) { // Leader
                if (cm.haveItem(4001008, 10)) {
                    // Clear stage
                    cm.sendNext("Here's the portal that leads you to the last, bonus stage. It's a stage that allows you to defeat regular monsters a little easier. You'll be given a set amount of time to hunt as much as possible, but you can always leave the stage in the middle of it through the NPC. Again, congratulations on clearing all the stages. Take care...");
                    party = eim.getPlayers();
                    cm.gainItem(4001008, -10);
                    clear(5, eim, cm);
                    cm.givePartyExp(6000, party);
                    cm.dispose();
                    return;
                } else { // Not done yet
                    cm.sendNext("Hello. Welcome to the 5th and final stage. Walk around the map and you'll be able to find some Boss monsters. Defeat all of them, gather up #bthe passes#k, and please get them to me. Once you earn your pass, the leader of your party will collect them, and then get them to me once the #bpasses#k are gathered up. The monsters may be familiar to you, but they may be much stronger than you think, so please be careful. Good luck!\r\nAs a result of complaints, it is now mandatory to kill all the Slimes! Do it!");
                }
                cm.dispose();
                return;
            } else { // Members
                cm.sendNext("Welcome to the 5th and final stage.  Walk around the map and you will be able to find some Boss monsters.  Defeat them all, gather up the #bpasses#k, and give them to your leader.  Once you are done, return to me to collect your reward.");
                cm.dispose();
                return;
            }
        } else { // Give rewards and warp to bonus
            if (status === 0) {
                cm.sendNext("Incredible! You cleared all the stages to get to this point. Here's a small prize for your job well done. Before you accept it, however, please make sure your use and etc. inventories have empty slots available.\r\n#bYou will not receive a prize if you have no free slots!#k");
            } else if (status === 1) {
                getPrize(eim, cm);
                cm.dispose();
                return;
            }
        }
    } else { // No map found
        cm.sendNext("Invalid map, this means the stage is incomplete.");
        cm.dispose();
        return;
    }
}

function clear(stage, eim, cm) {
    var p = cm.getPlayer();
    eim.setProperty(stage + "stageclear", "true");
    var map = eim.getMapInstance(p.getMapId());

    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));

    var mf = eim.getMapFactory();
    map = mf.getMap(103000800 + stage);
    var nextStage = eim.getMapInstance(103000800 + stage);
    var portal = nextStage.getPortal("next00");

    if (portal !== null) {
        portal.setScriptName("kpq" + stage);
    }
}

function failstage(eim, cm) {
    var p = cm.getPlayer();
    var map = eim.getMapInstance(p.getMapId());
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Failed"));
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
}

function rectanglestages(cm) {
    var p = cm.getPlayer();
    var eim = p.getEventInstance();
    if (eim === null || eim === undefined) {
        cm.dispose();
        return;
    }
    var nthtext, nthobj, nthverb, nthpos, curArray, curCombo, objset, i, complete;

    if (curMap === 2) {
        nthtext = "2nd";
        nthobj = "ropes";
        nthverb = "hang";
        nthpos = "hang on the ropes too low";
        curArray = stage2Rects;
        curCombo = stage2combos;
        objset = [0, 0, 0, 0];
    } else if (curMap === 3) {
        nthtext = "3rd";
        nthobj = "platforms";
        nthverb = "stand";
        nthpos = "stand too close to the edges";
        curArray = stage3Rects;
        curCombo = stage3combos;
        objset = [0, 0, 0, 0, 0];
    } else if (curMap === 4) {
        nthtext = "4th";
        nthobj = "barrels";
        nthverb = "stand";
        nthpos = "stand too close to the edges";
        curArray = stage4Rects;
        curCombo = stage4combos;
        objset = [0, 0, 0, 0, 0, 0];
    }

    if (cm.isLeader()) { // Check if player is leader
        if (status === 0) {
            // Check for preamble
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            if (preamble === null) { // first time talking.
                cm.sendNext("Hi. Welcome to the " + nthtext + " stage. Next to me, you'll see a number of " + nthobj + ". Out of these " + nthobj + ", #b3 are connected to the portal that sends you to the next stage#k. All you need to do is have #b3 party members find the correct " + nthobj + " and " + nthverb + " on them.#k\r\nBUT, it doesn't count as an answer if you " + nthpos + "; please be near the middle of the " + nthobj + " to be counted as a correct answer. Also, only 3 members of your party are allowed on the " + nthobj + ". Once they are " + nthverb + "ing on them, the leader of the party must #bdouble-click me to check and see if the answer's correct or not#k. Now, find the right " + nthobj + " to " + nthverb + " on!");
                eim.setProperty("leader" + nthtext + "preamble", "done");
                var sequenceNum = Math.floor(Math.random() * curCombo.length);
                eim.setProperty("stage" + nthtext + "combo", sequenceNum.toString());
                cm.dispose();
                return;
            } else {
                // Otherwise, check for stage completed
                complete = eim.getProperty(curMap + "stageclear");
                if (complete !== null) {
                    cm.sendNext("Please hurry on to the next stage, the portal opened!");
                    cm.dispose();
                    return;
                } else { // Check for people on ropes and their positions
                    var playersOnCombo = 0;
                        asd: for (i = 0; i < party.size(); ++i) {
                        for (var y = 0; y < curArray.length; ++y) {
                            if (curArray[y].contains(party.get(i).getPosition())) {
                                playersOnCombo++;
                                objset[y] = 1;
                                break;
                            }
                        }
                    }
                    // Compare to correct positions
                    // First, are there 3 players on the correct positions?
                    if (playersOnCombo === 3) {
                        var combo = curCombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                        // Debug
                        // Combo = curtestcombo;
                        var correctCombo = true;
                        for (i = 0; i < objset.length && correctCombo; ++i) {
                            if (combo[i] !== objset[i]) {
                                correctCombo = false;
                            }
                        }
                        if (correctCombo) {
                            // Do clear
                            clear(curMap, eim, cm);
                            var exp = Math.pow(2, curMap) * 200;
                            cm.givePartyExp(exp, party);
                            cm.dispose();
                            return;
                        } else { // Wrong
                            failstage(eim, cm);
                            cm.dispose();
                            return;
                        }
                    } else {
                        cm.sendNext(
                            "It looks like you haven't found the 3 " +
                            nthobj +
                            " just yet. Please think of a different combination of " +
                            nthobj +
                            ". Only 3 are allowed to " +
                            nthverb +
                            " on " +
                            nthobj +
                            ", and if you " +
                            nthpos +
                            " it may not count as an answer, so please keep that in mind. Keep going!"
                        );
                        cm.dispose();
                        return;
                    }
                }
            }
        } else {
            complete = eim.getProperty(curMap + "stageclear");
            if (complete !== null) {
                var target = eim.getMapInstance(103000800 + curMap);
                var targetPortal = target.getPortal("st00");
                p.changeMap(target, targetPortal);
            }
            cm.dispose();
            return;
        }
    } else { // Not leader
        complete = eim.getProperty(curMap.toString() + "stageclear");
        if (complete !== null) {
            cm.sendNext("Please hurry on to the next stage, the portal opened!");
        } else {
            cm.sendNext("Please have the party leader talk to me.");
        }

        cm.dispose();
        return;
    }
}

function getPrize(eim, cm) {
    var p = cm.getPlayer();
    var itemChance = Math.random();
    var itemId, itemCount;
    var hasQty = false;

    if (itemChance < 0.3) {
        itemId = prizeScrolls[Math.floor(Math.random() * prizeScrolls.length)];
        itemCount = 1;
    } else if (itemChance < 0.6) {
        itemId = prizeEquips[Math.floor(Math.random() * prizeEquips.length)];
        itemCount = 1;
    } else {
        var idQuantityPair = prizePotions[Math.floor(Math.random() * prizePotions.length)];
        itemId = idQuantityPair[0];
        itemCount = idQuantityPair[1];
    }

    if (cm.gainItem(itemId, itemCount)) {
        var map = eim.getMapInstance(103000805);
        p.changeMap(map, map.getPortal("sp"));
    }
}
