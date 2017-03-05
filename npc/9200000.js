/*
 * Cody
 * Crafting NPC by day,
 * Testing NPC by night.
 *
 * ID: 9200000
 */

var MapleJob           = Java.type("net.sf.odinms.client.MapleJob");
var MaplePacketCreator = Java.type("net.sf.odinms.tools.MaplePacketCreator");
var MapleStat          = Java.type("net.sf.odinms.client.MapleStat");
var SkillFactory       = Java.type("net.sf.odinms.client.SkillFactory");

var status;
var possibleJobs = [];
var canusecody = false;
var supercody = false;
var recipes =
{
    1002895: [[4032134, 2],  [4011003, 5],   [4003000, 30],  [4000280, 100]],
    1002956: [[4031915, 3],  [1002895, 1],   [4011000, 12],  [4011002, 5],   [1032032, 2], [4000080, 240]],
    1052280: [[4031915, 3],  [1052299, 1],   [4011003, 10],  [4011005, 10],  [4001019, 12]],
    1052299: [[4032134, 2],  [4021003, 20],  [4000021, 50],  [4000030, 100], [4003000, 25]],
    1072452: [[4031915, 3],  [1072471, 1],   [4000264, 120], [4130001, 12],  [4011007, 1]],
    1072471: [[4031461, 2],  [4003000, 30],  [4021000, 5],   [4000264, 65]],
    1082223: [[4031824, 1],  [4000021, 15],  [4005000, 2]],
    1082280: [[4031915, 3],  [1082285, 1],   [4001020, 60],  [4000148, 360], [4130000, 12]],
    1082285: [[4032134, 2],  [4000245, 80],  [4003000, 10]],
    1092075: [[4031915, 3],  [2070009, 3],   [4000287, 700], [4011002, 7],   [4021009, 1]],
    1102206: [[4031915, 3],  [1102262, 1],   [4000021, 550]],
    1102262: [[4032134, 2],  [4005004, 15],  [4000021, 30],  [4011006, 5]],
    1302143: [[4031915, 3],  [4010001, 15],  [4000270, 35],  [4005000, 7],   [4021009, 1], [4130002, 5], [1302149, 1]],
    1302149: [[4031595, 2],  [4000244, 250], [4130002, 10],  [4005000, 15],  [2012001, 3]],
    1312058: [[4031915, 3],  [4010001, 10],  [4000277, 700], [4005000, 7],   [4021009, 1], [4130003, 5]],
    1312095: [[4031595, 2],  [4000244, 250], [4130003, 10],  [4005000, 15],  [2012001, 3], [1312095, 1]],
    1322086: [[4031915, 3],  [4031150, 20],  [4000127, 700], [4005000, 7],   [4021009, 1], [4130004, 5], [1322135, 1]],
    1322087: [[4031915, 3],  [4031150, 20],  [4000127, 700], [4005000, 7],   [4021009, 1], [4130004, 5], [1322135, 1]],
    1322135: [[4031595, 2],  [4000244, 250], [4130004, 10],  [4005000, 15],  [2012001, 3]],
    1332116: [[4031915, 3],  [1332051, 3],   [4010004, 25],  [4005003, 7],   [4021009, 1], [4130014, 5], [1332126, 1]],
    1332126: [[4031595, 2],  [4000244, 250], [4130014, 10],  [4005003, 15],  [2012001, 3]],
    1372074: [[4031915, 3],  [4031150, 20],  [4000268, 35],  [4005001, 7],   [4021009, 1], [4130010, 5], [1372080, 1]],
    1372080: [[4031595, 2],  [4000244, 250], [4130010, 10],  [4005001, 15],  [2012001, 3]],
    1382095: [[4031915, 3],  [4031150, 20],  [4000269, 35],  [4005001, 7],   [4021009, 1], [4130011, 5], [1382102, 1]],
    1382102: [[4031595, 2],  [4000244, 250], [4130011, 10],  [4005001, 15],  [2012001, 3]],
    1402086: [[4031915, 3],  [4010001, 15],  [4000265, 700], [4005000, 7],   [4021009, 1], [4130005, 5], [1402091, 1]],
    1402091: [[4031595, 2],  [4000244, 250], [4130005, 10],  [4005000, 15],  [2012001, 3]],
    1412058: [[4031915, 3],  [4010001, 10],  [4000146, 700], [4005000, 7],   [4021009, 1], [4130006, 5], [1312095, 1]],
    1422064: [[4031915, 3],  [4031150, 20],  [4000127, 700], [4005000, 7],   [4021009, 1], [4130007, 5], [1322135, 1]],
    1422065: [[4031915, 3],  [4031150, 20],  [4000127, 700], [4005000, 7],   [4021009, 1], [4130007, 5], [1322135, 1]],
    1432077: [[4031915, 3],  [4010000, 6],   [4000274, 700], [4005000, 7],   [4021009, 1], [4130008, 5], [1432084, 1]],
    1432084: [[4031595, 2],  [4000244, 250], [4130008, 10],  [4005000, 15],  [2012001, 3]],
    1442107: [[4031915, 3],  [4011008, 2],   [4000237, 600], [4005000, 7],   [4021009, 1], [4130009, 5], [1442113, 1]],
    1442113: [[4031595, 2],  [4000244, 250], [4130009, 10],  [4005000, 15],  [2012001, 3]],
    1452102: [[4031915, 3],  [4032013, 1],   [4000018, 700], [4005002, 5],   [4021009, 1], [4130012, 5], [1452107, 1]],
    1452107: [[4031595, 2],  [4000244, 250], [4130012, 10],  [4005002, 15],  [2012001, 3]],
    1462087: [[4031915, 3],  [4032013, 1],   [4000018, 700], [4005002, 5],   [4021009, 1], [4130013, 5], [1462094, 1]],
    1462094: [[4031595, 2],  [4000244, 250], [4130013, 10],  [4005002, 15],  [2012001, 3]],
    1472113: [[4031915, 3],  [4000270, 35],  [4000053, 200], [4005003, 7],   [4021009, 1], [4130015, 5], [1472118, 1]],
    1472118: [[4031595, 2],  [4000244, 250], [4130015, 10],  [4005003, 15],  [2012001, 3]],
    1482075: [[4031915, 3],  [1082213, 2],   [4000044, 600], [4005000, 7],   [4021009, 1], [4130016, 5], [1482080, 1]],
    1482080: [[4031595, 2],  [4000244, 250], [4130016, 10],  [4005000, 15],  [2012001, 3]],
    1492075: [[4031915, 3],  [1492010, 2],   [4000122, 600], [4005002, 7],   [4021009, 1], [4130017, 5], [1492081, 1]],
    1492081: [[4031595, 2],  [4000244, 250], [4130017, 10],  [4005002, 15],  [2012001, 3]],
    2070016: [[4021007, 8],  [4000150, 250]],
    2070018: [[4021008, 10], [4011004, 10],  [1482007, 5]],
    1022082: [[4021004, 5],  [2210006, 1],   [2022179, 1]],
    1022097: [[4021001, 6],  [4021002, 6],   [4003000, 6]],
    1022088: [[4011008, 5],  [4011001, 2],   [4001000, 1]],
    1022089: [[4011002, 20], [4021005, 20],  [4001000, 5]],
    1022103: [[4021006, 8],  [4011001, 8],   [4001000, 3]],
    2330005: [[4011003, 5],  [4021006, 5],   [4000130, 300], [1492013, 1]]
};
var craftables = Object.keys(recipes).sort();
var selected = 0;
var vipitems =
[
    1322090,
    1092079,
    1092084,
    1382099,
    1372078,
    1422063,
    1032084,
    1302147,
    1312062,
    1332120,
    1452106,
    1462091,
    1472117,
    1482079,
    1492079
];
var skillIds =
[
    8,       1000,    1001,    1002,    1003,    1004,    1000000, 1000001, 1000002, 1001003, 1001004, 1001005, 2000000, 2000001,
    2001002, 2001003, 2001004, 2001005, 3000000, 3000001, 3000002, 3001003, 3001004, 3001005, 4000000, 4000001, 4001002, 4001003,
    4001334, 4001344, 1100000, 1100001, 1100002, 1100003, 1101004, 1101005, 1101006, 1101007, 1200000, 1200001, 1200002, 1200003,
    1201004, 1201005, 1201006, 1201007, 1300000, 1300001, 1300002, 1300003, 1301004, 1301005, 1301006, 1301007, 2100000, 2101001,
    2101002, 2101003, 2101004, 2101005, 2200000, 2201001, 2201002, 2201003, 2201004, 2201005, 2300000, 2301001, 2301002, 2301003,
    2301004, 2301005, 3100000, 3100001, 3101002, 3101003, 3101004, 3101005, 3200000, 3200001, 3201002, 3201003, 3201004, 3201005,
    4100000, 4100001, 4100002, 4101003, 4101004, 4101005, 4200000, 4200001, 4201002, 4201003, 4201004, 4201005, 1110000, 1110001,
    1111002, 1111003, 1111004, 1111005, 1111006, 1111007, 1111008, 1210000, 1210001, 1211002, 1211003, 1211004, 1211005, 1211006,
    1211007, 1211008, 1211009, 1310000, 1311001, 1311002, 1311003, 1311004, 1311005, 1311006, 1311007, 1311008, 2110000, 2110001,
    2111002, 2111003, 2111004, 2111005, 2111006, 2210000, 2210001, 2211002, 2211003, 2211004, 2211005, 2211006, 2310000, 2311001,
    2311002, 2311003, 2311004, 2311005, 2311006, 3110000, 3110001, 3111002, 3111003, 3111004, 3111005, 3111006, 3210000, 3210001,
    3211002, 3211003, 3211004, 3211005, 3211006, 4110000, 4111001, 4111002, 4111003, 4111004, 4111005, 4111006, 4210000, 4211001,
    4211002, 4211003, 4211004, 4211005, 4211006, 1120003, 1120004, 1120005, 1121000, 1121001, 1121002, 1121006, 1121008, 1121010,
    1121011, 1220005, 1220006, 1220010, 1221000, 1221001, 1221002, 1221003, 1221004, 1221007, 1221009, 1221011, 1221012, 1320005,
    1320006, 1320008, 1320009, 1321000, 1321001, 1321002, 1321003, 1321007, 1321010, 2121000, 2121001, 2121002, 2121003, 2121004,
    2121005, 2121006, 2121007, 2121008, 2221000, 2221001, 2221002, 2221003, 2221004, 2221005, 2221006, 2221007, 2221008, 2321000,
    2321001, 2321002, 2321003, 2321004, 2321005, 2321006, 2321007, 2321008, 2321009, 3120005, 3121000, 3121002, 3121003, 3121004,
    3121006, 3121007, 3121008, 3121009, 3220004, 3221000, 3221001, 3221002, 3221003, 3221005, 3221006, 3221007, 3221008, 4120002,
    4120005, 4121000, 4121003, 4121004, 4121006, 4121007, 4121008, 4121009, 4220002, 4220005, 4221000, 4221001, 4221003, 4221004,
    4221006, 4221007, 4221008, 5000000, 5001001, 5001002, 5001003, 5001005, 5100000, 5100001, 5101002, 5101003, 5101004, 5101005,
    5101006, 5101007, 5200000, 5201001, 5201002, 5201003, 5201004, 5201005, 5201006, 5110000, 5110001, 5111002, 5111004, 5111005,
    5111006, 5220011, 5221010, 5221009, 5221008, 5221007, 5221006, 5221004, 5221003, 5220002, 5220001, 5221000, 5121010, 5121009,
    5121008, 5121007, 5121005, 5121004, 5121003, 5121002, 5121001, 5121000, 5211006, 5211005, 5211004, 5211002, 5211001, 5210000,
    9001000, 9001001, 9001002, 9101000, 9101001, 9101002, 9101003, 9101004, 9101005, 9101006, 9101007, 9101008
];
var job, recipe, test, firstSelection, making;

