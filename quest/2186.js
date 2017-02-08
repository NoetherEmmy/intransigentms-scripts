// Abel | Help Me Find My Glasses
// ID: 2186

var status = -1;
var abelsGlasses = 4031853;
var nautilusScroll = 2030019;

function start(mode, type, selection) {
}

function end(mode, type, selection) {
    if (mode === -1) {
        qm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        if (!qm.haveItem(abelsGlasses)) {
            qm.sendOk("Come back to me when you have the #bmy glasses#k.");
            qm.dispose();
            return;
        }
        qm.sendNext("O -- oh. My glasses? Are those my glasses?\r\n\r\nSweet damn, my friend. Thank you.\r\n\r\n#eclumsily puts glasses on face after rubbing them with his shirt#n");
    } else if (status === 1) {
        qm.sendNext("Oh, um... Here. For your efforts:\r\n\r\n\t#rExperience: #e1,700#n#k\r\n\t#dItems:#k\r\n\t\t#i" + nautilusScroll + "#  x10");
    } else if (status === 2) {
        qm.forceCompleteQuest();
        qm.gainExp(1700 * qm.getC().getChannelServer().getExpRate() * qm.getPlayer().getAbsoluteXp());
        qm.gainItem(abelsGlasses, -1);
        qm.gainItem(nautilusScroll, 10);
        qm.dispose();
        return;
    }
}
