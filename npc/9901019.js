/*
 * Gala Door
 * Lilin's Manor | Gala Main Room
 *
 * ID: 9901019
 */

"use strict";

const Point = Java.type("java.awt.Point");

let status;
const thisMap = 5004;
const map1 = 5005;
const map2 = 5006;

function combinations(set, choose) {
    if (set.length < choose) {
        return;
    }
    if (choose === 0) {
        return [[]];
    }
    if (set.length === choose) {
        return [set];
    }
    return set.reduce(function(x, y, z) {
        if (set.length - z - 1 < choose - 1) {
            return x;
        }
        return x.concat(combinations(set.slice(z + 1), choose - 1).map(function(w) {
            return w.concat([y]);
        }));
    }, []);
}

function getPartySplit(pq) {
    function sumLevels(s, c) {
        return s + c.getLevel();
    }

    function combiScore(combi) {
        return Math.abs(combi[0].reduce(sumLevels, 0) - combi[1].reduce(sumLevels, 0));
    }

    function split(members) {
        return combinations(members, Math.ceil(members.length / 2))
            .map(function(combi) {
                return [
                    combi,
                    members.filter(function(c) {
                        return combi.indexOf(c) === -1;
                    })
                ];
            })
            .reduce(function(prevBest, newCombi) {
                return combiScore(newCombi) < combiScore(prevBest) ?
                    newCombi :
                    prevBest;
            });
    }

    return split(pq.getPlayers().stream().reduce([], function(m, c) {
        return m.concat([c]);
    }).fisherYates());
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();
    const pq = p.getPartyQuest();
    const mi = p.getMap().getPartyQuestInstance();

    if (mode < 0 || status < 1 && mode === 0) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    if (p.getMapId() === 5004) {
        switch (status) {
            case 0: {
                const doneCombat = mi.playersWithProperty("combat")
                                     .size() > 0;
                const noMobsLeft = p.getMap().mobCount() === 0;

                if (doneCombat && noMobsLeft) {
                    let leaderSelection = "";
                    if (pq.isLeader(p)) {
                        leaderSelection = "\r\n#L1#(open the door and hope nothing unfortunate is on the other side)#l";
                    }
                    cm.sendSimple("#ewith what are apparently The Chef's strange lackeys being defeated, you've scoured the room for a way further in#n\r\n\r\n#ethis door appears to be the only such way#n\r\n\r\n#L0#(decide against trying to break further into the manor)#l" + leaderSelection + "\r\n#L2#(listen at the door)#l");
                } else if (!noMobsLeft) {
                    p.dropMessage("You walk up to the large gala door to find your way out, before realizing that there are still some of The Chef's agents lurking in this room -- perhaps it's best to take care of them first.");
                    cm.dispose();
                    return;
                } else {
                    cm.dispose();
                    return;
                }
                break;
            }
            case 1: {
                switch (selection) {
                    case 1: {
                        // HACK ALERT
                        try {
                            pq.unregisterMap(map1);
                            pq.unregisterMap(map2);
                        } catch (e) {
                            print("Tried to unregister: " + e);
                        }
                        //

                        const partySplit = getPartySplit(pq);

                        const msg1 = "As you split off from the rest of your party and go right, you enter into a portion of the library you hadn't seen when you came through the first time. This portion of the library is perhaps not quite as kempt as the rest of it; bookshelves are scattered around almost aimlessly, and the books themselves are flying all about.";
                        const msg2 = "As you split off from the rest of your party and go left, you descend a long flight of stairs, arriving at what can only be described as the basement. Many-floored and spacious, one wonders what this basement was built to store, considering that it appears to store a whole lot of nothing at the moment.";

                        pq.registerMap(map1);
                        pq.registerMap(map2);

                        partySplit[0].forEach(function(c) {
                            c.changeMap(map1, 1);
                            c.dropMessage(msg1);
                        });
                        partySplit[1].forEach(function(c) {
                            c.changeMap(map2, 3);
                            c.dropMessage(msg2);
                        });

                        pq.unregisterMap(thisMap);
                        break;
                    }
                    case 2:
                        cm.sendOk("#eknowing that this door is near where the library was, you put your ear to the door not expecting to hear much#n\r\n\r\n#einstead, you hear the humming of what could only be some kind of flying insects or small birds, and the wet squishing of damp fabric#n");
                        break;
                }
                cm.dispose();
                return;
            }
            default:
                cm.dispose();
                return;
        }
    } else if (p.getMapId() === 5005 || p.getMapId() === 5006 || p.getMapId() === 5010) {
        const mapId = p.getMapId();
        const nextMapIncrement = mapId === 5010 ? 1 : 2;
        const players = mapId === 5010 ? pq.getPlayers() : p.getMap().getCharacters();
        const radius = 125;
        const doorPositions =
        {
            5005: new Point(2366, -800),
            5006: new Point(-2364, -84),
            5010: new Point(1779,  -83)
        };
        switch (status) {
            case 0: {
                const playersInRange =
                    players
                        .stream()
                        .allMatch(function(c) {
                            return c.getPosition().distance(doorPositions[mapId]) <= radius;
                        });
                if (playersInRange) {
                    cm.sendSimple("You and the party members you have in the room with you approach the door, having navigated this strange and torturous room.\r\n\r\n#L0#(push into the door to enter further into the manor)#l\r\n#L1#(step away from the door)#l");
                } else {
                    cm.sendOk("It doesn't look like all your party members have made it to the door quite yet.");
                    cm.dispose();
                    return;
                }
                break;
            }
            case 1: {
                switch (selection) {
                    case 0:
                        pq.registerMap(mapId + nextMapIncrement);
                        if (mapId === 5010) {
                            let charNum = 1;
                            const _chrs = [];
                            p.getMap()
                             .getCharacters()
                             .forEach(function(c) {
                                 _chrs.push(c);
                             });
                            _chrs
                                .forEach(function(c) {
                                    let portalNum;
                                    if (charNum === 1) {
                                        portalNum = 0;
                                    } else if (charNum === 2) {
                                        portalNum = 1;
                                    } else if (charNum === 3) {
                                        if (pq.playerCount() === 6) {
                                            portalNum = 1;
                                        } else {
                                            portalNum = 2;
                                        }
                                    } else {
                                        portalNum = 2;
                                    }
                                    c.changeMap(mapId + nextMapIncrement, portalNum);
                                    charNum++;
                                });
                        } else {
                            const _chrs = [];
                            p.getMap()
                             .getCharacters()
                             .forEach(function(c) {
                                 _chrs.push(c);
                             });
                            _chrs.forEach(function(c) {
                                c.changeMap(mapId + nextMapIncrement);
                            });
                        }
                        pq.unregisterMap(mapId);
                        cm.dispose();
                        return;
                    default:
                        cm.dispose();
                        return;
                }
                break;
            }
            default:
                cm.dispose();
                return;
        }
    } else if (p.getMapId() === 5007) {
        cm.sendOk("Due to the highly perishable nature of the items stored in this room the door has been automatically sealed behind you.\r\n\r\nYou are trapped.");
        cm.dispose();
        return;
    } else if (p.getMapId() === 5008) {
        cm.sendOk("As you fiddle with the door, you realize it has been automatically locked behind you.\r\n\r\nYou are trapped.");
        cm.dispose();
        return;
    }
}
