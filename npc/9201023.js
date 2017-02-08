/*
 * Nana(K)
 * Kerning City (103000000)
 *
 * ID: 9201023
 * Love fairy
 */

var status;
var proofOfLove = 4031370;
var reqItem = [4000015, 40];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === 1) {
        status++;
    } else if (type === 0 && mode === 0) {
        status--;
    } else {
        if (type === 1 && mode === 0) {
            cm.sendOk("Maybe another time?");
        }
        cm.dispose();
        return;
    }

    var mqLvl = p.getMarriageQuestLevel();
    switch (mqLvl) {
        case 0:
            switch (status) {
                case 0:
                    cm.sendNext("Hey, nice to meet you! I'm Nana, the Fairy from Amoria. I'm waiting for you to prove your devotion to your loved one by obtaining a #rProof of Love#k!");
                    break;
                case 1:
                    cm.sendNextPrev("To start, you'll have to venture to Amoria to find my good friend, #bMoony the Ringmaker#k.");
                    break;
                case 2:
                    cm.sendNextPrev("Even if you are not interested in marriage yet, Amoria is open for everyone!\r\n\r\nGo visit #bThomas Swift#k at Henesys if you wanna head to Amoria. If you are interested in weddings, be sure to speak with #dAmes the Wise#k once you get there!");
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 1:
            switch (status) {
                case 0:
                    if (cm.itemQuantity(proofOfLove) > 0) {
                        cm.sendOk("I hope you like the #rProof of Love#k I've made you!");
                        cm.dispose();
                        return;
                    }
                    if (cm.itemQuantity(reqItem[0]) >= reqItem[1]) {
                        cm.sendNext("Back so soon? Yay! Lemme see! Lemme see!");
                    } else {
                        cm.sendYesNo("So, you want a #rProof of Love#k, huh?");
                    }
                    break;
                case 1:
                    if (cm.itemQuantity(reqItem[0]) >= reqItem[1]) {
                        cm.sendOk("Amazing! Very bumpy. Very rigid. Very cute.\r\n\r\nHere, take this:  #i" + proofOfLove + "#");
                        cm.gainItem(reqItem[0], -reqItem[1]);
                        cm.gainItem(proofOfLove, 1);
                        cm.dispose();
                        return;
                    } else {
                        cm.sendAcceptDecline("Oh, oh. I know!\r\n\r\nI've seen those #bHorny Mushrooms#k walking around, you know? Kind of a weird name! But.\r\n\r\nHave you seen their little grey caps?\r\n\r\nI think #rthose bumpy little grey caps#k look absolutely precious! What do you say? Could you get me\r\n\r\n\t  #i" + reqItem[0] + "#  #bx" + reqItem[1] + "#k?");
                    }
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        default:
            cm.sendOk("#r<3#k");
            cm.dispose();
            return;
    }
}
