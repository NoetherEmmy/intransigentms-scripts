/*
 * Geanie
 * ID: 9000014
 * Quest ID: 1011
 */

var ScriptEngineManager = Java.type("javax.script.ScriptEngineManager");

var status;
var id = 1011;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    var p = cm.getPlayer();
    if ("" + p.getName() === "Noether") {
        var sem = new ScriptEngineManager();
        var listOfSef = sem.getEngineFactories();
        listOfSef.forEach(function(sef) { print(sef.getEngineName()); });
        cm.dispose();
        return;
    }
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
    }
    if (!cm.onQuest()) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else if (id - 1000 === cm.getStory()) {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            } else {
                cm.sendOk(cm.randomText(1));
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                cm.sendAcceptDecline(p.getCQuest().loadInfo(id));
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else {
                cm.startCQuest(id);
                cm.dispose();
                return;
            }
        }
    } else if (!cm.onQuest(id)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + p.getCQuest().getTitle() + cm.randomText(5));
        } else if (status === 1) {
            cm.startCQuest(0);
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(id) && cm.canComplete()) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendOk(cm.showReward("Ah! Thank you! "));
        } else if (status === 2) {
            cm.rewardPlayer(1, 0);
            cm.gainFame(18);
            p.sendHint(cm.randomText(6));
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(id) && !cm.canComplete()) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            }
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            cm.startCQuest(0);
            cm.dispose();
            return;
        }
    }
}
