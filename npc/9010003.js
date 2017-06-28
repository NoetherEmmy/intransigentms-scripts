/*
 * Ria
 * ID: 9010003
 * Quest manager
 */

"use strict";

const Comparator         = Java.type("java.util.Comparator");
const CQuestStatus       = Java.type("net.sf.odinms.client.CQuestStatus");
const Integer            = Java.type("java.lang.Integer");
const MapleCQuests       = Java.type("net.sf.odinms.client.MapleCQuests");
const MaplePacketCreator = Java.type("net.sf.odinms.tools.MaplePacketCreator");
const StringUtil         = Java.type("net.sf.odinms.tools.StringUtil");

let status;
let branch, questSlot;
const groups =
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
const feats =
{
    "Completionist": {
        id: 0,
        desc: "Completed all quests.",
        req: p =>
            MapleCQuests
                .getAllQuestIds()
                .stream()
                .allMatch(qid => qid === 0 || p.completedCQuest(qid)),
        reward: p => p.setQuestSlots(p.getQuestSlots() + 1),
        rewardDesc: "Ability to erase any quest progress at will and thus redo quests anew. Adds 1 additional quest slot."
    },
    "Adventuresome completionist": {
        id: 1,
        desc: "Completed all quests with a completion level of Adventuresome or greater.",
        req: p =>
            MapleCQuests
                .getAllQuestIds()
                .stream()
                .allMatch(qid =>
                    qid === 0 ||
                    p.getCQuestStatus(qid)
                     .getValue() >=
                        CQuestStatus.ADVENTURESOME
                                    .getValue()
                ),
        reward: () => {},
        rewardDesc: "Improves exchange ratio of maple leaves:gachapon tickets with Mia from 4:1 to 3:1."
    },
    "Valiant completionist": {
        id: 2,
        desc: "Completed all quests with a completion level of Valiant or greater.",
        req: p =>
            MapleCQuests
                .getAllQuestIds()
                .stream()
                .allMatch(qid =>
                    qid === 0 ||
                    p.getCQuestStatus(qid)
                     .getValue() >=
                        CQuestStatus.VALIANT
                                    .getValue()
                ),
        reward: () => cm.gainItem(3992027),
        rewardDesc: "1 Red Candle."
    },
    "Transcendent completionist": {
        id: 3,
        desc: "Completed all quests with a completion level of Fearless. Truly the greatest of all feats.",
        req: p =>
            MapleCQuests
                .getAllQuestIds()
                .stream()
                .allMatch(qid =>
                   qid === 0 ||
                   p.getCQuestStatus(qid)
                    .getValue() >=
                        CQuestStatus.FEARLESS
                                    .getValue()
                ),
        reward: () => cm.gainItem(1112500),
        rewardDesc: "1 Ring of Transcendence."
    },
    "The sampler": {
        id: 4,
        desc: "Completed at least one quest in every quest group.",
        req: p =>
            Object.keys(groups).every(group =>
                groups[group].some(qid => p.completedCQuest(qid))
            ),
        reward: p => p.setQuestSlots(p.getQuestSlots() + 1),
        rewardDesc: "Adds 1 additional quest slot."
    },
    "Henesys explorer": {
        id: 5,
        desc: "Completed every quest in the Henesys group.",
        req: p => groups.Henesys.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2000005, 100),
        rewardDesc: "100 Power Elixirs."
    },
    "Kerning City explorer": {
        id: 6,
        desc: "Completed every quest in the Kerning City group.",
        req: p => groups["Kerning City"].every(qid => p.completedCQuest(qid)),
        reward: p => p.setQuestSlots(p.getQuestSlots() + 1),
        rewardDesc: "Adds 1 additional quest slot."
    },
    "Ellinia explorer": {
        id: 7,
        desc: "Completed every quest in the Ellinia group.",
        req: p => groups.Ellinia.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(5220000, 6),
        rewardDesc: "6 Gachapon Tickets."
    },
    "Nautilus explorer": {
        id: 8,
        desc: "Completed every quest in the Nautilus group.",
        req: p => groups.Nautilus.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(5220000, 5),
        rewardDesc: "5 Gachapon Tickets."
    },
    "Ludibrium explorer": {
        id: 9,
        desc: "Completed every quest in the Ludibrium group.",
        req: p => groups.Ludibrium.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2049004),
        rewardDesc: "1 Innocence Scroll."
    },
    "Mu Lung explorer": {
        id: 10,
        desc: "Completed every quest in the Mu Lung group.",
        req: p => groups["Mu Lung"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040811, 5),
        rewardDesc: "5 Scrolls for Gloves for ATT 30%."
    },
    "Showa Town explorer": {
        id: 11,
        desc: "Completed every quest in the Showa Town group.",
        req: p => groups["Showa Town"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040327, 5),
        rewardDesc: "5 Scrolls for Earring for HP 30%."
    },
    "Perion explorer": {
        id: 12,
        desc: "Completed every quest in the Perion group.",
        req: p => groups.Perion.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(5220000, 6),
        rewardDesc: "6 Gachapon Tickets."
    },
    "Amoria explorer": {
        id: 13,
        desc: "Completed every quest in the Amoria group.",
        req: p => groups.Amoria.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2022181, 3),
        rewardDesc: "3 Victoria's Amorian Baskets."
    },
    "Singapore explorer": {
        id: 14,
        desc: "Completed every quest in the Singapore group.",
        req: p => groups.Singapore.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040101, 3),
        rewardDesc: "3 Scrolls for Face Accessory for HP 60%."
    },
    "Lith Harbor explorer": {
        id: 15,
        desc: "Completed every quest in the Lith Harbor group.",
        req: p => groups["Lith Harbor"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040204, 3),
        rewardDesc: "3 Scrolls for Eye Accessory for Accuracy 70%."
    },
    "Masteria explorer": {
        id: 16,
        desc: "Completed every quest in the Masteria group.",
        req: p => groups.Masteria.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(1072387),
        rewardDesc: "1 pair of Hellish Halloween Heels."
    },
    "El Nath explorer": {
        id: 17,
        desc: "Completed every quest in the El Nath group.",
        req: p => groups["El Nath"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(1102191),
        rewardDesc: "1 El Nathian Cape."
    },
    "Korean Folk Town explorer": {
        id: 18,
        desc: "Completed every quest in the Korean Folk Town group.",
        req: p => groups["Korean Folk Town"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040605, 8),
        rewardDesc: "8 Scrolls for Bottomwear for DEF 30%."
    },
    "Leafre explorer": {
        id: 19,
        desc: "Completed every quest in the Leafre group.",
        req: p => groups.Leafre.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2340000),
        rewardDesc: "1 White Scroll."
    },
    "Orbis explorer": {
        id: 20,
        desc: "Completed every quest in the Orbis group.",
        req: p => groups.Orbis.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(4001019, 15),
        rewardDesc: "15 Orbis Rock Scrolls."
    },
    "Temple of Time explorer": {
        id: 21,
        desc: "Completed every quest in the Temple of Time group.",
        req: p => groups["Temple of Time"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2049100, 3),
        rewardDesc: "3 Chaos Scrolls."
    },
    "Liberator of homelessness": {
        id: 22,
        desc: "Completed every quest in the Homelessness group.",
        req: p => groups.Homelessness.every(qid => p.completedCQuest(qid)),
        reward: () => {},
        rewardDesc: "Ability to craft items with Cody."
    },
    "Purveyor of illicit substances": {
        id: 23,
        desc: "Completed every quest in the Certain Illicit Substance group.",
        req: p => groups["Certain Illicit Substance"].every(qid => p.completedCQuest(qid)),
        reward: () => {},
        rewardDesc: "Ability to purchase All Cure Potions from Mia."
    },
    "Chronologician": {
        id: 24,
        desc: "Completed every quest in the Chronology group.",
        req: p => groups.Chronology.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040421, 6),
        rewardDesc: "6 Scrolls for Topwear for HP 60%."
    },
    "Teddius/Trojanus partisan": {
        id: 25,
        desc: "Completed every quest in the Teddius/Trojanus group.",
        req: p => groups["Teddius/Trojanus"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040904, 10),
        rewardDesc: "10 Scrolls for Shield for DEF 70%."
    },
    "Eclectic brewer": {
        id: 26,
        desc: "Completed every quest in the An Eclectic Brew group.",
        req: p => groups["An Eclectic Brew"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2022283, 2),
        rewardDesc: "2 Subani's Mystic Cauldrons."
    },
    "Fib enabler": {
        id: 27,
        desc: "Completed every quest in the A White Lie group.",
        req: p => groups["A White Lie"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040702, 10),
        rewardDesc: "10 Scrolls for Shoes for DEX 10%."
    },
    "Nuclear janitor": {
        id: 28,
        desc: "Completed every quest in the Nuclear Negligence group.",
        req: p => groups["Nuclear Negligence"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(1022082),
        rewardDesc: "1 pair of Spectrum Goggles."
    },
    "Master of offensive skill": {
        id: 29,
        desc: "Completed every quest in the Offensive Skill group.",
        req: p => groups["Offensive Skill"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2022179, 2),
        rewardDesc: "2 Onyx Apples."
    },
    "Master of buffing skill": {
        id: 30,
        desc: "Completed every quest in the Buff Skill group.",
        req: p => groups["Buff Skill"].every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2022251, 12),
        rewardDesc: "12 Maple Pops."
    },
    "Master of monster riding": {
        id: 31,
        desc: "Completed every quest in the Monster Riding group.",
        req: p => groups["Monster Riding"].every(qid => p.completedCQuest(qid)),
        reward: () => {},
        rewardDesc: "Ability to buy Pet Food from Mia in bulk."
    },
    "Sufferer of alienation": {
        id: 32,
        desc: "Completed every quest in the Alienation group.",
        req: p => groups.Alienation.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2340000, 3),
        rewardDesc: "3 White Scrolls."
    },
    "Krexel slayer": {
        id: 33,
        desc: "Completed every quest in the Krexel group.",
        req: p => groups.Krexel.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2022344, 36),
        rewardDesc: "36 JigaJuices."
    },
    "Master of the cinches": {
        id: 34,
        desc: "Completed every quest in the Cinch group.",
        req: p => groups.Cinch.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2022305, 3),
        rewardDesc: "3 Taru Face Paints."
    },
    "Conqueror of the rudiments": {
        id: 35,
        desc: "Completed every quest in the Rudimentary group.",
        req: p => groups.Rudimentary.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040004, 10),
        rewardDesc: "10 Scrolls for Helmet for HP 60%."
    },
    "In high demand": {
        id: 36,
        desc: "Completed every quest in the Demanding group.",
        req: p => groups.Demanding.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2041027, 21),
        rewardDesc: "21 Scrolls for Cape for Magic Def. 30%."
    },
    "Thorny but unstoppable": {
        id: 37,
        desc: "Completed every quest in the Thorny group.",
        req: p => groups.Thorny.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(5220000, 13),
        rewardDesc: "13 Gachapon Tickets."
    },
    "Force of nature": {
        id: 38,
        desc: "Completed every quest in the Formidable group.",
        req: p => groups.Formidable.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(1102057),
        rewardDesc: "1 Ludibrium Cape."
    },
    "Boss slayer": {
        id: 39,
        desc: "Completed every quest in the Boss group.",
        req: p => groups.Boss.every(qid => p.completedCQuest(qid)),
        reward: () => cm.gainItem(2040914, 7),
        rewardDesc: "7 Scrolls for Shield for Weapon Att. 60%."
    },
    "Boss control": {
        id: 40,
        desc: "Completed every quest in the Boss group with a completion of at least Adventuresome.",
        req: p =>
            groups.Boss.every(qid =>
                p.getCQuestStatus(qid)
                 .getValue() >=
                     CQuestStatus.ADVENTURESOME
                                 .getValue()
            ),
        reward: () => cm.gainItem(1032030),
        rewardDesc: "1 pair of Sword Earrings."
    },
    "Boss veteran": {
        id: 41,
        desc: "Completed every quest in the Boss group with a completion of at least Valiant.",
        req: p =>
            groups.Boss.every(qid =>
                p.getCQuestStatus(qid)
                 .getValue() >=
                     CQuestStatus.VALIANT
                                 .getValue()
            ),
        reward: p => {
            const j = Math.floor(p.getJob().getId() / 100);
            if (j === 1 || j === 3) {
                cm.gainItem(1002739);
                cm.gainItem(1052148);
                cm.gainItem(1072342);
            } else if (j === 2 || j === 4) {
                cm.gainItem(1002740);
                cm.gainItem(1052149);
                cm.gainItem(1072343);
            } else {
                cm.gainItem(1002511);
                cm.gainItem(1052210);
                cm.gainItem(1072427);
            }
        },
        rewardDesc: "Full Bosshunter Armor, or Blizzard Armor, Maple Hat, and Red Christmas Sock for Pirates/Beginners."
    },
    "David": {
        id: 42,
        desc: "Completed every quest in the Boss group with a completion of Fearless.",
        req: p =>
            groups.Boss.every(qid =>
                p.getCQuestStatus(qid)
                 .getValue() >=
                     CQuestStatus.FEARLESS
                                 .getValue()
            ),
        reward: () => cm.gainItem(1112501),
        rewardDesc: "1 Ring of David."
    },
    "Traveller": {
        id: 43,
        desc: "Completed every quest in the Travel group.",
        req: p => groups.Travel.every(qid => p.completedCQuest(qid)),
        reward: () => {},
        rewardDesc: "VIP Teleport Rocks from Mia are half price if you ask nice."
    },
    "Collector": {
        id: 44,
        desc: "Completed every quest in the Collection group.",
        req: p => groups.Collection.every(qid => p.completedCQuest(qid)),
        reward: () => {},
        rewardDesc: "All inventory spaces expanded by 10 slots."
    },
};

