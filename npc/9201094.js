/*
 * Corine
 * ID: 9201094
 *
 * New Leaf City
 * @whodrops NPC
 */

var status;
var initials =
[
    '#', 'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z'
];
var typeSelection;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendSimple("Hi, I'm Corine! I can tell you which monsters drop whichever item you're searching for.\r\nWhat kind of item are you interested in?:\r\n\r\n#L0#Use#l\r\n#L1#Equip#l\r\n#L2#Etc#l");
    } else if (status === 1) {
        typeSelection = selection;
        var initSelectionStr = "";
        for (var i = 0; i < initials.length; ++i) {
            initSelectionStr += "#L" + i + "#" + (i !== 0 ? initials[i] : "Non-letter character") + "#l\r\n";
        }
        cm.sendSimple("What is the initial letter of the item name?:\r\n\r\n" + initSelectionStr);
    } else if (status === 2) {
        if (typeSelection === 0) {
            cm.sendSimple(cm.listConsume(initials[selection]));
        } else if (typeSelection === 1) {
            cm.sendSimple(cm.listEqp(initials[selection]));
        } else if (typeSelection === 2) {
            cm.sendSimple(cm.listEtc(initials[selection]));
        }
    } else if (status === 3) {
        cm.sendOk(cm.whoDrops(selection));
        cm.dispose();
        return;
    }
}
