/*
 * Fiona
 * ID: 9201095
 *
 * Virtual skill NPC
 */

// Array.find() polyfill
/* jshint ignore:start */
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(a){"use strict";if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var e,b=Object(this),c=b.length>>>0,d=arguments[1],f=0;f<c;f++)if(e=b[f],a.call(d,e,f,b))return e}});
/* jshint ignore:end */

var MapleJob     = Java.type("net.sf.odinms.client.MapleJob");
var SkillFactory = Java.type("net.sf.odinms.client.SkillFactory");
var MapleStat    = Java.type("net.sf.odinms.client.MapleStat");

var status;
/*
 * Format:
 *
 * jobId: [[skillId, maxLevel, SP per level, is active, prereq], [...]...]
 */
var skills =
{
    230: [[1200001, 12, 1, false, null]],
    232: [[1221002, 20, 3, true,  null]],
    511: [[4111006, 20, 1, true,  function(p) {
        return p.getInt() >= 450;
    }]]
};
var keyNums =
{
    "`": 1,
    "~": 1,
    "1": 2,
    "!": 2,
    "2": 3,
    "@": 3,
    "3": 4,
    "#": 4,
    "4": 5,
    "$": 5,
    "5": 6,
    "%": 6,
    "6": 7,
    "^": 7,
    "7": 8,
    "&": 8,
    "8": 9,
    "*": 9,
    "9": 10,
    "(": 10,
    "0": 11,
    ")": 11,
    "-": 12,
    "_": 12,
    "=": 13,
    "+": 13,
    "q": 16,
    "w": 17,
    "e": 18,
    "r": 19,
    "t": 20,
    "y": 21,
    "u": 22,
    "i": 23,
    "o": 24,
    "p": 25,
    "[": 26,
    "{": 26,
    "]": 27,
    "}": 27,
    "\\": 28,
    "|": 28,
    "ctrl": 29,
    "control": 29,
    "a": 30,
    "s": 31,
    "d": 32,
    "f": 33,
    "g": 34,
    "h": 35,
    "j": 36,
    "k": 37,
    "l": 38,
    ";": 39,
    ":": 39,
    "'": 40,
    "\"": 40,
    "shft": 42,
    "shift": 42,
    "z": 44,
    "x": 45,
    "c": 46,
    "v": 47,
    "b": 48,
    "n": 49,
    "m": 50,
    ",": 51,
    "<": 51,
    ".": 52,
    ">": 52,
    "alt": 56,
    "spc": 57,
    "spce": 57,
    "space": 57,
    "hm": 71,
    "home": 71,
    "pup": 73,
    "pgup": 73,
    "pageup": 73,
    "page up": 73,
    "end": 79,
    "pdn": 81,
    "pgdn": 81,
    "pagedn": 81,
    "pagedown": 81,
    "page down": 81,
    "ins": 82,
    "insert": 82,
    "del": 83,
    "delete": 83,
};
var retryBind = false;
var candidates, branch, skill, raise, activeCandidates;

