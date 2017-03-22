/*
 * Ralph the wanderer
 * Singapore | Boat Quay Town
 * ID: 9270030
 *
 * Start NPC for quest ID: 11000
 */

var MapleCQuests = Java.type("net.sf.odinms.client.MapleCQuests");

var status;
var id = 11000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && (status === 0 || type === 4)) {
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
                cm.dispose();
                return;
            } else if (p.hasOpenCQuestSlot() && p.canBeginCQuest(id)) {
                cm.sendSimple(cm.selectQuest(id, "#etakes a bite out of what looks like a stray potato#n"));
            } else {
                cm.sendOk("#etakes a bite out of what looks like a stray potato#n");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            cm.sendSimple(MapleCQuests.loadQuest(id).getInfo() + "\r\n\r\n#L0#(keep walking, ignoring the man)#l\r\n#L1#(look over at the man)#l");
        } else if (status === 2) {
            switch (selection) {
                case 0:
                    cm.sendOk("#egrumbles#n");
                    cm.dispose();
                    return;
                case 1:
                    cm.sendSimple("Yeah, you!\r\n\r\nYa fuckin'... " + (p.getGender() === 0 ? "bow-tie-wearin'" : "frilly-blouse-wearin'") + " milk drinker!\r\n\r\n#L0#Did you just call me a --#l\r\n#L1#At your service.#l");
                    break;
            }
        } else if (status === 3) {
            if (mode === 0) {
                cm.sendOk("#egrumbles#n");
                cm.dispose();
                return;
            }
            var leadText;
            if (selection === 0) {
                leadText = "Look, I don't have time fer yer commentary, kid!";
            } else {
                leadText = "#ethe man pulls his chin up slightly#n";
            }
            cm.sendNext(leadText + "\r\n\r\nThe fine folks at #eUl#nu #eC#nity #eE#nxploratory #eR#negiment (#e#rULCER#k#n) need the help o' some stupid-lookin' kiddos with swords in their hands like yerself.\r\n\r\nUlu City's the name of some old housing projects built just west o' here that went to shit when they found out that one of the trees they built their apartments on had a fuckin' attitude. Now the place looks like a veritable god damn jungle, and I don't just mean to say there's trash everywhere.\r\n\r\nWell, recently some bright fuckin' individual had the lustrous idea to at least document the place, even if it wouldn't be another century 'fore they actually bothered to get rid o' the mess.");
        } else if (status === 4) {
            cm.sendAcceptDecline("That's where you come in, kid.\r\n\r\nThe entire fuckin' #e#rULCER#k#n's really just two fellas.\r\n#e#dCommando Jim#k#n, and some other fella I can't remember the name of. They can't even make their way past the damn dreck to get to that giant apartment the giganto-tree took over.\r\n\r\nIf you could kill\r\n#b50 Veetrons#k, #b50 Berserkies#k, #b30 Montrecers#k,\r\nand bring 'em back\r\n#b50 Veetron Horns#k, #b50 Sweat Beads#k, and #b30 Oil Canisters#k for documentation purposes...\r\n\r\n...hell, they'd prolly put ya on the #e#rULCER#k#n right then 'n' there.");
        } else if (status === 5) {
            if (!cm.startCQuest(id)) {
                cm.sendOk(cm.randomText(8));
            }
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        cm.sendOk("#etakes a bite out of what looks like a stray potato#n");
        cm.dispose();
        return;
    } else if (cm.canComplete(id)) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, "#etakes a bite out of what looks like a stray potato#n"));
        } else if (status === 1) {
            cm.sendOk("Well hot damn, ya fuckin' punk!\r\n\r\nI didn't expect to see you any time soon -- you should go see #e#dCommando Jim#k#n, I'm sure that boy'd love to hear it.");
            cm.dispose();
            return;
        }
    } else {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, "#etakes a bite out of what looks like a stray potato#n"));
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
