/*
 * Lady with toothpick
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901009
 */

var status = 0;
var combat;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    combat = mi.getPlayerProperty(p, "combat");
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (status < 1 && mode === 0) {
        cm.dispose();
        return;
    }   
    mode === 1 ? ++status : --status;
    switch (status) {
        case 0:
            if (!combat) {
                cm.sendSimple("#econtinues picking at teeth with toothpick#n\r\n\r\n#epauses#n\r\n\r\n#elooks you up and down#n\r\n\r\nYou should take a few bites. You look famished. Not that the tastebuds of someone like you are of a calibre to appreciate this exquisite meal...\r\n\r\n#L0#Excuse me?#l\r\n#L1#Not like the tastebuds of someone like you are any better.#l\r\n#L2#(walk away)#l");
                break;
            } else {
                cm.sendNext("F--\r\n\r\n...uh-huck y-- - you.");
                cm.dispose();
                return;
            }
            break;
        case 1:
            switch(selection) {
                case 0:
                    cm.sendOk("#esneers#n\r\n\r\nYou heard me.");
                    break;
                case 1:
                    cm.sendOk("#erolls eyes emphatically#n");
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