function start() {
    var p = cm.getPlayer();
    candidates = Object.keys(skills)
                       .filter(function(jobId) {
                           return p.getJob().isA(MapleJob.getById(jobId));
                       })
                       .map(function(jobId) {
                           return skills[jobId];
                       })
                       .reduce(function(accu, l) {
                           return accu.concat(l);
                       }, [])
                       .filter(function(skill) {
                           return skill[4] === null ? true : skill[4](p);
                       });
    if (p.getJob().isA(MapleJob.getById(510)) && p.getSkillLevel(4000000) > 0) {
        p.setRemainingSp(p.getRemainingSp() + p.getSkillLevel(4000000));
        p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
        p.changeSkillLevel(
            SkillFactory.getSkill(4000000),
            0,
            p.getMasterLevel(SkillFactory.getSkill(4000000))
        );
    }
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var curSkillLevel, skillString;
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 0 && (status <= 0 || type === 4)) {
        cm.dispose();
        return;
    }
    if (mode >= 1) {
        status++;
    } else {
        status--;
    }
    switch (status) {
        case 0:
            cm.sendSimple("Hey. So you wanna use #dvirtual skills#k, huh?\r\n\r\n#L0#I'd like to spend/remove skill points in virtual skills.#l\r\n#L1#I'd like to view the virtual skills I have.#l\r\n#L3#I need to put an active virtual skill onto a keybind.#l\r\n#L2#What are virtual skills and how do I get them?#l");
            break;
        case 1:
            branch = selection;
            switch (selection) {
                case 0:
                    if (candidates.length > 0) {
                        skillString = candidates.map(function(s) {
                            return "\r\n#L" +
                                   s[0] +
                                   "##s" +
                                   s[0] +
                                   "##l\r\n\r\n#bCurrent level: " +
                                   p.getSkillLevel(SkillFactory.getSkill(s[0])) +
                                   "#k\r\n#dMax level: " +
                                   s[1] +
                                   "#k\r\n#rSP needed per rank: " +
                                   s[2] +
                                   "#k";
                        })
                        .join("");
                        cm.sendSimple("Alright, then. Pick yer poison:\r\n" + skillString);
                    } else {
                        cm.sendPrev("Sorry, it doesn't look like your class is eligible for any virtual skills, or you're missing the pre-requisites for all of them.");
                    }
                    break;
                case 1:
                    if (candidates.length > 0) {
                        skillString = candidates.map(function(s) {
                            return "\r\n#s" +
                                   s[0] +
                                   "#\r\n\r\n#e#q" +
                                   s[0] +
                                   "##n\r\n#bCurrent level: " +
                                   p.getSkillLevel(SkillFactory.getSkill(s[0])) +
                                   "#k\r\n#dMax level: " +
                                   s[1] +
                                   "#k\r\n#rSP needed per rank: " +
                                   s[2] +
                                   "#k";
                        })
                        .join("");
                        cm.sendPrev(skillString);
                    } else {
                        cm.sendPrev("Sorry, it doesn't look like your class is eligible for any virtual skills.");
                    }
                    break;
                case 2:
                    var classList = Object.keys(skills)
                                          .map(function(jobId) {
                                              return "\r\n\t  #e" +
                                                     MapleJob.getJobName(jobId) +
                                                     "#n";
                                          })
                                          .join("");
                    cm.sendPrev("#dVirtual skills#k are skills that people can put their #bskill points#k into without having to be part of the class/job associated with that skill.\r\n\r\nThe only way to put points into (or take points out of) virtual skills is to #etalk to me, #rFiona#k#n.\r\n\r\nThe only classes that can obtain virtual skills (as of now) are:\r\n" + classList);
                    break;
                case 3:
                    activeCandidates = candidates.filter(function(s) {
                        return s[3] && p.getSkillLevel(SkillFactory.getSkill(s[0])) > 0;
                    });
                    if (activeCandidates.length > 0) {
                        skillString = activeCandidates.map(function(s) {
                            return "\r\n#L" +
                                   s[0] +
                                   "##s" +
                                   s[0] +
                                   "#\r\n\r\n#e#q" +
                                   s[0] +
                                   "##n\r\n#bCurrent level: " +
                                   p.getSkillLevel(SkillFactory.getSkill(s[0])) +
                                   "#k\r\n#dMax level: " +
                                   s[1] +
                                   "#k\r\n#rSP needed per rank: " +
                                   s[2] +
                                   "#k#l";
                        })
                        .join("");
                        cm.sendSimple(skillString);
                    } else {
                        cm.sendPrev("Sorry, it doesn't look like you have any #eactive#n virtual skills.");
                    }
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 2:
            switch (branch) {
                case 0:
                    skill = candidates.find(function(s) { return s[0] === selection; });
                    if (!skill) {
                        cm.dispose();
                        return;
                    }
                    cm.sendSimple("Would you like to #graise#k or #rlower#k your level in the #d#q" + skill[0] + "##k skill?\r\n\r\n#L0#Raise.#l\r\n#L1#Lower.#l");
                    break;
                case 3:
                    if (!retryBind) skill = activeCandidates.find(function(s) { return s[0] === selection; });
                    if (!skill) {
                        cm.dispose();
                        return;
                    }
                    cm.sendGetText("What key would you like to bind  #s" + skill[0] + "#  to?");
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 3:
            switch (branch) {
                case 0:
                    raise = selection === 0;
                    curSkillLevel = p.getSkillLevel(SkillFactory.getSkill(skill[0]));
                    switch (selection) {
                        case 0:
                            if (curSkillLevel < skill[1] && p.getRemainingSp() >= skill[2]) {
                                cm.sendGetNumber(
                                    "By how much wouldja like to raise it?",
                                    1,
                                    1,
                                    Math.min(
                                        skill[1] - curSkillLevel,
                                        Math.floor(p.getRemainingSp() / skill[2])
                                    )
                                );
                            } else {
                                cm.sendOk("Looks like ya don't have enough skill points, or ya already maxed that one out.");
                                cm.dispose();
                                return;
                            }
                            break;
                        case 1:
                            if (curSkillLevel > 0) {
                                cm.sendGetNumber("By how much would you like to lower it?\r\n\r\nKeep in mind you're gonna need #e#ra single one of the appropriate SP Reset items#k#n for #beach#k level you lower this skill by.", 1, 1, curSkillLevel);
                            } else {
                                cm.sendOk("Uhh... you don't have any points in the skill that you can take out.");
                                cm.dispose();
                                return;
                            }
                            break;
                        default:
                            cm.dispose();
                            return;
                    }
                    break;
                case 3:
                    var keyNum = keyNums[cm.getText().toLowerCase()];
                    if (keyNum !== undefined) {
                        cm.changeKeyBinding(keyNum, 1, skill[0]);
                        p.sendKeymap();
                        cm.sendOk("You're all set, kiddo!");
                        cm.dispose();
                        return;
                    } else {
                        cm.sendPrev("That's not a key I can bind your skill to.");
                        retryBind = true;
                    }
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 4:
            switch (branch) {
                case 0:
                    curSkillLevel = p.getSkillLevel(SkillFactory.getSkill(skill[0]));
                    if (raise) {
                        if (curSkillLevel + selection <= skill[1] && selection * skill[2] <= p.getRemainingSp()) {
                            p.setRemainingSp(p.getRemainingSp() - selection * skill[2]);
                            p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
                            p.changeSkillLevel(
                                SkillFactory.getSkill(skill[0]),
                                curSkillLevel + selection,
                                p.getMasterLevel(SkillFactory.getSkill(skill[0]))
                            );
                            cm.sendOk("Looks like you're all set, kiddo.\r\n\r\n#s" + skill[0] + "#\r\n\r\n#bLevel: " + p.getSkillLevel(SkillFactory.getSkill(skill[0])) + "#k");
                        } else {
                            cm.sendOk("Sorry, kid. Can't put that many points in. Make sure the thing's not already maxed, and ya have enough skill points to raise it.");
                        }
                    } else {
                        var spReset = 5050000;
                        var skillJob;
                        if (Math.floor(skill[0] / 10000) % 100 === 0) {
                            skillJob = 1;
                        } else {
                            skillJob = Math.floor(skill[0] / 10000) % 10 + 2;
                        }
                        spReset += skillJob;
                        if (curSkillLevel - selection >= 0 && cm.itemQuantity(spReset) >= selection) {
                            cm.gainItem(spReset, -selection);
                            p.changeSkillLevel(
                                SkillFactory.getSkill(skill[0]),
                                curSkillLevel - selection,
                                p.getMasterLevel(SkillFactory.getSkill(skill[0]))
                            );
                            p.setRemainingSp(p.getRemainingSp() + selection * skill[2]);
                            p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
                            cm.sendOk("Looks like you're all set, kiddo.\r\n\r\n#s" + skill[0] + "#\r\n\r\n#bLevel: " + p.getSkillLevel(SkillFactory.getSkill(skill[0])) + "#k");
                        } else {
                            cm.sendOk("It looks like ya dont have enough of these bad boys:\r\n\r\n#i" + spReset + "#\r\n\r\n...or just don't have enough levels in that skill to take out.");
                        }
                    }
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            break;
        default:
            cm.dispose();
            return;
    }
}
