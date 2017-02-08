/*
 * Man at haed of table
 * Lilin's Manor: Gala Main Room
 *
 * ID: 9901012
 */

// Dialogue.min.js follows
var Dialogue=function(){var a=function(a,b){return function(){var c=a,d=b,e=a,f=[],g="",h=function(a){function b(){return d.callback&&d.callback(),d.nodispose||cm.dispose(),g}function h(a,b){for(var d,c=[a];c.length>0;){if(d=c.pop(),d.id===b)return d;if(d.choices)for(var e=0;e<d.choices.length;++e)Array.isArray(d.choices[e])&&c.push(d.choices[e][1])}}var i,j;if(void 0!==a){if(a==-1)if("continue"==d.endchat)a=0;else if("back"==d.endchat)a=-3;else{if("stay"!=d.endchat)return b();a=-1}if(0===f.length&&a<-1)return b();if(a>=0){if(!e.choices[a])return b();e=e.choices[a][1],f.push(a)}else if(a!=-1){for(i=-2;i>a;--i)if(void 0===f.pop())return b();for(e=c,i=0;i<f.length;++i)e=e.choices[f[i]][1]}if(void 0!==e.goto){var k=e.goto;if(j=e.prompt,e=h(c,k),!e)throw ReferenceError("There exists no such node with the id "+k)}}if(!e||!e.prompt&&void 0===j)return b();if(g=void 0===j?e.prompt:j,!e.choices)return cm.sendOk(g),b();var l=g+"\r\n\r\n",m=e.choices;for(i=0;i<m.length;++i){var n=m[i];l+=void 0!==n[1].move?"#L"+(n[1].move>0?i:0===n[1].move?-1:n[1].move-2)+"#"+n[0]+"#l\r\n":"#L"+i+"#"+(Array.isArray(n)?n[0]:n)+"#l\r\n"}cm.sendSimple(l)},i=function(a){d.callback=a},j=function(a){d.endchat=a},k=function(a){d.nodispose=a},l=function(){c=d=e=f=g=void 0,delete this.setCallback,delete this.setEndChat,delete this.setNoDispose,delete this.talk,delete this.unload};return{talk:h,setCallback:i,setEndChat:j,setNoDispose:k,unload:l}}()};return{load:a}}();
// end Dialogue.min.js

var Rectangle = Java.type("java.awt.Rectangle");
var hostileConvo = {
    prompt: "Come now, have a seat. I #ebeg#n of you.",
    choices: [
        ["Ok.", {
            id: 6,
            prompt: "I really can't...\r\n\r\n...stress it enough.\r\nYou absolutely #emust#n try #ra bit of this risotto#k.",
            choices: [
                ["Thanks, but no thanks.", {
                    id: 1,
                    prompt: "#echuckles softly#n\r\n\r\nNo. Really. Eat.",
                    choices: [
                        ["Fine.", {
                            id: 2,
                            prompt: "Ahhh...\r\n\r\nExcellent.\r\n\r\n#e#rEat#k#n.",
                            choices: [
                                ["(take a bite of risotto)", {
                                    id: 8,
                                    prompt: "#e#rDid you think you were so stealthy? The Chef will be pleased to cook a crook like you for dinner.#k#n\r\n\r\n#eyou have been poisoned#n"
                                }]
                            ]
                        }],
                        ["No. Really. I don't wanna.", {
                            id: 3,
                            prompt: "Ah... but #eI insist#n.\r\n\r\n#ethe man's eyes momentarily with anger#n",
                            choices: [
                                ["(sit silently)", {
                                    id: 5,
                                    prompt: "...\r\n\r\n#ethe man suddenly snaps, #rforcibly shoving so much risotto down your throat#k#n",
                                    choices: [
                                        ["(choke down delicious, poisoned, risotto)", {
                                            goto: 8
                                        }]
                                    ]
                                }],
                                ["O--ok... fine.", {
                                    goto: 2
                                }]
                            ]
                        }],
                        ["Can we talk about something else other than this weird risotto thing?", {
                            prompt: "Yes, once you try this... delightful risotto.",
                            choices: [
                                ["(sigh) Fine.", {
                                    goto: 2
                                }],
                                ["I don't think so.", {
                                    prompt: "No.\r\n\r\n#elaughs impatiently#n\r\n\r\nYou #emust#n try this risotto, I assure you that you've never had #ranything quite like it#k.",
                                    choices: [
                                        ["Hmm... nah.", {
                                            prompt: "Oh, come on. Really?",
                                            choices: [
                                                ["Ah, whatever. I'll try some, I guess.", {
                                                    goto: 2
                                                }]
                                            ]
                                        }],
                                        ["Ok, whatever. Geez.", {
                                            prompt: "Ahoohoohoo... yeeeess. #e#rEat#k#n.",
                                            choices: [
                                                ["(bite down on some risotto)", {
                                                    goto: 8
                                                }]
                                            ]
                                        }]
                                    ]
                                }],
                                ["I um... already tried it.", {
                                    prompt: "Don't lie to me.\r\n\r\n#ethe man's eyes momentarily with anger#n\r\n\r\nI... #e#rinsist#k#n.",
                                    goto: 3
                                }]
                            ]
                        }]
                    ]
                }],
                ["Oh, I guess I can try it.", {
                    prompt: "Ohhh, yes. #e#rEat#k#n.",
                    choices: [
                        ["(gingerly bite into the risotto)", {
                            goto: 8
                        }]
                    ]
                }],
                ["Um... you should try it first.", {
                    prompt: "Oh, ahem, well, you see, I've already much had my fill.\r\n\r\nIt is with this in mind that I sincerely recommend that you try this delightful dish.",
                    goto: 1
                }],
                ["I'm actually allergic to meat broth.", {
                    prompt: "Oh, never fear, my friend. This risotto is 100% vegan, I #eassure#n you.",
                    goto: 1
                }]
            ]
        }],
        ["Um... just hold on a sec.", {
            prompt: "What are you waiting for?\r\n\r\n#epulls out chair from table for you, clearly making room and beckoning for you to sit down#n",
            choices: [
                ["Oh, I just... need to blow my nose, that's all.", {
                    prompt: "#ethe man appears to be waiting expectantly for you to blow your nose#n",
                    choices: [
                        ["(blow nose)", {
                            prompt: "Alright, excellent. Now sit.",
                            choices: [
                                ["(clear throat and sit down quietly)", {
                                    goto: 6
                                }],
                                ["(stand silently)", {
                                    goto: 4
                                }]
                            ]
                        }],
                        ["(wait expectantly for the man to stop waiting expectantly)", {
                            id: 4,
                            prompt: "...\r\n\r\n#ethe man's eyes momentarily with anger#n\r\n\r\nWhat. Are. You. Waiting. For?",
                            choices: [
                                ["(clear throat and sit down quietly)", {
                                    goto: 6
                                }],
                                ["(continue standing silently)", {
                                    goto: 5
                                }],
                                ["You seem angry.", {
                                    id: 7,
                                    prompt: "I --\r\n\r\nLook, kid. Just have a seat.",
                                    choices: [
                                        ["(clear throat and sit down quietly)", {
                                            goto: 6
                                        }],
                                        ["(refuse to sit down)", {
                                            goto: 5
                                        }]
                                    ]
                                }]
                            ]
                        }]
                    ]
                }],
                ["Waiting for you to be less creepy about this whole risotto thing.", {
                    prompt: "You'll have to excuse me if my #e#rhonest recommendation#k#n comes off as... creepy.",
                    choices: [
                        ["R--right. (sit down)", {
                            goto: 6
                        }],
                        ["Yeah, well, I don't take food from weirdo strangers, ok?", {
                            goto: 7
                        }]
                    ]
                }],
                ["(clear throat and sit down quietly)", {
                    goto: 6
                }]
            ]
        }],
        ["Err... I don't think so.", {
            prompt: "#emomentarily flushes with anger#n\r\n\r\nOh, please. I #bassure you#k, we don't bite... except for on our food.",
            choices: [
                ["Ok, I... guess so. (sit down)", {
                    goto: 6
                }],
                ["Oh, well in that case, sure. I was just really afraid I was going to get bitten.", {
                    prompt: "A real joker, eh? Come then, have a seat.",
                    choices: [
                        ["(sit down quietly)", {
                            goto: 6
                        }]
                    ]
                }],
                ["I dunno, this all seems kind of fishy. And I'm a vegetarian, so...", {
                    prompt: "A master of comedy, huh? I assume you, there is... #e#rnothing wrong#k#n with the risotto. I've had entire plate myself.\r\n\r\nJust have a seat.",
                    choices: [
                        ["I don't believe in chairs.", {
                            prompt: "Sure you do. Come on.",
                            choices: [
                                ["Ugh. Fine.", {
                                    goto: 6
                                }],
                                ["...Nah.", {
                                    goto: 4
                                }]
                            ]
                        }],
                        ["(clear throat and sit down quietly)", {
                            goto: 6
                        }]
                    ]
                }]
            ]
        }]
    ]
};

