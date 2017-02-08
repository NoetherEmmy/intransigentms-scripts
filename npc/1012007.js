/*
 * Trainer Frod
 * Victoria Road | Pet-Walking Road (100000202)
 * Pet Trainer
*/

var SkillFactory = Java.type("net.sf.odinms.client.SkillFactory");

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        if (status >= 0 && mode === 0) {
            cm.dispose();
            return;
        }
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (status === 0) {
            if (cm.haveItem(4031035)) {
                cm.sendNext("Eh, that's my brother's letter! Probably scolding me for thinking I'm not working, or whatever...\r\n\r\nEh? Ahhh! You followed my brother's advice and trained your pet and got up here, huh? Nice. Since you worked hard to get here, I can give you a new skill to you with your pets.");
            } else {
                cm.sendOk("My brother told me to take care of the pet obstacle course, but... since I'm so far away from him, I can't help but wanting to goof around.\r\n\r\nHeh. Since I don't see him in sight, might as well just chill for a few minutes.");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (p.getNoPets() === 0) {
                cm.sendNext("Hmmm... did you really get here with your pet? These obstacles are for pets. What are you here for without one? Get outta here!");
            } else {
                cm.gainItem(4031035, -1);
                //cm.gainCloseness(2 * cm.getC().getChannelServer().getPetExpRate(), 0);
                p.changeSkillLevel(SkillFactory.getSkill(8), 1, 1);
                cm.sendNext("Wow! Nice navigating.\r\n\r\nHere's a skill you might find useful if you've got more than one pet:\r\n\r\n#s8#");
            }
            cm.dispose();
            return;
        }
    }
}
