/*
 * Legor
 * 4th job archer instructor
 *
 * ID: 2081300
 */

var status;
var ids = [4000, 4001, 4002, 4003, 4004];
var skills =
[
    [
        [1121000, 20], [1221000, 20], [1321000, 20], [2121000, 20],
        [2221000, 20], [2321000, 20], [3121000, 20], [3221000, 20],
        [4121000, 20], [4221000, 20], [5121000, 20], [5221000, 20]
    ],
    [
        [3121002, 20], [3221002, 20], [2121004, 20], [2221004, 20],
        [2321004, 20], [5121003, 20], [5220001, 30], [4120002, 30],
        [4220002, 30], [1121002, 30], [1221002, 30], [1321002, 30]
    ],
    [
        [3121008, 20], [3221002, 30], [2121004, 30], [2221004, 30],
        [2321004, 30], [5121010, 20], [5220001, 30], [4121006, 20],
        [4221006, 20], [1120004, 30], [1220005, 30], [1320005, 30]
    ],
    [
        [3121008, 30], [2321005, 30], [5121010, 30], [4121006, 30],
        [4221006, 30], [1320006, 20], [1220006, 30], [1120005, 30]
    ],
    [
        [1320006, 30], [1221004, 20], [1121010, 20]
    ]
];
var maplewarrior =
[
    [1121000, 30], [1221000, 30], [1321000, 30], [2121000, 30],
    [2221000, 30], [2321000, 30], [3121000, 30], [3221000, 30],
    [4121000, 30], [4221000, 30], [5121000, 30], [5221000, 30]
];
var qualifies, reward, idon;

function contains(a, o) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] === o) {
            return true;
        }
    }
    return false;
}

function start() {
    idon = ids[0] + cm.getBuffStory();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i, rewards;
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (p.getLevel() < 120) {
        cm.sendOk("Come back to me when you are much stronger.");
        cm.dispose();
        return;
    } else if (p.getJob().getId() % 10 !== 2) {
        cm.sendOk("If you are looking to make your fourth job advancement, please talk to your instructor in #bVictoria Island#k.");
        cm.dispose();
        return;
    }
    if (!cm.onQuest()) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk("Bye, then.");
                cm.dispose();
                return;
            } else if (contains(ids, idon)) {
                rewards = skills[idon - ids[0]];
                var hasquest = false;
                for (i = 0; i < rewards.length; ++i) {
                    if (Math.floor(rewards[i][0] / 10000) === p.getJob().getId()) {
                        hasquest = true;
                        break;
                    }
                }
                if (hasquest) {
                    cm.sendSimple(cm.selectQuest(idon, "I can train you to bolster yourself, and your party members."));
                } else {
                    cm.sendOk("Your training with me is finished. You are an apprentice to no one now.");
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("#enods#n");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("Fine.");
                cm.dispose();
                return;
            } else {
                cm.sendAcceptDecline(p.getCQuest().loadInfo(idon));
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("Ok.");
                cm.dispose();
                return;
            }
            cm.startCQuest(idon);
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(idon)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + p.getCQuest().getTitle() + cm.randomText(5));
        } else if (status === 1) {
            cm.startCQuest(0);
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(idon) && cm.canComplete()) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(idon, "Well what have we here?"));
        } else if (status === 1) {
            rewards = skills[idon - ids[0]];
            for (i = 0; i < rewards.length; ++i) {
                if (Math.floor(rewards[i][0] / 10000) === p.getJob().getId()) {
                    reward = rewards[i];
                    break;
                }
            }
            if (p.getMasterLevelById(reward[0]) >= reward[1] - 10) {
                qualifies = true;
            } else {
                qualifies = false;
            }
            if (qualifies) {
                var extra = "";
                if (idon === 4002) {
                    extra = "#e, #rMaple Warrior#k #b30#k#n";
                } else if (idon === 4004) {
                    if (reward[0] === 1221004) {
                        extra = "#e, #rHoly Charge: Sword#k #b20#k#n";
                    } else if (reward[0] === 1121010) {
                        extra = "#e, #rEnrage#k #b30#k#n";
                    }
                }
                cm.sendOk(cm.showReward("Excellent. Excercise this newfound strength wisely.\r\n\r\n#eNew skill master level achieved: #r" + cm.getSkillNameById(reward[0]) + "#k #b" + reward[1] + "#k#n" + extra));
            } else {
                cm.sendOk("You don't have the requisite skill master levels to complete this quest! Come back to me when you've got a master level of at least #b" + (reward[1] - 10) + "#k in the #r" + cm.getSkillNameById(reward[0]) + "#k skill.");
                cm.dispose();
                return;
            }
        } else if (status === 2) {
            p.setMasterLevel(reward[0], reward[1]);
            if (idon === 4002) {
                for (i = 0; i < maplewarrior.length; ++i) {
                    if (Math.floor(maplewarrior[i][0] / 10000) === p.getJob().getId()) {
                        p.setMasterLevel(maplewarrior[i][0], maplewarrior[i][1]);
                        break;
                    }
                }
            } else if (idon === 4004) {
                if (reward[0] === 1221004) {
                    p.setMasterLevel(reward[0] - 1, reward[1]);
                } else if (reward[0] === 1121010) {
                    p.setMasterLevel(reward[0], reward[1] + 10);
                }
            }
            cm.fourthRewardPlayer(0, 1);
            p.sendHint(cm.randomText(6));
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(idon) && !cm.canComplete()) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(idon, "I can make you... so much more powerful."));
            }
        } else if (status === 1) {
            cm.sendOk("This is what I need from you:\r\n\r\n" + p.getCQuest().loadInfo(idon));
        } else if (status === 2) {
            cm.dispose();
            return;
        }
    }
}
