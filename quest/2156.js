// Pia's Rainbow Snail Shell Shit

var status = -1;
var rainbowSnailShell = 2210006;

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
        if (!qm.haveItem(rainbowSnailShell)) {
            qm.sendOk("Come back to me when you have that lustrous, rainbow snail shell.");
            qm.dispose();
            return;
        }
        qm.sendNext("So... did you get one? Are they even real? Lemme see it! Lemme see it!");
    } else if (status === 1) {
        qm.sendNext("#eyou show Pia the rainbow snail shell you found#n\r\n\r\nOh. My. God. It's --");
    } else if (status === 2) {
        qm.sendNext("You know what, forget about the wishes. All I wish for is this #ebeautiful#n snail shell.\r\n\r\nHere... for your efforts:\r\n\r\n\t#bMesos: #e30,000#n#k\r\n\t#rExperience: #e7,500#n#k\r\n\t#dFame: #e3#n#k");
    } else if (status === 3) {
        qm.forceCompleteQuest();
        qm.gainExp(7500 * qm.getC().getChannelServer().getExpRate() * qm.getPlayer().getAbsoluteXp());
        qm.gainMeso(30000 * qm.getC().getChannelServer().getMesoRate());
        qm.gainItem(rainbowSnailShell, -1);
        qm.getPlayer().addFame(3);
        qm.dispose();
        return;
    }
}
