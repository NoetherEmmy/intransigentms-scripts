/*
 * Man 2 (Sitting)
 * Lilin's Manor: The Lobby
 *
 * ID: 9901005
 */

var status;
var thisMap = 5001;
var ventMap = 5002;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
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
            cm.sendSimple("Hey kid. What're you doin' around a place like this?\r\n\r\n#L0#I should ask the same of you.#l\r\n#L1#I'm trying to get into the gala.#l\r\n#L2#I run this place.#l\r\n#L3#(walk away from strange man)#l");
            break;
        case 1:
            switch (selection) {
                case 0:
                    cm.sendOk("Pffft, whatever kiddo. I've been skating through parties like this since you were in diapers.");
                    cm.dispose();
                    return;
                case 1:
                    cm.sendYesNo("Need a way in?\r\n\r\n#eleans in a bit, lowering his voice#n\r\n\r\nWell I'm your guy. I know this place like the back side of my hand. Right now it's pretty locked down, though.\r\n\r\nThere's still... one way you can get in. You see, the ventilation in the library actually has human access not too far from here. You can get into the library from there, but I gotta warn you, the vents have #ereal#n wide corridors, and are known to be #roften infested by monsters#k.\r\n\r\nI can show you where the vents are if you really want, though. Are you sure you wanna try it?");
                    break;
                case 2:
                    cm.sendOk("Hah! That's a good one. Thanks for the laugh, kiddo.");
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 2:
            pq.registerMap(ventMap);
            cm.warpParty(ventMap);
            pq.unregisterMap(thisMap);
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
