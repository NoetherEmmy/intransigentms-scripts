/*
 * Mark of the Squad
 * ID: 2083004
 */
 
var status;
var meetslevel = true;
var minPartySize = 1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        if (mode === 0 && status === 0) {
            cm.dispose();
            return;
        }
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (status === 0) {
            if (cm.getPlayer().getParty() !== null) {
                if (cm.getPlayer().getParty().getMembers().size() >= minPartySize) {
                    if (cm.getPlayer().getId() === cm.getPlayer().getParty().getLeader().getId()) {
                        for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); ++i) {
                            var member = cm.getPlayer().getParty().getMembers().get(i);
                            if (member.getLevel() < 130) {
                                meetslevel = false;
                                break;
                            }
                        }
                        if (meetslevel) {
                            if (cm.getMap(240060200).playerCount() === 0) {
                                cm.sendYesNo("Are you and your party ready to go in?");
                            } else {
                                cm.sendOk("Horntail's lair appears to be occupied at the moment. Sorry.");
                                cm.dispose();
                                return;
                            }
                        } else {
                            cm.sendOk("All members of your party must be at least level 130.");
                            cm.dispose();
                            return;
                        }
                    } else {
                        cm.sendOk("Only the leader of the party may talk to me to go in.");
                        cm.dispose();
                        return;
                    }
                } else {
                    cm.sendOk("You must get in a party of at least 6 people to go inside.");
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("You must get in a party of at least 6 people to go inside.");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            cm.getMap(240060200).killAllMonsters(false);
            cm.warpParty(240060000);
            cm.dispose();
            return;
        }
    }
}
