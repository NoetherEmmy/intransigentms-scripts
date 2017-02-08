/*
 * Saeko
 * Librarian NPC | Free Market Entrance
 * ID: 9120103
 */

var status;
var tempSelection = -1;
var essences = [4031762, 4031755, 4031750, 4031764, 4031753, 4031756];
var tomes = [4031056, 4161002, 4031157, 4031158, 4031159, 4031900];
var tomeUpgrades = [50, 80, 100, 120, 140];
var prizes =
[
    [2022344, 2,  7], [2022340, 2,  3], [5220000, 4,  3], [2022277, 4,  2],
    [2022181, 6,  1], [2022283, 10, 1], [2022179, 10, 1], [2022121, 13, 1],
    [2049100, 13, 1], [2340000, 17, 1], [2049004, 30, 1], [2049122, 56, 1],
    [4031519, 76, 1]
];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var msg, i;
    var tomeLevel, newTome, quantities, pointcount;
    var quantitytotake, change, pointsneeded, accumulatedpoints;
    var numtotake, changestring;
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendSimple("Hi there, " + p.getName() + ". Welcome back to the library. What can I help you with?\r\n\r\n#L0#I need something to read, and somewhere to read it.#l\r\n#L1#I'd like to trade in knowledge essences for rewards.#l\r\n#L2#I'd like to upgrade the book I'm reading to another book.#l\r\n#L3#How much are the knowledge essences worth?#l");
    } else if (status === 1) {
        tempSelection = selection;
        if (selection === 0) {
            if (p.getLevel() < 30) {
                cm.sendOk("You're not level 30 yet! Better start learning how to read, kiddo.");
                cm.dispose();
                return;
            }
            if (cm.itemQuantity(3010117) < 1) {
                cm.gainItem(3010117, 1);
            }
            if (cm.itemQuantity(4031056) < 1) {
                cm.gainItem(4031056);
            }
            cm.sendOk("There ya go! All set.");
            cm.dispose();
            return;
        } else if (selection === 1) {
            msg = "";
            for (i = 0; i < prizes.length; ++i) {
                var rewardstring = "";
                msg += "#L" + i + "#For #r" + prizes[i][1] + "#k points:  " + "#i" + prizes[i][0] + "#  x" + prizes[i][2] + "#l\r\n";
            }
            cm.sendSimple("Take your pick:\r\n\r\n" + msg);
        } else if (selection === 2) {
            if (p.getReadingReward() === 0) {
                cm.sendOk("It doesn't look like you've got a tome to upgrade.");
                cm.dispose();
                return;
            }
            tomeLevel = essences.indexOf(p.getReadingReward());
            var tome = tomes[tomeLevel];
            if (tomeLevel === tomes.length - 1) {
                cm.sendOk("It looks like you've already got the best tome!");
                cm.dispose();
                return;
            }
            newTome = tomes[tomeLevel + 1];
            cm.sendYesNo("Upgrading your #i" + tome + "# to a #i" + newTome + "# Will cost you #r" + tomeUpgrades[tomeLevel] + "#k points. Are you sure you want a new book?");
        } else if (selection === 3) {
            msg = "";
            for (i = 0; i < essences.length; ++i) {
                msg += "#i" + essences[i] + "#  ===  #r" + (2 + i) + " points#k\r\n\r\n";
            }
            cm.sendPrev(msg);
        }
    } else if (status === 2) {
        if (tempSelection === 1) {
            if (selection < 0) {
                cm.dispose();
                return;
            }

            quantities = [];
            pointcount = 0;
            for (i = 0; i < essences.length; ++i) {
                quantities.push(cm.itemQuantity(essences[i]));
                pointcount += cm.itemQuantity(essences[i]) * (2 + i);
            }

            if (pointcount < prizes[selection][1]) {
                cm.sendOk("You don't have enough knowledge essences to trade for this item, sorry.\r\n\r\nYour current total knowledge points: #r" + pointcount + "#k.");
                cm.dispose();
                return;
            }

            quantitytotake = [0, 0, 0, 0, 0, 0];
            change = 0;
            pointsneeded = prizes[selection][1];
            accumulatedpoints = 0;
            for (i = essences.length - 1; i >= 0; --i) {
                if (pointsneeded - accumulatedpoints >= 2 + i) {
                    numtotake = Math.floor((pointsneeded - accumulatedpoints) / (2 + i));
                    if (numtotake > quantities[i]) {
                        numtotake = quantities[i];
                    }
                    quantitytotake[i] += numtotake;
                    accumulatedpoints += numtotake * (2 + i);
                }
            }
            if (pointsneeded - accumulatedpoints !== 0) {
                for (i = essences.length - 1; i >= 0; --i) {
                    while (quantitytotake[i] < quantities[i] && accumulatedpoints < pointsneeded) {
                        quantitytotake[i]++;
                        accumulatedpoints += 2 + i;
                    }
                }
            }
            if (pointsneeded - accumulatedpoints > 0) {
                cm.sendOk("There was an error receiving your essences. Please tell a GM about this.");
                cm.dispose();
                return;
            }
            change = -1 * (pointsneeded - accumulatedpoints);
            for (i = 0; i < quantitytotake.length; ++i) {
                cm.gainItem(essences[i], -1 * quantitytotake[i]);
            }
            if (change > 1) {
                cm.gainItem(essences[0], Math.floor(change / 2) - (change % 2 === 1 ? 1 : 0));
                if (change % 2 === 1) {
                    cm.gainItem(essences[1], 1);
                }
            }
            cm.gainItem(prizes[selection][0], prizes[selection][2]);
            changestring = "";
            if (change > 1) {
                changestring = "Oh, and here's your change:\r\n#i" + essences[0] + "#  x" + (Math.floor(change / 2) - (change % 2 === 1 ? 1 : 0)) + (change % 2 === 1 ? "#i" + essences[1] + "#  x1" : "");
            }
            cm.sendOk("Here ya go!:\r\n\r\n#i" + prizes[selection][0] + "#  x" + prizes[selection][2] + "\r\n" + changestring);
            cm.dispose();
            return;
        } else if (tempSelection === 2) {
            tomeLevel = essences.indexOf(p.getReadingReward());
            newTome = tomes[tomeLevel + 1];
            var price = tomeUpgrades[tomeLevel];

            quantities = [];
            pointcount = 0;
            for (i = 0; i < essences.length; ++i) {
                quantities.push(cm.itemQuantity(essences[i]));
                pointcount += cm.itemQuantity(essences[i]) * (2 + i);
            }

            if (pointcount < price) {
                cm.sendOk("You don't have enough knowledge essences to trade for this upgrade, sorry.\r\n\r\nYour current total knowledge points: #r" + pointcount + "#k.");
                cm.dispose();
                return;
            }

            quantitytotake = [0, 0, 0, 0, 0, 0];
            change = 0;
            pointsneeded = price;
            accumulatedpoints = 0;
            for (i = essences.length - 1; i >= 0; --i) {
                if (pointsneeded - accumulatedpoints >= 2 + i) {
                    numtotake = Math.floor((pointsneeded - accumulatedpoints) / (2 + i));
                    if (numtotake > quantities[i]) {
                        numtotake = quantities[i];
                    }
                    quantitytotake[i] += numtotake;
                    accumulatedpoints += numtotake * (2 + i);
                }
            }
            if (pointsneeded - accumulatedpoints !== 0) {
                for (i = essences.length - 1; i >= 0; --i) {
                    while (quantitytotake[i] < quantities[i] && accumulatedpoints < pointsneeded) {
                        quantitytotake[i]++;
                        accumulatedpoints += 2 + i;
                    }
                }
            }
            if (pointsneeded - accumulatedpoints > 0) {
                cm.sendOk("There was an error receiving your essences. Please tell a GM about this.");
                cm.dispose();
                return;
            }
            change = -1 * (pointsneeded - accumulatedpoints);
            for (i = 0; i < quantitytotake.length; ++i) {
                cm.gainItem(essences[i], -1 * quantitytotake[i]);
            }
            if (change > 1) {
                cm.gainItem(essences[0], Math.floor(change / 2) - (change % 2 === 1 ? 1 : 0));
                if (change % 2 === 1) {
                    cm.gainItem(essences[1], 1);
                }
            }
            cm.gainItem(newTome, 1);
            changestring = "";
            if (change > 1) {
                changestring = "Oh, and here's your change:\r\n#i" + essences[0] + "#  x" + (Math.floor(change / 2) - (change % 2 === 1 ? 1 : 0)) + (change % 2 === 1 ? "#i" + essences[1] + "#  x1" : "");
            }
            cm.sendOk("Congratulations on your advancement.\r\n\r\n#i" + newTome + "#\r\n" + changestring);
            cm.dispose();
            return;
        }
    }
}
