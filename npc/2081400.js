load('nashorn:mozilla_compat.js');
/*
 * Hellin
 * 4th job rogue instructor
 *
 * ID: 2081400
 */
 
importPackage(Packages.net.sf.odinms.client);

/* jshint ignore: start */
// seedrandom.min.js
!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/4294967296},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);
/* jshint ignore: end */
 
var status = 0;
var ids = [5000];
var idon;
var skills = [[[3121007, 30], [3221006, 30], [2121006, 30], [2221006, 30], [5221009, 20], [4121003, 30], [4221003, 30]]];
var qualifies;
var reward;
var present = 4031521;
var questions = {
    "Imre Lakatos is most well-known for the use of this concept in the philosophy and history of science, which indicates a hard, immutable core of ideas surrounded by a so-called \"protective belt\" of peripheral theoretical material which can be changed over time in order to progress and make new predictions while still maintaining the hard core.": [
        "Research program",
        "Paradigm",
        "Research tradition",
        "Scientific framework",
        "Scientific scheme"
        ],
    "Although often used as a synonym for biological evolution by laymen, natural selection is not the only means by which biological evolution occurs. Some evolutionary biologists challenge Darwinian and Neo-Darwinian biology with something called Neutral Theory, which places more emphasis on this kind of biological evolution.": [
        "Genetic drift",
        "Genetic hitchhiking",
        "Horizontal transfer",
        "Abiogenesis",
        "Genetic vectors"
        ],
    "Similar to the idea of \"modality\" or \"modal logic\" in philosophy, natural languages often possess a kind of mood called ______________, which is used to express things that aren't necessarily true, e.g. they should be true, we wish them to be true, they are possibly true, we judge them to be true, etc.": [
        "the subjunctive",
        "the imperfect",
        "the indicative",
        "the conditional",
        "the jussive"
        ],
    "__________________ is the popular name given to the series of policy actions taken by the United States under the Nixon administration that primarily aimed to clamp down drug enforcement on black and politically left-wing communities.": [
        "The War on Drugs",
        "Nixon's Prohibition",
        "The Crack-down",
        "Drug-Free America",
        "The Drug Resistance"
        ],
    "This psychologist is best known perhaps for his experiments on split-brain patients:": [
        "Michael Gazzaniga",
        "Paul Broca",
        "Jean Piaget",
        "Lev Vygotsky",
        "John Dewey"
        ],
    "Which of the following functions is commutative but not associative (x and y are real)?:": [
        "f(x, y) := xy - (x + y)",
        "f(x, y) := x - y",
        "f(x, y) := (x - 1)y",
        "f(x, y) := |x|"
        ],
    "Surplus value is generated in which of the following ways?:": [
        "Purchasing labor-power and expending it to produce more value than was used to purchase it",
        "Technologically upgrading machinery in order to undercut the prices of competitors and produce a profit",
        "Buying commodities and reselling them for a higher price",
        "Securing interest or other streams of income (insurance premia, etc.) by subsuming and sheilding others from economic risk",
        "Producing services or commodities at a very high standard or quality"
        ],
    "In virtue ethics, the word most commonly used to refer to accumulated moral wisdom and knack is ____________.": [
        "phronesis",
        "eudaimonia",
        "arete",
        "pelateia",
        "noimosinie"
        ],
    "According to De Morgan's laws, ~(p ^ q) is logically equivalent to _____________.": [
        "~p v ~q",
        "~p ^ ~q",
        "~p v q",
        "~p",
        "~p xor ~q"
        ],
    "This type of chord progression, when used as a cadence, is often called an \"amen cadence\":": [
        "IV -> I",
        "bII -> I",
        "V7 -> I",
        "V -> i",
        "VI -> i"
        ],
    "This theorem in calculus and theoretical physics roughly states that every differentiable symmetry of a physical system has a corresponding conservation law associated with it:": [
        "Noether's theorem",
        "Godel's theorem",
        "Hilbert's syzygy theorem",
        "Invariant symmetries theorem",
        "General relativity theorem"
        ],
    "This author is best known for their individualist political writings which stressed egoism and advocated for the evisceration of so-called \"spooks\" from society; those social norms such as religion, morality, gender, and so on which acted only to oppress individuals.": [
        "Max Stirner",
        "Friedrich Engels",
        "Sylvia Pankhurst",
        "G. W. F. Hegel",
        "John Zerzan"
        ],
    "This position in metamathematics/philosophy of mathematics, most notably promoted by L. J. Brouwer, holds that mathematics is a purely constructive mental activity, as opposed to a practice which supposes to uncover already objectively existing realities and truths.": [
        "intuitionism",
        "platonism",
        "fictionalism",
        "naturalism",
        "constructivism"
        ],
    "The modal equivalent of second-order logic's existence operator (typically denoted using a backwards E) is ___________________________.": [
        "the possibility operator, denoted by a diamond/lozenge",
        "the possibility operator, denoted by a square",
        "the necessity operator, denoted by a diamond/lozenge",
        "the necessity operator, denoted by a square",
        "the universal quantification operator, denoted with an upside-down A"
        ],
    "This metaethical position, commonly associated with J. L. Mackie, holds that ethical statements concern (cognitive) matters of fact, but that no such statements are true, because there exists no ethical reality to speak of.": [
        "error theory",
        "emotivism",
        "quasi-realism",
        "constructivism",
        "moral naturalism"
        ],
    "This kind of chemical compound is formed when an acid has one of its hydroxyl (-OH) groups is replaced with (-O-R), where R is any alkyl or similar carbo-hydrogen subsitute, and typically has a distinctive fruity smell:": [
        "ester",
        "ether",
        "propyl",
        "amide",
        "amine"
        ],
    "This painter is perhaps best known for their work The Treachery Of Images (\"Ceci n'est pas une pipe\"), as well as other typically surrealist imagery:": [
        "Rene Magritte",
        "Salvador Dali",
        "Max Ernst",
        "Man Ray",
        "Andre Breton"
        ],
    "This particular solution to the mind-body problem (a.k.a. the ghost in the shell), most notably taken on by Malebranche, proposes that God is the only efficient cause for any activity in the world, and that a will or desire to do something merely acts as an opportunity for God to change things:": [
        "occasionalism",
        "divine intervention",
        "fatalism",
        "dualism",
        "spiritism"
        ],
    "This ancient Greek philosopher used sheer logic, from the principle that from nothing comes nothing, to show that the world of change is merely an appearance, and that there was really only an underlying reality of one single timeless, changeless substrate in which change is impossible:": [
        "Parmenides",
        "Democritus",
        "Heraclitus",
        "Empedocles",
        "Zeno of Elea"
        ],
    "This piece of literature, often considered to be the oldest great piece of literature, describes a story of a king and a demigod raised by wolves, who fight off a monsterous guardian, and which ends tragically as the demigod dies and the king loses the key to immortality at the hands of a snake:": [
        "The Epic of Gilgamesh",
        "Mahabharata",
        "Cycle of Kumarbi",
        "Legend of Keret",
        "Iliad"
        ]
    };
