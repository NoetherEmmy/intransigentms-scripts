/*
 * Amos the Strong
 * Upper floor of the training camp
 * ID: 9201045
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
        cm.sendNext("#escratch, scratch#n\r\n\r\nOh.\r\n\r\nHi.");
    } else if (status === 1) {
        cm.sendNextPrev("So I suppose you want to know about #rquests#k, #dNX items/voting#k, and #bchanging your look#k.\r\n\r\n\r\nWell, it's pretty simple.");
    } else if (status === 2) {
        cm.sendNextPrev("If you talk to #eRia#n -- I think she hangs out in the\r\n#bFree Market#k, and maybe some other places -- she can tell you who to talk to for a new quest. And I'm not talking about any old normal quests. I mean #dIntransigentQuests#k.\r\n\r\nThese special quests must be done in order, and if you want to check your current progress you can type\r\n\t\t#e@questinfo#n\r\nin the chat. These quests give plenty of mesos, experience, and #bgachapon tickets#k as rewards: #i5220000#");
    } else if (status === 3) {
        cm.sendNextPrev("That's important, because the gachapon can give you valuable equipment, scrolls, potions, and buffs!\r\n\r\nThese quests are one of four ways to get gachapon tickets, alongside trading in maple leaves to Mia, fighting bosses, and trading in vote points. Once you've completed all of the quests, #eMia#n (who I can tell you about in just a second) will give you the option to trade in #rmaple leaves#k\r\n\r\n#i4001126#\r\n\r\nfor gachapon tickets at a 2:1 rate instead of 3:1.");
    } else if (status === 4) {
        cm.sendNextPrev("Mia is Ria's twin sister; they tend to hang out in the same spots. If you talk to Mia, she will allow you to trade in your #rmaple leaves#k that you find from killing any monster. For every 3 (or 2 if you've completed all quests) leaves you bring her, she will reward you with #b1 gachapon ticket#k.\r\n\r\nMia also sells some NX items that cannot be purchased from the cash shop, for mesos, NX equips (many of which are not found in the cash shop, which will crash your game anyway), and various other goodies for both mesos and maple leaves.");
    } else if (status === 5) {
        cm.sendNextPrev("Your main way of obtaining NX to buy items from the cash shop/Mia's extra cash shop, as well as to buy new hairs, faces, and skins is to #rvote#k.\r\n\r\nOn our website (www.intransigentms.com), log into your account and press the \"Vote\" menu item at the top. Then choose the vote site and if you successfully complete a vote, you recieve #b4000 NX#k and #b1 vote point#k (exchangeable for chairs, White Scrolls, Chaos Scrolls Of Goodness, etc., etc.), so vote often.");
    } else if (status === 6) {
        cm.sendNextPrev("Speaking of changing your appearance -- #gCoco#k can do that for you. Coco is in Henesys, as well as in the Free Market with Mia and Ria.\r\n\r\nNo need to purchase a coupon. Coco will simply charge you NX directly. #b2000 NX#k will allow you to change your hair or face, and #b1500 NX#k will allow you to change your lens color, hair color, skin color, or gender.");
    } else if (status === 7) {
        cm.sendNextPrev("Anyways, that's all for now. You can have a chat with Karcasa too. He can tell you more.");
    } else if (status > 8) {
        cm.dispose();
        return;
    }
}
