/*
 * Spindle
 * Private boss map teleporting NPC
 *
 * ID: 9201082
 */

var status;
var mapsfoundon = [610010013, 610010005, 800020130];
var bossmapid = 3000;
var monstername, monsterid;

function contains(a, o) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] === o) {
            return true;
        }
    }
    return false;
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status < 1) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status < 0) {
        cm.dispose();
        return;
    }
    if (contains(mapsfoundon, p.getMapId())) {
        if (p.getMapId() === 610010013 || p.getMapId() === 610010005) {
            monstername = "Bigfoot";
            monsterid = 9400575;
        } else {
            monstername = "Black Crow";
            monsterid = 9400014;
        }
        if (status === 0) {
            if (cm.getParty() === null) { // No party
                cm.sendOk("Hey, I'm Spindle. I can take you to fight " + monstername + ", but you need a party first!");
                cm.dispose();
                return;
            } else if (!cm.isLeader()) {  // Not party leader
                cm.sendOk("Please have the #eleader#n of your party speak with me.");
                cm.dispose();
                return;
            } else {
                cm.sendYesNo("Would you like to go inside with your party to fight #r" + monstername + "#k? You will have a maximum of #b40 minutes#k to fight!");
            }
        } else if (status === 1) {
            var party = cm.getParty().getMembers();
            var mapId = p.getMapId();
            var next = true;
            var i;

            for (i = 0; i < party.size(); ++i) {
                if (
                    party.get(i).getLevel() < 100 ||
                    party.get(i).getMapid() !== mapId ||
                    cm.getC()
                      .getChannelServer()
                      .getPlayerStorage()
                      .getCharacterById(party.get(i).getId()) === null
                ) {
                    next = false;
                }
            }

            if (next) {
                if (cm.enterBossMap(monsterid)) {
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk("It looks like there's already a party in there right now!\r\n\r\nYou can change channels and try again, or wait for them to come out.");
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("Please gather your entire party to this map, and make sure you are all at least level 100.");
                cm.dispose();
                return;
            }
        }
    } else if (p.getMapId() === bossmapid) {
        if (status === 0) {
            if (cm.getParty() === null) { // No party
                cm.sendYesNo("Would you like to leave this map and go back where you came from?");
            } else if (!cm.isLeader()) {  // Not party leader
                cm.sendOk("Please have the #eleader#n of your party speak with me.");
                cm.dispose();
                return;
            } else {
                cm.sendYesNo("Would you and your party like to leave this map and go back where you came from?");
            }
        } else if (status === 1) {
            if (cm.getParty() === null) {
                p.cancelForcedWarp();
                cm.warp(p.getBossReturnMap());
                cm.dispose();
                return;
            } else {
                var mapChars = [];
                p.getMap().getCharacters().forEach(function(c) {
                    mapChars.push(c);
                });
                mapChars.forEach(function(c) {
                    c.changeMap(c.getBossReturnMap());
                    c.cancelForcedWarp();
                });
                cm.dispose();
                return;
            }
        }
    } else {
        if (status === 0) {
            cm.sendOk("Hey, I'm Spindle. What's up?");
            cm.dispose();
            return;
        }
    }
}
