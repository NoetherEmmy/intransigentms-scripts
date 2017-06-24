/*
 * Mr. Pickall
 * Kerning City
 *
 * ID: 9000008
 * Quest ID: 2021
 */

"use strict";

const MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");
const Rectangle    = Java.type("java.awt.Rectangle");

let status;
const id = 2021;
const mapId = 105;
const mobId = 8200000;
const spawnArea = new Rectangle(-430, -2900, 800, 2850);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();

    if (mode === -1 || mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    if (p.getMap().getId() === 105) {
        if (cm.canComplete(id)) {
            const m = p.getMap();
            m.cancelAllPeriodicMonsterDrops();
            m.disposeAllDynamicSpawnWorkers();
            m.killAllMonsters(false);
            m.clearDrops();
            cm.warp(103000000);
        }
        cm.dispose();
        return;
    } else if (!cm.onQuest(id)) {
        if (status === 0) {
            if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "#eglares back at you with a keystony gaze#n"));
            } else {
                cm.sendOk("#eglares back at you with a keystony gaze#n");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            cm.sendSimple(`\
${MapleCQuests.loadQuest(id).getInfo()}\r\n\
\r\n\
#L0#Um... what do you want?#l\r\n\
#L1#(stare back at the man)#l\r\n\
#L2#(walk away, ignoring the man)#l`);
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("#egrumbles under breath#n");
                cm.dispose();
                return;
            } else {
                switch (selection) {
                    case 2:
                        cm.sendOk("#eyou feel the man's gaze, cold, on the back of your neck as you walk away#n");
                        cm.dispose();
                        return;
                    case 1:
                    case 0:
                        cm.sendSimple("#eyou take a moment to look the man over when he doesn't respond to you immediately#n\r\n\r\n#eyou soon realize that the man isn't quite staring directly at you or really making any eye contact#n\r\n\r\n#eyou notice the man's gaze start to gradually falter, a sleepy/drowsed look coming slowly over his visage#n\r\n\r\n#L0#(attempt to get the man's attention with more obvious movement)#l\r\n#L1#(look around to see if anyone is nearby that might be able to help or who knows the man)#l\r\n#L2#(step back)#l\r\n#L3#(walk briskly away)#l");
                        break;
                }
            }
        } else if (status === 3) {
            if (mode === 0) {
                cm.sendOk("#egrumbles under breath#n");
                cm.dispose();
                return;
            } else {
                let msg;
                switch (selection) {
                    case 0:
                        msg = "#eas you wave your arms in front of the man, he appears to be limply taking a dive towards your arms, and towards the ground below#n";
                        break;
                    case 1:
                        msg = "#eyou swiftly scan your surroundings, but much to your dismay most (all?) of the shops are closed, and no one is in sight#n\r\n\r\n#eas you are scanning around, you notice the man out of the corner of your eye limply and slowly taking a dive towards the ground#n";
                        break;
                    case 2:
                        msg = "#eas you step backwards, you could swear for a second that the man stepped with you; but he is still limply sitting down#n\r\n\r\n#eyou soon realize that the man is headed straight for the ground#n";
                        break;
                    case 3:
                        cm.dispose();
                        return;
                }
                msg += "\r\n\r\n#L0#(walk towards the man to help him up from falling)#l\r\n#L1#(walk away)#l";
                cm.sendSimple(msg);
            }
        } else if (status === 4) {
            switch (selection) {
                case 0:
                    cm.sendSimple("#eas you pull the man towards a more upright position, his gaze finally meets yours and you feel a strange compulsion come over you#n\r\n\r\n#L0#(attempt to resist the compulsion)#l\r\n#L1#(try to figure out what the compulsion is)#l\r\n#L2#(give in to the compulsion)#l");
                    break;
                case 1:
                    cm.sendOk("#eas you walk away you hear the man slackly hit the stony ground below#n");
                    cm.dispose();
                    return;
            }
        } else if (status === 5) {
            switch (selection) {
                case 0:
                    cm.sendOk("#eyou succcessfully resist the compulsion and put the man back where you found him#n");
                    cm.dispose();
                    return;
                case 1:
                    p.dropMessage("As you consider the source and nature of this strange feeling, you are overcome by its power.");
                    p.dropMessage("You feel yourself palpably (and without your permission) relocated into the mind of the strange man.");
                    break;
                case 2:
                    p.dropMessage("You are swiftly overcome by the power of the foreign compulsion.");
                    p.dropMessage("You feel yourself palpably relocated into the mind of the strange man.");
                    break;
            }
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            } else {
                const map = p.getClient().getChannelServer().getMapFactory().getMap(mapId);
                if (map.playerCount() > 0) {
                    p.dropMessage("It looks like someone's already doing the quest on this channel. Maybe try another channel?");
                    cm.dispose();
                    return;
                }
                map.disposeAllDynamicSpawnWorkers();
                map.killAllMonsters(false);
                map.clearDrops();
                const dsw = map.registerDynamicSpawnWorker(
                    mobId,
                    spawnArea,
                    2500,
                    92 * 1000,
                    false,
                    0
                );
                cm.warp(map.getId());
                dsw.start();
            }
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        cm.sendOk("#eglares back at you with a keystony gaze#n");
        cm.dispose();
        return;
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "#eglares back at you with a keystony gaze#n"));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(id, "#eMr. Pickall looks quite (understandably) discombobulated, but far more conscious than he looked when you first came across him#n\r\n\r\nO--oh. My goodness, thank you. I've been having a terrible time of these night terrors, ever since I tried to help pick that #bCasey#k guy's locks..."));
        } else if (status === 2) {
            cm.rewardPlayer(id);
            cm.gainFame(18);
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "#eglares back at you with a keystony gaze#n"));
            }
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
