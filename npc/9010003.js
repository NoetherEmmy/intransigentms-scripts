/*
 * Ria
 * ID: 9010003
 * Quest manager
 */

/* jshint ignore: start */
// Array.prototype.find polyfill
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(a){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var d=arguments[1],e=0;e<c;){var f=b[e];if(a.call(d,f,e,b))return f;e++}}});
/* jshint ignore: end */

var CQuestStatus       = Java.type("net.sf.odinms.client.CQuestStatus");
var Integer            = Java.type("java.lang.Integer");
var MapleCQuests       = Java.type("net.sf.odinms.client.MapleCQuests");
var MaplePacketCreator = Java.type("net.sf.odinms.tools.MaplePacketCreator");

var status;
var branch, questSlot;
var groups =
{
    /* Location */
    "Henesys": [
        1000, 1001,
        8001, 8002,
        10002
    ],
    "Kerning City": [
        1002, 2000,
        2001, 2004,
        2021
    ],
    "Ellinia": [
        1003, 1005,
        8000
    ],
    "Nautilus": [
        1006, 1020
    ],
    "Ludibrium": [
        1007, 1008,
        1009, 1010,
        1011, 1012
    ],
    "Mu Lung": [
        1013, 1014,
        2011, 2012,
        2013, 2014
    ],
    "Showa Town": [
        1015, 1016,
        1017
    ],
    "Perion": [
        1018, 1019,
        2016, 2017,
        10001
    ],
    "Amoria": [
        1021, 2010
    ],
    "Singapore": [
        2002,  11000,
        11001, 11002,
        11003
    ],
    "Lith Harbor": [
        2003, 2005
    ],
    "Masteria": [
        2006, 2007,
        2015, 10000
    ],
    "El Nath": [
        2008, 2009
    ],
    "Korean Folk Town": [
        2018, 2019
    ],
    "Leafre": [
        3000, 3001,
        3002, 3003,
        3004, 4000,
        4001, 4002,
        4003, 4004,
        5000, 6000,
        7000, 7001
    ],
    "Orbis": [
        9000, 10003
    ],
    "Temple of Time": [
        12000, 12001,
        12002
    ],
    /* Questline */
    "Homelessness": [
        1000, 1011
    ],
    "Certain Illicit Substance": [
        1003, 1005
    ],
    "Chronology": [
        1007, 1010
    ],
    "Teddius/Trojanus": [
        1008, 1009,
        1012
    ],
    "An Eclectic Brew": [
        2000, 2001
    ],
    "A White Lie": [
        2016, 2017
    ],
    "Nuclear Negligence": [
        2018, 2019
    ],
    "Offensive Skill": [
        3000, 3001,
        3002, 3003,
        3004
    ],
    "Buff Skill": [
        4000, 4001,
        4002, 4003,
        4004
    ],
    "Monster Riding": [
        8000, 8001,
        8002
    ],
    "Alienation": [
        10000, 10001,
        10002, 10003
    ],
    "Krexel": [
        11000, 11001,
        11002, 11003
    ],
    /* Difficulty */
    "Cinch": [
        1000, 1001,
        2000, 1002,
        1003, 2001,
        2002, 1004,
        2006, 1005,
        2003, 2007,
        9000
    ],
    "Rudimentary": [
        1006, 2005,
        2004, 2008,
        1007, 2010,
        2009, 1010,
        2011, 2012,
        1008, 1009,
        2014, 2013
    ],
    "Demanding": [
        1013, 1014,
        2018, 2015,
        2016, 1012,
        1016, 2019,
        3003, 1015,
        1017, 1019,
        1018, 2017,
        1020, 2021,
        1021, 2020,
        4002
    ],
    "Thorny": [
        8001,  12000,
        11000, 10001,
        12001, 10000,
        4001,  10002,
        11001, 12002,
        11002, 4003,
        5000,  8002
    ],
    "Formidable": [
        4004,  6000,
        10003, 3000,
        7000,  11003,
        3001,  8000,
        7001,  3002,
        3004,  4000
    ],
    /* Task type/targets */
    "Boss": [
        1001,  1012,
        2007,  3000,
        3004,  4001,
        4004,  11003,
        12001, 12002
    ],
    "Travel": [
        1005, 1006,
        2004, 2021,
        12000
    ],
    "Collection": [
        4000, 4003,
        5000, 8001,
        8002
    ]
};
var feats =
{
    "Completionist": {
        id: 0,
        desc: "Completed all quests.",
        req: function(p) {
            return MapleCQuests
                       .getAllQuestIds()
                       .stream()
                       .allMatch(function(qid) {
                           return p.completedCQuest(qid);
                       });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Adventuresome completionist": {
        id: 1,
        desc: "Completed all quests with a completion level of Adventuresome or greater.",
        req: function(p) {
            return MapleCQuests
                       .getAllQuestIds()
                       .stream()
                       .allMatch(function(qid) {
                           return p.getCQuestStatus(qid)
                                   .getValue() >=
                                       CQuestStatus.ADVENTURESOME
                                                   .getValue();
                       });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Valiant completionist": {
        id: 2,
        desc: "Completed all quests with a completion level of Valiant or greater.",
        req: function(p) {
            return MapleCQuests
                       .getAllQuestIds()
                       .stream()
                       .allMatch(function(qid) {
                           return p.getCQuestStatus(qid)
                                   .getValue() >=
                                       CQuestStatus.VALIANT
                                                   .getValue();
                       });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Transcendent completionist": {
        id: 3,
        desc: "Completed all quests with a completion level of Fearless. Truly the greatest of all feats.",
        req: function(p) {
            return MapleCQuests
                       .getAllQuestIds()
                       .stream()
                       .allMatch(function(qid) {
                           return p.getCQuestStatus(qid)
                                   .getValue() >=
                                       CQuestStatus.FEARLESS
                                                   .getValue();
                       });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "The sampler": {
        id: 4,
        desc: "Completed at least one quest in every quest group.",
        req: function(p) {
            return Object.keys(groups).every(function(group) {
                return groups[group].some(function(qid) {
                    return p.completedCQuest(qid);
                });
            });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Henesys explorer": {
        id: 5,
        desc: "Completed every quest in the Henesys group.",
        req: function(p) {
            return groups.Henesys.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Kerning City explorer": {
        id: 6,
        desc: "Completed every quest in the Kerning City group.",
        req: function(p) {
            return groups["Kerning City"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Ellinia explorer": {
        id: 7,
        desc: "Completed every quest in the Ellinia group.",
        req: function(p) {
            return groups.Ellinia.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Nautilus explorer": {
        id: 8,
        desc: "Completed every quest in the Nautilus group.",
        req: function(p) {
            return groups.Nautilus.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Ludibrium explorer": {
        id: 9,
        desc: "Completed every quest in the Ludibrium group.",
        req: function(p) {
            return groups.Ludibrium.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Mu Lung explorer": {
        id: 10,
        desc: "Completed every quest in the Mu Lung group.",
        req: function(p) {
            return groups["Mu Lung"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Showa Town explorer": {
        id: 11,
        desc: "Completed every quest in the Showa Town group.",
        req: function(p) {
            return groups["Showa Town"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Perion explorer": {
        id: 12,
        desc: "Completed every quest in the Perion group.",
        req: function(p) {
            return groups.Perion.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Amoria explorer": {
        id: 13,
        desc: "Completed every quest in the Amoria group.",
        req: function(p) {
            return groups.Amoria.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Singapore explorer": {
        id: 14,
        desc: "Completed every quest in the Singapore group.",
        req: function(p) {
            return groups.Singapore.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Lith Harbor explorer": {
        id: 15,
        desc: "Completed every quest in the Lith Harbor group.",
        req: function(p) {
            return groups["Lith Harbor"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Masteria explorer": {
        id: 16,
        desc: "Completed every quest in the Masteria group.",
        req: function(p) {
            return groups.Masteria.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "El Nath explorer": {
        id: 17,
        desc: "Completed every quest in the El Nath group.",
        req: function(p) {
            return groups["El Nath"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Korean Folk Town explorer": {
        id: 18,
        desc: "Completed every quest in the Korean Folk Town group.",
        req: function(p) {
            return groups["Korean Folk Town"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Leafre explorer": {
        id: 19,
        desc: "Completed every quest in the Leafre group.",
        req: function(p) {
            return groups.Leafre.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Orbis explorer": {
        id: 20,
        desc: "Completed every quest in the Orbis group.",
        req: function(p) {
            return groups.Orbis.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Temple of Time explorer": {
        id: 21,
        desc: "Completed every quest in the Temple of Time group.",
        req: function(p) {
            return groups["Temple of Time"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Liberator of homelessness": {
        id: 22,
        desc: "Completed every quest in the Homelessness group.",
        req: function(p) {
            return groups.Homelessness.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Purveyor of illicit substances": {
        id: 23,
        desc: "Completed every quest in the Certain Illicit Substance group.",
        req: function(p) {
            return groups["Certain Illicit Substance"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Chronologician": {
        id: 24,
        desc: "Completed every quest in the Chronology group.",
        req: function(p) {
            return groups.Chronology.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Teddius/Trojanus partisan": {
        id: 25,
        desc: "Completed every quest in the Teddius/Trojanus group.",
        req: function(p) {
            return groups["Teddius/Trojanus"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Eclectic brewer": {
        id: 26,
        desc: "Completed every quest in the An Eclectic Brew group.",
        req: function(p) {
            return groups["An Eclectic Brew"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Fib enabler": {
        id: 27,
        desc: "Completed every quest in the A White Lie group.",
        req: function(p) {
            return groups["A White Lie"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Nuclear janitor": {
        id: 28,
        desc: "Completed every quest in the Nuclear Negligence group.",
        req: function(p) {
            return groups["Nuclear Negligence"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Master of offensive skill": {
        id: 29,
        desc: "Completed every quest in the Offensive Skill group.",
        req: function(p) {
            return groups["Offensive Skill"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Master of buffing skill": {
        id: 30,
        desc: "Completed every quest in the Buff Skill group.",
        req: function(p) {
            return groups["Buff Skill"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Master of monster riding": {
        id: 31,
        desc: "Completed every quest in the Monster Riding group.",
        req: function(p) {
            return groups["Monster Riding"].every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Sufferer of alienation": {
        id: 32,
        desc: "Completed every quest in the Alienation group.",
        req: function(p) {
            return groups.Alienation.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Krexel slayer": {
        id: 33,
        desc: "Completed every quest in the Krexel group.",
        req: function(p) {
            return groups.Krexel.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Master of the cinches": {
        id: 34,
        desc: "Completed every quest in the Cinch group.",
        req: function(p) {
            return groups.Cinch.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Conqueror of the rudiments": {
        id: 35,
        desc: "Completed every quest in the Rudimentary group.",
        req: function(p) {
            return groups.Rudimentary.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "In high demand": {
        id: 36,
        desc: "Completed every quest in the Demanding group.",
        req: function(p) {
            return groups.Demanding.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Thorny but unstoppable": {
        id: 37,
        desc: "Completed every quest in the Thorny group.",
        req: function(p) {
            return groups.Thorny.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Force of nature": {
        id: 38,
        desc: "Completed every quest in the Formidable group.",
        req: function(p) {
            return groups.Formidable.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Boss slayer": {
        id: 39,
        desc: "Completed every quest in the Boss group.",
        req: function(p) {
            return groups.Boss.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Boss control": {
        id: 40,
        desc: "Completed every quest in the Boss group with a completion of at least Adventuresome.",
        req: function(p) {
            return groups.Boss.every(function(qid) {
                return p.getCQuestStatus(qid)
                        .getValue() >=
                            CQuestStatus.ADVENTURESOME
                                        .getValue();
            });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Boss veteran": {
        id: 41,
        desc: "Completed every quest in the Boss group with a completion of at least Valiant.",
        req: function(p) {
            return groups.Boss.every(function(qid) {
                return p.getCQuestStatus(qid)
                        .getValue() >=
                            CQuestStatus.VALIANT
                                        .getValue();
            });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "David": {
        id: 42,
        desc: "Completed every quest in the Boss group with a completion of Fearless.",
        req: function(p) {
            return groups.Boss.every(function(qid) {
                return p.getCQuestStatus(qid)
                        .getValue() >=
                            CQuestStatus.FEARLESS
                                        .getValue();
            });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Traveller": {
        id: 43,
        desc: "Completed every quest in the Travel group.",
        req: function(p) {
            return groups.Travel.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
    "Collector": {
        id: 44,
        desc: "Completed every quest in the Collection group.",
        req: function(p) {
            return groups.Collection.every(function(qid) { return p.completedCQuest(qid); });
        },
        reward: function(p) {
            var noticePacket = MaplePacketCreator.serverNotice(6, "Congrats to " + p.getName() + " on unlocking feat " + this.id + "!");
            try {
                p.getClient().getChannelServer().getWorldInterface().broadcastMessage(p.getName(), noticePacket.getBytes());
            } catch (e) {
                p.getClient().getChannelServer().reconnectWorld();
            }
        }
    },
};

function getFeatById(fid) {
    return Object
               .keys(feats)
               .map(function(key) {
                   return feats[key];
               })
               .find(function(feat) {
                   return feat.id === fid;
               });
}

function getFeatEntryById(fid) {
    return Object
               .keys(feats)
               .map(function(key) {
                   return [key, feats[key]];
               })
               .find(function(featEntry) {
                   return featEntry[1].id === fid;
               });
}

function jsArray(collection) {
    var a = [];
    if (collection instanceof Java.type("java.util.Collection")) {
        collection.forEach(function(o) {
            a.push(o);
        });
    } else if (collection instanceof Java.type("java.util.Map")) {
        collection.entrySet().forEach(function(e) {
            a.push(e);
        });
    } else {
        throw new TypeError(
            "Argument to jsArray should be a java.util.Collection or a java.util.Map."
        );
    }
    return a;
}

function start() {
    branch = 0;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode < 0 || (mode === 0 && (type === 4 || type === 12))) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 2 && selection === 2 && branch === 5) { // "Go back"
        branch = 0;
        status = 0;
    }

    if (branch === 0) { // Main menu
        switch (status) {
            case 0:
                cm.sendSimple("Hey there, I'm Ria! I'm here to help you out with your\r\n#e#dIntransigentQuests#k#n: custom quests with #bcompletion\r\nlevels#k, #rcustom dialogue#k, and #bunlockable feats that give special rewards#k!\r\n\r\n#L0#I'd like to take a look at the quests I have available to me.#l\r\n#L1#I'd like to see what progress I have on my currently active quest(s).#l\r\n#L2#I'd like to see a list of my completed quests.#l\r\n#L3#I'd like to browse all quest groups.#l\r\n#L4#I'd like to manage my feats/claim a reward.#l\r\n#L5#I want to change my effective level for a quest.#l");
                return;
            case 1:
                branch = selection + 1;
                break;
        }
    }

    if (branch === 1) { // Available quests
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1:
                var questsStr =
                    MapleCQuests
                        .getAllQuests()
                        .stream()
                        .filter(function(cq) {
                            return cq.getId() !== 0 && p.canBeginCQuest(cq);
                        })
                        .map(function(cq) {
                            return "#e" +
                                   cq.getTitle() +
                                   "#n\r\n    NPC: #b" +
                                   cq.getStartNpc() +
                                   "#k\r\n    Fearless: #g" +
                                   cq.getFearless() +
                                   "#k, valiant: #d" +
                                   cq.getValiant() +
                                   "#k, adventuresome: #r" +
                                   cq.getAdventuresome() +
                                   "#k";
                        })
                        .reduce("", function(accu, s) {
                            return accu + "\r\n" + s;
                        });
                if (questsStr === "") {
                    cm.sendPrev("You don't have any quests available at the moment.");
                } else {
                    cm.sendPrev("Quests that you currently qualify for:\r\n" + questsStr);
                }
                branch = 0;
                return;
        }
    }

    if (branch === 2) { // Quest progress
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1:
                cm.sendPrev(cm.showQuestProgress());
                branch = 0;
                return;
        }
    }

    if (branch === 3) { // Completed quests
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1:
                var completedQuestsStr =
                    p.readCompletedCQuests()
                     .entrySet()
                     .stream()
                     .sorted(function(e1, e2) {
                         var cq1 = MapleCQuests.loadQuest(e1.getKey()),
                             cq2 = MapleCQuests.loadQuest(e2.getKey());
                         return Integer.compare(cq1.getFearless(), cq2.getFearless());
                     })
                     .map(function(e) {
                         var cq = MapleCQuests.loadQuest(e.getKey());
                         var completion = e.getValue();
                         var completionStr;
                         if (completion.equals(CQuestStatus.FEARLESS)) {
                             completionStr = "#gFearless#k";
                         } else if (completion.equals(CQuestStatus.VALIANT)) {
                             completionStr = "#dValiant#k";
                         } else if (completion.equals(CQuestStatus.ADVENTURESOME)) {
                             completionStr = "#rAdventuresome#k";
                         } else {
                             completionStr = "Unimpressed";
                         }
                         var qid = +cq.getId();
                         var groupsStr = Object.keys(groups).filter(function(group) {
                             return groups[group].indexOf(qid) !== -1;
                         }).join(", ");
                         return "#e" +
                                cq.getTitle() +
                                "#n\r\n    Groups: #b" +
                                groupsStr +
                                "#k\r\n    Fearless: #g" +
                                cq.getFearless() +
                                "#k, valiant: #d" +
                                cq.getValiant() +
                                "#k, adventuresome: #r" +
                                cq.getAdventuresome() +
                                "#k\r\n    Your completion: #e" +
                                completionStr +
                                "#n";
                     })
                     .reduce("", function(accu, s) {
                         return accu + "\r\n" + s;
                     });
                if (completedQuestsStr === "") {
                    cm.sendPrev("You haven't completed any quests yet!");
                } else {
                    cm.sendPrev("Your already completed quests:\r\n" + completedQuestsStr);
                }
                branch = 0;
                return;
        }
    }

    if (branch === 4) { // All quest groups
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1:
                var allQuestsStr =
                    Object
                        .keys(groups)
                        .map(function(group) {
                            var groupStr =
                                groups[group].map(function(qid) {
                                        var cq = MapleCQuests.loadQuest(qid);
                                        var completion = p.getCQuestStatus(qid);
                                        var completionStr;
                                        if (completion.equals(CQuestStatus.FEARLESS)) {
                                            completionStr = "#gFearless#k";
                                        } else if (completion.equals(CQuestStatus.VALIANT)) {
                                            completionStr = "#dValiant#k";
                                        } else if (completion.equals(CQuestStatus.ADVENTURESOME)) {
                                            completionStr = "#rAdventuresome#k";
                                        } else if (completion.equals(CQuestStatus.UNIMPRESSED)) {
                                            completionStr = "Unimpressed";
                                        } else {
                                            completionStr = "No";
                                        }
                                        return "    #e" +
                                               cq.getTitle() +
                                               "#n\r\n        Fearless: #g" +
                                               cq.getFearless() +
                                               "#k, valiant: #d" +
                                               cq.getValiant() +
                                               "#k, adventuresome: #r" +
                                               cq.getAdventuresome() +
                                               "#k\r\n        Completed?: " +
                                               completionStr;
                                    })
                                    .reduce(function(accu, s) {
                                        return accu + "\r\n" + s;
                                    }, "");
                            return "#e#d=== " +
                                   group +
                                   " group ===#k#n" +
                                   groupStr;
                        })
                        .reduce(function(accu, s) {
                            return accu + "\r\n" + s;
                        }, "");
                cm.sendPrev("All quest groups:\r\n" + allQuestsStr);
                branch = 0;
                return;
        }
    }

    if (branch === 5) { // Manage feats
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1:
                cm.sendSimple("#L0#My feats#l\r\n#L1#Locked feats#l\r\n#L2#Go back#l");
                return;
            case 2:
                var unlockRatioString;
                if (selection === 0) {
                    // Check for new feats the player qualifies for
                    var newFeats =
                        Object
                            .keys(feats)
                            .filter(function(key) {
                                var feat = feats[key];
                                return !p.hasFeat(feat.id) && feat.req(p);
                            });
                    newFeats.forEach(function(key) {
                        var feat = feats[key];
                        p.addFeat(feat.id);
                        feat.reward(p);
                        p.dropMessage(
                            5,
                            "Congratulations on achieving the " +
                                key +
                                " feat!"
                        );
                    });
                    var leadText;
                    if (newFeats.length === 0) {
                        leadText = "Your currently unlocked feats:\r\n";
                    } else if (newFeats.length === 1) {
                        leadText = "Congratulations on the #enew feat#n!\r\n";
                    } else {
                        leadText = "Congratulations on the #enew feats#n!\r\n";
                    }
                    var featsString =
                        p.getFeats()
                         .stream()
                         .sorted()
                         .map(function(fid) {
                             var featEntry = getFeatEntryById(fid);
                             return "#e" +
                                    featEntry[0] +
                                    "#n\r\n    #d" +
                                    featEntry[1].desc +
                                    "#k\r\n";
                         })
                         .reduce("", function(accu, s) {
                             return accu + "\r\n" + s;
                         });
                    unlockRatioString =
                        "(#e#b" +
                            p.getFeats().size() +
                            "#k#n / #b" +
                            Object.keys(feats).length +
                            "#k feats unlocked)\r\n";
                    cm.sendPrev(leadText + unlockRatioString + featsString);
                } else {
                    var lockedFeatsString =
                        Object
                            .keys(feats)
                            .sort(function(key1, key2) {
                                return feats[key1].id - feats[key2].id;
                            })
                            .map(function(key) {
                                var feat = feats[key];
                                return "#e" +
                                       key +
                                       "#n\r\n    #d" +
                                       feat.desc +
                                       "#k\r\n";
                            })
                            .reduce(function(accu, s) {
                                return accu + "\r\n" + s;
                            }, "");
                    unlockRatioString =
                        "(#e#b" +
                            p.getFeats().size() +
                            "#k#n / #b" +
                            Object.keys(feats).length +
                            "#k feats unlocked)\r\n";
                    cm.sendPrev(
                        "Your currently locked/unachieved feats:\r\n" +
                            unlockRatioString +
                            lockedFeatsString
                    );
                }
                return;
        }
    }

    if (branch === 6) { // Set quest effective level
        if (status === 3 && selection % 5 !== 0) {
            status--;
        }
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1:
                var choiceString =
                    jsArray(p.getCQuests())
                        .filter(function(cq) {
                            return cq.getQuest().getId() !== 0;
                        })
                        .map(function(cq, i) {
                            var q = cq.getQuest();
                            return "#L" +
                                   i +
                                   "#" +
                                   q.getTitle() +
                                   "  |  (" +
                                   q.getFearless() +
                                   ", " +
                                   q.getValiant() +
                                   ", " +
                                   q.getAdventuresome() +
                                   ")  |  Current effective level: " +
                                   (cq.getEffectivePlayerLevel() > 0 ?
                                       cq.getEffectivePlayerLevel() :
                                       p.getLevel()) +
                                   "#l";
                        })
                        .join("\r\n");
                if (choiceString === "") {
                    cm.sendPrev("You aren't currently on any quests!");
                    branch = 0;
                } else {
                    cm.sendSimple("Select the quest that you'd like to change your effective level for.\r\nRemember that changing your effective level for a quest #ewill reset your progress for that quest#n!:\r\n\r\n" + choiceString);
                }
                return;
            case 2:
                questSlot = selection + 1;
                cm.sendGetNumber(
                    "How many levels lower than your current level would you like to be for this quest?\r\n" +
                        "This number #emust be a multiple of 5#n and #emust not lower your effective level below 1#n.",
                    5,
                    5,
                    p.getLevel() - (p.getLevel() % 5 === 0 ? 5 : p.getLevel() % 5)
                );
                return;
            case 3:
                if (selection % 5 !== 0 || selection >= p.getLevel()) {
                    p.dropMessage(6, "Please report this to a GM.");
                    throw new RangeError(
                        p.getName() +
                            " made a selection of " +
                            selection +
                            " to lower their effective quest level, but this is not a multiple of 5 or is >= their level, " +
                            p.getLevel() +
                            "."
                    );
                }
                var selectedEL = p.getLevel() - selection;
                p.getCQuest(questSlot).setEffectivePlayerLevel(selectedEL);
                p.updateQuestEffectiveLevel();
                cm.sendPrev(
                    "You're all set. Your new quest effective level for #e" +
                        p.getCQuest(questSlot).getQuest().getTitle() +
                        "#n is #r" +
                        selectedEL +
                        "#k."
                );
                branch = 0;
                status = 1;
                return;
        }
    }
}
