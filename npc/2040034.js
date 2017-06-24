/*
 * Red Sign
 * LPQ NPC
 * ID: 2040034
 */

"use strict";

let status;
const minLevel = 35;
const maxLevel = 81;
const minPlayers = 1;
const maxPlayers = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();

    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status === 0) {
        if (p.getParty() === null) { // No party
            cm.sendOk("From here on above, this place is full of dangerous artifacts and monsters, so I can't let you go further up.\r\n\r\nIf you're intrested in saving us and bringing some level of peace back into Ludibrium, however, that's a different story. If you want to defeat a powerful creature residing at the very top, then please gather up your party members.\r\n\r\nIt won't be easy, but... I think you can do it.");
            cm.dispose();
            return;
        } else if (!cm.isLeader()) { // Not leader
            cm.sendOk("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
            cm.dispose();
            return;
        } else {
            const party = cm.getParty().getMembers();
            const inMap = cm.partyMembersInMap();
            const levelValid =
                party
                    .stream()
                    .filter(function(pm) {
                        return pm.getLevel() >= minLevel &&
                               pm.getLevel() <= maxLevel;
                    })
                    .count();
            if (inMap < minPlayers || inMap > maxPlayers || levelValid !== inMap) {
                cm.sendOk(`Your party doesn't have between ${minPlayers} and ${maxPlayers} eligible members. Please keep in mind that this party quest is only for players between levels ${minLevel} and ${maxLevel}.`);
                cm.dispose();
                return;
            } else {
                const eim = cm.getEventManager("LudiPQ");
                if (!eim) {
                    cm.sendOk("This PQ is not currently available.");
                    cm.dispose();
                    return;
                } else if ("" + eim.getProperty("LudiPQOpen") === "true") {
                    cm.sendYesNo("Hmmm... very well.\r\n\r\nWould you and your party like to enter the decrepit tower and begin your treacherous quest?");
                } else {
                    cm.sendNext("Another party is inside taking on the party quest. Please try again after that group vacates the room.");
                    cm.dispose();
                    return;
                }
            }
        }
    } else if (status === 1) {
        const em = cm.getEventManager("LudiPQ");
        // Begin the PQ
        em.startInstance(cm.getParty(), p.getMap());
        // Remove passes and keys
        const party = p.getEventInstance().getPlayers();
        cm.removeFromParty(4001022, party);
        cm.removeFromParty(4001023, party);
        em.setProperty("LudiPQOpen", "false");

        // Set script for 1st -> 2nd stage portal
        p.getEventInstance()
         .getMapInstance(922010100)
         .getPortal("next00")
         .setScriptName("lpq1");

        cm.dispose();
        return;
    }
}
