/*
 * Man 1 (Mask)
 * Lilin's Manor: The Lobby
 *
 * ID: 9901002
 */

var status = 0;
var address = "";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    address = p.getGender() === 0 ? "man" : "beautiful";
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (status < 1 && mode === 0) {
        cm.dispose();
        return;
    }   
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    switch (status) {
        case 0:
            cm.sendSimple("Hey " + address + ". What brings you here?\r\n\r\n#L0#Just here to deliver something.#l\r\n#L1#I'm actually the special guest tonight.#l\r\n#L2#Just looking around.#l\r\n#L3#I'm here to steal some shit.#l");
            break;
        case 1:
            switch (selection) {
                case 0:
                    cm.sendOk("Ah. Right.");
                    cm.dispose();
                    return;
                case 1:
                    cm.sendNext("O -- oh. Wow, that's great. What was your name again?");
                    cm.dispose();
                    return;
                case 2:
                    cm.sendOk("Right on. I was just looking around, myself.\r\n\r\nLookin' for some palms to grease and some butts to kiss...");
                    cm.dispose();
                    return;
                case 3:
                    cm.sendOk("Oh, haha. Wow, ok. You're certainly... very forthright about it.\r\n\r\n#eahem#n");
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
