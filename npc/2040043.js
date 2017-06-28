/*
 * Blue Balloon
 * LPQ NPC
 * ID: 2040043
 */

"use strict";

const MaplePacketCreator = Java.type("net.sf.odinms.tools.MaplePacketCreator");
const Rectangle          = Java.type("java.awt.Rectangle");

Math.fact = function(n) {
    return n === 0 ? 1 : n * Math.fact(n - 1);
};

Math.binom = function(n, k) {
    return Math.fact(n) / (Math.fact(k) * Math.fact(n - k));
};

Math.collatz = function(n) {
    const c = [n];
    let x = n;

    while (x !== 1) {
        if (x % 2 === 0) {
            x /= 2;
        } else {
            x = 3 * x + 1;
        }
        c.push(x);
    }

    return c;
};

Math.rad = function(n_) {
    let n = n_;
    let r = new Set([1]);
    let d = 2;

    while (n > 1) {
        if (n % d === 0) {
            n /= d;
            r.add(d);
        } else {
            d++;
        }
    }

    let prod = 1;
    r.forEach(x => prod *= x);

    return prod;
};

function binomDistQ() {
    const agents =
        [ "Hong"
        , "Clarise"
        , "Fisscher"
        , "Nnamdi"
        , "Aleksandr"
        , "Cleanthes"
        , "Frantz"
        ];
    const actions =
        [ ["shooting arrows at a target", "hits the target", "shots", "shoots"]
        , ["wrangling kaetertupnias", "successfully wrangles", "kaetertupnias they come across", "comes across a kaetertupnia"]
        , ["cracking open cold ones with the boys", "successfully cracks open a cold one", "attempts", "attempts to crack open a cold one"]
        , ["playing poker with friends", "wins", "hands", "plays a hand"]
        , ["surfing", "successfully catches a wave", "waves", "attempts to ride a wave"]
        ];

    const agent = chooseRandom(agents);
    const action = chooseRandom(actions);

    const pNum = chooseRandom(range(1, 100));
    const p = pNum / 100;
    const n = chooseRandom(range(3, 21));
    const k = chooseRandom(range(1, n + 1));

    const question = `\
${agent} is ${action[0]}. ${agent} ${action[1]}, on average, ${pNum} out of \
every 100 ${action[2]}.\r\n\
\r\n\
If ${agent} ${action[3]} ${n} times, what is the probability that ${agent} \
${action[1]} ${k} times (rounded to the nearest percent)?`;

    const answer =
        Math.round(
            100 * Math.binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
        );

    return {
        question,
        answer
    };
}

function detQ() {
    const xs = range(9).map(() => chooseRandom(-11, 12));

    const question = `\
Determine the determinant of the following real 3x3 matrix:\r\n\
\r\n\
\t\t  #e(\
(${xs[0]}, ${xs[1]}, ${xs[2]}), \
(${xs[3]}, ${xs[4]}, ${xs[5]}), \
(${xs[6]}, ${xs[7]}, ${xs[8]}))#n`;

    const answer = xs[0] * xs[4] * xs[8] +
                   xs[1] * xs[5] * xs[6] +
                   xs[2] * xs[3] * xs[7] -
                   xs[2] * xs[4] * xs[6] -
                   xs[1] * xs[3] * xs[8] -
                   xs[0] * xs[5] * xs[7];

    return {
        question,
        answer
    };
}

function limQ() {
    const degree = chooseRandom(range(2, 5));
    const tops = range(degree).map(() =>
        [chooseRandom(range(-4, 5)), chooseRandom(range(-4, 5))]
    );
    const bottoms = range(degree).map(() =>
        [chooseRandom(range(-4, 5)), chooseRandom(range(-4, 5))]
    );
    let num = tops.map(t => t[0]).reduce((x, y) => x * y);
    let den = bottoms.map(b => b[0]).reduce((x, y) => x * y);
    range(2, Math.max(num, den) + 1).forEach(i => {
        if (num % i === 0 && den % 1 === 0) {
            num /= i;
            den /= i;
        }
    });

    const topStr = "[" + tops.map(t =>
        `(${t[0]}x ${t[1] >= 0 ? "+" : "-"} ${Math.abs(t[1])})`
    ).join(" ") + "]";
    const bottomStr = "[" + bottoms.map(b =>
        `(${b[0]}x ${b[1] >= 0 ? "+" : "-"} ${Math.abs(b[1])})`
    ).join(" ") + "]";

    const question = `\
Find the limit of the following expression as #ex#n tends to +infinity.\r\n\
If the result is a fraction, express both the numerator and the denominator.\r\n\
\r\n\
#e${topStr} / ${bottomStr}#n`;

    const answer = den === 1 ? num : parseInt(`${num}${Math.abs(den)}`);

    return {
        question,
        answer
    };
}

