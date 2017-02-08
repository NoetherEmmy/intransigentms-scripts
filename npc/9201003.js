/*
 * Mom and Dad
 * Meet the Parents (680000004)
 *
 * ID: 9201003
 * Wedding quest NPC
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else if (type === 1 && mode === 0) {
        cm.sendOk("Not ready to be married yet? That's understandable.");
        cm.dispose();
        return;
    } else {
        cm.dispose();
        return;
    }

    var p = cm.getPlayer();
    if (p.getMarriageQuestLevel() === 51) {
        if (status === 0) {
            cm.sendYesNo("Hey, kiddo.\r\n\r\nAre you sure that... #ethis#n is the person you want to marry? I mean -- I believe in love at first sight, but this is really... rather sudden.\r\n\r\nI don't think either of us are ready for this. Let's consider a little more closely.\r\n\r\nDo you #ereally#n love this person?");
        } else if (status === 1) {
            p.addMarriageQuestLevel();
            cm.sendNext("Well, alright then.\r\n\r\nGo back to the love fairies in #bOrbis#k and #bLudibrium#k and collect two more #bProof of Love#ks to prove it:\r\n\r\n\t  #i4031371#  #i4031372#");
            cm.dispose();
            return;
        }
    } else if (p.getMarriageQuestLevel() === 52) {
        var hasLoves = true;
        if (status === 0) {
            for (var id = 4031371; id <= 4031372; ++id) {
                if (!cm.itemQuantity(id)) {
                    hasLoves = false;
                    break;
                }
            }
            if (hasLoves) {
                cm.sendNext("Wow... you really are serious.\r\n\r\n#esighs#n\r\n\r\nOkay then, here is our blessing.");
            } else {
                cm.sendNext("Come back when you get the two #bProof of Love#ks from the love fairies in #bOrbis#k and #bLudibrium#k:\r\n\r\n\t  #i4031371#  #i4031372#");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            p.addMarriageQuestLevel();
            cm.removeAll(4031367);
            cm.removeAll(4031368);
            cm.removeAll(4031369);
            cm.removeAll(4031370);
            cm.removeAll(4031371);
            cm.removeAll(4031372);
            cm.gainItem(4031373, 1);
            cm.dispose();
            return;
        }
    } else {
        cm.sendOk("Hey, we're Mom and Dad.");
        cm.dispose();
        return;
    }
}
