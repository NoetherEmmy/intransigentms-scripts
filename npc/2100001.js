/*
 * Muhamad
 * ID: 2100001
 *
 * Lidium refiner
 */

var status;
var lidiumOre = 4010007;
var lidium = 4011008;
var oreCount;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode >= 1) {
        status++;
    } else if (mode === 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
    switch (status) {
        case 0:
            cm.sendSimple("Hello, there! I'm Muhamad.\r\n\r\nSomething tells me you're here to refine some #eminerals#n... is that correct?\r\n\r\n#L0#I'd like to refine some Lidium Ore.#l\r\n#L1#Actually, I'm here for something a little more 'special.'#l");
            break;
        case 1:
            switch (selection) {
                case 0:
                    cm.sendYesNo("Sounds like good business to me. For every #b10#k of these\r\n\r\n#i" + lidiumOre + "#\r\n\r\nand for every #b50,000#k mesos, I can make you one of these beauties:\r\n\r\n#i" + lidium + "#\r\n\r\nSound like a deal?");
                    break;
                case 1:
                    cm.sendOk("#eMuhamad's eyebrows quickly furrow#n\r\n\r\nShhh! Shhhhhhhhh...\r\n\r\n#elooks around wearily#n\r\n\r\nThey'll hear you!");
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 2:
            oreCount = cm.itemQuantity(lidiumOre);
            var toBeMade;
            if (oreCount >= 10) {
                if (p.getMeso() >= 50000 * Math.floor(oreCount / 10)) {
                    toBeMade = Math.floor(oreCount / 10);
                } else {
                    toBeMade = Math.floor(p.getMeso() / 50000);
                }
                cm.gainItem(lidiumOre, -10 * toBeMade);
                cm.gainMeso(-50000 * toBeMade);
                cm.gainItem(lidium, toBeMade);
                cm.sendOk("Here y'are:\r\n\r\n#i" + lidium + "#  x" + toBeMade);
                cm.dispose();
                return;
            } else {
                cm.sendOk("#eshakes head#n\r\n\r\nI need more material than that, kid.");
                cm.dispose();
                return;
            }
            break;
        default:
            cm.dispose();
            return;
    }
}
