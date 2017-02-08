/*
 * Gate
 * Lilin's Manor West Wing | Storage & Refrigeration
 * Lilin's Manor | Escaping The Back Way
 *
 * ID: 9901021
 */

var NPCScriptManager = Java.type("net.sf.odinms.scripting.npc.NPCScriptManager");
var TimerManager     = Java.type("net.sf.odinms.server.TimerManager");

var status;
var mapId = 5007;
var mapId2 = 5011;
var escapeXThreshold = 2184;
var recipeId = 4031396;
var recipesNeeded = 17; // 22
var ballroomMap = 5009;
var backestWayMap = 5012;
var chefNpc = 9901023;
var tMan, nsm;

function start() {
    tMan = TimerManager.getInstance();
    nsm = NPCScriptManager.getInstance();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();

    if (mode < 0 || (status < 1 && mode === 0)) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    if (p.getMapId() === mapId) {
        switch (status) {
            case 0:
                if (!mi.getPlayerProperty(p, "storageFinished")) {
                    cm.sendGetNumber("#ehaving determined this sealed gate to be the only feasible way out of this refrigerator, you notice that although it can be opened from this side, it is locked with a keypad#n\r\n\r\n#ethe pad has no other markings other than its 10 number keys and a single #bOK#k key#n", 0, 0, 20000);
                } else {
                    if (mi.getPlayerProperty(p, "kitchenFinished")) {
                        if (pq.getMapInstance(ballroomMap) === null) {
                            pq.registerMap(ballroomMap);
                        }

                        pq.getPlayers().forEach(function(c) {
                            c.changeMap(ballroomMap);
                        });
                        
                        tMan.schedule(function() {
                            try {
                                pq.unregisterMap(5007);
                                pq.unregisterMap(5008);
                            } catch (e) {
                                print(e);
                            }
                        }, 6 * 1000 + Math.floor(Math.random() * 1000));

                        tMan.schedule(function() {
                            p.getMap().getCharacters().forEach(function(c) {
                                var client = c.getClient();
                                if (client.getCM() !== null) {
                                    client.getCM().dispose();
                                }
                                nsm.start(client, chefNpc);
                            });
                        }, 1000);
                    } else {
                        cm.sendOk("#eyou decide that it's probably wisest to wait on your party members in The Chef's kitchen so that you can reunite#n");
                    }
                    cm.dispose();
                    return;
                }
                break;
            case 1:
                if (selection === mi.invokeMethod("getAnswer") || isNaN(mi.invokeMethod("getAnswer"))) {
                    mi.setPropertyForAll("storageFinished", true);
                    if (mi.getPlayerProperty(p, "kitchenFinished")) {
                        if (pq.getMapInstance(ballroomMap) === null) {
                            pq.registerMap(ballroomMap);
                        }

                        pq.getPlayers().forEach(function(c) {
                            c.changeMap(ballroomMap);
                        });

                        tMan.schedule(function() {
                            try {
                                pq.unregisterMap(5007);
                                pq.unregisterMap(5008);
                            } catch (e) {
                                print(e);
                            }
                        }, 6 * 1000 + Math.floor(Math.random() * 1000));

                        tMan.schedule(function() {
                            p.getMap().getCharacters().forEach(function(c) {
                                var client = c.getClient();
                                if (client.getCM() !== null) {
                                    client.getCM().dispose();
                                }
                                nsm.start(client, chefNpc);
                            });
                        }, 1000);
                    } else {
                        cm.sendOk("#eyou enter the combination one last time, and the gate makes a satisfying #bclick#k as it unlocks for you#n\r\n\r\n#eyou decide, however, that it's probably wisest to wait on your party members in The Chef's kitchen so that you can reunite#n");
                    }
                } else {
                    cm.sendOk("#ethe gate makes a dampened metallic thud as if to indicate its displeasure with your attempted break-in#n");
                    if (mi.getPlayerProperty(p, "failedComboCount") < 10) {
                        mi.setPropertyForAll("failedComboCount", mi.getPlayerProperty(p, "failedComboCount") + 1);
                        pq.addPoints(-20);
                    }
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (p.getMapId() === mapId2) {
        switch (status) {
            case 0:
                if (pq.isLeader(p)) {
                    var allEscaped = pq.getPlayers().stream().allMatch(function(c) {
                        return c.getPosition().x >= escapeXThreshold;
                    });
                    if (allEscaped) {
                        var recipeCount = pq.getPlayers().stream().reduce(0, function(accu, p) {
                            return accu + p.getItemQuantity(recipeId, false);
                        }, function(accu1, accu2) {
                            return accu1 + accu2;
                        });
                        if (recipeCount >= recipesNeeded || true) { // !
                            pq.registerMap(backestWayMap);

                            var _chrs = [];
                            p.getMap().getCharacters().forEach(function(c) {
                                _chrs.push(c);
                            });
                            _chrs.forEach(function(c) {
                                c.changeMap(backestWayMap);
                            });

                            pq.unregisterMap(mapId2);
                            pq.addPoints(25 * (recipeCount - recipesNeeded));
                        } else {
                            cm.sendOk("#eit doesn't look like your party has collected the #brecipes#k it needs yet#n");
                        }
                    } else {
                        cm.sendOk("#enot all your party members have made it through this room yet!#n");
                    }
                } else {
                    cm.sendOk("#eit doesn't look like you're the party leader#n");
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    }
}
