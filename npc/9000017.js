/*
 * @Name         Coco
 * @NPC:         9000017
 * @Purpose:     Hair/Face/Eye Changer
 * @Map:         Free Market & Henesys
 */
 
var MaplePacketCreator           = Java.type("net.sf.odinms.tools.MaplePacketCreator");
var MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");
var Collectors                   = Java.type("java.util.stream.Collectors");
var MapleCharacter               = Java.type("net.sf.odinms.client.MapleCharacter");
var MapleCharacterUtil           = Java.type("net.sf.odinms.client.MapleCharacterUtil");

var status = 0;
var beauty = 0;
var skin = [0, 1, 2, 3, 4, 9]; // 5, 10 removed (Invalid pointer).
var smallPrice = 1500;
var largePrice = 2000;
var ii, hairs, faces, lenses, a;

function start() {
    ii = MapleItemInformationProvider.getInstance();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i, color;

    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        ii.cacheFaceData();
        ii.cacheHairData();
        var maleFaceListCount = ii.getFaceListCount(0);
        var femaleFaceListCount = ii.getFaceListCount(1);
        var ungenderedFaceListCount = ii.getFaceListCount(2);
        var maleHairListCount = ii.getHairListCount(0);
        var femaleHairListCount = ii.getHairListCount(1);
        var ungenderedHairListCount = ii.getHairListCount(2);
        var msg = "Hey there, I can change your look. What would you like to change?\r\n#L0#Skin color#l\r\n#L100#Male hairstyles:\r\n\t\t\t  [1]#l ";
        for (i = 1; i < maleHairListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += "#L" + (100 + i) + "#[" + (i + 1) + "]#l ";
        }
        msg += "\r\n#L200#Female hairstyles:\r\n\t\t\t  [1]#l" + (i < 9 ? " " : "");
        for (i = 1; i < femaleHairListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += "#L" + (200 + i) + "#[" + (i + 1) + "]#l" + (i < 9 ? " " : "");
        }
        msg += "\r\n#L300#Ungendered hairstyles:\r\n\t\t\t  [1]#l ";
        for (i = 1; i < ungenderedHairListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += "#L" + (300 + i) + "#[" + (i + 1) + "]#l" + (i < 9 ? " " : "");
        }
        msg += "\r\n#L400#Male faces:\r\n\t\t\t  [1]#l ";
        for (i = 1; i < maleFaceListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += "#L" + (400 + i) + "#[" + (i + 1) + "]#l" + (i < 9 ? " " : "");
        }
        msg += "\r\n#L500#Female faces:\r\n\t\t\t  [1]#l ";
        for (i = 1; i < femaleFaceListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += "#L" + (500 + i) + "#[" + (i + 1) + "]#l" + (i < 9 ? " " : "");
        }
        msg += "\r\n#L600#Ungendered faces:\r\n\t\t\t  [1]#l ";
        for (i = 1; i < ungenderedFaceListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += "#L" + (600 + i) + "#[" + (i + 1) + "]#l" + (i < 9 ? " " : "");
        }
        msg += "\r\n#L1#Hair color#l\r\n#L2#Lens color#l\r\n#L3#Gender#l\r\n#L4#I know the ID of the hair/face I want.#l\r\n#L5#I want to change my name.#l";
        cm.sendSimple(msg);
    } else if (status === 1) {
        beauty = selection;

        if (selection === 0) { /* Skin color */
            cm.sendStyle("Changing your skin will cost you #r" + smallPrice + " NX#k.\r\nPick one:", skin);
        } else if (selection === 1) { /* Hair color */
            hairs = [];
            ii.getAllColors(p.getHair()).forEach(function(x) { hairs.push(x); });
            cm.sendStyle("Changing your hair color will cost you #r" + smallPrice + " NX#k.\r\nPick one:", hairs);
        } else if (selection === 2) { /* Lens color */
            lenses = [];
            ii.getAllColors(p.getFace()).forEach(function(x) { lenses.push(x); });
            cm.sendStyle("Changing your lens will cost you #r" + smallPrice + " NX#k.\r\nPick one:", lenses);
        } else if (selection === 3) { /* Gender */
            cm.sendYesNo("Changing your gender will cost you #r" + smallPrice + " NX#k. Are you sure you want to undergo the transformation?");
        } else if (selection === 5) {
            cm.sendGetText("Changing your name will cost you #r#e3 Vote Points#n#k.\r\n\r\nIf you're sure you want to change your name, please enter a new one below:");
        } else if (selection >= 100 && selection < 400) { /* Hairstyle */
            color = p.getHair() % 10; // Last digit of ID corresponds to the color of the hair.
            hairs = [];
            ii.getHairData(Math.floor(selection / 100) - 1, selection % 100)
                               .stream()
                               .filter(function(x) { return x % 10 === color && Math.floor(x / 10) !== 3925 && Math.floor(x / 10) !== 3520; })
                               .collect(Collectors.toList())
                               .forEach(function(x) { hairs.push(x); });
            if (hairs.length < 1) {
                ii.getHairData(Math.floor(selection / 100) - 1, selection % 100).forEach(function(x) { hairs.push(x); });
            }
            var filteredHairs = [3202, 3215, 3924];
            hairs = hairs.filter(function(x) {
                return filteredHairs.indexOf(Math.floor(x / 10)) === -1;
            });
            cm.sendStyle("Changing your hair will cost you #r" + largePrice + " NX#k.\r\nPick one:", hairs);
        } else if (selection >= 400 && selection < 700) { /* Face */
            color = p.getFace() % 1000;
            color = Math.floor(color / 100); // Hundreds place of ID corresponds to the color of the lenses.
            faces = [];
            ii.getFaceData(Math.floor(selection / 100) - 4, selection % 100)
                               .stream()
                               .filter(function(x) { return Math.floor(x % 1000 / 100) === color && !sameFace(x, 20692); })
                               .collect(Collectors.toList())
                               .forEach(function(x) { faces.push(x); });
            if (faces.length < 1) {
                ii.getFaceData(Math.floor(selection / 100) - 4, selection % 100).forEach(function(x) { faces.push(x); });
            }
            cm.sendStyle("Changing your face will cost you #r" + largePrice + " NX#k.\r\nPick one:", faces);
        } else if (selection === 4) {
            cm.sendGetNumber("Enter the #eID#n here:\r\n", 20000, 20000, 39999);
        }
    } else if (status === 2) {
        var notEnteredId = true;

        if (beauty === 0) {
            if (cm.buyWithNx(smallPrice)) {
                cm.setSkin(skin[selection]);
            } else {
                cm.sendOk("Sorry, you don't have enough NX to purchase this look.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
            }
        } else if (beauty === 1) {
            if (cm.buyWithNx(smallPrice)) {
                cm.setHair(hairs[selection]);
            } else {
                cm.sendOk("Sorry, you don't have enough NX to purchase this look.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
            }
        } else if (beauty === 2) {
            if (cm.buyWithNx(smallPrice)) {
                cm.setFace(lenses[selection]);
            } else {
                cm.sendOk("Sorry, you don't have enough NX to purchase this look.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
            }
        } else if (beauty === 3) {
            if (cm.buyWithNx(smallPrice)) {
                p.setGender(p.getGender() === 1 ? 0 : 1);
                p.getClient().getSession().write(MaplePacketCreator.getCharInfo(p));
                p.getMap().removePlayer(p);
                p.getMap().addPlayer(p);
            } else {
                cm.sendOk("Sorry, you don't have enough NX to purchase a gender change.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
            }
        } else if (beauty === 5) {
            if (p.getVotePoints() >= 3) {
                var newName = cm.getText();
                if (MapleCharacter.getIdByName(newName, 0) !== -1) {
                    cm.sendOk("That name is already in use!");
                    cm.dispose();
                    return;
                }
                if (!MapleCharacterUtil.isNameLegal(newName) || ("" + newName).toLowerCase().indexOf("xiuz") !== -1) {
                    cm.sendOk("That name isn't legal.");
                    cm.dispose();
                    return;
                }
                p.setName(newName, true);
                p.getClient().getSession().write(MaplePacketCreator.getCharInfo(p));
                p.getMap().removePlayer(p);
                p.getMap().addPlayer(p);
                p.setVotePoints(p.getVotePoints() - 3);
                p.dropMessage(5, "You have lost 3 Vote Points.");
            } else {
                cm.sendOk("Sorry, you don't have enough Vote Points to purchase a name change.\r\n\r\nVote Point count: #b" + p.getVotePoints() + "#k");
            }
        } else if (beauty >= 100 && beauty < 400) {
            if (cm.buyWithNx(largePrice)) {
                cm.setHair(hairs[selection]);
            } else {
                cm.sendOk("Sorry, you don't have enough NX to purchase this look.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
            }
        } else if (beauty >= 400 && beauty < 700) {
            if (cm.buyWithNx(largePrice)) {
                cm.setFace(faces[selection]);
            } else {
                cm.sendOk("Sorry, you don't have enough NX to purchase this look.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
            }
        } else if (beauty === 4) {
            var result = ii.getAllColors(selection);
            a = [];
            if (result.size() < 1) {
                cm.sendOk("Sorry, it seems we don't have that ID!");
            } else {
                result.forEach(function(x) { a.push(x); });
                cm.sendStyle("Changing your look will cost you #r" + largePrice + " NX#k, plus another #r" + smallPrice + " NX#k if a different color than you already have is chosen.\r\nPick one:", a);
                notEnteredId = false;
            }
        }
        if (notEnteredId) {
            cm.dispose();
            return;
        }
    } else if (status === 3) {
        var price = largePrice;

        if (a[selection] < 30000) { // Face
            color = p.getFace() % 1000;
            color = Math.floor(color / 100);
            if (Math.floor(a[selection] % 1000 / 100) != color) {
                price += smallPrice;
            }
            if (cm.buyWithNx(price)) {
                cm.setFace(a[selection]);
            } else {
                cm.sendOk("Sorry, you don't have enough NX to purchase this look.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
            }
        } else { // Hair
            color = p.getHair() % 10;
            if (a[selection] % 10 != color) {
                price += smallPrice;
            }
            if (cm.buyWithNx(price)) {
                cm.setHair(a[selection]);
            } else {
                cm.sendOk("Sorry, you don't have enough NX to purchase this look.\r\n\r\nPaypal NX: #b" + cm.getNx(1) + "#k\r\nMaple points: #r" + cm.getNx(2) + "#k\r\nCard NX: #d" + cm.getNx(3) + "#k");
            }
        }
        cm.dispose();
        return;
    }
}

function sameFace(id1, id2) {
    return id1 - Math.floor(id1 % 1000 / 100) * 100 ===
           id2 - Math.floor(id2 % 1000 / 100) * 100;
}
