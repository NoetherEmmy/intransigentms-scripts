var MapleAlliance = Java.type("net.sf.odinms.net.world.guild.MapleAlliance");

var status, choice, guildName, partymembers, otherPerson, rank;

function start() {
    partymembers = cm.getPartyMembers();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status === 0) {
        cm.sendSimple("Hello there! I'm #bLenario#k.\r\n#b#L0#Can you please tell me what Guild Union is all about?#l\r\n#L1#How do I make a Guild Union?#l\r\n#L2#I want to make a Guild Union.#l\r\n#L3#I want to add more guilds for the Guild Union.#l\r\n#L4#I want to break up the Guild Union.#l");
    } else if (status === 1) {
        choice = selection;
        if (selection === 0) {
            cm.sendNext("Guild Union is just as it says, a union of a number of guilds to form a super group. I am in charge of managing these Guild Unions.");
            cm.dispose();
            return;
        } else if (selection === 1) {
            cm.sendNext("To make a Guild Union, 2 Guild Masters need to be in a party. The leader of this party will be assigned as the Guild Union Master.");
            cm.dispose();
            return;
        } else if(selection === 2) {
            if (p.getParty() === null) {
                cm.sendNext("You may not create an alliance until you get into a party of 2 people.");
                cm.dispose();
                return;
            } else if (partymembers.get(0).getGuild() === null) {
                cm.sendNext("You cannot form a Guild Union unless everyone in your party has a guild.");
                cm.dispose();
                return;
            } else if (partymembers.get(1).getGuild() === null) {
                cm.sendNext("Your party member does not seem to have a guild.");
                cm.dispose();
                return;
            } else if (partymembers.get(0).getGuild().getAllianceId() > 0) {
                cm.sendNext("You cannot form a Guild Union if you are already affiliated with a different Union.");
                cm.dispose();
                return;
            } else if (partymembers.get(1).getGuild().getAllianceId() > 0) {
                cm.sendNext("Your party member is already affiliated with a union.");
                cm.dispose();
                return;
            } else if (partymembers.size() !== 2) {
                cm.sendNext("Please make sure there are only 2 players in your party.");
                cm.dispose();
                return;
            } else if (cm.partyMembersInMap() !== 2) {
                cm.sendNext("Get your other party member on the same map please.");
                cm.dispose();
                return;
            } else {
                cm.sendYesNo("Oh, are you interested in forming a Guild Union?");
            }
        } else if (selection === 3) {
            rank = p.getMGC().getAllianceRank();
            if (partymembers !== null && partymembers.size() === 2) {
                if (partymembers.get(0).getId() === p.getId()) {
                    otherPerson = partymembers.get(1);
                } else {
                    otherPerson = partymembers.get(0);
                }
            }
            if (rank === 1) {
                if (p.getParty() === null && partymembers.size() === 2) {
                    cm.sendNext("You may not add a guild to your alliance until you get into a party of 2 people.");
                    cm.dispose();
                    return;
                } else if (p.getGuild() === null) {
                    cm.sendNext("You cannot add a guild to your union unless you have a guild.");
                    cm.dispose();
                    return;
                } else if (otherPerson.getGuild() === null) {
                    cm.sendNext("Your party member does not seem to have a guild.");
                    cm.dispose();
                    return;
                } else if (p.getGuild().getAllianceId() <= 0) {
                    cm.sendNext("You cannot add a guild to your union if you aren't already affiliated with a union.");
                    cm.dispose();
                    return;
                } else if (otherPerson.getGuild().getAllianceId() > 0) {
                    cm.sendNext("Your party member is already affiliated with a union.");
                    cm.dispose();
                    return;
                } else if (cm.partyMembersInMap() !== 2) {
                    cm.sendNext("Please make sure your other party member is on the same map that you are.");
                    cm.dispose();
                    return;
                } else {
                    cm.sendYesNo("Oh, are you interested in adding a guild to your Guild Union?");
                }
            } else {
                cm.sendNext("Only the Guild Union Master can expand the number of guilds in the Union.");
                cm.dispose();
                return;
            }
        } else if (selection === 4) {
            rank = p.getMGC().getAllianceRank();
            if (rank === 1) {
                cm.sendYesNo("Are you sure you want to disband your Guild Union?");
            } else {
                cm.sendNext("Only the Guild Union Master may disband the Guild Union.");
                cm.dispose();
                return;
            }
        }
    } else if (status === 2) {
        if (choice === 2) {
            cm.sendGetText("Now please enter the name of your new Guild Union. (max. 12 letters)");
        } else if (choice === 3) {
            if (p.getGuild().getAllianceId() <= 0) {
                cm.sendOk("You must be in a union to expand one.");
                cm.dispose();
                return;
            } else {
                if (MapleAlliance.loadAlliance(p.getGuild().getAllianceId()).addGuild(otherPerson.getGuild().getId())) {
                    cm.getC().getChannelServer().getWorldInterface().clearGuilds();
                    cm.sendOk("Your Guild Union has been expanded!");
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk("Uh oh! It looks like expanding the union failed somewhere.");
                    cm.dispose();
                    return;
                }
            }
        } else if (choice === 4) {
            if (p.getGuild() === null) {
                cm.sendNext("You cannot disband a non-existent Guild Union.");
                cm.dispose();
            } else if (p.getGuild().getAllianceId() <= 0) {
                cm.sendNext("You cannot disband a non-existent Guild Union.");
                cm.dispose();
            } else {
                MapleAlliance.disbandAlliance(cm.getC(), p.getGuild().getAllianceId());
                cm.sendOk("Your Guild Union has been disbanded.");
                cm.dispose();
            }
            return;
        }
    } else if (status === 3) {
        guildName = cm.getText();
        cm.sendYesNo("Will " + guildName + " be the name of your Guild Union?");
    } else if (status === 4) {
        if (!MapleAlliance.canBeUsedAllianceName(guildName)) {
            cm.sendNext("This name is unavailable, please choose another one."); //Not real text
            status = 1;
            choice = 2;
        } else {
            if (MapleAlliance.createAlliance(partymembers.get(0), partymembers.get(1), guildName) === null) {
                cm.sendOk("An unknown system error has occured.");
            } else {
                cm.sendOk("You have successfully formed a Guild Union.");
            }
            cm.dispose();
            return;
        }
    }
}
