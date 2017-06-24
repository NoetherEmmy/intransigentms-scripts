/*
 * Shulynch
 * ID: 1092008
 * Quest ID: 1006
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 1006;
var address;

function start() {
    if (cm.getPlayer().getGender() === 0) {
        address = "bud";
    } else {
        address = "friend";
    }
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
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
    if (!cm.onQuest(id)) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendSimple("I don't recognize you. What are you here for?\r\n\r\n#L2#Just taking a look around.#l\r\n#L3#I'm just here for the showers.#l\r\n#L4#Just wondering if you needed any help around here.#l\r\n#L5#I heard someone by the name of \"Shulynch\" hangs around here.#l");
                status += 2;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            } else {
                cm.sendOk(cm.randomText(1));
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendYesNo(MapleCQuests.loadQuest(id).getInfo());
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("Whatever.");
                cm.dispose();
                return;
            }
            cm.sendSimple("Well, too bad. We don't have any more targets and backstops to put on the range. All the ones back here are busted.\r\n\r\n#L0#Well, shit.#l\r\n#L1#Need some help replacing them?#l");
        } else if (status === 3) {
            if (selection === 0) {
                cm.sendOk("Yep.");
                cm.dispose();
                return;
            } else if (selection === 1) {
                cm.sendAcceptDecline("Oh, yeah, I guess so. Just need some wood, really. Usually we would have already gotten a shipment of lumber from Zipangu by this point, but some highwaymen prolly stole it or something. Who knows.\r\n\r\nAnyways, I guess if you #ereally wanted to#n, you could go and talk to #bSpinel#k; she can take you to #bZipangu#k (Japan). From there you can mosey over to #bThe Forest of Animals#k, where you can find a bunch of dumb raccoons with their butts on fire; they drop #bRaccoon Firewood#k.\r\n\r\nOf course, I don't just need wood. I need something to paint on a couple targets, too. If you go west of there, you'll eventually find yourself in a place called #bShowa Town#k. They make #bGreen Paint and Paintbrushes#k there, so if you could bring me back one of those and #b35 Raccoon Firewoods#k, that'd be great.");
            } else if (selection === 2) {
                cm.sendOk("Yeah? Well this place is closed.");
                cm.dispose();
                return;
            } else if (selection === 3) {
                cm.sendOk("Oh. Well those are downstairs.");
                cm.dispose();
                return;
            } else if (selection === 4) {
                cm.sendAcceptDecline("Oh, yeah, I guess so. Just need some wood, really. Usually we would have already gotten a shipment of lumber from Zipangu by this point, but some highwaymen prolly stole it or something. Who knows.\r\n\r\nAnyways, I guess if you #ereally wanted to#n, you could go and talk to #bSpinel#k; she can take you to #bZipangu#k (Japan). From there you can mosey over to #bThe Forest of Animals#k, where you can find a bunch of dumb raccoons with their butts on fire; they drop #bRaccoon Firewood#k.\r\n\r\nOf course, I don't just need wood. I need something to paint on a couple targets, too. If you go west of there, you'll eventually find yourself in a place called #bShowa Town#k. They make #bGreen Paint and Paintbrushes#k there, so if you could bring me back one of those and #b35 Raccoon Firewoods#k, that'd be great.");
            } else if (selection === 5) {
                cm.sendOk("Huh. Seems like kind of a weird name, yeah? Are you sure you're in the right place?");
                cm.dispose();
                return;
            }
        } else if (status === 4) {
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + MapleCQuests.loadQuest(id).getTitle() + cm.randomText(5));
        } else if (status === 1) {
            if (!p.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "Thanks, " + address + ". Have some of this:"));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            }
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            if (!cm.forfeitCQuestById(id)) {
                cm.sendOk(cm.randomText(9));
            }
            cm.dispose();
            return;
        }
    }
}
