/*
 * Bomack
 * Upper floor of the training camp
 * ID: 9201061
 */
 
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendNextPrev("You're new here. They told me you'd be here, I think.\r\n\r\nI'm #bBomack#k, and I'm supposed to tell you about this world because apparently where you come from it's a lot different. Or something like that.\r\n\r\nWhat's your name, anyways?");
    } else if (status === 1) {
        cm.sendNextPrev("Well then hello, #d#h ##k. Is that a common name where you come from, or...?\r\n\r\nAhem; nevermind.");
    } else if (status === 2) {
        cm.sendNextPrev("This is #dIntransigentMS#k, so when you die, you can't come back -- it's not like other worlds. Luckily you can pass down some of your money as well as a number of heirloom items (scales with level) in your will, so not all is lost.\r\n\r\nThere's a few other things you should know. #bKarcasa#k and #bAmos#k can fill you in on some of it, but I'll tell you about one thing you likely aren't used to: the way we do experience.");
    } else if (status === 3) {
        cm.sendNextPrev("You see, this world is nominally #g12x#k experience. But it's not what it says on the tin.\r\nOnce you start levelling beyond level 20, #ryour experience rate will start to ramp up#k (or rather, step up every couple of levels). The formula is as follows:\r\n\r\n\t#eAbsolute EXP multiplier = floor(yourLevel / 10)#n\r\n\r\nNote that this multiplier only applies if it is at least 1.0. But you don't have to calculate it yourself -- just type\r\n#e@absolutexprate#n in the chat.\r\n\r\nAnd, in case you do die...\r\nSome of your #eabsolute EXP multiplier#n is actually retained across lives. If \"deathLevel\" is the level you died at in the life before this one, then your absolute EXP multiplier is #bas if#k you were level\r\n\r\n\t#eceil(deathLevel / 2) + 9#n\r\n\r\n...if that level is higher than what you're at now.");
    } else if (status === 4) {
        cm.sendNextPrev("There's one other thing too, with the experience. Your experience multiplier #rchanges quite significantly based on the level of monster you are fighting compared to your own level#k.\r\n\r\nSo if the monster is higher level than you, you can get quite the tasty EXP bonus for killing them. On the other hand, if a monster is below your level you start to lose some of your EXP.\r\n\r\nThe penalty for fighting monsters that are lower in level than you decreases as you level up, and disappears by the time you are level 110. To make all of this math a bit easier, we have a few commands:\r\n\r\n\t#e@monsterlevels#n - Displays all monster types and their levels that are on your map, along with the EXP multipliers you get for each.\r\n\r\n\t#e@monstersinrange <levels below> <levels above>#n - Displays a list of monsters close to your level (within the range specified), sorted by their EXP/HP ratio, taking into account all of the math.");
    } else if (status === 5) {
        cm.sendNextPrev("Anyways, that's all for now. You can have a chat with Amos, and Karcasa too. They can tell you more.");
    } else if (status > 5) {
        cm.dispose();
        return;
    }
}
