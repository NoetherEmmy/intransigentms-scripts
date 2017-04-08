/*
 * Hellin
 * 4th job rogue instructor
 *
 * ID: 2081400
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var ids = [5000];
var id;
var skills =
[
    [
        [3121007, 30], [3221006, 30],
        [2121006, 30], [2221006, 30],
        [5221009, 20], [4121003, 30],
        [4221003, 30]
    ]
];
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
        "logicism"
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
        "divine interventionism",
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
    id = 5000;
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
    if (!cm.onQuest(id) && !cm.onQuest(7000)) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk("Bye, then.");
                cm.dispose();
                return;
            } else {
                if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                    cm.sendSimple(cm.selectQuest(id, "I can train you to cripple your enemies, and make them fall prey to your assaults."));
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
    } else if (cm.onQuest(7000)) {
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
                answerlist.push("#L" + i + "#" + questions[questionkeys[questionorder[questionnumber]]][i] + "#l");
            }
            answerlist = fisherYates(answerlist);
            for (i = 0; i < answerlist.length; ++i) {
                answerstring += answerlist[i];
                answerstring += "\r\n";
            }

            cm.sendSimple("Alright. Question number " + (questionnumber + 1) + "...\r\n\r\n" + questionkeys[questionorder[questionnumber]] + "\r\n\r\n" + answerstring);
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
