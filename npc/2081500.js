/*
 * Samuel
 * 4th job pirate instructor
 *
 * ID: 2081500
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var ids = [6000];
var id;
var skills =
[
    [
        [3121006, 30], [3221005, 30],
        [2321003, 20], [2221005, 30],
        [2121005, 30], [5220002, 20],
        [1320008, 25]
    ]
];
var reward;
var present = 4031520;
var questions = {
    "#eQ#n (the set of all rationals) is #enot#n closed under which one of these operations?:": [
        "exponentiation",
        "division",
        "subtraction",
        "absolute value",
        "inversion"
    ],
    "In Marxist terms, the term \"ideology\" refers to __________________________.": [
        "societal norms which serve to prevent people from challenging the status quo",
        "a particular political or economic viewpoint",
        "a particular lense through which one views the world and society",
        "religious dogma",
        "the driving force of history"
    ],
    "In members of the kingdom Plantae, the primary protein which allows them to undergo photosynthesis to commonly known as ___________________________.": [
        "Rubisco",
        "MyoD",
        "Ferritin",
        "Rhodopsin",
        "Fibronectin"
    ],
    "This Austro-Hungarian novelist and short story writer is best known for their works covering strong themes of alienation, persecution, and surrealism:": [
        "Franz Kafka",
        "Thomas Mann",
        "Ernst Junger",
        "Miroslav Krleza",
        "Bertolt Brecht"
    ],
    "In the Principlia Ethica, G. E. Moore defended a meta-ethical position which would later come to be known as __________________________.": [
        "robust moral realism",
        "moral naturalism",
        "constructivism",
        "idealism",
        "noncognitive fictionalism"
    ],
    "Consequentialism is the umbrella term which includes all positions that:": [
        "See the ethical significance of objects and actions as one and the same with the ethical benefits and negatives they produce in the world.",
        "See the ethical significance of objects and actions as one the same with the amount of utility produced for all ethical subjects in the world.",
        "See the ethical significance of objects and actions as essentially moot, since they are merely the consequences of past physical interactions.",
        "See the ethical significance of objects and actions as one and the same with the consequences that they bring to the people making the objects/actions and their intended targets.",
        "See the ethical significance of objects and actions as one and the same with their ability to bring about retributive justice."
    ],
    "On this account of proper names, the meaning of a proper name is one and the same with the object that it refers to:": [
        "Millian",
        "Fregean",
        "Russellian",
        "Kripkean",
        "Non-rigid designators"
    ],
    "This exact solution to Einstein's field equations permits the existence of so-called \"closed time-like curves\", and thus a certain kind of time travel:": [
        "Godel",
        "Kerr",
        "Schwarzschild",
        "van Stockum",
        "Reissner-Nordstrom"
    ],
    "How many monadic (1-ary, unary) operators are possible in a trinary logic?:": [
        "27",
        "9",
        "3",
        "6",
        "16"
    ],
    "This man was a major figure in the creation of the historic anarcho-communist territory known in English as \"The Free Territory\":": [
        "Nestor Makhno",
        "Sylvain Marechal",
        "Pyotr Kropotkin",
        "Errico Malatesta",
        "Carlo Cafiero"
    ]
};
var questionkeys = Object.keys(questions);
var questionorder = [];
var questionnumber = 0;

function fisherYates(a) {
    if (!(a instanceof Array)) return null;
    var i, j, temp;
    for (i = a.length - 1; i >= 1; --i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}

function contains(a, o) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] === o) return true;
    }
    return false;
}

function start() {
    id = 6000;
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
    if (!cm.onQuest(id) && !cm.onQuest(4002)) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk("Bye, then.");
                cm.dispose();
                return;
            } else {
                if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                    cm.sendSimple(cm.selectQuest(id, "I can train you to summon powerful monsters on command, to assist you in your journey."));
                } else {
                    cm.sendOk("Your training with me is finished. You are an apprentice to no one now.");
                    cm.dispose();
                    return;
                }
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
    } else if (cm.onQuest(4002)) {
        if (status === 0) {
            if (mode < 1) {
                cm.dispose();
                return;
            }
            cm.sendOk("Legor sent you, didn't he?\r\n\r\nWell, alrighty then. I suppose you need some \"mental training\" or whatever.");
        } else if (status === 1) {
            if (mode < 1) {
                cm.dispose();
                return;
            }
            cm.sendYesNo("#esigh#n\r\n\r\nWell, alright. You're gonna have to take a quiz. Do you think you're ready?");
        } else if (status >= 2) {
            if (questionnumber === 0) {
                for (i = 0; i < questionkeys.length; ++i) {
                    questionorder.push(i);
                }
                questionorder = fisherYates(questionorder);
            } else if (questionnumber < questionorder.length) {
                if (selection !== 0) {
                    cm.sendOk("Ah, nope. That's not quite right.");
                    cm.dispose();
                    return;
                }
            } else {
                if (selection !== 0) {
                    cm.sendOk("Ah, nope. That's not quite right.");
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk("Holy shit. You got them all right.\r\n\r\nHere, here's the #bpresent#k I promised you.");
                    cm.gainItem(present, 1);
                    cm.dispose();
                    return;
                }
            }

            var answerlist = [];
            var answerstring = "";
            for (i = 0; i < questions[questionkeys[questionorder[questionnumber]]].length; ++i) {
                answerlist.push("#L" + i + "#" + questions[questionkeys[questionorder[questionnumber]]][i] + "#l");
            }
            answerlist = fisherYates(answerlist);
            for (i = 0; i < answerlist.length; ++i) {
                answerstring += answerlist[i];
                answerstring += "\r\n";
            }

            cm.sendSimple("Alrighty. Question number " + (questionnumber + 1) + "...\r\n\r\n" + questionkeys[questionorder[questionnumber]] + "\r\n\r\n" + answerstring);
            questionnumber++;
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
            var extra = "";
            if (reward) {
                if (reward[0] === 2321003) {
                    extra = "#e, #rBahamut#k #b30#k#n";
                } else if (reward[0] === 1320008) {
                    extra = "#e, #rHex of the Beholder#k #b25#k#n";
                }
            }
            cm.sendOk(cm.showReward(id, "Excellent. Excercise this newfound strength wisely." + (!reward ? "" : "\r\n\r\n#eNew skill master level achieved: #r" + cm.getSkillNameById(reward[0]) + "#k #b" + reward[1] + "#k#n" + extra)));
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
            }
            cm.sendSimple(cm.selectQuest(id, "I can make you... so much more powerful."));
        } else if (status === 1) {
            cm.sendOk("This is what I need from you:\r\n\r\n" + MapleCQuests.loadQuest(id).getInfo());
        } else if (status === 2) {
            cm.dispose();
            return;
        }
    }
}
