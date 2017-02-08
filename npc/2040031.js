/* 
 * Document Roll
 * ID: 2040031
 * Quest IDs: 1007, 1010
 */

var status;
var ids = [1007, 1010];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (!cm.onQuest() && ids[0] - 1000 === cm.getStory()) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(ids[0], "It's a colorful scroll with some unintelligible scribbles on it.")); 
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.getPlayer().getCQuest().loadInfo(ids[0]) + "\r\n\r\n#L0#(go closer to the document roll)#l\r\n#L1#(walk away)#l\r\n#L2#Hello? Is someone in here?#l\r\n#L3#(shush the document roll for being so loud)#l");
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                if (selection === 0 || selection === 2) {
                    cm.sendSimple("#ethe rustling gets louder; you can almost make out a little papery voice#n\r\n\r\n#L0#(walk away)#l\r\n#L1#Hello!#l\r\n#L2#(wait patiently)#l");
                } else if (selection === 1) {
                    cm.dispose();
                    return;
                } else if (selection === 3) {
                    cm.sendSimple("#ethe rustling stops for a second. but it quickly resumes, and you can almost make out a little papery voice#n\r\n\r\n#L0#(walk away)#l\r\n#L1#Hello!#l\r\n#L2#(wait patiently)#l");
                }
            }
        } else if (status === 3) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                if (selection === 0) {
                    cm.dispose();
                    return;
                } else if (selection === 1 || selection === 2) {
                    cm.sendSimple("#ea voice like wrapping paper projects from the document scroll#n\r\n\r\n#ethe voice seems to be speaking, but it is a language you do not understand#n\r\n\r\n#L0#(attempt to speak back to it by imitating its language)#l\r\n#L1#(give a confused look)#l\r\n#L2#I'm sorry, but are you a talking piece of paper?#l\r\n#L3#(walk away)#l");
                }
            }
        } else if (status === 4) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                if (selection === 0) {
                    cm.sendOk("#ethe document pauses, as if it were processing your vocalizations#n\r\n\r\n#ethe document curls up tightly and then stops making noise#n");
                    cm.dispose();
                    return;
                } else if (selection === 1 || selection === 2) {
                    cm.sendNext("#ethe document transitions into making garbled paper noises, which you do not think are a language#n\r\n\r\n#ethe document pauses#n");
                } else if (selection === 3) {
                    cm.dispose();
                    return;
                }
            }
        } else if (status === 5) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                cm.sendSimple("#ethe cartouche speaks leafily, now in a language you can partway understand:#n\r\n\r\nHoi. Mei I ask dat wat jier it is?\r\n\r\n#L0#(tell the document what year it is)#l\r\n#L1#(give the document a fake past date)#l\r\n#L2#(give the document a fake future date)#l\r\n#L3#(stare blankly)#l\r\n#L4#(walk away)#l");
            }
        } else if (status === 6) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                var mstart = "";
                if (selection === 0) {
                    mstart = "#ethe document produces a stationery sigh#n\r\n\r\nI tink it is tiime, dan. Of better seid, paest tiime. I wast did soepose to has binne woken up by no.";
                } else if (selection === 1) {
                    mstart = "#ethe document wrinkles for a second#n\r\n\r\nDat kin naught be roigcht. Dat is naught iens possible. Binne jou licgan to mie?\r\n\r\nNo maetter: Wy moatte gean a de taask by de hande.";
                } else if (selection === 2) {
                    mstart = "#ethe document flusteredly flaps its folds#n\r\n\r\nWell kom on, dan! It is almost te let! Wy moatte hurry!";
                } else if (selection === 3) {
                    mstart = "#ethe document flutters softly#n\r\n\r\nAh. I begryp it. Ne'er sjeen in talking scrol b'foar, dan? Yn anie case, wy moatte receivet on with it!";
                } else if (selection === 4) {
                    cm.dispose();
                    return;
                }
                cm.sendSimple(mstart + "\r\n\r\n#L0#Wh -- what are you worried about?#l\r\n#L1#(walk away)#l");
            }
        } else if (status === 7) {
            if (selection === 0) {
                cm.sendSimple("So jou naught knoe, huh? Well I moatten en expected this. Hoe kin I explane this...\r\n\r\nLette wy trie de sceort fourme of it. Jou see, as #bAmbyld#k makke this woruld, se bisprinkelen yn a few ting. Ting dy't wolde helpe fix de flowan of #btima#k hit sylf. Lik a sylf-rihtan device. I bin oene of those.\r\n\r\n#L0#Wait, so some god created you in order to fix... time?#l\r\n#L1#(walk away)#l");
            } else if (selection === 1) {
                cm.dispose();
                return;
            }
        } else if (status === 8) {
            if (mode === 0) {
                cm.sendOk("#eThaet wyrd of 'e woruld hinget of on this!#n");
                cm.dispose();
                return;
            }
            if (selection === 0) {
                cm.sendSimple("Eh... mear of minder, ja.\r\n\r\n#L0#So... why are you telling me this?#l\r\n#L1#The fact that this scroll can talk is already enough for me; I'm out.#l\r\n#L2#(walk away)#l");
            } else if (selection === 1) {
                cm.dispose();
                return;
            }
        } else if (status === 9) {
            if (selection === 0) {
                cm.sendAcceptDecline("Well onestely, der is no bodi elles hjir, ond I wast did soepose to has binne woken up by #esum on#n. I wit net knawan oft jou kneow this, but tiime travailen is possible hjir. In ordre to repare de estrange raesultes fan this, I neidich jou te helpen mie re-aligne de flowan of tima.\r\n\r\nTo do dit, I neodian jou to slean #b55 Chronoi#k, #b40 Tick-Tocks#k, an bringan mie #b1 Table Clock#k an #b1 Clock Spring#k (fram da #bTicks#k) to put togaedere.");
            } else if (selection === 1) {
                cm.sendNext("Gean net!");
                cm.dispose();
                return;
            } else if (selection === 2) {
                cm.dispose();
                return;
            }
        } else if (status === 10) {
            cm.startCQuest(ids[0]);
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest() && ids[1] - 1000 === cm.getStory()) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(ids[1], "It's a colorful scroll with some unintelligible scribbles on it.")); 
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("#ethe document rolls itself up tight and stops making noise#n");
                cm.dispose();
                return;
            } else {
                cm.sendAcceptDecline(cm.getPlayer().getCQuest().loadInfo(ids[1]));
            }
        } else if (status === 2) {
            cm.startCQuest(ids[1]);
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest()) {
        cm.sendOk("It's a colorful scroll with some unintelligible scribbles on it.");
        cm.dispose();
        return;
    } else if (!cm.onQuest(ids[0]) && !cm.onQuest(ids[1])) {
        if (status === 0) {
            cm.sendYesNo("Jou already acsept'd " + cm.getPlayer().getCQuest().getTitle() + ". Do jou wysch to cancele it?"); 
        } else if (status === 1) {
            cm.startCQuest(0);
            cm.dispose();
        }
    } else if (cm.onQuest(ids[0]) && cm.canComplete()) {
        if (status === 0) { 
            cm.sendSimple(cm.selectQuest(ids[0], "It's a colorful scroll with some unintelligible scribbles on it.")); 
        } else if (status === 1) { 
            cm.sendOk(cm.showReward("Verray wel dien, myn childe."));
        } else if (status === 2) { 
            cm.rewardPlayer(1, 0);
            cm.getPlayer().sendHint(cm.randomText(6));
            cm.dispose();
        }
    } else if (cm.onQuest(ids[1]) && cm.canComplete()) {
        if (status === 0) { 
            cm.sendSimple(cm.selectQuest(ids[1], "It's a colorful scroll with some unintelligible scribbles on it.")); 
        } else if (status === 1) { 
            cm.sendOk(cm.showReward("Verray wel dien, myn childe."));
        } else if (status === 2) { 
            cm.rewardPlayer(1, 0);
            cm.getPlayer().sendHint(cm.randomText(6));
            cm.dispose();
        }
    } else if ((cm.onQuest(ids[0]) || cm.onQuest(ids[1])) && !cm.canComplete()) { 
        if (status === 0) { 
            if (mode === 0) {
                cm.dispose();
            } else { 
                cm.sendSimple(cm.selectQuest(ids[cm.onQuest(ids[0]) ? 0 : 1], "It's a colorful scroll with some unintelligible scribbles on it.")); 
            }
        } else if (status === 1) {
            cm.sendYesNo("Jou hawwe net finisshed jo task giet! Jou cunna loek it uppe bi te typen #b@questinfo#k yn da chater.\r\nDo jou wysch to cancele this quaeste?");
        } else if (status === 2) {
            cm.startCQuest(0);
            cm.dispose();
        }
    }
}
