/*
 * Samuel
 * 4th job pirate instructor
 *
 * ID: 2081500
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

/* jshint ignore: start */
// seedrandom.min.js
!function(a,b){function c(c,j,k){var n=[];j=1===j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null===c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/4294967296},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this===b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"===e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"===e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"===typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"===typeof define&&define.amd&&define(function(){return c})}([],Math);
/* jshint ignore: end */

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
var qualifies, reward;
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
    var p = cm.getPlayer();
    Math.seedrandom(
        "!" + p.getName() +
            "f" + p.getLevel() +
            "m" + p.getMeso() +
            "X" + p.getMapId() +
            "w" + p.getPosition().getY() +
            "6" + p.getPosition().getX() +
            "4" + p.getHp() + "y",
        { entropy: true }
    );
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
            if (p.getMasterLevelById(reward[0]) >= reward[1] - 10) {
                qualifies = true;
            } else if (reward[0] === 2321003 || reward[0] === 1320008) {
                qualifies = true;
            } else {
                qualifies = false;
            }
            if (qualifies) {
                var extra = "";
                if (reward[0] === 2321003) {
                    extra = "#e, #rBahamut#k #b30#k#n";
                } else if (reward[0] === 1320008) {
                    extra = "#e, #rHex of the Beholder#k #b25#k#n";
                }
                cm.sendOk(cm.showReward(id, "Excellent. Excercise this newfound strength wisely.\r\n\r\n#eNew skill master level achieved: #r" + cm.getSkillNameById(reward[0]) + "#k #b" + reward[1] + "#k#n" + extra));
            } else {
                cm.sendOk("You don't have the requisite skill master levels to complete this quest! Come back to me when you've got a master level of at least #b" + (reward[1] - 10) + "#k in the #r" + cm.getSkillNameById(reward[0]) + "#k skill.");
                cm.dispose();
                return;
            }
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
