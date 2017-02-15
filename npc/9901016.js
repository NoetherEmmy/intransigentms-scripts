/*
 * Woman in denim hood
 * Lilin's Manor | Gala Main Room
 *
 * ID: 9901016
 */

var JavaMath = Java.type("java.lang.Math");

var status;
var combat, fakeName, autographed, triedAutograph;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    combat = mi.getPlayerProperty(p, "combat");
    autographed = mi.propertyExists("autographed");
    triedAutograph = mi.getPlayerProperty(p, "triedAutograph");
    var address = p.getGender() === 0 ? "weirdo" : "sister";
    if (mode < 0 || (status < 1 && mode === 0)) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;
    switch (status) {
        case 0:
            if (!combat) {
                if (mi.getPlayerProperty(p, "autographed")) {
                    cm.sendOk("#eswoons#n");
                    cm.dispose();
                    return;
                }
                var playerName = "" + p.getName();
                fakeName = playerName.toLowerCase() == "bourdieu" ? "Frankel" : "Bourdieu";
                cm.sendSimple("I'm sorry, do I know you?\r\n\r\n#L0#You probably do. My name is " + fakeName + ", I'm the special guest appearance tonight.#l\r\n#L1#Uh, yeah. I'm " + playerName + ". Remember me?#l\r\n#L2#Uh, no.#l");
            } else {
                cm.sendNext("#estands silently with shocked look on face#n");
                cm.dispose();
                return;
            }
            break;
        case 1:
            switch (selection) {
                case 0:
                    if (JavaMath.random() < 0.4 && !autographed && !triedAutograph) {
                        cm.sendYesNo("Oh. My. God. Can I have your autograph?!");
                    } else if (autographed) {
                        cm.sendOk("Umm... what? Do you think that's funny? I just saw " + fakeName + " a little while ago.");
                        cm.dispose();
                        return;
                    } else {
                        cm.sendOk("I think I know what " + fakeName + " looks like, " + address + ". Ugh.");
                        mi.setPlayerProperty(p, "triedAutograph", true);
                        cm.dispose();
                        return;
                    }
                    break;
                case 1:
                    cm.sendOk("Uh... who?");
                    cm.dispose();
                    return;
                case 2:
                    cm.sendOk("Oh.");
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 2:
            if (mode === 1 && type === 1) {
                mi.setPlayerProperty(p, "autographed", true);
                cm.sendOk("Yaaaaaaaaaas!");
                pq.addPoints(15);
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