var questionkeys = Object.keys(questions);
var questionorder = [];
var questionnumber = 0;

function fisherYates(a) {
    if (!(a instanceof Array)) {
        return null;
    }
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
        if (a[i] === o) {
            return true;
        }
    }
    return false;
}

function start() {
    Math.seedrandom(cm.getPlayer().getName() + String(cm.getPlayer().getLevel()) + String(cm.getPlayer().getMeso()) + String(cm.getPlayer().getMapId()) + String(cm.getPlayer().getPosition().getY()) + String(cm.getPlayer().getPosition().getX()) + String(cm.getPlayer().getHp()), { entropy: true });
    idon = 5000;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var i, rewards;
    if (mode < 0) {
        cm.dispose();
        return;
    } else {
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
                    reward = [];
                    for (i = 0; i < rewards.length; ++i) {
                        if (Math.floor(rewards[i][0] / 10000) === cm.getPlayer().getJob().getId()) {
                            reward = rewards[i];
                            hasquest = true;
                            break;
                        }
                    }
                    if (reward.length > 0) {
                        if (cm.getPlayer().getMasterLevelById(reward[0]) >= reward[1]) {
                            hasquest = false;
                        }
                    }
                    if (hasquest) {
                        cm.sendSimple(cm.selectQuest(idon, "I can train you to cripple your enemies, and make them fall prey to your assaults."));
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
            if (cm.onQuest(7000)) {
                if (status === 0) {
                    if (mode < 1) {
                        cm.dispose();
                        return;
                    }
                    cm.sendOk("Gritto sent you, didn't he?\r\n\r\nWell, alrighty then. I suppose you need some \"mental training\" or whatever.");
                } else if (status === 1) {
                    if (mode < 1) {
                        cm.dispose();
                        return;
                    }
                    cm.sendYesNo("#esigh#n\r\n\r\nWell, OK. You're gonna have to take a bit of a test. Do you think you're ready?");
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
                            cm.sendOk("Oh, wow. You got them all right.\r\n\r\nHere, here's the #bPresent#k I promised you.");
                            cm.gainItem(present, 1);
                            cm.dispose();
                            return;
                        }
                    }
                    
                    var answerlist = [];
                    var answerstring = "";
                    for (i = 0; i < questions[questionkeys[questionorder[questionnumber]]].length; ++i) {
                        answerlist.push("#L" + String(i) + "#" + questions[questionkeys[questionorder[questionnumber]]][i] + "#l");
                    }
                    answerlist = fisherYates(answerlist);
                    for (i = 0; i < answerlist.length; ++i) {
                        answerstring += answerlist[i];
                        answerstring += "\r\n";
                    }
                    
                    cm.sendSimple("Alright. Question number " + String(questionnumber + 1) + "...\r\n\r\n" + questionkeys[questionorder[questionnumber]] + "\r\n\r\n" + answerstring);
                    questionnumber++;
                }
            } else {
                if (status === 0) {
                    cm.sendYesNo(cm.randomText(4) + cm.getPlayer().getCQuest().getTitle() + cm.randomText(5));
                } else if (status === 1) {
                    cm.startCQuest(0);
                    cm.dispose();
                    return;
                }
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
                if (cm.getPlayer().getMasterLevelById(reward[0]) >= reward[1] - 10) {
                    qualifies = true;
                } else {
                    qualifies = false;
                }
                if (qualifies) {
                    cm.sendOk(cm.showReward("Excellent. Excercise this newfound strength wisely.\r\n\r\n#eNew skill master level achieved: #r" + cm.getSkillNameById(reward[0]) + "#k #b" + String(reward[1]) + "#k#n"));
                } else {
                    cm.sendOk("You don't have the requisite skill master levels to complete this quest! Come back to me when you've got a master level of at least #b" + String(reward[1] - 10) + "#k in the #r" + cm.getSkillNameById(reward[0]) + "#k skill.");
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
}