/*
function getFeatById(fid) {
    return Object
        .keys(feats)
        .map(key => feats[key])
        .find(feat => feat.id === fid);
}
*/

function getFeatEntryById(fid) {
    return Object
        .keys(feats)
        .map(key => [key, feats[key]])
        .find(featEntry => featEntry[1].id === fid);
}

function start() {
    branch = 0;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();

    if (mode < 0 || mode === 0 && (type === 4 || type === 12)) {
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
            case 0: {
                const additionalOpt = p.hasFeat(0) ? "\r\n#L6#I'd like to redo a quest.#l" : "";
                cm.sendSimple(`Hey there, I'm Ria! I'm here to help you out with your\r\n#e#dIntransigentQuests#k#n: custom quests with #bcompletion\r\nlevels#k, #rcustom dialogue#k, and #bunlockable feats that give special rewards#k!\r\n\r\n#L0#I'd like to take a look at the quests I have available to me.#l\r\n#L1#I'd like to see what progress I have on my currently active quest(s).#l\r\n#L2#I'd like to see a list of my completed quests.#l\r\n#L3#I'd like to browse all quest groups.#l\r\n#L4#I'd like to manage my feats/claim a reward.#l\r\n#L5#I want to change my effective level for a quest.#l${additionalOpt}`);
                return;
            }
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
            case 1: {
                const questsStr =
                    MapleCQuests
                        .getAllQuests()
                        .stream()
                        .filter(cq => cq.getId() !== 0 && p.canBeginCQuest(cq))
                        .sorted(Comparator.comparingInt(cq => cq.getFearless()))
                        .map(cq =>
                            "#e" +
                                cq.getTitle() +
                                "#n\r\n    NPC: #b" +
                                cq.getStartNpc() +
                                "#k\r\n    Fearless: #g" +
                                cq.getFearless() +
                                "#k, valiant: #d" +
                                cq.getValiant() +
                                "#k, adventuresome: #r" +
                                cq.getAdventuresome() +
                                "#k"
                        )
                        .reduce("", (accu, s) => accu + "\r\n" + s);
                if (questsStr === "") {
                    cm.sendPrev("You don't have any quests available at the moment.");
                } else {
                    cm.sendPrev("Quests that you currently qualify for:\r\n" + questsStr);
                }
                branch = 0;
                return;
            }
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
            case 1: {
                const completedQuestsStr =
                    p.readCompletedCQuests()
                     .entrySet()
                     .stream()
                     .sorted((e1, e2) => {
                         const cq1 = MapleCQuests.loadQuest(e1.getKey()),
                               cq2 = MapleCQuests.loadQuest(e2.getKey());
                         return Integer.compare(cq1.getFearless(), cq2.getFearless());
                     })
                     .map(e => {
                         const cq = MapleCQuests.loadQuest(e.getKey());
                         const completion = e.getValue();
                         const completionStr = (() => {
                             if (completion.equals(CQuestStatus.FEARLESS)) {
                                 return "#gFearless#k";
                             }
                             if (completion.equals(CQuestStatus.VALIANT)) {
                                 return "#dValiant#k";
                             }
                             if (completion.equals(CQuestStatus.ADVENTURESOME)) {
                                 return "#rAdventuresome#k";
                             }
                             return "Unimpressed";
                         })();
                         const qid = +cq.getId();
                         const groupsStr =
                             Object
                                 .keys(groups)
                                 .filter(group => ~groups[group].indexOf(qid))
                                 .join(", ");
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
                     .reduce("", (accu, s) => accu + "\r\n" + s);
                if (completedQuestsStr === "") {
                    cm.sendPrev("You haven't completed any quests yet!");
                } else {
                    cm.sendPrev("Your already completed quests:\r\n" + completedQuestsStr);
                }
                branch = 0;
                return;
            }
        }
    }

    if (branch === 4) { // All quest groups
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1: {
                const allQuestsStr =
                    Object
                        .keys(groups)
                        .map(group => {
                            const groupStr =
                                groups[group].map(qid => {
                                        const cq = MapleCQuests.loadQuest(qid);
                                        const completion = p.getCQuestStatus(qid);
                                        const completionStr = (() => {
                                            if (completion.equals(CQuestStatus.FEARLESS)) {
                                                return "#gFearless#k";
                                            }
                                            if (completion.equals(CQuestStatus.VALIANT)) {
                                                return "#dValiant#k";
                                            }
                                            if (completion.equals(CQuestStatus.ADVENTURESOME)) {
                                                return "#rAdventuresome#k";
                                            }
                                            return "Unimpressed";
                                        })();
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
                                    .reduce((accu, s) => accu + "\r\n" + s, "");
                            return "#e#d=== " +
                                   group +
                                   " group ===#k#n" +
                                   groupStr;
                        })
                        .reduce((accu, s) => accu + "\r\n" + s, "");
                cm.sendPrev("All quest groups:\r\n" + allQuestsStr);
                branch = 0;
                return;
            }
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
            case 2: {
                let unlockRatioString;
                if (selection === 0) {
                    // Check for new feats the player qualifies for
                    const newFeats =
                        Object
                            .keys(feats)
                            .filter(key => {
                                const feat = feats[key];
                                return !p.hasFeat(feat.id) && feat.req(p);
                            });
                    newFeats.forEach(key => {
                        const feat = feats[key];
                        feat.reward(p);
                        p.addFeat(feat.id);
                        const noticePacket =
                            MaplePacketCreator
                                .serverNotice(
                                    6,
                                    "Congrats to " +
                                        p.getName() +
                                        " on unlocking the " +
                                        key +
                                        " feat!"
                                );
                        const cs = p.getClient().getChannelServer();
                        try {
                            cs.getWorldInterface().broadcastMessage(
                                p.getName(),
                                noticePacket.getBytes()
                            );
                        } catch (e) {
                            cs.reconnectWorld();
                        }
                        p.dropMessage(
                            5,
                            "Congratulations on achieving the " +
                                key +
                                " feat!"
                        );
                        p.dropMessage(5, "You now have access to: " + feat.rewardDesc);
                    });
                    const leadText = (() => {
                        if (newFeats.length === 0) {
                            return "Your currently unlocked feats:\r\n";
                        }
                        if (newFeats.length === 1) {
                            return "Congratulations on the #enew feat#n!\r\n";
                        }
                        return "Congratulations on the #enew feats#n!\r\n";
                    })();
                    const featsString =
                        p.getFeats()
                         .stream()
                         .sorted()
                         .map(fid => {
                             const featEntry = getFeatEntryById(fid);
                             return "#e" +
                                    featEntry[0] +
                                    "#n\r\n    #d" +
                                    featEntry[1].desc +
                                    "#k\r\n    #b" +
                                    featEntry[1].rewardDesc +
                                    "#k\r\n";
                         })
                         .reduce("", (accu, s) => accu + "\r\n" + s);
                    unlockRatioString =
                        "(#e#b" +
                            p.getFeats().size() +
                            "#k#n / #b" +
                            Object.keys(feats).length +
                            "#k feats unlocked)\r\n";
                    cm.sendPrev(leadText + unlockRatioString + featsString);
                } else {
                    const lockedFeatsString =
                        Object
                            .keys(feats)
                            .sort((key1, key2) => feats[key1].id - feats[key2].id)
                            .map(key => {
                                const feat = feats[key];
                                return "#e" +
                                       key +
                                       "#n\r\n    #d" +
                                       feat.desc +
                                       "#k\r\n    #b" +
                                       feat.rewardDesc +
                                       "#k\r\n";
                            })
                            .reduce((accu, s) => accu + "\r\n" + s, "");
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
    }

    if (branch === 6) { // Set quest effective level
        if (status === 3 && selection % 5 !== 0) {
            status--;
        }
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1: {
                const choiceString =
                    jsArray(p.getCQuests())
                        .map((cq, i) => {
                            const q = cq.getQuest();
                            if (q.getId() === 0) {
                                return "";
                            }
                            return "#L" +
                                   i +
                                   "#" +
                                   q.getTitle() +
                                   "  |  (#g" +
                                   q.getFearless() +
                                   "#k, #d" +
                                   q.getValiant() +
                                   "#k, #r" +
                                   q.getAdventuresome() +
                                   "#k)  |  Current effective level: " +
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
                    cm.sendSimple("Select the quest that you'd like to change your effective level for.\r\nRemember that changing your effective level for a quest\r\n#ewill reset your progress for that quest#n!:\r\n\r\n" + choiceString);
                }
                return;
            }
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
            case 3: {
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
                const selectedEL = p.getLevel() - selection;
                p.getCQuest(questSlot).setEffectivePlayerLevel(selectedEL);
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

    if (branch === 7) { // Redo quest
        if (!p.hasFeat(0)) {
            cm.dispose();
            return;
        }
        switch (status) {
            case 0:
                cm.dispose();
                return;
            case 1: {
                const possibleEraseStr =
                    p.readCompletedCQuests()
                     .entrySet()
                     .stream()
                     .sorted((e1, e2) => {
                         const cq1 = MapleCQuests.loadQuest(e1.getKey()),
                               cq2 = MapleCQuests.loadQuest(e2.getKey());
                         return Integer.compare(cq1.getFearless(), cq2.getFearless());
                     })
                     .map(e => {
                         const cq = MapleCQuests.loadQuest(e.getKey());
                         const completion = e.getValue();
                         const completionStr = StringUtil.makeEnumHumanReadable(completion.name());
                         const qid = +cq.getId();
                         //const groupsStr = Object.keys(groups).filter(group => ~groups[group].indexOf(qid)).join(", ");
                         return [qid, cq.getTitle() + " (" + completionStr + ")"];
                     })
                     .reduce("", (accu, s) =>
                         accu + "\r\n#L" + s[0] + "#" + s[1] + "#l"
                     );
                if (possibleEraseStr === "") {
                    cm.sendPrev("You haven't completed any quests yet!");
                } else {
                    cm.sendSimple("Select the quest that you'd like to redo:\r\n" + possibleEraseStr);
                }
                return;
            }
            case 2:
                if (MapleCQuests.loadQuest(selection).isRepeatable()) {
                    cm.sendPrev("That quest is already repeatable!");
                    return;
                }
                p.setRepeatableQuest(selection);
                cm.sendPrev("You may now redo #e" + MapleCQuests.loadQuest(selection).getTitle() + "#n.\r\n\r\nRemember that you must accept (start) the quest before you mark another quest for redo-ing or log out, otherwise you'll have to talk to me again!");
                status--;
                branch = 0;
                return;
        }
    }
}
