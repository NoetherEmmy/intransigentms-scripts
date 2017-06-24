/*
 * Gritto
 * 4th job magician instructor
 *
 * ID: 2081200
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var ids = [7000, 7001];
var id = 0;
var skills =
[
    [
        [2321008, 10]
    ],
    [
        [2321006, 10]
    ]
];
var reward;

function contains(a, o) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] === o) return true;
    }
    return false;
}

function start() {
    var p = cm.getPlayer();
    id = p.canBeginCQuest(7001) ? 7001 : 7000;
    if (id === 7000 && !p.canBeginCQuest(7000)) {
        id = 7002;
    }
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
    if (!cm.onQuest(id)) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk("Bye, then.");
                cm.dispose();
                return;
            } else if (contains(ids, id)) {
                if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                    cm.sendSimple(cm.selectQuest(id, "I can train you to have incredible power over life and death."));
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
                cm.sendAcceptDecline(MapleCQuests.loadQuest(id).getInfo());
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("Ok.");
                cm.dispose();
                return;
            }
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + MapleCQuests.loadQuest(id).getTitle() + cm.randomText(5));
        } else if (status === 1) {
            if (!cm.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "Well what have we here?"));
        } else if (status === 1) {
            rewards = skills[id - ids[0]];
            for (i = 0; i < rewards.length; ++i) {
                if (Math.floor(rewards[i][0] / 10000) === p.getJob().getId()) {
                    reward = rewards[i];
                    break;
                }
            }
            cm.sendOk(cm.showReward(id, "Excellent. Excercise this newfound strength wisely." + (!reward ? "" : "\r\n\r\n#eNew skill master level achieved: #r" + cm.getSkillNameById(reward[0]) + "#k #b" + reward[1] + "#k#n")));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(id) && !cm.canComplete(id)) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "I can make you... so much more powerful."));
            }
        } else if (status === 1) {
            cm.sendOk("This is what I need from you:\r\n\r\n" + MapleCQuests.loadQuest(id).getInfo());
        } else if (status === 2) {
            cm.dispose();
            return;
        }
    }
}
