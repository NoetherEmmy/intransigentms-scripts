/*
 * Red Sign
 * LPQ NPC
 * ID: 2040034
 */

var status;
var minLevel = 35;
var maxLevel = 81;
var minPlayers = 1;
var maxPlayers = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    
    if (status === 0) {
        if (cm.getPlayer().getParty() === null) { // No party
            cm.sendOk("From here on above, this place is full of dangerous artifacts and monsters, so I can't let you go further up.\r\n\r\nIf you're intrested in saving us and bringing some level of peace back into Ludibrium, however, that's a different story. If you want to defeat a powerful creature residing at the very top, then please gather up your party members.\r\n\r\nIt won't be easy, but... I think you can do it.");
        } else if (!cm.isLeader()) { // Not leader
            cm.sendOk("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
        } else {
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); ++i) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel) {
                    levelValid++;
                }
            }
            if (inMap < minPlayers || inMap > maxPlayers || levelValid !== inMap) {
                cm.sendOk("Your party doesn't have between " + minPlayers + " and " + maxPlayers + " eligible members. Please keep in mind that this party quest is only for players between levels " + minLevel + " and " + maxLevel + ".");
            } else {
                var em = cm.getEventManager("LudiPQ");
                if (em === null) {
                    cm.sendOk("This PQ is not currently available.");
                } else if (em.getProperty("LudiPQOpen").equals("true")) {
                    // Begin the PQ
                    em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                    // Remove passes and coupons
                    party = cm.getChar().getEventInstance().getPlayers();
                    cm.removeFromParty(4001022, party);
                    em.setProperty("LudiPQOpen", "false");
                } else {
                    cm.sendNext("Another party is inside taking on the party quest. Please try again after that group vacates the room.");
                }
            }
        }
        cm.dispose();
        return;
    }
}
