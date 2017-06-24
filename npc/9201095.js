/*
 * Fiona
 * ID: 9201095
 *
 * Virtual skill NPC
 */

var MapleCharacter = Java.type("net.sf.odinms.client.MapleCharacter");
var MapleJob       = Java.type("net.sf.odinms.client.MapleJob");
var MapleStat      = Java.type("net.sf.odinms.client.MapleStat");
var SkillFactory   = Java.type("net.sf.odinms.client.SkillFactory");

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
    300: [[4001334, 20, 1, true,  null]],
    310: [[1300000, 20, 1, false, null], [4200000, 20, 1, false, null],
          [1301004, 20, 1, true,  null], [4201002, 20, 1, true,  null],
          [1311003, 30, 1, true,  null]],
    311: [[4001003, 20, 1, true,  function(p) {
        return p.getStr() >= 360;
    }],   [4220002, 30, 1, false, function(p) {
        return p.getStr() >= 360;
    }],   [1310000, 20, 1, false, function(p) {
        return p.getStr() >= 360;
    }]],
    312: [[4220005, 30, 1, false, null], [1311001, 16, 1, true,  null],
          [4211002, 30, 1, true,  null]],
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
var candidates, branch, skill, raise,
    activeCandidates, resetDirection,
    skillResetJob, fromSkill, transferSp,
    base;

var isNonvirtualSpTarget = function(p, sid) {
    var s = SkillFactory.getSkill(sid);
    var maxLevel =
        s.isFourthJob() ?
            Math.min(p.getMasterLevel(s), s.getMaxLevel()) :
            s.getMaxLevel();
    return Math.floor(sid / 10000) === p.getJob().getId() &&
           p.canLearnSkill(s) &&
           p.getSkillLevel(s) < maxLevel;
};

