/*
 * Bearlywyne
 * SCPQ Entrance NPC
 *
 * ID: 9900001
 */

var ChannelServer = Java.type("net.sf.odinms.net.channel.ChannelServer");
var PartyQuest    = Java.type("net.sf.odinms.net.channel.PartyQuest");

var status;
var minLevel = 21;
var pqName = "Sous Chef PQ";
var minPlayers = 3;
var pqTimeLimit = 90 * 60 * 1000; // 90 minutes, in milliseconds
var startingMap = 5000;
var baseStartingPoints = 400;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var party, mapId, i;
    if (p.getMapId() === startingMap) {
        cm.dispose();
        return;
    }
    if (mode < 0 || mode === 0 && type === 4) {
        cm.dispose();
        return;
    } else if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (p.getLevel() < minLevel) {
        cm.sendOk("I can't take ya anywhere, sorry kid. Gotta be this tall to ride:\r\n\r\n#emakes a gesture, extending his paw and putting it about 21 levels or so above the ground#n");
        cm.dispose();
        return;
    }
    if (p.isScpqFlagged() || p.isGM()) {
        switch (status) {
            case 0:
                cm.sendSimple("#elooks you up and down, as if to size you up#n\r\n\r\n#L0#Um... a--are you Bearlywyne?#l\r\n#L1#(leave the strange wagonbear to mind his own business)#l");
                break;
            case 1:
                if (selection === 1) {
                    cm.dispose();
                    return;
                }
                cm.sendSimple("#epurses lips#n\r\n\r\nYeah. Das me. Neve sent ya, didn't he?\r\n\r\n#L0#Um, yeah, actually. How'd you know?#l\r\n#L1#Uh -- no, actually. I think this is just a misunderstanding, bye.#l");
                break;
            case 2:
                if (selection === 1) {
                    cm.dispose();
                    return;
                }
                cm.sendSimple("'Cause ya look like a punk, to me.\r\nNah, I'm kiddin' ya. I just... never get any business unless Neve sends'm my way.\r\n\r\n#L0#I was wondering if you could take us to Lilin's Manor.#l");
                break;
            case 3:
                if (cm.getParty() === null || cm.getParty().getMembers().size() < minPlayers) {
                    cm.sendOk("I can take you to #eLilin's Manor#n, I guess. But you're gonna need some more buddies with ya if ya plan on getting anything done, ya feel?");
                    cm.dispose();
                    return;
                }
                if (!cm.isLeader()) {
                    cm.sendNext("Hey, which one o' you's the leader?");
                    cm.dispose();
                    return;
                }

                party = cm.getParty().getMembers();
                mapId = p.getMapId();
                for (i = 0; i < party.size(); ++i) {
                    if (party.get(i).getLevel() < minLevel) {
                        cm.sendOk("I don't think all of ya buddies are ready for this. Gotta be this tall to ride:\r\n\r\n#emakes a gesture, extending his paw and putting it about 21 levels or so above the ground#n");
                        cm.dispose();
                        return;
                    }
                    if (party.get(i).getMapid() !== mapId) {
                        cm.sendOk("Hey. Make sure you've got all ya buddies here, or we can't exactly take off yet, eh?");
                        cm.dispose();
                        return;
                    }
                    if (!party.get(i).isScpqFlagged() && !party.get(i).isGM()) {
                        cm.sendOk("It doesn't look like all ya friends are even prepared for this. Maybe Neve can give 'em a low-down?");
                        cm.dispose();
                        return;
                    }
                }

                cm.sendSimple("Right on, right on. So you know anything about the #e#dAnniversary of the Realm#k#n celebration, then?\r\n\r\nI mean, basically it's just your standard rich-people social function where Ossyrians get together to celebrate annually so they can rub elbows and loosen lips.\r\n\r\nWhole damn bunch o' hooplah, if ya ask me. I can take ya there though, no probs.\r\n\r\n#L0#Are there any kinds of... dangers we'll face on the way there?#l");
                break;
            case 4:
                cm.sendSimple("Oh, I dunno... it's really not too bad.\r\n\r\nJust #emake sure ya don't let any of the flying critters touch ya#n.\r\n\r\n#L0#We're ready to go, now.#l\r\n#L1#I think we need some more time to prepare for this.#l");
                break;
            case 5:
                if (selection === 1) {
                    cm.sendOk("Well, alright then. Just come back to me when y'all're ready.");
                    cm.dispose();
                    return;
                }

                if (cm.getParty() === null || cm.getParty().getMembers().size() < minPlayers) {
                    p.dropMessage("Your party does not have enough members to enter.");
                    cm.dispose();
                    return;
                }
                if (!cm.isLeader()) {
                    p.dropMessage("Only the leader of the party may begin the PQ.");
                    cm.dispose();
                    return;
                }

                party = cm.getParty().getMembers();
                mapId = p.getMapId();
                for (i = 0; i < party.size(); ++i) {
                    if (party.get(i).getLevel() < minLevel) {
                        p.dropMessage("Make sure all party members are at least level 21.");
                        cm.dispose();
                        return;
                    }
                    if (party.get(i).getMapid() !== mapId) {
                        p.dropMessage("Make sure all of your party members are on the same map.");
                        cm.dispose();
                        return;
                    }
                    if (!party.get(i).isScpqFlagged() && !party.get(i).isGM()) {
                        p.dropMessage("All party members must have done Neve's quest in order to enter.");
                        cm.dispose();
                        return;
                    }
                }

                if (ChannelServer.getInstance(p.getClient().getChannel()).getPartyQuest(pqName) !== null) {
                    cm.sendOk("Hmm... you know what, I think someone's actually on this here ride at the moment.\r\nMaybe try a different channel?");
                    cm.dispose();
                    return;
                }

                var partyQuest = new PartyQuest(p.getClient().getChannel(), pqName, minPlayers, p.getMapId());
                var registerSuccess = partyQuest.registerParty(cm.getParty());
                if (registerSuccess === false) {
                    cm.sendOk("Hmm... it looks like there was a problem registering your party. Make sure all yer pals are in the same map as you are, and that they're all online right now.");
                    cm.dispose();
                    return;
                }
                partyQuest.registerMap(startingMap);
                partyQuest.startTimer(pqTimeLimit);
                cm.warpParty(startingMap);
                partyQuest.setPoints(baseStartingPoints + 100 * partyQuest.playerCount());
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else {
        cm.sendOk("#epats side of wagon#n\r\n\r\nThis bad boy right here might not look like much, but heck, I'll take ya damn near anywhere in Ossyria -- for a price.");
        cm.dispose();
        return;
    }
}