function levelGrad(victim, target) {
    var startLevel = victim.getLevel();
    for (var i = 0; i < target - startLevel; ++i) {
        victim.levelUp();
        victim.setExp(0);
        victim.updateSingleStat(MapleStat.EXP, 0);
    }
}

function maxSkills(p) {
    var job = p.getJob();
    skillIds.filter(function(id) {
        var skillClass = Math.floor(id / 10000);
        return job.isA(MapleJob.getById(skillClass));
    }).forEach(function(id) {
        p.maxSkillLevel(id);
    });
}

function start() {
    var p = cm.getPlayer();
    if ("" + p.getName() === "") {
        /*
        p.setDex(p.getDex() - 100);
        p.updateSingleStat(MapleStat.DEX, p.getDex());
        p.setRemainingAp(p.getRemainingAp() + 100);
        p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
        */

        canusecody = true;
    }

    test = false;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i;
    if (supercody) {
        if (mode === 1) {
            status++;
        } else {
            cm.dispose();
            return;
        }
        switch (status) {
            case 0:
                cm.sendGetNumber("id", 0, 0, 60);
                break;
            case 1:
                var id = selection * 10 + 2;
                if (id !== 2 && MapleJob.getById(id) === null) {
                    cm.sendOk("Wrong id");
                } else if (id === 2) {
                    maxSkills(p); //
                } else if (p.getLevel() < 8) {
                    levelGrad(p, Math.floor(id / 100) !== 200 ? 10 : 8);
                    switch (Math.floor(id / 100)) {
                        case 1:
                            p.setDex(20);
                            p.updateSingleStat(MapleStat.DEX, p.getDex());
                            p.setRemainingAp(p.getRemainingAp() - p.getDex() + 4);
                            p.setStr(p.getStr() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.STR, p.getStr());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 2:
                            p.setInt(p.getInt() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.INT, p.getInt());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 3:
                            p.setDex(p.getDex() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.DEX, p.getDex());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 4:
                            p.setDex(25);
                            p.updateSingleStat(MapleStat.DEX, p.getDex());
                            p.setRemainingAp(p.getRemainingAp() - p.getDex() + 4);
                            p.setLuk(p.getLuk() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.LUK, p.getLuk());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 5:
                            if (selection % 10 === 1) { // Bucc
                                p.setDex(20);
                                p.updateSingleStat(MapleStat.DEX, p.getDex());
                                p.setRemainingAp(p.getRemainingAp() - p.getDex() + 4);
                                p.setStr(p.getStr() + p.getRemainingAp());
                                p.updateSingleStat(MapleStat.STR, p.getStr());
                                p.setRemainingAp(0);
                                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            } else { // Sair
                                p.setDex(p.getDex() + p.getRemainingAp());
                                p.updateSingleStat(MapleStat.DEX, p.getDex());
                                p.setRemainingAp(0);
                                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            }
                            break;
                    }
                    p.setJob(Math.floor(id / 100) * 100);
                    maxSkills(p);
                } else if (p.getLevel() < 30) {
                    levelGrad(p, 30);
                    switch (Math.floor(id / 100)) {
                        case 1:
                            p.setStr(p.getStr() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.STR, p.getStr());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 2:
                            p.setInt(p.getInt() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.INT, p.getInt());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 3:
                            p.setDex(p.getDex() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.DEX, p.getDex());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 4:
                            p.setLuk(p.getLuk() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.LUK, p.getLuk());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 5:
                            if (selection % 10 === 1) { // Bucc
                                p.setStr(p.getStr() + p.getRemainingAp());
                                p.updateSingleStat(MapleStat.STR, p.getStr());
                                p.setRemainingAp(0);
                                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            } else { // Sair
                                p.setDex(p.getDex() + p.getRemainingAp());
                                p.updateSingleStat(MapleStat.DEX, p.getDex());
                                p.setRemainingAp(0);
                                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            }
                            break;
                    }
                    p.setJob(Math.floor(id / 10) * 10);
                    maxSkills(p);
                } else if (p.getLevel() < 70) {
                    levelGrad(p, 70);
                    switch (Math.floor(id / 100)) {
                        case 1:
                            p.setStr(p.getStr() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.STR, p.getStr());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 2:
                            p.setInt(p.getInt() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.INT, p.getInt());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 3:
                            p.setDex(p.getDex() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.DEX, p.getDex());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 4:
                            p.setLuk(p.getLuk() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.LUK, p.getLuk());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 5:
                            if (selection % 10 === 1) { // Bucc
                                p.setStr(p.getStr() + p.getRemainingAp());
                                p.updateSingleStat(MapleStat.STR, p.getStr());
                                p.setRemainingAp(0);
                                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            } else { // Sair
                                p.setDex(p.getDex() + p.getRemainingAp());
                                p.updateSingleStat(MapleStat.DEX, p.getDex());
                                p.setRemainingAp(0);
                                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            }
                            break;
                    }
                    p.setJob(Math.floor(id / 10) * 10 + 1);
                    maxSkills(p);
                } else if (p.getLevel() < 120) {
                    levelGrad(p, 120);
                    switch (Math.floor(id / 100)) {
                        case 1:
                            p.setStr(p.getStr() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.STR, p.getStr());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 2:
                            p.setInt(p.getInt() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.INT, p.getInt());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 3:
                            p.setDex(p.getDex() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.DEX, p.getDex());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 4:
                            p.setLuk(p.getLuk() + p.getRemainingAp());
                            p.updateSingleStat(MapleStat.LUK, p.getLuk());
                            p.setRemainingAp(0);
                            p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            break;
                        case 5:
                            if (selection % 10 === 1) { // Bucc
                                p.setStr(p.getStr() + p.getRemainingAp());
                                p.updateSingleStat(MapleStat.STR, p.getStr());
                                p.setRemainingAp(0);
                                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            } else { // Sair
                                p.setDex(p.getDex() + p.getRemainingAp());
                                p.updateSingleStat(MapleStat.DEX, p.getDex());
                                p.setRemainingAp(0);
                                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                            }
                            break;
                    }
                    p.setJob(Math.floor(id / 10) * 10 + 2);
                    maxSkills(p);
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (canusecody) {
        if (mode === 1) {
            status++;
        } else {
            cm.dispose();
            return;
        }
        if (cm.getJob().getId() % 10 === 2) {
            cm.sendOk("Hey, how's it going? I've been doing well here.");
            cm.dispose();
        } else if (cm.getJob().getId() % 100 !== 0) {
            var secondJob = (cm.getJob().getId() % 10 === 0);
            if ((secondJob && cm.getLevel() < 70) || (!secondJob && cm.getLevel() < 120)) {
                cm.sendOk("Hey, how's it going? I've been doing well here.");
                cm.dispose();
            } else {
                var newJob = cm.getJob().getId() + 1;
                if (status === 0) {
                    cm.sendYesNo("Great job getting to level " + cm.getLevel() + ". Would you like to become a #b" + cm.getJobById(newJob) + "#k?");
                } else if (status === 1) {
                    cm.sendOk("Congratulations, you are now a #b" + cm.getJobById(newJob) + "#k.");
                    p.setJob(newJob);
                    cm.dispose();
                    return;
                }
            }
        } else {
            if (status === 0) {
                if (cm.getJob().getId() === 0) {
                    if (cm.getLevel() >= 8 && p.getInt() >= 20) {
                        possibleJobs.push(200);
                    }
                    if (cm.getLevel() >= 10) {
                        if (p.getStr() >= 35) {
                            possibleJobs.push(100);
                        }
                        if (p.getDex() >= 25) {
                            possibleJobs.push(300); possibleJobs.push(400);
                        }
                        if (p.getDex() >= 20) {
                            possibleJobs.push(500);
                        }
                    }
                } else {
                    if (cm.getLevel() >= 30) {
                        switch (cm.getJob().getId()) {
                            case 100: possibleJobs = [110, 120, 130]; break;
                            case 200: possibleJobs = [210, 220, 230]; break;
                            case 300: possibleJobs = [310, 320];      break;
                            case 400: possibleJobs = [410, 420];      break;
                            case 500: possibleJobs = [510, 520];      break;
                        }
                    }
                }
                if (possibleJobs.length === 0) {
                    cm.sendOk("Your level is too low to advance.");
                    cm.dispose();
                    return;
                } else {
                    var text = "These are the available jobs you can take:#b";
                    for (i = 0; i < possibleJobs.length; ++i) {
                        text += "\r\n#L" + i + "#" + cm.getJobById(possibleJobs[i]) + "#l";
                    }
                    cm.sendSimple(text);
                }
            } else if (status === 1) {
                cm.sendYesNo("Are you sure you want to job advance?");
                job = selection;
            } else if (status === 2) {
                cm.sendOk("Congratulations on your job advancement!");
                p.setJob(possibleJobs[job]);
                cm.dispose();
                return;
            }
        }
    } else if (test) {
        if (mode === 1) {
            status++;
        } else {
            cm.dispose();
            return;
        }
        if (status === 0) {
            cm.sendSimple("Hey, I'm Cody. It looks like it's #dtesting time#k around here -- whaddaya say?\r\n\r\n#L0#I want you to change my level.#l\r\n#L1#I want you to change my job.#l\r\n#L2#I need some mesos.#l\r\n#L3#I need some NX.#l\r\n#L4#Can you give me a VIP item to try out?#l\r\n#L5#I want you to max my skills.#l\r\n#L6#I want some AP points!#l\r\n#L7#I want maxHP/MP.#l\r\n#L8#I want to reset my ap.#l\r\n#L9#Please, reset my death penalty level to 0.#l\r\n#L10#I need some stars.#l\r\n#L11#I need some bow arrows.#l\r\n#L12#I need some crossbow bolts.#l\r\n#L13#Give me darkness.#l\r\n#L14#I hate myself and need a bullet to end it all.#l");
        } else if (status === 1) {
            selected = selection;
            if (selection === 0) {
                cm.sendGetNumber("Ok, what level do ya want, kid?", 1, 1, 200);
            } else if (selection === 1) {
                cm.sendSimple("Alright, pick yer poison:\r\n\r\n#L0#Beginner#l\r\n#L100#Warrior#l\r\n#L110#Fighter#l\r\n#L111#Crusader#l\r\n#L112#Hero#l\r\n#L120#Page#l\r\n#L121#White Knight#l\r\n#L122#Paladin#l\r\n#L130#Sporeman#l\r\n#L131#DragonK#l\r\n#L132#DarkK#l\r\n#L200#Magician#l\r\n#L210#F/P Wiz#l\r\n#L211#F/P Mage#l\r\n#L212#F/P Arch#l\r\n#L220#I/L Wiz#l\r\n#L221#I/L Mage#l\r\n#L222#I/L Arch#l\r\n#L230#Cleric#l\r\n#L231#Priest#l\r\n#L232#Bishop#l\r\n#L300#Bowman#l\r\n#L310#Hunter#l\r\n#L311#Ranger#l\r\n#L312#Bowmaster#l\r\n#L320#Crossbowman#l\r\n#L321#Sniper#l\r\n#L322#Marksman#l\r\n#L400#Rogue#l\r\n#L410#Assassin#l\r\n#L411#Hermit#l\r\n#L412#Nightlord#l\r\n#L420#Bandit#l\r\n#L421#Chief Bandit#l\r\n#L422#Shadower#l\r\n#L500#Pirate#l\r\n#L510#Brawler#l\r\n#L511#Maurauder#l\r\n#L512#Buccaneer#l\r\n#L520#Gunslinger#l\r\n#L521#Outlaw#l\r\n#L522#Corsair#l");
            } else if (selection === 2) {
                cm.sendOk("You're all set.");
                p.gainMeso(2147483647 - p.getMeso());
                cm.dispose();
                return;
            } else if (selection === 3) {
                cm.sendOk("You're all set.");
                cm.modifyNx(100000 - p.getCSPoints(1));
                cm.dispose();
                return;
            } else if (selection === 4) {
                var s = "Pick one:\r\n\r\n";
                for (i = 0; i < vipitems.length; ++i) {
                    s += "#L" + String(i) + "##i" + String(vipitems[i]) + "##l\r\n";
                }
                cm.sendSimple(s);
            } else if (selection === 5) {
                cm.sendOk("You're all set.");
                p.maxAllSkills();
                cm.dispose();
                return;
            } else if (selection === 6) {
                cm.sendOk("You're all set.");
                p.setRemainingAp(950);
                p.updateSingleStat(MapleStat.AVAILABLEAP, p.getRemainingAp());
                cm.dispose();
                return;
            } else if (selection === 7) {
                cm.sendOk("You're all set.");
                p.setMaxHp(30000);
                p.updateSingleStat(MapleStat.MAXHP, p.getMaxHp());
                p.setMaxMp(30000);
                p.updateSingleStat(MapleStat.MAXMP, p.getMaxMp());
                cm.dispose();
                return;
            } else if (selection === 8) {
                cm.sendOk("You're all set.");
                p.setStr(4);
                p.updateSingleStat(MapleStat.STR, p.getStr());
                p.setDex(4);
                p.updateSingleStat(MapleStat.DEX, p.getDex());
                p.setInt(4);
                p.updateSingleStat(MapleStat.INT, p.getInt());
                p.setLuk(4);
                p.updateSingleStat(MapleStat.LUK, p.getLuk());
                cm.dispose();
                return;
            } else if (selection === 9) {
                cm.sendOk("You're all set.");
                p.decrementDeathPenaltyAndRecalc(p.getDeathPenalty());
                cm.dispose();
                return;
            } else if (selection === 10) {
                cm.sendOk("You're all set.");
                cm.gainItem(2070018, 900);
                cm.gainItem(2070018, 900);
                cm.gainItem(2070018, 900);
                cm.gainItem(2070018, 900);
                cm.gainItem(2070018, 900);
                cm.gainItem(2070018, 900);
                cm.dispose();
                return;
            } else if (selection === 11) {
                cm.sendOk("You're all set.");
                cm.gainItem(2060004, 900);
                cm.gainItem(2060004, 900);
                cm.gainItem(2060004, 900);
                cm.gainItem(2060004, 900);
                cm.gainItem(2060004, 900);
                cm.gainItem(2060004, 900);
                cm.dispose();
                return;
            } else if (selection === 12) {
                cm.sendOk("You're all set.");
                cm.gainItem(2061004, 900);
                cm.gainItem(2061004, 900);
                cm.gainItem(2061004, 900);
                cm.gainItem(2061004, 900);
                cm.gainItem(2061004, 900);
                cm.gainItem(2061004, 900);
                cm.dispose();
                return;
            } else if (selection === 13) {
                cm.giveDebuff(121, 1);
                cm.dispose();
                return;
            } else if (selection === 14) {
                cm.sendOk("You're all set.");
                cm.gainItem(2330005, 900);
                cm.gainItem(2330005, 900);
                cm.gainItem(2330005, 900);
                cm.gainItem(2330005, 900);
                cm.gainItem(2330005, 900);
                cm.dispose();
                return;
            }
        } else if (status === 2) {
            if (selected === 0) {
                p.setLevel(selection - 1);
                p.levelUp();
                p.setExp(0);
                p.updateSingleStat(MapleStat.EXP, 0);
                cm.dispose();
                return;
            } else if (selected === 1) {
                p.setJob(selection);
                cm.dispose();
                return;
            } else if (selected === 4) {
                cm.gainItem(vipitems[selection], 1);
                cm.dispose();
                return;
            }
        }
    } else {
        if (mode === 1) {
            status++;
        } else if (mode < 0 || (mode === 0 && (status < 1 || type === 4))) {
            cm.dispose();
            return;
        } else {
            status--;
        }
        if (status === 0) {
            cm.sendSimple("Hi there, I'm Cody.\r\n\r\n#L1#I'd like to craft an item.#l\r\n#L0#I'd like to make a job advancement.#l");
        } else if (status === 1) {
            if (firstSelection === undefined) {
                firstSelection = selection;
            }
            if (firstSelection === 0) {
                cm.sendPrev("If you're looking to make a job advancement, please see your respective instructor in Victoria Island:\r\n\r\nWarriors: #bDances With Balrog#k of #rPerion#k\r\nArchers: #bAthena Pierce#k of #rHenesys#k\r\nThieves: #bDark Lord#k of #rKerning City#k\r\nMagicians: #bGrendel The Really Old#k of #rEllinia#k\r\nPirates: #bKyrin#k of #rNautilus Port#k");
            } else if (firstSelection === 1) {
                var selectionstring = "";
                for (i = 0; i < craftables.length; ++i) {
                    selectionstring += "#L" + i + "##i" + craftables[i] + "##l\r\n#L" + craftables[i] + "#\t (view stats for this item)#l\r\n";
                }
                cm.sendSimple("Ok, what would you like to craft?\r\n\r\n" + selectionstring);
            }
        } else if (status === 2) {
            if (selection > craftables.length) {
                making = false;
                cm.sendPrev("#i" + selection + "#\r\n" + cm.getAllItemStats(selection));
            } else {
                making = true;
                selected = craftables[selection];
                recipe = recipes[selected];
                var requirementstring = "";
                if (recipe === undefined) {
                    cm.dispose();
                    return;
                }
                for (i = 0; i < recipe.length; ++i) {
                    requirementstring += "#i" + recipe[i][0] + "#  x" + recipe[i][1] + "\r\n";
                }
            
                cm.sendYesNo("To make #i" + selected + "# you will need the following:\r\n\r\n" + requirementstring + "\r\nDo you have these items now?");
            }
        } else if (status === 3) {
            if (!making) {
                cm.dispose();
                return;
            }
            var canmake = true;
            for (i = 0; i < recipe.length; ++i) {
                if (cm.itemQuantity(recipe[i][0]) < recipe[i][1]) {
                    //p.dropMessage(recipe[i][0] + ", " + recipe[i][1]);
                    canmake = false;
                    break;
                }
            }
            if (canmake) {
                for (i = 0; i < recipe.length; ++i) {
                    cm.gainItem(recipe[i][0], -recipe[i][1]);
                }
                cm.gainItem(selected, 1);
                cm.sendOk("Congratulations! You have successfully forged:\r\n\r\n#i" + selected + "#");
                cm.dispose();
                return;
            } else {
                cm.sendOk("It doesn't look like you have the required ingredients.");
                cm.dispose();
                return;
            }
        }
    }
}