var status = 0;
var partyBoxSize = 400;
var eat = false;
var hostileDialogue;

function intDivide(n, d) {
    if (n % 1 !== 0 || d % 1 !== 0) {
        throw ValueError("Arguments to intDivide() must both be integral values.");
    }
    if (d === 0) {
        return undefined;
    }
    var q = n / d;
    if (q > 0) {
        return Math.floor(q);
    }
    return Math.ceil(q);
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    eat = mi.getPlayerProperty(p, "eat");
    if (mode < 0 && !eat) {
        cm.dispose();
        return;
    }
    if (status < 1 && mode === 0 && !eat) {
        cm.dispose();
        return;
    }
    mode === 1 || eat ? ++status : --status;
    if (!eat) {
        if (pq.isLeader(p)) {
            switch (status) {
                case 0:
                    cm.sendYesNo("This food... absolutely delectable. I implore you to at least try #ra bit of this risotto#k.");
                    break;
                case 1:
                    var partyRect = new Rectangle(
                        p.getPosition().getX() - intDivide(partyBoxSize, 2), /* x-value of upper-left corner */
                        p.getPosition().getY() - intDivide(partyBoxSize, 2), /* y-value */
                        partyBoxSize,                                        /* width */
                        partyBoxSize                                         /* height */
                    );
                    if (p.getMap().getPlayersInRect(partyRect, pq.getPlayers()).containsAll(pq.getPlayers())) {
                        mi.setPropertyForAll("eat", true);
                        mi.invokeMethod("enemyDialogue");
                    } else {
                        cm.sendOk("Don't your friends want to eat as well?");
                    }
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
        } else {
            cm.sendOk("Wouldn't be a real party without some wine to soften the mind and poison the liver, now would it?");
            cm.dispose();
            return;
        }
    } else if (!mi.getPlayerProperty(p, "combat")) {
        if (status === 0) {
            hostileDialogue = Dialogue.load(hostileConvo, { endchat: "stay", callback: function() { mi.invokeMethod("combat", p); } });
            hostileDialogue.talk();
        } else {
            hostileDialogue.talk(selection);
        }
    } else {
        cm.sendNext("Euuughhhh...\r\n\r\nYou fucking punks. You m--might escape with your lives, but n--\r\n\r\n...never with #eThe Chef#n's recipes.");
        cm.dispose();
        return;
    }
}