function dotProdQ() {
    const n = chooseRandom(range(3, 7));
    const a = range(n).map(() => chooseRandom(range(-12, 13)));
    const b = range(n).map(() => chooseRandom(range(-12, 13)));

    const question = `\
Find the dot product of #ea#n and #eb#n, where\r\n#e\
a = (${a.join(", ")})\r\n\
\r\n\
b = (${b.join(", ")})#n`;

    const answer = a.map((x, i) => x * b[i]).reduce((x, y) => x + y);

    return {
        question,
        answer
    };
}

function quadrQ() {
    const c0 = chooseRandom(range(-99, 100));
    const c1 = chooseRandom(range(-9, 10));
    const b = c0 + c1;
    const c = c0 * c1;

    const question = `\
Find all roots of the following polynomial:\r\n\
\r\n\
#ex^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}#n`;

    const answer = parseInt(`${c0}${Math.abs(c1)}`);

    return {
        question,
        answer
    };
}

function collatzQ() {
    const n = chooseRandom(range(3, 27));
    const collatz = Math.collatz(n);
    const i = chooseRandom(range(2, collatz.length + 1));

    const question = `\
Find the #e${i}#nth element of the Collatz sequence starting with ${n}.`;

    const answer = collatz[i - 1];

    return {
        question,
        answer
    };
}

function radQ() {
    const n = chooseRandom(range(3, 1001));
    const rad = Math.rad(n);

    const question = `\
Find the largest squarefree number that divides ${n}.`;

    const answer = rad;

    return {
        question,
        answer
    };
}

let status;
const boxLocs = // x, y, width, height
    [ new Rectangle(-244, -243, 56, 39) // 1
    , new Rectangle(-174, -243, 56, 39) // 2
    , new Rectangle(-244, -204, 56, 39) // 3
    , new Rectangle(-174, -204, 56, 39) // 4
    , new Rectangle(-111, -204, 56, 39) // 5
    , new Rectangle(-244, -165, 56, 39) // 6
    , new Rectangle(-174, -165, 56, 39) // 7
    , new Rectangle(-111, -165, 56, 39) // 8
    , new Rectangle(-40,  -165, 56, 39) // 9
    ];
const questionGenerators =
    [ binomDistQ
    , detQ
    , limQ
    , dotProdQ
    , quadrQ
    , collatzQ
    , radQ
    ];
const failMessages =
    [ "Ooof, wow. Close. #eVery#n close."
    , "You know, I never really did like numbers. I bet that's why they put me in here, the bastards.\r\n\r\nWhat have #enumbers#n ever done for me?"
    , "Have you started counting how many times you've failed?"
    , "Ok haha, hurry it up, man. Usually you're supposed to be done by now."
    , "Wrong!"
    , "Nice try, my dude."
    , "I can just... stop talking, if you really need to concentrate."
    , "Did you know that my glorious blue sheen is all natural?"
    , "I hope you're not allergic to latex."
    , "Honestly this room is a little silly, I admit it."
    , "You look tired."
    , "#eyawn#n\r\n\r\nAlright, can ya hurry it up?"
    , "Hmm, I guess it must be one of the other 125 combinations."
    , "But I repeat myself..."
    , "Hm?\r\n\r\nOh no, that's not it, ahaha. Not even close, really."
    , "Here, I'll give you a hint: It involves standing on boxes."
    , "I'm sure you'll get it eventually."
    , "Come here often?"
    , "You know, we're like 109 floors off the ground here.\r\n\r\nI'd think you would all be a bit chilly with clothes like that."
    , "I promise I didn't design this puzzle."
    , "Have you tried prayer?"
    , "Come on, you can do it! Eventually!"
    ];
