/*
 * Assistant Bonnie
 * ID: 9201008
 *
 * Quest ID: 1021
 */

var status = 0;
var id = 1021;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === 1) {
        status++;
    } else if (mode === 0) {
        status--;
    } else {
        cm.sendOk("Oh. Ok.");
        cm.dispose();
        return;
    }
    if (!cm.onQuest()) {
        switch (status) {
            case 0:
                if (id - 1000 === cm.getStory()) {
                    cm.sendSimple(cm.selectQuest(id, "Maybe this whole flute thing isn't really #epan#nning out\r\nfor me... Ahaha, get it?"));
                } else {
                    cm.sendOk("Maybe this whole flute thing isn't really #epan#nning out\r\nfor me... Ahaha, get it?");
                    cm.dispose();
                    return;
                }
                break;
            case 1:
                cm.sendAcceptDecline(p.getCQuest().loadInfo(id));
                break;
            case 2:
                cm.startCQuest(id);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (!cm.onQuest(id)) {
        switch (status) {
            case 0:
                cm.sendYesNo(cm.randomText(4) + p.getCQuest().getTitle() + cm.randomText(5));
                break;
            case 1:
                cm.startCQuest(0);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (cm.canComplete()) {
        switch (status) {
            case 0:
                cm.sendSimple(cm.selectQuest(id, "#efiddles incessantly with shirt buttons, as if to play the flute#n")); 
                break;
            case 1:
                cm.sendNext(cm.showReward("Oh. Mygod. These instruments are gonna be amazing! We can even do all the music for the weddings now!\r\n\r\n#estarts weakly blowing a terribly-articulated melody into a bone flute#n"));
                break;
            case 2:
                cm.rewardPlayer(1, 0);
                p.sendHint(cm.randomText(6));
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else {
        switch (status) {
            case 0:
                if (mode === 0) {
                    cm.dispose();
                    return;
                } else {
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
                }
                break;
            case 1:
                cm.sendYesNo(cm.randomText(7));
                break;
            case 2:
                cm.startCQuest(0);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    }
}
