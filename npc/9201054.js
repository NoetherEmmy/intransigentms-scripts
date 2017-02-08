/*
 * Lita Lawless
 * ID: 9201054
 */

load('nashorn:mozilla_compat.js');

var status = 0;
var questno = -1;
var hhquestid = 8235;
var bfquestid = 8237;
var hhquestitem = 4031903;
var bfquestitem = 4032013;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        if (mode === 0 && status === 0) {
            cm.dispose();
            return;
        }
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (cm.getPlayer().getLevel() < 75) {
            cm.sendOk("Hey there. I'm Lita. Lita Lawless.");
            cm.dispose();
            return;
        } else {
            if (status === 0) {
                var choicestring = "So, you think you got something important for me?\r\n";
                if (cm.getQuestStatus(hhquestid) != Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
                    cm.startQuest(hhquestid);
                }
                if (cm.getQuestStatus(bfquestid) != Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
                    cm.startQuest(bfquestid);
                }
                choicestring += "\r\n#fUI/UIWindow.img/QuestIcon/3/0#\r\n#e#d#L0#One Step A-Head#l#k#n\r\n";
                choicestring += "\r\n#fUI/UIWindow.img/QuestIcon/3/0#\r\n#e#d#L1#Catch a Bigfoot by the Toe#l#k#n\r\n";
                cm.sendSimple(choicestring);
            } else if (status === 1) {
                if (selection === 0) {
                    var xp, meso;
                    if (cm.getQuestStatus(hhquestid) != Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
                        xp = 150000 * 4;
                        meso = 200000;
                    } else {
                        xp = 75000 * 4;
                        meso = 100000;
                    }
                    if (cm.itemQuantity(hhquestitem) > 0) {
                        cm.sendNext("Oh my god! Is this a #ereal#n Headless Horseman's Jack O'Lantern?!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0#  " + String(xp) + "\r\n#fUI/UIWindow.img/QuestIcon/7/0#  " + String(meso) + "\r\n");
                        questno = 0;
                    } else {
                        cm.sendOk("I still need you to bring me that #bJack O'Lantern#k.");
                        cm.dispose();
                        return;
                    }
                } else if (selection === 1) {
                    var xp, meso;
                    if (cm.getQuestStatus(hhquestid) != Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
                        xp = 150000 * 4;
                        meso = 200000;
                    } else {
                        xp = 75000 * 4;
                        meso = 100000;
                    }
                    if (cm.itemQuantity(bfquestitem) > 0) {
                        cm.sendNext("Oh my god! Is this a #ereal#n Bigfoot's Toe, from the Sasquatch himself?!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0#  200,000\r\n#fUI/UIWindow.img/QuestIcon/7/0#  300,000\r\n");
                        questno = 1;
                    } else {
                        cm.sendOk("I still need you to bring me that #bBigfoot's Toe#k.");
                        cm.dispose();
                        return;
                    }
                }
            } else if (status === 2) {
                if (questno === 0) {
                    if (cm.getQuestStatus(hhquestid) != Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
                        cm.gainItem(hhquestitem, -1);
                        cm.gainExp(150000 * 4);
                        cm.gainMeso(200000);
                        cm.completeQuest(hhquestid);
                        cm.dispose();
                        return;
                    } else {
                        cm.gainItem(hhquestitem, -1);
                        cm.gainExp(75000 * 4);
                        cm.gainMeso(100000);
                        cm.completeQuest(hhquestid);
                        cm.dispose();
                        return;
                    }
                } else if (questno === 1) {
                    if (cm.getQuestStatus(bfquestid) != Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
                        cm.gainItem(bfquestitem, -1);
                        cm.gainExp(200000 * 4);
                        cm.gainMeso(300000);
                        cm.dispose();
                        return;
                    } else {
                        cm.gainItem(bfquestitem, -1);
                        cm.gainExp(100000 * 4);
                        cm.gainMeso(150000);
                        cm.completeQuest(bfquestid);
                        cm.dispose();
                        return;
                    }
                } else {
                    cm.dispose();
                    return;
                }
            }
        }
    }
}
