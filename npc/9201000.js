/*
 * Moony
 * Amoria (680000000)
 *
 * ID: 9201000
 * Wedding ring jeweler
 */

var MapleCharacter = Java.type("net.sf.odinms.client.MapleCharacter");

var status;
var ring    = [2240000, 2240001, 2240002, 2240002];
var reqItem = [4011007, 4021009, 4011006, 4011004];
var price   = [3000000, 2000000, 1000000, 500000];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i, text;
    if (mode === 1) {
        status++;
    } else if (type === 0 && mode === 0) {
        status--;
    } else {
        if (type === 1 && mode === 0) {
            cm.sendOk("Maybe another time, eh?");
        }
        cm.dispose();
        return;
    }

    var mqLvl = p.getMarriageQuestLevel();
    if (status === 0) {
        if (cm.getLevel() >= 10) {
            if (mqLvl === 0) {
                cm.sendNext("Hi, I'm Moony, and I make engagement rings for marriage.");
            } else if (mqLvl === 1) {
                var hasLoves = true;
                for (i = 4031367; i <= 4031370; ++i) {
                    if (!cm.itemQuantity(i)) {
                        hasLoves = false;
                        break;
                    }
                }
                if (hasLoves) {
                    cm.sendNext("Hey, back so soon?\r\nAnd with the #bProof of Love#ks? Let's see...");
                } else {
                    cm.sendOk("Please come back when you've got these 4 different #bProof of Love#ks:\r\n\r\n\t  #i4031367#  #i4031368#  #i4031369#  #i4031370#\r\n\r\nThey can be obtained from the #dLove Fairies#k that hang around Henesys, Ellinia, Perion, and Kerning City.");
                    cm.dispose();
                    return;
                }
            } else if (mqLvl === 2) {
                text = "Excellent. Now that you have your proofs of love, #ewhich ring would you like to get for your partner?#n#b\r\n";
                for (i = 0; i < ring.length; ++i) {
                    text += "\r\n#L" + i + "##b#t" + ring[i] + "#:\r\n\t\t\t#i" + reqItem[i] + "##k  x1, #i4021007#  x1, #r" + MapleCharacter.makeNumberReadable(price[i]) + "#k mesos#l";
                }
                cm.sendSimple(text);
            } else { // Already has ring
                cm.sendOk("Do you like the ring that you've gotten?");
                cm.dispose();
                return;
            }
        } else {
            cm.sendOk("You must be at least level 10 before speaking with me.");
            cm.dispose();
            return;
        }
    } else if (status === 1) {
        if (mqLvl === 0) {
            cm.sendYesNo("Hey, it looks like you wanna get married! Wanna make an engagement ring?");
        } else if (mqLvl === 1) {
            cm.sendNext("Great work getting the #bProof of Love#ks! Now we can make the #dEngagement Ring#k.");
        } else if (mqLvl === 2) {
            if (cm.haveItem(reqItem[selection]) && cm.haveItem(4021007) && cm.getMeso() >= price[selection]) {
                cm.gainItem(reqItem[selection], -1);
                cm.gainItem(4021007, -1);
                cm.gainMeso(-price[selection]);
                cm.gainItem(ring[selection], 1);
                cm.sendOk("Here's the ring, as promised. Have fun!");
                p.addMarriageQuestLevel();
            } else {
                cm.sendOk("It doesn't look like you've got all the ingredients required for that ring.");
            }
            cm.dispose();
            return;
        }
    } else if (status === 2) {
        if (mqLvl === 0) {
            p.addMarriageQuestLevel();
            cm.sendOk("Alright, then. First, I need you to bring me back these four colored #bProof of Love#ks:\r\n\r\n\t  #i4031367#  #i4031368#  #i4031369#  #i4031370#\r\n\r\nThey can be obtained from the #dLove Fairies#k that hang around Henesys, Ellinia, Perion, and Kerning City.\r\n\r\nAlso, only one person needs to do this quest: either you, or your partner.");
            cm.dispose();
            return;
        } else if (mqLvl === 1) {
            cm.removeAll(4031367);
            cm.removeAll(4031368);
            cm.removeAll(4031369);
            cm.removeAll(4031370);
            cm.removeAll(4031371);
            cm.removeAll(4031372);
            p.addMarriageQuestLevel();
            text = "You're going to need one of the following sets of materials to make an #bEngagement Ring#k:\r\n";
            for (i = 0; i < ring.length; ++i) {
                text += "\r\n#b#t" + ring[i] + "#:\r\n\t\t\t#i" + reqItem[i] + "##k  x1, #i4021007#  x1, #r" + MapleCharacter.makeNumberReadable(price[i]) + "#k mesos.";
            }
            cm.sendOk(text);
            cm.dispose();
            return;
        }
    }
}
