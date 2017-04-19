/*
 * Nine Spirit's Baby Dragon
 * ID: 2081008
 *
 * End NPC for "Dragon Squad's Mission" quest, ID 3714
 */

var MapleQuest = Java.type("net.sf.odinms.server.quest.MapleQuest");

var status;
var questId = 3706;
var dragonStone = 2041200;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    status++;

    switch (status) {
        case 0:
            cm.sendNext("#ean enormous \"baby\" dragon emerges from the egg, new-born and easily a head taller than yourself");
            break;
        case 1:
            cm.sendNext("#eas the dragon-infant opens its eyes for the first time, you realize your grave mistake\r\n\r\nwhy would you purposely bring another \"Horned Tail\" into this world? yet another terrorist of humanity and all that is good, endlessly killing for food and for sport");
            break;
        case 2:
            cm.sendNext("#eas the dragon-infant looks over you with fresh eyes and the curiosity of a new-born, the writings of Konrad Lorenz come to your mind\r\n\r\nmaybe you have a chance to undo your mistake, if only you could get this giant baby to imprint on you");
            break;
        case 3:
            cm.sendNext("#emuch to your dismay, the dragon-infant is perhaps a bit smarter than they look\r\n\r\nhaving looked you over and determined you to be much too small and not nearly smelly enough to be their mother, the dragon-infant makes a hostile face and attempts to douse you in flame");
            break;
        case 4:
            cm.sendNext("#eluckily for you, the dragon-infant is much too young to be breathing fire\r\n\r\ninstead, a single flaming stone emerges from the throat of this neonate and clumsily rolls towards you");
            break;
        case 5:
            cm.sendNext("#eas the dragon-infant realizes that that probably wasn't enough to get rid of you, they become more hostile\r\n\r\nyou think it's probably best to leave while you can; this lizard already has the height and weight advantage by far, and at least you have this... uh... stone thing");
            break;
        case 6:
            cm.sendOk("#eQuest complete:#n\r\n\r\n#i" + dragonStone + "#  x1\r\n\r\n#eEXP:#n #b597,000");
            MapleQuest.getInstance(questId).forceComplete(p, 2081008);
            cm.gainItem(dragonStone);
            p.gainExp(597000 * p.getClient().getChannelServer().getExpRate(), true, true);
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
