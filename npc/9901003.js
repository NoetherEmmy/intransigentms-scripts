/*
 * Woman 2 (Reporter)
 * Lilin's Manor: The Lobby
 *
 * ID: 9901003
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
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
            cm.sendSimple("Oh my god... I can't believe I'm finally getting the chance to do coverage of the Anniversary of the Realm gala!\r\n\r\nSo many important people...\r\n\r\nHold on. Who are you?\r\n\r\n#L0#No one.#l\r\n#L1#I'm actually going to be the special guest appearance tonight.#l\r\n#L2#Just delivering a few things.#l\r\n#L3#(walk away)#l");
            break;
        case 1:
            switch (selection) {
                case 0:
                    cm.sendOk("Oh, come now, surely you're #esomeone#n?");
                    cm.dispose();
                    return;
                case 1:
                    cm.sendSimple("Oh my god, really?! Can I ask you just a few questions, please?\r\n\r\n#L0#Um, actually I have something very important to do.#l");
                    cm.dispose();
                    return;
                case 2:
                    cm.sendSimple("Oh, like what?\r\n\r\n#L0#Oh, just a few ingredients for the buffet.#l\r\n#L1#The awards for the award ceremony.#l\r\n#L2#...Between you and me, I'm just here to steal shit.#l");
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 2:
            switch (selection) {
                case 0:
                    cm.sendOk("Mmmmmm... sounds delicious. I do hope they're vegan, though.");
                    cm.dispose();
                    return;
                case 1:
                    cm.sendSimple("Oh wow! D--do you mind if I take a peek? I promise I won't tell anyone.\r\n\r\n#L0#Sorry, but this is very serious business, ma'am.#l");
                    cm.dispose();
                    return;
                case 2:
                    cm.sendOk("Oh dear lord, I hope not! Maybe #eavoid#n crashing the party, will you?");
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            break;
        default:
            cm.dispose();
            return;
    }
}
