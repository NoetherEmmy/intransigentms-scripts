/*
 * Shifty-looking man
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901010
 */

var status = 0;
var combat, bugUsed;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    combat = mi.getPlayerProperty(p, "combat");
    bugUsed = mi.propertyExists("bugUsed");
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
                cm.sendOk("What're you lookin' at?");
                cm.dispose();
                return;
            } else {
                var extraOptions = bugUsed ? "" : "\r\n#L1#(smash the bug)#l\r\n#L2#(curse loudly into the bug, in case someone is listening on the other end)#l";
                cm.sendSimple("#ewith the man lying unconscious on the floor and his black sunglasses shattered, you notice that there appears to have been some kind of microphone or bug hidden just outside of his left orbit#n\r\n\r\n#L0#(walk away)#l" + extraOptions);
            }
            break;
        case 1:
            switch (selection) {
                case 1:
                    cm.sendOk("#ethe bug is completely smashed; it will never function again#n");
                    mi.setPlayerProperty(p, "bugUsed", true);
                    pq.addPoints(10);
                    break;
                case 2:
                    cm.sendOk("#eyou yell profanities into the microphone and pause for a second, almost expecting a reply; alas, the bug does not make a single sound#n");
                    mi.setPlayerProperty(p, "bugUsed", true);
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
