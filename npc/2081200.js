/*
 * Gritto
 * 4th job magician instructor
 *
 * ID: 2081200
 */

var status;
var ids = [7000, 7001];
var idon;
var skills = [[[2321008, 10]], [[2321006, 10]]];
var qualifies;
var reward;

function contains(a, o) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] === o) {
            return true;
        }
    }
    return false;
}

function start() {
    idon = (cm.getPlayer().getMasterLevelById(2321008) > 0) ? 7001 : 7000;
    if (idon === 7001 && cm.getPlayer().getMasterLevelById(2321006) > 0) {
        idon = 7002;
    }
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
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
    if (cm.getPlayer().getLevel() < 120) {
        cm.sendOk("Come back to me when you are much stronger.");
        cm.dispose();
        return;
    } else if (cm.getPlayer().getJob().getId() % 10 !== 2) {
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
                    if (Math.floor(rewards[i][0] / 10000) === cm.getPlayer().getJob().getId()) {
                        hasquest = true;
                        break;
                    }
                }
                if (hasquest) {
                    cm.sendSimple(cm.selectQuest(idon, "I can train you to have incredible power over life and death."));
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
                cm.sendAcceptDecline(cm.getPlayer().getCQuest().loadInfo(idon));
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
            cm.sendYesNo(cm.randomText(4) + cm.getPlayer().getCQuest().getTitle() + cm.randomText(5));
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
                if (Math.floor(rewards[i][0] / 10000) === cm.getPlayer().getJob().getId()) {
                    reward = rewards[i];
                    break;
                }
            }
            qualifies = true;
            if (qualifies) {
                cm.sendOk(cm.showReward("Excellent. Excercise this newfound strength wisely.\r\n\r\n#eNew skill master level achieved: #r" + cm.getSkillNameById(reward[0]) + "#k #b" + reward[1] + "#k#n"));
            } else {
                cm.sendOk("You don't have the requisite skill master levels to complete this quest! Come back to me when you've got a master level of at least #b" + (reward[1] - 10) + "#k in the #r" + cm.getSkillNameById(reward[0]) + "#k skill.");
                cm.dispose();
                return;
            }
        } else if (status === 2) {
            cm.getPlayer().setMasterLevel(reward[0], reward[1]);
            cm.fourthRewardPlayer(0, 0);
            cm.getPlayer().sendHint(cm.randomText(6));
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
            cm.sendOk("This is what I need from you:\r\n\r\n" + cm.getPlayer().getCQuest().loadInfo(idon));
        } else if (status === 2) {
            cm.dispose();
            return;
        }
    }
}
