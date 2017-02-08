load('nashorn:mozilla_compat.js');
/*
 * Tombstone (on Headless Horseman map)
 *
 * ID: 9201084
 */
 
var status = 0;
var displaycount = 30;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#r#eDeath rankings for IntransigentMS#n#k\r\n\r\n#L0#Highest paragon levels#l\r\n#L1#Highest levels achieved#l\r\n#L2#Highest death counts#l\r\n#L3#Highest suicide counts#l");
        } else if (status == 1) {
            switch(selection) {
                case 0:
                    cm.sendOk("Top " + String(displaycount) + " players, ranked by #rparagon level#k (total levels achieved summed across all lives):\r\n\r\n" + cm.getParagonLevelRanking(displaycount));
                    cm.dispose();
                    return;
                case 1:
                    cm.sendOk("Top " + String(displaycount) + " players, ranked by #rhighest level achieved#k:\r\n\r\n" + cm.getHighestLevelAchievedRanking(displaycount));
                    cm.dispose();
                    return;
                case 2:
                    cm.sendOk("Top " + String(displaycount) + " players, ranked by #rtotal death count#k:\r\n\r\n" + cm.getDeathCountRanking(displaycount));
                    cm.dispose();
                    return;
                case 3:
                    cm.sendOk("Top " + String(displaycount) + " players, ranked by #rtotal suicide count#k:\r\n\r\n" + cm.getSuicidesRanking(displaycount));
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
        } else if (status == 2) {
            cm.dispose();
            return;
        }
    }
}
