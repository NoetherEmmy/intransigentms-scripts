/*
 * Steward
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901017
 */

var MapleStat = Java.type("net.sf.odinms.client.MapleStat");

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    var combat = mi ? mi.getPlayerProperty(p, "combat") : undefined;
    var address = p.getGender() === 0 ? "sir" : "ma'am";

    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (status < 1 && mode === 0) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    switch (status) {
        case 0:
            if (!combat) {
                cm.sendYesNo("Tofu, " + address + "?");
            } else {
                cm.sendNext("#ea half-eaten platter of tofu appetizers is now strewn where the steward once was#n");
                cm.dispose();
                return;
            }
            break;
        case 1:
            if (type === 1 && mode === 1) {
                cm.sendOk("#eyou eat the tofu appetizer; it is delicious#n\r\n\r\n#eyou are healed for 350 hit points#n");
                var newHp = p.getHp() + 350;
                p.setHp(newHp);
                p.updateSingleStat(MapleStat.HP, p.getHp());
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
