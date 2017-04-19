/*
 * Neve
 * ID: 2010003
 *
 * Pre-quest (and post-quest) NPC for SCPQ
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 9000;
var recipepaper = 4032064;
var gachratio = 5;
var questText = "Hey, kid. Y'know what I'm thinkin'?\r\n\r\nI can't do this shit anymore. I am just terrible at making shoes -- I can't even put the soles in right, man. The whole shoe just fuckin' falls apart!\r\n\r\nPlus, I don't even like shoes, dude.\r\nI just want to #emake food#n. No one ever took me seriously when I said stuff like that though, with #r#eThe Chef#n#k having monopolized the entire fuckin' culinary industry for gods know how long...\r\n\r\nSay. Do you think you could, I dunno, help me out a bit?";

function selectPartyQuest(msg) {
    var intro = msg + "\r\n\r\n#fUI/UIWindow.img/QuestIcon/3/0#\r\n#L0#";
    var selection = "#k[#rParty quest available#k]";
    return intro + selection + " #eSous Chef Party Quest#n (levels 21 ~ 250)#l";
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === 1) {
        status++;
    } else if (mode === 0) {
        if (status === 0 || type === 4) {
            cm.dispose();
            return;
        }
        status--;
    } else {
        cm.dispose();
        return;
    }

    if (!p.isScpqFlagged()) {
        switch (status) {
            case 0:
                cm.sendSimple(selectPartyQuest("#esigh#n\r\nI don't think this whole cobbler thing is working out for me..."));
                break;
            case 1:
                if (mode === 0) {
                    cm.dispose();
                    return;
                }
                cm.sendSimple(questText + "\r\n\r\n#L0#Sure, I could help you make food, I guess.#l\r\n#L1#Help you... in what way?#l\r\n#L2#Nah, sorry fam.#l");
                break;
            case 2:
                var mainText = "I need The Chef's recipes, man.\r\n\r\nI can't start a culinary enterprise like this -- not without the top-notch, bleeding-edge formulas. Problem is, #e#rThe Chef#k#n has got all of those to himself. That's where you come in, though.\r\n\r\nI need you to #esteal The Chef's recipes for me#n. The Chef never shows himself; heck, no one even knows where the guy lives. That's how he keeps his recipes secret.\r\n\r\nHowever, there is #eone#n time that you can maybe find him. Every year in Ossyria there's a big, fancy event called the \"Aniversary of the Realm.\" Basically a fancy rich-people bash -- this year's is actually coming up pretty soon.\r\n\r\nIf you could #bget together with some friends#k and talk to someone who can take you to #e#dLilin's Manor#k#n, it's possible that you could sneak in and make off with some of The Chef's juicy recipes.\r\n\r\nHeck, I know a guy that can take you there even if you don't have any connections. His name's #bBearlywyne#k. Not exactly the greatest transportation service in the realm, but he can get you there.";
                var leadText;
                switch (selection) {
                    case 0:
                        leadText = "Nah, well, that's nice of you to offer but...\r\n\r\n";
                        break;
                    case 1:
                        leadText = "";
                        break;
                    default:
                        cm.dispose();
                        return;
                }
                if (p.getLevel() > 20) {
                    cm.sendAcceptDecline(leadText + mainText);
                } else {
                    cm.sendOk(leadText + mainText + "\r\n\r\nOnce you're #eat least level 21#n, you could get together with some friends to do this whole operation. For right now though, I think you should shy away from the big stuff.");
                    cm.dispose();
                    return;
                }
                break;
            case 3:
                p.setScpqFlag(true);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
        return;
    }

    if (p.getLevel() < 20) {
        cm.sendOk("Y'know, you really look like you could grow up to be one tough cookie someday.");
        cm.dispose();
        return;
    }
    if (p.isScpqFlagged() && p.completedCQuest(id)) {
        switch (status) {
            case 0:
                if (cm.itemQuantity(recipepaper) > 0) {
                    cm.sendYesNo("Oh my god, are those recipes from The Chef himself?!");
                    // TODO
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk("I need The Chef's recipes, man.\r\n\r\nI can't start a culinary enterprise like this -- not without the top-notch, bleeding-edge formulas.");
                    cm.dispose();
                    return;
                }
                break;
            case 1:
                var gachcount = cm.itemQuantity(recipepaper) * gachratio;
                cm.sendOk("Thank you so much! Here, have these:\r\n\r\n#i5220000#  #bx" + gachcount + "#k");
                cm.gainItem(recipepaper, -1 * cm.itemQuantity(recipepaper));
                cm.gainItem(5220000, gachcount);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (!cm.onQuest(id)) {
        switch (status) {
            case 0:
                cm.sendSimple(cm.selectQuest(id, "#esigh#n\r\nI don't think this whole cobbler thing is working out for me..."));
                break;
            case 1:
                cm.sendAcceptDecline(MapleCQuests.loadQuest(id).getInfo());
                break;
            case 2:
                if (!cm.startCQuest(id)) {
                    cm.sendOk(cm.randomText(8));
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else if (!cm.onQuest(id)) {
        switch (status) {
            case 0:
                cm.sendYesNo(cm.randomText(4) + MapleCQuests.loadQuest(id).getTitle() + cm.randomText(5));
                break;
            case 1:
                if (!cm.forfeitCQuestById(id)) {
                    cm.sendOk(cm.randomText(9));
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
                cm.sendSimple(cm.selectQuest(id, "#esigh#n\r\nI don't think this whole cobbler thing is working out for me..."));
                break;
            case 1:
                cm.sendNext(cm.showReward(id, "Damn, dude... I can almost feel myself becoming the master chef..."));
                break;
            case 2:
                cm.sendOk("Oh, and -- ummmm -- hold up.\r\n\r\nLike I said, you know, I can start cooking up some mad meals with these supplies you've brought me here, but...\r\nI know it's just not going to cut it.\r\n\r\nThe Chef's recipes are just too strong. That's why I need you to #esteal The Chef's recipes for me#n. The Chef never shows himself; heck, no one even knows where the guy lives. That's how he keeps his recipes secret.\r\n\r\nHowever, there is #eone#n time that you can maybe find him. Every year here in Ossyria there's a big, fancy event called the \"Aniversary of the Realm.\" Basically a fancy rich-people bash -- this year's is actually coming up pretty soon.\r\n\r\nIf you could #bget together with some friends#k and talk to someone who can take you to #e#dLilin's Manor#k#n, it's possible that you could sneak in and make off with some of The Chef's juicy recipes.\r\n\r\nHeck, I know a guy that can take you there even if you don't have any connections. His name's #bBearlywyne#k. Not exactly the greatest transportation service in the realm, but he can get you there.\r\n\r\nHe usually hangs around #eOrbis proper#n, so check there.");
                break;
            case 3:
                cm.rewardPlayer(id);
                p.setScpqFlag(true);
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    } else {
        switch (status) {
            case 0:
                if (mode === 0) {
                    cm.dispose();
                    return;
                } else {
                    cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
                }
                break;
            case 1:
                cm.sendYesNo(cm.randomText(7));
                break;
            case 2:
                if (!cm.forfeitCQuestById(id)) {
                    cm.sendOk(cm.randomText(9));
                }
                cm.dispose();
                return;
            default:
                cm.dispose();
                return;
        }
    }
}
