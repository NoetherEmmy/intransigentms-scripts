// Trainer Bartos | The Secret Method
// ID: 4647

var status = -1;
var petSnack = 5460000;

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
        if (!qm.haveItem(petSnack)) {
            qm.sendOk("Come back to me when you have the #bPet Snack#k.");
            qm.dispose();
            return;
        }
        qm.sendNext("Boy, that's the finest god damn pet snack I've ever laid m'eyes on.");
    } else if (status === 1) {
        qm.sendNext("Good, hard work.\r\n\r\nHere... for your efforts:\r\n\r\n\t#bMesos: #e90,000#n#k\r\n\t#rExperience: #e1,700#n#k\r\n\t#dFame: #e3#n#k");
    } else if (status === 2) {
        qm.forceCompleteQuest();
        qm.gainExp(1700 * qm.getC().getChannelServer().getExpRate() * qm.getPlayer().getAbsoluteXp());
        qm.gainMeso(90000 * qm.getC().getChannelServer().getMesoRate());
        qm.gainItem(petSnack, -1);
        qm.getPlayer().addFame(3);
        qm.dispose();
        return;
    }
}
