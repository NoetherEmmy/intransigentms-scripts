/**
    Maple Administrator
    ID: 9010000
**/

/* jshint ignore: start */
// Array.prototype.find() polyfill
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(a){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var d=arguments[1],e=0;e<c;){var f=b[e];if(a.call(d,f,e,b))return f;e++}}});
/* jshint ignore: end */

var MapleStat              = Java.type("net.sf.odinms.client.MapleStat");
var SkillFactory           = Java.type("net.sf.odinms.client.SkillFactory");
var MapleLifeFactory       = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
var MapleMonsterStats      = Java.type("net.sf.odinms.server.life.MapleMonsterStats");
var Element                = Java.type("net.sf.odinms.server.life.Element");
var ElementalEffectiveness = Java.type("net.sf.odinms.server.life.ElementalEffectiveness");
var Point                  = Java.type("java.awt.Point");
var PortalScriptManager    = Java.type("net.sf.odinms.scripting.portal.PortalScriptManager");
//var MonsterStatusEffect       = Java.type("net.sf.odinms.client.status.MonsterStatusEffect");
//var Collections               = Java.type("java.util.Collections");
//var MonsterStatus             = Java.type("net.sf.odinms.client.status.MonsterStatus");
//var MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
var MapleInventoryType        = Java.type("net.sf.odinms.client.MapleInventoryType");

