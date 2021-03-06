/**
    Rolly - Ludibirum Maze PQ
**/

var status;
var minLevel = 51;
var maxLevel = 101;
var minPlayers = 3;
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
        cm.sendSimple("This is the entrance to the #e#rLudibrium Maze#k#n. Enjoy!\r\n\r\n#b#L0#Enter the Lubidrium Maze#l\r\n#L1#What is the Ludibrium Maze?");
    } else if (status === 1) {
        if (selection === 0) {
            if (cm.getPlayer().getParty() === null) { // Not leader
                cm.sendOk("Try taking on this maze quest with your party. If you #edo#n decide to tackle it, please have your party leader notify me!");
            } else if (!cm.isLeader()) { // Not leader
                cm.sendOk("Try taking on this maze quest with your party. If you #edo#n decide to tackle it, please have your party leader notify me!");
            } else {
                var party = cm.getParty().getMembers();
                var inMap = cm.partyMembersInMap();
                var levelValid = 0;
                for (var i = 0; i < party.size(); ++i) {
                    if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel) {
                        levelValid++;
                    }
                }
                if (inMap < minPlayers || inMap > maxPlayers) {
                    cm.sendOk("Your party doesn't have between " + minPlayers + " and " + maxPlayers + " players that are eligible for this party quest. Please make sure all your members are present and qualified to participate in this quest (valid level range: " + minLevel + " to " + maxLevel + ").\r\n\r\nI see #b" + inMap + "#k of your party members are in Ludibrium. If this seems wrong, #blog out and log back in,#k or reform the party.");
                } else if (levelValid !== inMap) {
                    cm.sendOk("Please make sure all your members are present and qualified to participate in this quest. This PQ requires players ranging from level " + minLevel + " to level " + maxLevel + ". I see #b" + levelValid + "#k members are in the right level range. If this seems wrong, #blog out and log back in,#k or reform the party.");
                } else {
                    var em = cm.getEventManager("LudiMazePQ");
                    if (em === null) {
                        cm.sendOk("This PQ is not currently available.");
                    } else if (em.getProperty("LMPQOpen").equals("true")) {
                        // Begin the PQ
                        em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                        // Remove passes and coupons
                        party = cm.getChar().getEventInstance().getPlayers();
                        cm.removeFromParty(4001106, party);
                        em.setProperty("LMPQOpen", "false");
                    } else {
                        cm.sendNext("There is already another party inside. Please wait !");
                    }
                }
            }
        } else if (selection === 1) {
            cm.sendOk("This maze is available to all parties of " + minPlayers + " or more members, and all participants must be between Level " + minLevel + "~" + maxLevel + ".  You will be given 15 minutes to escape the maze.  At the center of the room, there will be a Warp Portal set up to transport you to a different room.  These portals will transport you to other rooms where you'll (hopefully) find the exit.  Pietri will be waiting at the exit, so all you need to do is talk to him, and he'll let you out.  Break all the boxes located in the room, and a monster inside the box will drop a coupon.  After escaping the maze, you will be awarded with EXP based on the coupons collected.  Additionally, if the leader possesses at least 30 coupons, then a special gift will be presented to the party.  If you cannot escape the maze within the allotted 15 minutes, you will receive 0 EXP for your time in the maze.  If you decide to log off while you're in the maze, you will be automatically kicked out of the maze.  Even if the members of the party leave in the middle of the quest, the remaining members will be able to continue on with the quest.  If you are in critical condition and unable to hunt down the monsters, you may avoid them to save yourself.  Your fighting spirit and wits will be tested!  Good luck!");
        }
        cm.dispose();
        return;
    }
}
