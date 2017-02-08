/** 
 * Tombstone
 * ID: 9201073
 * Map ID: 600020600
 * A part of quest ID: 2004
 **/ 

var status = 0;
var id = 2004;
var numberToSpawn = 8;

var displaycount = 30;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    var p = cm.getPlayer();
    var i;
    if (p.getMap().getId() !== 600020600) {
        if (mode < 1) {
            cm.dispose();
            return;
        } else {
            if (mode === 1) {
                status++;
            } else {
                status--;
            }
            if (status === 0) {
                cm.sendSimple("#r#eDeath rankings for IntransigentMS#n#k\r\n\r\n#L0#Highest paragon levels#l\r\n#L1#Highest levels achieved#l\r\n#L2#Highest death counts#l\r\n#L3#Highest suicide counts#l");
            } else if (status === 1) {
                switch(selection) {
                    case 0:
                        cm.sendOk("Top " + displaycount + " players, ranked by #rparagon level#k (total levels achieved summed across all lives):\r\n\r\n" + cm.getParagonLevelRanking(displaycount));
                        cm.dispose();
                        return;
                    case 1:
                        cm.sendOk("Top " + displaycount + " players, ranked by #rhighest level achieved#k:\r\n\r\n" + cm.getHighestLevelAchievedRanking(displaycount));
                        cm.dispose();
                        return;
                    case 2:
                        cm.sendOk("Top " + displaycount + " players, ranked by #rtotal death count#k:\r\n\r\n" + cm.getDeathCountRanking(displaycount));
                        cm.dispose();
                        return;
                    case 3:
                        cm.sendOk("Top " + displaycount + " players, ranked by #rtotal suicide count#k:\r\n\r\n" + cm.getSuicidesRanking(displaycount));
                        cm.dispose();
                        return;
                    default:
                        cm.dispose();
                        return;
                }
            }
        }
    } else {
        if (mode === -1) {
            if (status === 1 && p.getQuestKills(2) < 1 && cm.onQuest(id)) {
                cm.sendNext("#eYour waffle-placing disturbs the incubating creatures!#n");
                p.setQuestKills(1000000, 1);
                for (i = 0; i < numberToSpawn; ++i) {
                    cm.spawnMonster(3110300);
                }
                cm.dispose();
                return;
            } else {
                cm.dispose();
                return;
            }
        } else {
            if (mode === 0 && status === 0) {
                cm.dispose();
                return;
            }
            if (mode === 1) {
                status++;
            } else {
                status--;
            }
            if (!cm.onQuest(id) || p.getQuestKills(1000000) > 0) {
                cm.sendNext("In the tombstone, you can make out a crude engraving:\r\n\r\n#eHere lies Baekya.#n");
                cm.dispose();
                return;
            } else {
                if (status === 0) {
                    cm.sendSimple("In the tombstone, you can make out a crude engraving:\r\n\r\n#eHere lies Baekya.#n\r\n\r\n#L0#Carefully place a waffle on Baekya's grave#l\r\n#L1#Back away from the body#l");
                } else if (status === 1) {
                    if (selection === 0) {
                        if (cm.haveItem(2022192,  1)) {
                            cm.gainItem(2022192, -1);
                            cm.sendNext("As you place the waffle down, you swear you can see Baekya smile a little.");
                        } else {
                            cm.sendNext("You don't have a waffle to place.");
                            cm.dispose();
                            return;
                        }
                    } else if (selection === 1) {
                        cm.dispose();
                        return;
                    }
                } else if (status === 2) {
                    cm.sendNext("#eYour waffle-placing disturbs the incubating creatures!#n");
                    p.setQuestKills(1000000, 1);
                    for (i = 0; i < numberToSpawn; ++i) {
                        cm.spawnMonster(3110300);
                    }
                    cm.dispose();
                    return;
                }
            }
        }
    }
}