var status;
var troubleshot = false;
var skill = false;
var expboost = false;
var taunt = SkillFactory.getSkill(4121003);
var echoofhero = SkillFactory.getSkill(1005);
var skillselect = -1;
var vip = false;
var vipitems =
[
    1322090, 1092079, 1092084, 1382099,
    1372078, 1422063, 1032084, 1302147,
    1312062, 1332120, 1452106, 1462091,
    1472117, 1482079, 1492079, 1402090,
    1412062, 1432081, 1442111, 1092074
];
var herosWills =
[
    1121011, 1221012, 1321010, 2121008,
    2221008, 2321009, 3121009, 3221008,
    4121009, 4221008, 5121008, 5221010
];
var cashdisposal = false;
var unclaimed = false;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var cashequiplist;
    /*
    if ("" + p.getName() === "Branden") {
        var poleArmMastery = SkillFactory.getSkill(1300001);
        var poleArmBooster = SkillFactory.getSkill(1301005);
        var paml = p.getSkillLevel(poleArmMastery);
        var pabl = p.getSkillLevel(poleArmBooster);
        if (paml >= 1 && pabl >= 1) {
            p.changeSkillLevel(poleArmMastery, 0, 30);
            p.changeSkillLevel(poleArmBooster, 0, 30);
            p.setRemainingSp(p.getRemainingSp() + paml + pabl);
            p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
            cm.sendOk("gud 2 go fam");
            cm.dispose();
            return;
        } else {
            p.dropMessage("It doesn't look like you have Polearm Booster and Polearm Mastery.");
            cm.dispose();
            return;
        }
    }
    */

    /*
    if ("" + p.getName() === "Noether") {
        //for (var i = 0; i < 5; ++i) {
            p.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8810003), p.getPosition());
        //}
        p.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8810018), p.getPosition());
        p.getMap().killAllMonsters(true);
        cm.dispose();
        return;
    }
    */

    //p.setScpqFlag(true);
    if (mode === -1 || (mode === 0 && type === 4)) {
        cm.dispose();
        return;
    } else if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0 || status === 1) {
        status = 1;
        if (selection !== 1) {
            cm.sendSimple("Hey there, I'm the #dIntransigentMS Administrator#k! What would you like to ask about?\r\n\r\n#L0#I want to speak with Bomack about experience and death.#l\r\n#L1#I want to speak with Amos about quests, NX/voting, and changing my look.#l\r\n#L2#I want to speak with Karcasa about FM shops, defensive abilities, and fighting monsters.#l\r\n#L3#What commands are there in this game?#l\r\n#L4#I need help troubleshooting.#l\r\n#L6#I need to know the location or stats of a mob, NPC, or item.#l\r\n#L5#I need to ask/tell a GM something.#l\r\n#L10#I'd like to redeem an EXP boost.#l\r\n#L7#I'd like to view how much NX I have on my account.#l\r\n#L8#I'd like to use a Magic Seed to teleport between Ellinia and Leafre.#l\r\n#L11#I'd like to redeem my Christmas Present for a VIP item of my choice.#l\r\n#L9#I'd like to add points into a skill that won't let me add in points even though my master level for the skill is high enough.#l\r\n#L12#I need to claim item(s) I lost because my inventory was full.#l\r\n#L14#I want to get rid of some of my NX items.#l\r\n#L13#I need to be fixed.#l");
        } else {
            cm.dispose();
            return;
        }
    } else if (status === 2) {
        if (troubleshot) {
            cm.sendSimple("Select the problem you are experiencing:\r\n\r\n#L0#Whenever I exit the cash shop, I get sent back to the login screen with an error message, and can't log back in!#l\r\n#L1#Whenever I try to log in to the website, it tells me \"Wrong username or password\"!#l\r\n#L2#My problem is not listed above.#l");
        } else {
            troubleshot = false;
            if (unclaimed) {
                selection = 12;
            }
            switch (selection) {
                case 0:
                    cm.openNpc(9201061);
                    return;
                case 1:
                    cm.openNpc(9201045);
                    return;
                case 2:
                    cm.openNpc(2101013);
                    return;
                case 3:
                    cm.sendPrev("To get a list of commands, simply type #b@commands#k in the chat.\r\n\r\nIntransigentMS has many commands, and some are very versatile or may not be obvious as to their method of use; check out our guide here:\r\n\r\n#bhttp://intransigentms.boards.net/thread/27/guide-using-commands-intransigentms#k\r\n\r\nfor documentation on all commands.");
                    break;
                case 4:
                    cm.sendSimple("Select the problem you are experiencing:\r\n\r\n#L0#Whenever I exit the cash shop, I get sent back to the login screen with an error message, and can't log back in!#l\r\n#L1#Whenever I try to log in to the website, it tells me \"Wrong username or password\"!#l\r\n#L2#My problem is not listed above.#l");
                    troubleshot = true;
                    break;
                case 5:
                    cm.sendPrev("To contact a GM, simply type #b@gm [your message here]#k in the chat.");
                    break;
                case 6:
                    cm.sendPrev("If you need to know the location or stats of anything in the game, use #bbbb.hidden-street.net#k. This is 95% accurate and only item stats and skills stats may differ (due to customization of the server).\r\n\r\nIf you need to know the names of monsters within your level range, use #d@monstersinrange#k.\r\n\r\nIf you need to know who drops a certain item, use #d@whodrops#k.\r\n\r\nIf you need to know what items a monster drops, use #d@monsterdrops#k.");
                    break;
                case 7:
                    cm.sendPrev("Paypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
                    break;
                case 8:
                    if (cm.itemQuantity(4031346) >= 1) {
                        if (Math.floor(p.getMapId() / 1000000) === 101) {
                            cm.warp(240000000);
                            cm.gainItem(4031346, -1);
                            cm.dispose();
                            return;
                        } else if (Math.floor(p.getMapId() / 1000000) === 240) {
                            cm.warp(101000000);
                            cm.gainItem(4031346, -1);
                            cm.dispose();
                            return;
                        } else {
                            cm.sendPrev("You must be in an Ellinia map or a Leafre map to use #bMagic Seed#k.");
                        }
                    } else {
                        cm.sendPrev("It doesn't look like you have a #bMagic Seed#k.");
                    }
                    break;
                case 9:
                    var s = "";
                    if (p.getSkillLevel(taunt) < 30 && p.getJob().getId() === 412) {
                        skill = true;
                        s += "#L0#Taunt#l\r\n";
                    }
                    if (s !== "") {
                        cm.sendSimple("Select the skill you want to add points into:\r\n\r\n" + s);
                    } else {
                        cm.sendOk("It doesn't look like you have any skills that need to be raised.\r\n\r\nIf you think you do, please #b@gm#k it.");
                        cm.dispose();
                        return;
                    }
                    break;
                case 10:
                    if (cm.itemQuantity(5211000) > 0) {
                        cm.sendYesNo("Are you sure you'd like to activate your EXP boost now? Once you use it, it will be consumed and last for 2 hours real-time (i.e. including time logged off).");
                        expboost = true;
                    } else {
                        cm.sendOk("It doesn't look like you have an EXP boost.");
                        cm.dispose();
                        return;
                    }
                    break;
                case 11:
                    if (cm.itemQuantity(4031519) > 0) {
                        vip = true;
                        itemstring = "";
                        for (var i = 0; i < vipitems.length; ++i) {
                            itemstring += "#L" + i + "##i" + vipitems[i] + "##l\r\n";
                        }
                        cm.sendSimple("Select the item you would like:\r\n\r\n" + itemstring);
                    } else {
                        cm.sendOk("It doesn't look like you have a present for me.");
                        cm.dispose();
                        return;
                    }
                    break;
                case 12:
                    if (p.hasUnclaimedItems()) {
                        var item;
                        if (unclaimed) {
                            var successful = p.claimUnclaimedItem();
                            if (p.hasUnclaimedItems()) {
                                item = p.getLastUnclaimedItem();
                                if (successful) {
                                    cm.sendSimple("#bClaim successful.#k Click the item to reclaim it:\r\n\r\n#L0##i" + item.getItemId() + "#  (#b" + item.getQuantity() + "#k)#l");
                                } else {
                                    cm.sendSimple("#rClaim failed. Your inventory is probably still full.#k Click the item to reclaim it:\r\n\r\n#L0##i" + item.getItemId() + "#  (#b" + item.getQuantity() + "#k)#l");
                                }
                            } else {
                                cm.sendOk("It doesn't look like you have any more items to claim.");
                                cm.dispose();
                                return;
                            }
                        } else {
                            item = p.getLastUnclaimedItem();
                            cm.sendSimple("Click the item to reclaim it:\r\n\r\n#L0##i" + item.getItemId() + "#  (#b" + item.getQuantity() + "#k)#l");
                        }
                    } else {
                        cm.sendOk("It doesn't look like you have any more items to claim.");
                        cm.dispose();
                        return;
                    }
                    unclaimed = true;
                    status--;
                    break;
                    //cm.dispose();
                    //return;
                case 13:
                    // Hero's Will fix
                    var herosWill = herosWills.find(function(hw) {
                        return Math.floor(hw / 10000) === p.getJob().getId();
                    });
                    if (p.getSkillLevel(herosWill) > 5) {
                        var difference = 5 - p.getSkillLevel(herosWill);
                        p.changeSkillLevel(SkillFactory.getSkill(herosWill), 5, 5);
                        p.setRemainingSp(p.getRemainingSp() + difference);
                        p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
                        cm.sendOk("You have been compensated for #b" + difference + "#k skill points.");
                    } else {
                        cm.sendOk("It looks like your Hero's Will level is already 5 or less.");
                    }
                    cm.dispose();
                    return;
                case 14:
                    cashequiplist = "" + cm.cashEquipList();
                    if (cashequiplist.length < 1) {
                        cm.sendOk("It doesn't look like you've got any NX equips to get rid of.");
                        cm.dispose();
                        return;
                    } else {
                        cashdisposal = true;
                        cm.sendSimple("Select an NX item you'd like to get rid of:\r\n\r\n#L0#I'm done getting rid of stuff.#l\r\n\r\n" + cashequiplist);
                    }
                    break;
                default:
                    cm.dispose();
                    return;
            }
        }
    } else if (status === 3) {
        if (troubleshot) {
            switch(selection) {
                case 0:
                    cm.sendPrev("If, after this, you cannot log in (\"Account is already logged in or the server is under inspection\"), simply retry occasionally; the server takes a little bit to unstick your account, but it shouldn't take more than a minute or two.\r\n\r\nThis is a known bug which has no clear solution; if you know how to fix it, please contact me.");
                    break;
                case 1:
                    cm.sendPrev("Every time you make a login attempt, refresh the page (F5) to see if your attempt succeeded, regardless of whether or not the \"Wrong username or password\" prompt comes up.\r\n\r\nRemember that your account for the website and your in-game account are the same.");
                    break;
                case 2:
                    cm.sendPrev("Check the #dTroubleshooting#k section of the website (www.intransigentms.com) to see if your problem is there. If not, contact a GM.");
                    break;
                default:
                    cm.dispose();
                    return;
            }
        } else if (skill) {
            skillselect = selection;
            switch (skillselect) {
                case 0:
                    cm.sendGetNumber("How many points would you like to put into Taunt?:", 1, 1, p.getMasterLevelById(4121003) - p.getSkillLevel(taunt));
                    break;
                default:
                    cm.dispose();
                    return;
            }
        } else if (expboost) {
            cm.sendOk("There you go! Remember you can check how much time you have left by typing\r\n\r\n#d@expboostinfo#k\r\n\r\nin the chat.");
            var multi = 2;
            cm.gainItem(5211000, -1);
            var timeinsec = 60 * 60 * 2; // 2 hours
            p.activateExpBonus(timeinsec, multi);
            cm.dispose();
            return;
        } else if (vip) {
            var vipprize = vipitems[selection];
            cm.sendOk("Alright, here you go!:\r\n\r\n#i" + vipprize + "#");
            cm.gainItem(4031519, -1);
            cm.gainItem(vipprize, 1);
            cm.dispose();
            return;
        } else if (cashdisposal) {
            if (selection !== 0) {
                cm.gainItem(selection, -1);
                cashequiplist = "" + cm.cashEquipList();
                if (cashequiplist.length > 0) {
                    cm.sendSimple("Select an NX item you'd like to get rid of:\r\n\r\n#L0#I'm done getting rid of stuff.#l\r\n\r\n" + cashequiplist);
                    status--;
                } else {
                    cm.dispose();
                    return;
                }
            } else {
                cm.dispose();
                return;
            }
        } else {
            cm.dispose();
            return;
        }
    } else if (status === 4) {
        if (skill) {
            switch (skillselect) {
                case 0:
                    if (selection > 0 && selection <= p.getRemainingSp() && p.getSkillLevel(taunt) + selection <= p.getMasterLevelById(4121003)) {
                        p.setRemainingSp(p.getRemainingSp() - selection);
                        p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
                        p.changeSkillLevel(taunt, p.getSkillLevel(taunt) + selection, p.getMasterLevelById(4121003));
                    }
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
        } else {
            cm.dispose();
            return;
        }
    }
}