function start() {
    var p = cm.getPlayer();
    candidates =
        Object
            .keys(skills)
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
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var curSkillLevel, skillString, spReset,
        s, maxLevel;
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
            cm.sendSimple("Hey. So you wanna use #dvirtual skills#k, huh?\r\n\r\n#L0#I'd like to spend/remove skill points in virtual skills.#l\r\n#L1#I'd like to view the virtual skills I have.#l\r\n#L3#I need to put an active virtual skill onto a keybind.#l\r\n#L2#What are virtual skills and how do I get them?#l\r\n#L4#I want to swap SP between my skills and virtual skills, using SP resets.#l\r\n#L5#I want to spend SP on my non-virtual skills, but I can't!#l");
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
                                   p.getSkillLevel(s[0]) +
                                   "#k\r\n#dMax level: " +
                                   s[1] +
                                   "#k\r\n#rSP needed per rank: " +
                                   s[2] +
                                   "#k";
                        })
                        .join("\r\n");
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
                                   "#\r\n#e#q" +
                                   s[0] +
                                   "##n\r\n#bCurrent level: " +
                                   p.getSkillLevel(s[0]) +
                                   "#k\r\n#dMax level: " +
                                   s[1] +
                                   "#k\r\n#rSP needed per rank: " +
                                   s[2] +
                                   "#k";
                        })
                        .join("\r\n");
                        cm.sendPrev(skillString);
                    } else {
                        cm.sendPrev("Sorry, it doesn't look like your class is eligible for any virtual skills.");
                    }
                    break;
                case 2:
                    var classList =
                        Object
                            .keys(skills)
                            .map(function(jobId) {
                                return "\r\n\t  #e" +
                                       MapleJob.getJobName(jobId) +
                                       "#n";
                            })
                            .join("");
                    cm.sendPrev("#dVirtual skills#k are skills that people can put their #bskill points#k\r\ninto without having to be part of the class/job associated with that skill.\r\n\r\nThe only way to put points into (or take points out of) virtual skills is to #etalk to me, #rFiona#k#n.\r\n\r\nThe only classes that can obtain virtual skills (as of now) are:\r\n" + classList);
                    break;
                case 3:
                    activeCandidates = candidates.filter(function(s) {
                        return s[3] && p.getSkillLevel(s[0]) > 0;
                    });
                    if (activeCandidates.length > 0) {
                        skillString = activeCandidates.map(function(s) {
                            return "\r\n#L" +
                                   s[0] +
                                   "##s" +
                                   s[0] +
                                   "#\r\n#e#q" +
                                   s[0] +
                                   "##n\r\n#bCurrent level: " +
                                   p.getSkillLevel(s[0]) +
                                   "#k\r\n#dMax level: " +
                                   s[1] +
                                   "#k\r\n#rSP needed per rank: " +
                                   s[2] +
                                   "#k#l";
                        })
                        .join("\r\n");
                        cm.sendSimple(skillString);
                    } else {
                        cm.sendPrev("Sorry, it doesn't look like you have any #eactive#n virtual skills.");
                    }
                    break;
                case 4:
                    cm.sendSimple("#L0#I want to reset skill points out of a non-virtual skill into a virtual one.#l\r\n#L1#I want to reset skill points out of a virtual skill into a non-virtual one.#l");
                    break;
                case 5:
                    var canAccessAnyVirtualSkills =
                        Object
                            .keys(skills)
                            .some(function(jobId) {
                                return p.getJob().isA(MapleJob.getById(jobId));
                            });
                    if (!canAccessAnyVirtualSkills) {
                        cm.sendOk("It doesn't look like you even have any virtual skills...");
                        cm.dispose();
                        return;
                    }
                    var nonvirtualSkillStr =
                        jsArray(MapleCharacter.SKILL_IDS)
                            .filter(function(sid) {
                                return isNonvirtualSpTarget(p, sid) &&
                                       p.canLearnSkill(sid);
                            })
                            .map(function(sid) {
                                var s = SkillFactory.getSkill(sid);
                                var maxLevel =
                                    s.isFourthJob() ?
                                        Math.min(p.getMasterLevel(s), s.getMaxLevel()) :
                                        s.getMaxLevel();
                                return "\r\n#L" +
                                       sid +
                                       "##s" +
                                       sid +
                                       "#\r\n#e#q" +
                                       sid +
                                       "##n\r\n#bCurrent level: " +
                                       p.getSkillLevel(s) +
                                       "#k\r\n#dMax level: " +
                                       maxLevel +
                                       "#k#l";
                            })
                            .join("\r\n");
                    cm.sendSimple("Choose the skill that you want to spend SP on:\r\n" + nonvirtualSkillStr);
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
                case 4:
                    if (selection < 0) {
                        cm.dispose();
                        return;
                    }
                    resetDirection = selection;
                    var job = p.getJob().getAdvancement();
                    if (job === 0) {
                        cm.sendOk("Beginners don't have skills, silly!");
                        cm.dispose();
                        return;
                    }
                    var selectStr =
                        range(1, job + 1)
                            .map(function(j) {
                                return "#L" + j + "#Job " + j + " skills#l";
                            })
                            .join("\r\n");
                    cm.sendSimple("Which job would you like to reset skills in?:\r\n\r\n" + selectStr);
                    break;
                case 5:
                    if (!isNonvirtualSpTarget(p, selection) || !p.canLearnSkill(selection)) {
                        cm.sendOk("It doesn't look like you can put points into that skill.");
                        cm.dispose();
                        return;
                    }
                    skill = selection;
                    s = SkillFactory.getSkill(skill);
                    maxLevel =
                        s.isFourthJob() ?
                            Math.min(p.getMasterLevel(s), s.getMaxLevel()) :
                            s.getMaxLevel();
                    cm.sendGetNumber("How many SP would you like to put into #d" + SkillFactory.getSkillName(skill) + "#k?\r\n", 1, 1, Math.min(maxLevel - p.getSkillLevel(s), p.getRemainingSp()));
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
                    curSkillLevel = p.getSkillLevel(skill[0]);
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
                case 4:
                    if (selection < 0) {
                        cm.dispose();
                        return;
                    }
                    skillResetJob = selection;
                    var skillSelectStr =
                        p.getSkills()
                         .entrySet()
                         .stream()
                         .filter(function(e) {
                             var id = e.getKey().getId();
                             var skillJob = MapleJob.getById(Math.floor(id / 10000));
                             var virtual = !!resetDirection;
                             return id >= 1000000 &&
                                    skillJob.getAdvancement() === selection &&
                                    e.getValue().skillevel > 0 &&
                                    p.getJob().isA(skillJob) !== virtual;
                         })
                         .map(function(e) {
                             var id = e.getKey().getId();
                             return "#L" +
                                    id +
                                    "##s" +
                                    id +
                                    "#\r\n\r\n#q" +
                                    id +
                                    "#\r\nCurrent level: " +
                                    p.getSkillLevel(id) +
                                    "\r\nMax level: " +
                                    SkillFactory.getSkill(id).getMaxLevel() +
                                    "#l";
                         })
                         .reduce("", function(accu, s) {
                             return accu + "\r\n" + s;
                         });
                    cm.sendSimple("Pick a skill to remove levels from:\r\n" + skillSelectStr);
                    break;
                case 5:
                    s = SkillFactory.getSkill(skill);
                    if (!isNonvirtualSpTarget(p, skill) || !p.canLearnSkill(s)) {
                        cm.sendOk("It doesn't look like you can put points into that skill.");
                        cm.dispose();
                        return;
                    }
                    maxLevel =
                        s.isFourthJob() ?
                            Math.min(p.getMasterLevel(s), s.getMaxLevel()) :
                            s.getMaxLevel();
                    if (p.getSkillLevel(s) + selection > maxLevel || selection > p.getRemainingSp) {
                        cm.sendOk("You can't put that many points in #s" + skill + "#.");
                        cm.dispose();
                        return;
                    }
                    p.setRemainingSp(p.getRemainingSp() - selection);
                    p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
                    p.changeSkillLevel(
                        s,
                        p.getSkillLevel(s) + selection,
                        p.getMasterLevel(s)
                    );
                    cm.sendOk("Looks like you're all set, kiddo.\r\n\r\n#s" + skill + "#\r\n\r\n#bLevel: " + p.getSkillLevel(s) + "#k");
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 4:
            switch (branch) {
                case 0:
                    curSkillLevel = p.getSkillLevel(skill[0]);
                    if (raise) {
                        if (curSkillLevel + selection <= skill[1] && selection * skill[2] <= p.getRemainingSp()) {
                            p.setRemainingSp(p.getRemainingSp() - selection * skill[2]);
                            p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
                            p.changeSkillLevel(
                                SkillFactory.getSkill(skill[0]),
                                curSkillLevel + selection,
                                p.getMasterLevelById(skill[0])
                            );
                            cm.sendOk("Looks like you're all set, kiddo.\r\n\r\n#s" + skill[0] + "#\r\n\r\n#bLevel: " + p.getSkillLevel(skill[0]) + "#k");
                        } else {
                            cm.sendOk("Sorry, kid. Can't put that many points in. Make sure the thing's not already maxed, and ya have enough skill points to raise it.");
                        }
                    } else {
                        spReset = 5050000;
                        var skillJob = MapleJob.getById(Math.floor(skill[0] / 10000)).getAdvancement();
                        spReset += skillJob;
                        if (curSkillLevel - selection >= 0 && cm.itemQuantity(spReset) >= selection) {
                            cm.gainItem(spReset, -selection);
                            p.changeSkillLevel(
                                SkillFactory.getSkill(skill[0]),
                                curSkillLevel - selection,
                                p.getMasterLevelById(skill[0])
                            );
                            p.setRemainingSp(p.getRemainingSp() + selection * skill[2]);
                            p.updateSingleStat(MapleStat.AVAILABLESP, p.getRemainingSp());
                            cm.sendOk("Looks like you're all set, kiddo.\r\n\r\n#s" + skill[0] + "#\r\n\r\n#bLevel: " + p.getSkillLevel(skill[0]) + "#k");
                        } else {
                            cm.sendOk("It looks like ya dont have enough of these bad boys:\r\n\r\n#i" + spReset + "#\r\n\r\n...or just don't have enough levels in that skill to take out.");
                        }
                    }
                    cm.dispose();
                    return;
                case 4:
                    if (selection <= 0) {
                        cm.dispose();
                        return;
                    }
                    fromSkill = selection;
                    base = 1;
                    if (resetDirection === 1) {
                        var fs = candidates.find(function(c) {
                            return selection === c[0];
                        });
                        if (!fs) {
                            cm.sendOk("It doesn't look like you have access to that virtual skill.");
                            cm.dispose();
                            return;
                        }
                        base = fs[2];
                    }
                    cm.sendGetNumber("How many points would you like to remove from #e#q" + selection + "##n?\r\n", base, base, p.getSkillLevel(selection) * base);
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 5:
            switch (branch) {
                case 4:
                    if (selection < 0) {
                        cm.dispose();
                        return;
                    }
                    if (base > 1 && selection % base !== 0) {
                        cm.sendOk("Sorry, but the number of points you remove must be a multiple of the number of SP points required per level of the skill!");
                        cm.dispose();
                        return;
                    }
                    transferSp = selection;
                    var toSelectStr;
                    if (resetDirection === 0) { // non-virtual => virtual
                        toSelectStr =
                            candidates
                                .filter(function(c) {
                                    var skillJob = MapleJob.getById(Math.floor(c[0] / 10000));
                                    var curLv = p.getSkillLevel(c[0]);
                                    return curLv + Math.floor(selection / c[2]) <= c[1] &&
                                           skillJob.getAdvancement() === skillResetJob;
                                })
                                .map(function(c) {
                                    return "\r\n#L" +
                                           c[0] +
                                           "##s" +
                                           c[0] +
                                           "#\r\n#q" +
                                           c[0] +
                                           "#\r\nCurrent level: " +
                                           p.getSkillLevel(c[0]) +
                                           "\r\nMax level: " +
                                           c[1] +
                                           "\r\nSP per level: " +
                                           c[2] +
                                           "#l";
                                })
                                .join("\r\n");
                    } else {
                        toSelectStr =
                            jsArray(MapleCharacter.SKILL_IDS)
                                .filter(function(id) {
                                    var skillJob = MapleJob.getById(Math.floor(id / 10000));
                                    var skill = SkillFactory.getSkill(id);
                                    return id >= 1000000 &&
                                           skillJob.getAdvancement() === skillResetJob &&
                                           p.getSkillLevel(skill) + selection <= skill.getMaxLevel() &&
                                           p.getJob().isA(skillJob) &&
                                           p.canLearnSkill(skill);
                                })
                                .map(function(id) {
                                    return "#L" +
                                           id +
                                           "##s" +
                                           id +
                                           "#\r\n#q" +
                                           id +
                                           "#\r\nCurrent level: " +
                                           p.getSkillLevel(id) +
                                           "\r\nMax level: " +
                                           SkillFactory.getSkill(id).getMaxLevel() +
                                           "#l\r\n";
                                })
                                .reduce(function(accu, s) {
                                    return accu + "\r\n" + s;
                                }, "");
                    }
                    cm.sendSimple("Pick a skill to add levels to:\r\n" + toSelectStr);
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 6:
            switch (branch) {
                case 4:
                    if (selection < 0) {
                        cm.dispose();
                        return;
                    }
                    var vs, errorMsg;
                    spReset = 5050000 + skillResetJob;
                    if (resetDirection === 0) { // non-virtual => virtual
                        vs = candidates.find(function(c) {
                            return selection === c[0];
                        });
                        if (p.getSkillLevel(fromSkill) < transferSp) {
                            errorMsg = "Hmmm... it doesn't look like you have enough points in the first skill to take that many SP out of it.";
                        } else if (!p.getJob().isA(MapleJob.getById(Math.floor(fromSkill / 10000)))) {
                            errorMsg = "Hmmm... it looks like the skill you're trying to remove SP from is virtual.";
                        } else if (!vs) {
                            errorMsg = "Hmmm... it looks like the skill you're trying to add levels to isn't virtual.";
                        } else if (transferSp % vs[2] !== 0) {
                            errorMsg = "Uh oh. The number of SP you're trying to put into that virtual skill isn't a multiple of the SP required per level of the skill.";
                        } else if ((p.getSkillLevel(selection) + Math.floor(transferSp / vs[2])) > vs[1]) {
                            errorMsg = "Uh oh. The number of SP you're trying to put into that virtual skill would bring it above maximum level.";
                        }
                    } else if (resetDirection === 1) { // virtual => non-virtual
                        vs = candidates.find(function(c) {
                            return fromSkill === c[0];
                        });
                        if (!vs) {
                            errorMsg = "Hmmm... it looks like the skill you're trying to remove SP from isn't virtual.";
                        } else if (transferSp % vs[2] !== 0) {
                            errorMsg = "Uh oh. The number of SP you're trying to take out of that virtual skill isn't a multiple of the SP required per level of the skill.";
                        } else if (p.getSkillLevel(fromSkill) * vs[2] < transferSp) {
                            errorMsg = "Hmmm... it doesn't look like you have enough points in the first skill to take that many SP out of it.";
                        } else if (!p.getJob().isA(MapleJob.getById(Math.floor(selection / 10000)))) {
                            errorMsg = "Hmmm... it looks like the skill you're trying to add levels to is virtual.";
                        } else if (p.getSkillLevel(selection) + transferSp > SkillFactory.getSkill(selection).getMaxLevel()) {
                            errorMsg = "Uh oh. The number of SP you're trying to put into that skill would bring it above maximum level.";
                        } else if (!p.canLearnSkill(selection)) {
                            errorMsg = "Hmmm... it doesn't look like you can put points into that skill yet.";
                        }
                    }
                    if (errorMsg) {
                        cm.sendOk(errorMsg);
                        cm.dispose();
                        return;
                    } else if (cm.itemQuantity(spReset) < transferSp) {
                        cm.sendOk("Hmmm... looks like you don't have enough of these guys:\r\n\r\n#i" + spReset + "#  #ex" + transferSp + "#n");
                        cm.dispose();
                        return;
                    }
                    cm.gainItem(spReset, -transferSp);
                    if (resetDirection === 0) { // non-virtual => virtual
                        p.changeSkillLevel(fromSkill, p.getSkillLevel(fromSkill) - transferSp, p.getMasterLevelById(fromSkill));
                        p.changeSkillLevel(selection, p.getSkillLevel(selection) + Math.floor(transferSp / vs[2]), p.getMasterLevelById(selection));
                    } else if (resetDirection === 1) { // virtual => non-virtual
                        p.changeSkillLevel(fromSkill, p.getSkillLevel(fromSkill) - Math.floor(transferSp / vs[2]), p.getMasterLevelById(fromSkill));
                        p.changeSkillLevel(selection, p.getSkillLevel(selection) + transferSp, p.getMasterLevelById(selection));
                    }
                    cm.sendOk(
                        "Looks like you're all set, kid.\r\n\r\n#s" +
                            fromSkill +
                            "#\r\n\r\n#bLevel: " +
                            p.getSkillLevel(fromSkill) +
                            "#k\r\n\r\n#s" +
                            selection +
                            "#\r\n\r\n#bLevel: " +
                            p.getSkillLevel(selection) +
                            "#k"
                    );
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
