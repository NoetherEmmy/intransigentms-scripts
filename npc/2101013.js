/* 
 * Karcasa
 * Upper level of training camp
 * ID: 2101013
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
        cm.sendNext("Hello, child.");
    } else if (status === 1) {
        cm.sendNextPrev("Let me tell you a bit about #dFM shops#k, #bdefensive abilities#k, and #rfighting monsters#k.");
    } else if (status === 2) {
        cm.sendNextPrev("When you reach #blevel 30#k for the first time in your lineage, you will receive a single #dmushroom house elf stand#k:\r\n\r\n#i5030000#\r\n\r\nYou can go into any one of the Free Market rooms and set up your stand there to sell items to other players. Once your shop closes, because you either closed it, or left it open for 24 hours, you can talk to #bFrederick#k in the Free Market to retrieve your items and mesos.");
    } else if (status === 3) {
        cm.sendNextPrev("When out and about, one of the first things you need to be worried about are your #bdefensive abilites#k.\r\n\r\nAnything that lets you shrug off and reduce damage is a boon, so you want to make sure your equipment is up to snuff so that the monsters don't pick you off real easy. Once you die, you go to #rPurgatory#k. And let's face it, no one ever makes it out of there.\r\n\r\nI think.");
    } else if (status === 4) {
        cm.sendNextPrev("#dShields#k in this world are great for soaking up some damage. Here, they even help you #ravoid#k attacks entirely by simply blocking and deflecting them. But not everyone can use a shield.");
    } else if (status === 5) {
        cm.sendNextPrev("You're going to want to look out for what #bdefensive skills#k your class specialty offers you, and make sure to balance them with your offensive ones. The #rmonsters#k around here can be fierce, and without the ability to stand toe-to-toe with them, you won't be getting many levels any time soon.\r\n\r\nIn addition, be on the lookout for armor and other equips that have higer defense/HP boosts than the stuff you're wearing at the moment, and #ekeep them scrolled!#n Scrolls should be relatively easy to come by, so as long as you same your juicy defense ones you should have a full suit of tank gear in no time.");
    } else if (status === 6) {
        cm.sendNextPrev("Anyways, that's all for now. There should be some weird folks in costumes waiting for you in the next room.");
    } else if (status > 6) {
        cm.dispose();
        return;
    }
}
