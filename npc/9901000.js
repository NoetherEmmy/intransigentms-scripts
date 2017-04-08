/*
 * Bouncer NPC
 * Lilin's Manor: The Lobby
 *
 * ID: 9901000
 */

var status;
var firstSelection = -1;
var persuadeDc = 700;
var intimidateDc = 700;
var diplomacyPoints = 450;
var thisMap = 5001;
var galaMap = 5004;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = pq.getMapInstance(p.getMapId());
    var roll;

    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 0 && (status < 1 || type === 4)) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    switch (status) {
        case 0:
            var playerName = "" + p.getName();
            var fakeName = playerName.toLowerCase() === "bourdieu" ? "Frankel" : "Bourdieu";
            cm.sendSimple("You want in?\r\n\r\nWhat's your name? I can check if you're on the guest list.\r\n\r\n#L0#My name's " + playerName + ".#l\r\n#L1#How about you just let me and my friends here inside and we'll go on our merry way?#l\r\n#L2#My name's " + fakeName + ", and I'm here on Lilin's personal request so that I may make a surprise guest appearance. (Persuade)#l");
            break;
        case 1:
            firstSelection = selection;
            switch (firstSelection) {
                case 0:
                    cm.sendOk("#elooks through guest list#n\r\n\r\n...Yeah, you're not on here. Sorry, bud.");
                    cm.dispose();
                    return;
                case 1:
                    cm.sendSimple("Uhm, what? I'm sorry, but you're either on the guest list, or you're not welcome.\r\n\r\n#L0#Fine, then.#l\r\n#L1#I said, let us through. Now. (Intimidate)#l");
                    break;
                case 2:
                    if (mi.getPlayerProperty(p, "persuaded")) {
                        cm.sendOk("Nice try, kid. I'm not falling for that this time, either.");
                        cm.dispose();
                        return;
                    }
                    mi.setPlayerProperty(p, "persuaded", true);
                    roll = p.getTotalInt() + Math.random() * 50;
                    if (roll >= persuadeDc) {
                        cm.sendNext("#ethe bouncer appears to have believed your lies!#n\r\n\r\nOh, right, of course. Sorry for the inconvenience, sir.\r\nYou and your party can come right in.\r\n\r\n(#b" + diplomacyPoints + " points awarded#k)");
                    } else {
                        cm.sendOk("#eyour persuasive wit does not appear to impress the bouncer#n\r\n\r\nUh... you mean the famous one, right? Yeah, you don't really look like them. Nice try, though.");
                        cm.dispose();
                        return;
                    }
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 2:
            switch (firstSelection) {
                case 1:
                    if (selection === 1) {
                        if (mi.getPlayerProperty(p, "intimidated")) {
                            cm.sendOk("Nice try, kid. I told you I'm not afraid of ya.");
                            cm.dispose();
                            return;
                        }
                        mi.setPlayerProperty(p, "intimidated", true);
                        roll = p.getTotalStr() + Math.random() * 60;
                        if (roll >= persuadeDc) {
                            cm.sendNext("#ethe bouncer looks you over and seems to have decided that you aren't someone he wants to tangle with#n\r\n\r\nI... uh... s--sure. Sorry for the inconvenience, sir.\r\nYou and your party can go right ahead.\r\n\r\n(#b" + diplomacyPoints + " points awarded#k)");
                        } else {
                            cm.sendOk("#eyour physical aptitude does not appear to impress the bouncer#n\r\n\r\nYeah, I don't think so, punk. Step back and let the real guests come through, will ya?");
                            cm.dispose();
                            return;
                        }
                    } else {
                        cm.dispose();
                        return;
                    }
                    break;
                case 2:
                    pq.addPoints(diplomacyPoints);
                    pq.registerMap(galaMap);
                    cm.warpParty(galaMap);
                    pq.unregisterMap(thisMap);
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 3:
            pq.addPoints(diplomacyPoints);
            pq.registerMap(galaMap);
            cm.warpParty(galaMap);
            pq.unregisterMap(thisMap);
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
