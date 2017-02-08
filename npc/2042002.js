/*
 * Spiegelmann
 * IDs: 2042000, 2042001, 2042002
 *
 * Monster Trial NPC
 */

var status;
var rewards = [1112920, 1112408, 1112401, 1112414, 1112428, 1112435, 1112438, 1122082, 1122083, 1122084, 1122085, 1122059];
var goin = false;

function start() {
    status = -1;
    action(1, 0, 0); 
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
        goin = false;
    }
    if (!cm.isInMonsterTrial()) {
        if (status === 0) {
            cm.sendSimple("Hello, I'm Mr. Spiegelmann! Welcome to the #dMonster Trials#k.\r\n\r\n#L0#Tell me about the Monster Trials.#l\r\n#L1#I'd like to enter a Monster Trial.#l\r\n#L2#I'd like to see my Monster Trial points and progress towards rewards.#l");
        } else if (status === 1) {
            if (selection === 0) {
                cm.sendPrev("In the #dMonster Trials#k, you can test your mettle by facing up in a head-to-head boss battle.\r\n\r\nCome to me and I can warp you in to a Monster Trial Arena, where a random boss monster within your level range will immediately spawn. You will have #b20 minutes#k to either kill the boss... or be killed yourself. Keep in mind that #ryou must slay all monsters before you can leave#k.\r\n\r\nOnce you have defeated the monster, you can speak to me again and I will warp you out of the arena. I will then award you with #ba number of Monster Trial points corresponding to the level of monster you have slain#k. As you gain these points, they will accumulate, and as you gain a higher total of points, you can unlock tiered #bMonster Trial rings#k to equip to your character.\r\n\r\nOnce you have defeated a boss, or have tried to defeat one, there will be a #b2 hour cooldown period#k before you can make another attempt.");
            } else if (selection === 1) {
                if (p.getLevel() < 20) {
                    cm.sendOk("Sorry, but you must be at least level #r20#k before you can participate in the Monster Trials.");
                    cm.dispose();
                    return;
                } else if (!cm.canEnterMonsterTrial()) {
                    cm.sendOk("Sorry, but you must wait another #b" + cm.getMonsterTrialCooldown() + "#k minutes before you can enter the Monster Trials again.");
                    cm.dispose();
                    return;
                } else {
                    cm.sendYesNo("Are you sure you want to enter a #dMonster Trial#k now?");
                    goin = true;
                }
            } else if (selection === 2) {
                if (cm.getMonsterTrialPoints() < cm.getTierPoints(cm.getTier() + 1)) {
                    cm.sendPrev("Your current Monster Trial point total: #b" + cm.getMonsterTrialPoints() + "#k\r\n\r\nNext tier (Tier " + (cm.getTier() + 1) + "): #d" + cm.getTierPoints(cm.getTier() + 1) + "#k Monster Trial points");
                } else {
                    cm.sendOk("Congratulations! You are eligible for #rTier " + (cm.getTier() + 1) + "#k!\r\n\r\nYour reward is:\r\n\r\n#i" + rewards[cm.getTier()] + "#");
                    cm.setTier(cm.getTier() + 1);
                    p.dropMessage(6, "You are now Tier " + cm.getTier() + " in the Monster Trials.");
                    cm.gainItem(rewards[cm.getTier() - 1], 1);
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 2) {
            if (goin) {
                if (cm.enterMonsterTrial()) {
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk("Sorry, it seems that there was a problem sending you to a #dMonster Trial#k. Try changing channels and entering again, or come back later.\r\n\r\nIf the problem persists, contact a GM.");
                    cm.dispose();
                    return;
                }
            } else {
                cm.dispose();
                return;
            }
        }
    } else {
        if (cm.canLeaveMonsterTrial()) {
            cm.warp(cm.getMonsterTrialReturnMap(), 0);
            var reward = Math.pow(cm.calculateLevelGroup(p.getLevel()) + 1, 2) * 10;
            cm.sendOk("Congratulations on your victory in the #dMonster Trials#k. Your reward is #b" + reward + "#k Monster Trial points.");
            cm.gainMonsterTrialPoints(reward);
            p.dropMessage(5, "You have gained " + reward + " Monster Trial points.");
            cm.dispose();
            return;
        } else {
            cm.sendOk("You cannot leave until all monsters are defeated!");
            cm.dispose();
            return;
        }
    }
}
