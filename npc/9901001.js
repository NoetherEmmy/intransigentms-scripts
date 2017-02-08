/*
 * Woman 1 (Dress)
 * Lilin's Manor: The Lobby
 *
 * ID: 9901001
 */

var status = 0;
var address = "";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    address = p.getGender() === 0 ? "sir" : "sister";
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
            cm.sendSimple("Oh dear, hun. Is that really what you're gonna wear to the Anniversary of the Realm gala? Or are you just here to deliver something?\r\n\r\n#L0#I think you're just overdressed.#l\r\n#L1#Uh, some people can't afford fancy clothes like your own.#l\r\n#L2#Whatever.#l");
            break;
        case 1:
            switch (selection) {
                case 0:
                    cm.sendOk("Uh, excuse me, " + address + ". I look perf. This is the biggest event all year, after all!");
                    cm.dispose();
                    return;
                case 1:
                    cm.sendOk("If you can't afford some clothes, then you can't afford this gala, sweetheart!");
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
