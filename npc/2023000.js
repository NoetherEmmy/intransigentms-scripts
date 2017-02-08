/*
 * Danger Zone Taxi
 * ID: 2023000
 */

var fromMap     = [211000000, 220000000, 240000000];
var toMap       = [211040200, 220050300, 240030000];
var cost        = [45000,     25000,     55000];
var costStrings = ["45,000",  "25,000",  "55,000"];
var location;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode < 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status === 0) {
        location = fromMap.indexOf(p.getMapId());
        cm.sendNext("Hello there! This Bullet Taxi will take you to any danger zone from #m" + p.getMapId() + "# to #b#m" + toMap[location] + "##k on this grand continent of Ossyria! The transportation fee of #b" + costStrings[location] + " mesos#k may seem expensive, but not that much when you want to easily transport through danger zones!");
    } else if (status === 1) {
        cm.sendYesNo("Do you want to #bpay mesos#k and transport to #b#m" + toMap[location] + "##k?");
    } else if (status === 2) {
        if (cm.getMeso() < cost[location]) {
            cm.sendNext("You don't seem to have enough mesos. I'm terribly sorry, but I can't help you unless you pay up. Bring in the mesos by hunting some more and come back when you have enough.");
            cm.dispose();
            return;
        } else {
            cm.warpRandom(toMap[location]);
            cm.gainMeso(-cost[location]);
            cm.dispose();
            return;
        }
    } else {
        cm.dispose();
        return;
    }
}