const exp = 5040;
const qCount = 3;
//
let occupied;
//

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();
    const eim = p.getEventInstance();

    if (!eim) {
        cm.warpRandom(922010000);
        cm.dispose();
        return;
    }

    if ("" + eim.getProperty("8stageclear") === "true") {
        cm.sendOk("Heyyyy... good job, good job, ya did it.\r\n\r\nI always believed in ya.");
        cm.dispose();
        return;
    }

    if (!cm.isLeader()) {
        cm.sendOk("#ewhistling#n");
        cm.dispose();
        return;
    }

    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (p.getMapId() !== 922010800) {
        cm.sendOk("Report this to a GM.");
        cm.dispose();
        return;
    }

    if (!eim.getProperty("stage8count")) {
        eim.setProperty("stage8count", "0");
    }

    const doneCount = parseInt(eim.getProperty("stage8count"));

    if (!eim.getProperty(`stage8question${doneCount}`)) {
        const q = chooseRandom(questionGenerators)();
        eim.setProperty(`stage8question${doneCount}`, q.question);
        eim.setProperty(
            `stage8answer${doneCount}`,
            ("" + q.answer).replace("0", "").replace("-", "")
        );

        cm.sendOk(`\
Hey, ya buncha punks. Here's a question:\r\n\
\r\n\
${q.question}\r\n\
\r\n\
(Remember that answers with more than one number must be concatenated, each \
digit must be stood on by a number of people equal to the number of times that \
digit appears in the answer, and all 0's and negative signs must be omitted.)`);
        cm.dispose();
        return;
    }

    occupied =
        jsArray(eim.getPlayers())
            .map(player =>
                1 + boxLocs.findIndex(loc =>
                    loc.contains(player.getPosition())
                )
            )
            .filter(i => i > 0)
            .sort();

    const correctCombo =
        ("" + eim.getProperty(`stage8answer${doneCount}`))
            .split("")
            .map(chr => parseInt(chr))
            .sort();

    const correct = "" + occupied === "" + correctCombo;

    const map = eim.getMapInstance(p.getMapId());
    if (correct) {
        if (doneCount >= qCount - 1) {
            eim.setProperty("stage8count", `${qCount}`);

            map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
            map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
            map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));

            eim.setProperty("8stageclear", "true");

            const portal = eim.getMapInstance(p.getMapId() + 100).getPortal("next00");

            if (portal) {
                portal.setScriptName("lpq9");
            }

            cm.givePartyExp(exp, eim.getPlayers());

            cm.sendOk("#eWOOHOO!!! YA GOT IT!#n\r\n\r\nAlright, time to skedaddle.");
        } else {
            eim.setProperty("stage8count", `${doneCount + 1}`);

            map.broadcastMessage(MaplePacketCreator.serverNotice(5, "Congratulations! That is correct."));

            const q = chooseRandom(questionGenerators)();
            eim.setProperty(`stage8question${doneCount + 1}`, q.question);
            eim.setProperty(
                `stage8answer${doneCount + 1}`,
                ("" + q.answer).replace("0", "").replace("-", "")
            );

            cm.sendOk(`\
Eyyyy, congrats. That was pretty correct, if I do say so myself. Here's the next question:\r\n\
\r\n\
${q.question}\r\n\
\r\n\
(Remember that answers with more than one number must be concatenated, each \
digit must be stood on by a number of people equal to the number of times that \
digit appears in the answer, and all 0's and negative signs must be omitted.)`);
        }
    } else {
        map.broadcastMessage(MaplePacketCreator.playSound("Party1/Failed"));
        map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/wrong_kor"));

        cm.sendNext(`\
${chooseRandom(failMessages)}\r\n\
\r\n\
Here's the question again, if you need it:\r\n\
\r\n\
${eim.getProperty("stage8question" + doneCount)}\r\n\
\r\n\
(Remember that answers with more than one number must be concatenated, each \
digit must be stood on by a number of people equal to the number of times that \
digit appears in the answer, and all 0's and negative signs must be omitted.)`);
    }

    cm.dispose();
    return;
}
