/*
 * Temple Keeper
 * ID: 2140000
 *
 * Time Lane | Three Doors
 * Quests 12000, 12001, 12002
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var questIds = [12000, 12001, 12002];
var selection1, selection2;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode < 0 || (mode === 0 && (type === 4 || type === 12 || status < 1))) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    var idIndex = questIds.findIndex(function(qid) {
        return !p.completedCQuest(qid);
    });
    var id = idIndex >= 0 ? questIds[idIndex] : 0;

    switch (idIndex) {
        case -1:
            cm.sendOk("#econtinues reading silently as the ancient scroll in his hand slowly, but actively, falls to dust#n");
            cm.dispose();
            return;
        case 0:
            if (!cm.onQuest(id)) {
                switch (status) {
                    case 0:
                        cm.sendSimple(cm.selectQuest(id, "#econtinues reading silently as the ancient scroll in his hand slowly, but actively, falls to dust#n"));
                        break;
                    case 1:
                        cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Vaguely?#l\r\n#L1#(walk a bit closer to the old man)#l\r\n#L2#Hah, nope. Not a human. Not even a little. (quickly walk away)#l");
                        break;
                    case 2:
                        selection1 = selection;
                        switch (selection) {
                            case 0:
                                cm.sendSimple("Well, you don't have a nose.\r\n\r\n#L0#Excuse me? I am noseless and proud.#l\r\n#L1#Well, neither do you.#l\r\n#L2#What are you talking abou -- oh. OH SHIT AAAAAAAAAAA I HAVE NO NOSE WHAT THE FUCK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA#l");
                                break;
                            case 1:
                                cm.sendSimple("#ethe old man doesn't appear to budge or to make any sound#n\r\n\r\n#L0#(walk a bit closer yet)#l\r\n#L1#(retrace your few steps back)#l\r\n#L2#(decide better of this old man and swiftly walk away)#l");
                                break;
                            default:
                                cm.dispose();
                                return;
                        }
                        break;
                    case 3:
                        selection2 = selection;
                        switch (selection1) {
                            case 0:
                                switch (selection) {
                                    case 0:
                                        // Excuse me? I am noseless and proud.
                                        cm.sendSimple("#ethe old man adjusts his spectacles once again#n\r\n\r\nAre you sure? Haven't you ever wanted to smell the air? To taste foodstuffs?\r\n\r\n#L0#Well... I guess so, yeah.#l\r\n#L1#No, not really.#l");
                                        break;
                                    case 1:
                                        // Well, neither do you.
                                        cm.sendSimple("#ethe old man's brows furrow#n\r\n\r\nIs that an insult?\r\n\r\n#L0#Well, I mean, no. Like, I don't hate. I don't have one either.#l\r\n#L1#Uhhh... MAYBE.#l");
                                        break;
                                    default:
                                        // What are you talking abou -- oh. OH SHIT AAAAAAAAAAA I HAVE NO NOSE WHAT THE FUCK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                                        cm.sendOk("#ethe old man nearly fumbles his spectacles and quickly decides to go back to reading#n");
                                        cm.dispose();
                                        return;
                                }
                                break;
                            case 1:
                                switch (selection) {
                                    case 0:
                                        // (walk a bit closer yet)
                                        cm.sendSimple("#ethe old man's gaze intensifies#n\r\n\r\n#L0#(get away from the gaze)#l\r\n#L1#(stare back at the old man's tiny, beady eyes)#l");
                                        break;
                                    case 1:
                                        // (retrace your few steps back)
                                        cm.sendSimple("#ethe old man's brows furrow#n\r\n\r\n#L0#(keep walking back)#l\r\n#L1#W--What do you want?#l");
                                        break;
                                    default:
                                        // (decide better of this old man and swiftly walk away)
                                        cm.dispose();
                                        return;
                                }
                                break;
                            default:
                                cm.dispose();
                                return;
                        }
                        break;
                    case 4:
                        switch (selection1) {
                            case 0:
                                switch (selection2) {
                                    case 0:
                                        switch (selection) {
                                            case 0:
                                                // Well... I guess so, yeah.
                                                cm.sendSimple("Have you ever... wanted to walk down #e#bMemory Lane#k#n?\r\n\r\n#L0#Look, is this some kind of a scam?#l\r\n#L1#What's that?#l");
                                                break;
                                            case 1:
                                                // No, not really.
                                                cm.sendOk("#ethe old man's tiny beady eyes roll#n");
                                                cm.dispose();
                                                return;
                                        }
                                        break;
                                    case 1:
                                        switch (selection) {
                                            case 0:
                                                // Well, I mean, no. Like, I don't hate. I don't have one either.
                                                cm.sendSimple("In any case...\r\n\r\n#ethe old man quickly wipes his mouth-nose area with a gloved hand#n\r\n\r\nHave you, noseless human, considered a walk down #e#bMemory Lane#k#n?\r\n\r\n#L0#Is that some kind of a scam?#l\r\n#L1#What's that?#l");
                                                break;
                                            case 1:
                                                // Uhhh... MAYBE.
                                                cm.sendOk("#ethe old man's tiny beady eyes roll#n");
                                                cm.dispose();
                                                return;
                                        }
                                        break;
                                    default:
                                        cm.dispose();
                                        return;
                                }
                                break;
                            case 1:
                                switch (selection2) {
                                    case 0:
                                        switch (selection) {
                                            case 0:
                                                // (get away from the gaze)
                                                cm.dispose();
                                                return;
                                            case 1:
                                                // (stare back at the old man's tiny, beady eyes)
                                                cm.sendSimple("#ethe old man pauses#n\r\n\r\nYes... I can see it in your oversized eyes. You thirst for a walk along #e#bMemory Lane#k#n.\r\n\r\n#L0#Uhm... actually, not really.#l\r\n#L1#Maybe. What is that?#l");
                                                break;
                                        }
                                        break;
                                    case 1:
                                        switch (selection) {
                                            case 0:
                                                // (keep walking back)
                                                cm.dispose();
                                                return;
                                            case 1:
                                                // W--What do you want?
                                                cm.sendSimple("Oh, nothing.\r\n\r\n#ethe old man's eyes wander slightly#n\r\n\r\nI just thought you might want a walk along #e#bMemory Lane#k#n.\r\n\r\n#L0#Uhm... actually, not really.#l\r\n#L1#Maybe. What is that?#l");
                                                break;
                                        }
                                        break;
                                    default:
                                        cm.dispose();
                                        return;
                                }
                                break;
                            default:
                                cm.dispose();
                                return;
                        }
                        break;
                    case 5:
                        switch (selection) {
                            case 1:
                                cm.sendSimple("#e#bMemory Lane#k#n -- the road of past experiences. Of those who enter the Lane, only a handful make it back out; at least, make it back out #ralive#k.\r\n\r\nBut you look dumb--I mean, #estrong#n enough of mind and body to explore this Lane yourself.\r\n\r\nThere is only one thing you must do -- take a walk along your own private lane of memory.\r\n\r\n#L0#How do you mean?#l\r\n#L1#Hmm... doesn't sound fun.#l");
                                break;
                            default:
                                cm.sendOk("Ah.\r\n\r\n#egoes back to reading#n");
                                cm.dispose();
                                return;
                        }
                        break;
                    case 6:
                        switch (selection) {
                            case 0:
                                cm.sendSimple("#ethe old man stands up a bit straighter#n\r\n\r\nTo go back to where you started, to relive your memories anew, for good and for poor.\r\n\r\nI can take you there, but only if you allow me to.\r\n\r\n#ethe old man closes his eyes for 2 or 3 seconds#n\r\n\r\n#e#rTo Maple Island, yes, I can take you.#k#n That is where you started, yes?\r\n\r\n#L0#Oh, I mean... all the way back there? I don't know about that.#l\r\n#L1#I... I suppose so. Can you take me there now?#l");
                                break;
                            default:
                                cm.sendOk("Suit yourself.\r\n\r\n#ethe old man goes back to reading#n");
                                cm.dispose();
                                return;
                        }
                        break;
                    case 7:
                        switch (selection) {
                            case 1:
                                if (!cm.startCQuest(id)) {
                                    cm.sendOk(cm.randomText(8));
                                } else {
                                    cm.warp(40000);
                                }
                                cm.dispose();
                                return;
                            default:
                                cm.sendOk("Suit yourself.\r\n\r\n#ethe old man goes back to reading#n");
                                cm.dispose();
                                return;
                        }
                        break;
                }
            } else if (cm.canComplete(id)) {
                switch (status) {
                    case 0:
                        cm.sendOk("#ethe old man almost seems to nod#n");
                        break;
                    case 1:
                        cm.rewardPlayer(id);
                        cm.gainFame(12);
                        cm.dispose();
                        return;
                }
            } else {
                cm.sendOk("#econtinues reading silently as the ancient scroll in his hand slowly, but actively, falls to dust#n");
                cm.dispose();
                return;
            }
            break;
        case 1:
            if (!cm.onQuest(id)) {
                switch (status) {
                    case 0:
                        cm.sendSimple(cm.selectQuest(id, "#econtinues reading silently as the ancient scroll in his hand slowly, but actively, falls to dust#n"));
                        break;
                    case 1:
                        cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Yeah, pretty much just everything. I regret everything.#l\r\n#L1#I mean, yeah, there were a few things...#l\r\n#L2#Nah. Not really.#l");
                        break;
                    case 2:
                        selection1 = selection;
                        switch (selection) {
                            case 0:
                                // Yeah, pretty much just everything. I regret everything.
                                cm.sendSimple("Aye. That's what they all say.\r\n\r\nAnd there's scant we can do about it.\r\n\r\nBut there is #eone#n thing.\r\n\r\n#L0#Sounds dangerous already. I'm out.#l\r\n#L1#What is it?#l");
                                break;
                            case 1:
                                // I mean, yeah, there were a few things...
                                cm.sendSimple("#ethe old man lowers his spectacles#n\r\n\r\nCome now. Be honest.\r\n\r\n#L0#Ok, yeah, I guess I regret most things.#l\r\n#L1#No.#l");
                                break;
                            case 2:
                                // Nah. Not really.
                                cm.sendOk("#ethe old man continues reading#n\r\n\r\nCome back to me when you're ready to be truthful.");
                                cm.dispose();
                                return;
                            default:
                                cm.dispose();
                                return;
                        }
                        break;
                    case 3:
                        switch (selection1) {
                            case 0:
                                if (selection < 1) {
                                    // Sounds dangerous already. I'm out.
                                    cm.sendOk("Suit yourself.");
                                    cm.dispose();
                                    return;
                                }
                                // What is it?
                                cm.sendSimple("#ethe old man briefly sighs#n\r\n\r\n#bTime Lane#k is a very special place. Here, you can remove, erase, destroy any memories and figments of events past. That's... almost as a good as getting rid of the real thing.\r\n\r\nYou can think of us as the laundromat of memory.\r\n\r\n#L0#Are you sure? Sounds dangerous.#l\r\n#L1#Alriiiiiight, how do I start?#l");
                                break;
                            case 1:
                                if (selection === 1) {
                                    // No.
                                    cm.sendOk("#ethe old man replaces his spectacles#n");
                                    cm.dispose();
                                    return;
                                }
                                // Ok, yeah, I guess I regret most things.
                                cm.sendSimple("#ethe old man continues reading#n\r\n\r\nThat's what I thought.\r\n\r\nThere #eis#n one thing we can do about that, however. #bTime Lane#k is... a very special place. Here, you can remove, erase, destroy any memories and figments of events past. That's kinda almost as a good as getting rid of the real thing.\r\n\r\nYou can think of us as the laundromat of memory.\r\n\r\n#L0#Are you sure? Sounds dangerous.#l\r\n#L1#Alriiiiiight, how do I start?#l");
                                break;
                        }
                        break;
                    case 4:
                        switch (selection) {
                            case 0:
                                // Are you sure? Sounds dangerous.
                                cm.sendSimple("Oh no, I assume you it's perfectly safe.\r\n\r\nHuman (or in your case, noseless-human) memory is notoriously unreliable, anyways. We've been doing this for so long that no one really notices anymore.\r\n\r\n#L1#Did you really just bring up the thing about my (lack of) nose again? You don't even have one yourself.#l\r\n#L2#Riiiight. So... how do I get started, then?#l\r\n#L3#Yeah, I'm sorry. That just... doesn't sound kosher to me.#l");
                                break;
                            case 1:
                                // Alriiiiiight, how do I start?
                                cm.sendAcceptDecline("Well, for starters you could kill off #b200 Memory Monks, Memory Monk Trainees, Memory Guardians, and Chief Memory Guardians#k.\r\n\r\nAnd to really seal the deal, I'm going to have to ask you to defeat #e#rDodo the Rememberer#k#n.");
                                break;
                        }
                        break;
                    case 5:
                        switch (selection) {
                            case 1:
                                // Did you really just bring up the thing about my (lack of) nose again? You don't even have one yourself.
                                cm.sendAcceptDecline("#ethe old man entirely ignores your reply#n\r\n\r\nFor starters, you can kill off #b200 Memory Monks, Memory Monk Trainees, Memory Guardians, and Chief Memory Guardians#k.\r\n\r\nAnd to really seal the deal, I'm going to have to ask you to defeat #e#rDodo the Rememberer#k#n.");
                                break;
                            case 2:
                                // Riiiight. So... how do I get started, then?
                                cm.sendAcceptDecline("Well, for starters you could kill off #b200 Memory Monks, Memory Monk Trainees, Memory Guardians, and Chief Memory Guardians#k.\r\n\r\nAnd to really seal the deal, I'm going to have to ask you to defeat #e#rDodo the Rememberer#k#n.");
                                break;
                            case 3:
                                // Yeah, I'm sorry. That just... doesn't sound kosher to me.
                                cm.sendOk("Suit yourself.");
                                cm.dispose();
                                return;
                            default:
                                if (!cm.startCQuest(id)) {
                                    cm.sendOk(cm.randomText(8));
                                }
                                cm.dispose();
                                return;
                        }
                        break;
                    case 6:
                        if (!cm.startCQuest(id)) {
                            cm.sendOk(cm.randomText(8));
                        }
                        cm.dispose();
                        return;
                    default:
                        cm.dispose();
                        return;
                }
            } else if (cm.canComplete(id)) {
                switch (status) {
                    case 0:
                        cm.sendOk("#ethe old man almost seems to nod#n");
                        break;
                    case 1:
                        cm.rewardPlayer(id);
                        cm.gainFame(15);
                        cm.dispose();
                        return;
                }
            } else {
                cm.sendOk("#econtinues reading silently as the ancient scroll in his hand slowly, but actively, falls to dust#n");
                cm.dispose();
                return;
            }
            break;
        case 2:
            if (!cm.onQuest(id)) {
                switch (status) {
                    case 0:
                        cm.sendSimple(cm.selectQuest(id, "#econtinues reading silently as the ancient scroll in his hand slowly, but actively, falls to dust#n"));
                        break;
                    case 1:
                        cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#Oh... so, um, what does that mean, then?#l\r\n#L1#Oh, let me guess... now you want me to hunt for some washing powder or some shit.#l");
                        break;
                    case 2:
                        switch (selection) {
                            case 0:
                                // Oh... so, um, what does that mean, then?
                                cm.sendSimple("Well, to put it bluntly, it means that we're going to have to resort to more... direct. Methods.\r\n\r\nAs in, we are going to have to #edirectly destroy the regrets themselves#n.\r\n\r\n#L0#Nah, fam, I ain't about that life.#l\r\n\r\n#L1#I mean, I realize I voiced a similar concern last time but... this REALLY seems dangerous.#l");
                                break;
                            case 1:
                                // Oh, let me guess... now you want me to hunt for some washing powder or some shit.
                                cm.sendSimple("No, no, it's... it's too late for that. We're going to have to resort to more... direct. Methods.\r\n\r\nAs in, we are going to have to #edirectly destroy the regrets themselves#n.\r\n\r\n#L0#Nah, fam, I ain't about that life.#l\r\n\r\n#L1#I mean, I realize I voiced a similar concern last time but... this REALLY seems dangerous.#l");
                                break;
                        }
                        break;
                    case 3:
                        switch (selection) {
                            case 0:
                                // Nah, fam, I ain't about that life.
                                cm.sendOk("Suit yourself.");
                                cm.dispose();
                                return;
                            case 1:
                                // I mean, I realize I voiced a similar concern last time but... this REALLY seems dangerous.
                                cm.sendSimple("#ethe old man sighs deeply#n\r\n\r\nThis is very important business we do here -- it might seem dangerous, but we have no choice but to persevere. All we can do beyond that is hope that our actions do not lead us into #e#roblivion#k#n.\r\n\r\n#L0#O--oblivion? What... do you mean?#l\r\n#L1#Uh-uh. No way. Nuh.#l");
                                break;
                        }
                        break;
                    case 4:
                        switch (selection) {
                            case 0:
                                // O--oblivion? What... do you mean?
                                cm.sendSimple("Some say that, beyond all memory, beyond all regrets, there is a special place of forgetfulness that prevents anything that we could even call sensible intuition manifold through time. A place like dying every living moment, called #e#roblivion#k#n.\r\n\r\nLess ominous is the fact that many people seem to believe that #roblivion#k lies just beyond #dthe road of regrets#k. Whether that seems likely or even possible by any stretch of the imagination is beyond me. I make no claims one way or the other.\r\n\r\n#L0#S--so... how do I start?#l\r\n#L1#Shit, dude. I am not risking that.#l");
                                break;
                            case 1:
                                // Uh-uh. No way. Nuh.
                                cm.sendOk("#ethe old man sighs once more#n\r\n\r\nSuit yourself.");
                                cm.dispose();
                                return;
                        }
                        break;
                    case 5:
                        switch (selection) {
                            case 0:
                                // S--so... how do I start?
                                cm.sendAcceptDecline("Well, if we're going to be erasing regrets as quickly as necessary I'm going ot have to have you kill #b200 Qualm Monks, Qualm Monk Trainees, Qualm Guardians, and Chief Qualm Guardians#k.\r\n\r\nAdditionally, #e#bLilynouch the Lamented#k#n will need to be slain once and for all.");
                                break;
                            case 1:
                                // Shit, dude. I am not risking that.
                                cm.sendOk("#ethe old man shakes his head wearily#n");
                                cm.dispose();
                                return;
                        }
                        break;
                    case 6:
                        cm.startCQuest(id);
                        cm.dispose();
                        return;
                    default:
                        cm.dispose();
                        return;
                }
            } else if (cm.canComplete(id)) {
                switch (status) {
                    case 0:
                        cm.sendOk("#ethe old man stares at you intensely#n\r\n\r\n#e#rOblivion is upon us.#k#n");
                        break;
                    case 1:
                        cm.rewardPlayer(id);
                        cm.gainFame(18);
                        cm.dispose();
                        return;
                }
            } else {
                cm.sendOk("#econtinues reading silently as the ancient scroll in his hand slowly, but actively, falls to dust#n");
                cm.dispose();
                return;
            }
            break;
    }
}
