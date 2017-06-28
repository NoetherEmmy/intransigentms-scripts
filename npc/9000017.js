/*
 * Coco
 * Hair/Face/Eye/Gender/Name Changer
 * Free Market Entrance; Henesys
 *
 * ID: 9000017
 */

"use strict";

const MapleCharacter               = Java.type("net.sf.odinms.client.MapleCharacter");
const MapleCharacterUtil           = Java.type("net.sf.odinms.client.MapleCharacterUtil");
const MapleItemInformationProvider = Java.type("net.sf.odinms.server.MapleItemInformationProvider");
const MaplePacketCreator           = Java.type("net.sf.odinms.tools.MaplePacketCreator");

let status;
let beauty = -1;
const insufficientNxMsg = () => `\
Sorry, you don't have enough NX to purchase this look.\r\n\
\r\n\
Paypal NX: #b${cm.getNx(1)}#k\r\n\
Maple points: #r${cm.getNx(2)}#k\r\n\
Card NX: #d${cm.getNx(3)}#k`;
const skin = [0, 1, 2, 3, 4, 9]; // 5, 10 removed (Invalid pointer).
const smallPrice = 1500;
const largePrice = 2000;
const filteredHairs = [3202, 3215, 3520, 3924, 3925, 3926];
const filteredFaces = [20692];
const ii = MapleItemInformationProvider.getInstance();
let hairs, faces, lenses, a;

const identity = x => x;

const sameFace = (id1, id2) =>
    id1 - Math.floor(id1 % 1000 / 100) * 100 ===
    id2 - Math.floor(id2 % 1000 / 100) * 100;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();

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
        const maleFaceListCount = ii.getFaceListCount(0);
        const femaleFaceListCount = ii.getFaceListCount(1);
        const ungenderedFaceListCount = ii.getFaceListCount(2);
        const maleHairListCount = ii.getHairListCount(0);
        const femaleHairListCount = ii.getHairListCount(1);
        const ungenderedHairListCount = ii.getHairListCount(2);
        let msg = "Hey there, I can change your look. What would you like to change?\r\n#L0#Skin color#l\r\n#L100#Male hairstyles:\r\n\t\t\t  [1]#l ";
        for (let i = 1; i < maleHairListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += `#L${100 + i}#[${i + 1}]#l `;
            if (i === maleHairListCount - 1) {
                msg += `\r\n#L200#Female hairstyles:\r\n\t\t\t  [1]#l${i < 9 ? " " : ""}`;
            }
        }
        for (let i = 1; i < femaleHairListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += `#L${200 + i}#[${i + 1}]#l${i < 9 ? " " : ""}`;
        }
        msg += "\r\n#L300#Ungendered hairstyles:\r\n\t\t\t  [1]#l ";
        for (let i = 1; i < ungenderedHairListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += `#L${300 + i}#[${i + 1}]#l${i < 9 ? " " : ""}`;
        }
        msg += "\r\n#L400#Male faces:\r\n\t\t\t  [1]#l ";
        for (let i = 1; i < maleFaceListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += `#L${400 + i}#[${i + 1}]#l${i < 9 ? " " : ""}`;
        }
        msg += "\r\n#L500#Female faces:\r\n\t\t\t  [1]#l ";
        for (let i = 1; i < femaleFaceListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += `#LR{500 + i}#[${i + 1}]#l${i < 9 ? " " : ""}`;
        }
        msg += "\r\n#L600#Ungendered faces:\r\n\t\t\t  [1]#l ";
        for (let i = 1; i < ungenderedFaceListCount; ++i) {
            if (i % 4 === 0) {
                msg += "\r\n\t\t";
            }
            msg += `#L${600 + i}#[${i + 1}]#l${i < 9 ? " " : ""}`;
        }
        msg += "\r\n#L1#Hair color#l\r\n#L2#Lens color#l\r\n#L3#Gender#l\r\n#L4#I know the ID of the hair/face I want.#l\r\n#L5#I want to change my name.#l";
        cm.sendSimple(msg);
    } else if (status === 1) {
        beauty = selection;

        if (selection === 0) { /* Skin color */
            cm.sendStyle(`Changing your skin will cost you #r${smallPrice} NX#k.\r\nPick one:`, skin);
        } else if (selection === 1) { /* Hair color */
            hairs = ii.getAllColors(p.getHair()).stream().mapToInt(identity).toArray();
            cm.sendStyle(`Changing your hair color will cost you #r${smallPrice} NX#k.\r\nPick one:`, hairs);
        } else if (selection === 2) { /* Lens color */
            lenses = ii.getAllColors(p.getFace()).stream().mapToInt(identity).toArray();
            cm.sendStyle(`Changing your lens will cost you #r${smallPrice} NX#k.\r\nPick one:`, lenses);
        } else if (selection === 3) { /* Gender */
            cm.sendYesNo(`Changing your gender will cost you #r${smallPrice} NX#k. Are you sure you want to undergo the transformation?`);
        } else if (selection === 5) {
            cm.sendGetText("Changing your name will cost you #r#e3 Vote Points#n#k.\r\n\r\nIf you're sure you want to change your name, please enter a new one below:");
        } else if (selection >= 100 && selection < 400) { /* Hairstyle */
            const color = p.getHair() % 10; // Last digit of ID corresponds to the color of the hair.
            hairs =
                ii.getHairData(Math.floor(selection / 100) - 1, selection % 100)
                  .stream()
                  .filter(x => x % 10 === color && filteredHairs.indexOf(Math.floor(x / 10)) === -1)
                  .mapToInt(identity)
                  .toArray();
            if (hairs.length < 1) {
                hairs =
                    ii.getHairData(Math.floor(selection / 100) - 1, selection % 100)
                      .stream()
                      .filter(x => filteredHairs.indexOf(Math.floor(x / 10)) === -1)
                      .mapToInt(identity)
                      .toArray();
            }
            cm.sendStyle(`Changing your hair will cost you #r${largePrice} NX#k.\r\nPick one:`, hairs);
        } else if (selection >= 400 && selection < 700) { /* Face */
            // Hundreds place of ID corresponds to the color of the lenses.
            const color = Math.floor(p.getFace() % 1000 / 100);
            faces =
                ii.getFaceData(Math.floor(selection / 100) - 4, selection % 100)
                  .stream()
                  .filter(x =>
                      Math.floor(x % 1000 / 100) === color &&
                      !filteredFaces.some(ff => sameFace(x, ff))
                  )
                  .mapToInt(identity)
                  .toArray();
            if (faces.length < 1) {
                ii.getFaceData(Math.floor(selection / 100) - 4, selection % 100)
                  .stream()
                  .filter(x => !filteredFaces.some(ff => sameFace(x, ff)))
                  .mapToInt(identity)
                  .toArray();
            }
            cm.sendStyle(`Changing your face will cost you #r${largePrice} NX#k.\r\nPick one:`, faces);
        } else if (selection === 4) {
            cm.sendGetNumber("Enter the #eID#n here:\r\n", 20000, 20000, 39999);
        }
    } else if (status === 2) {
        let notEnteredId = true;

        if (beauty === 0) {
            if (cm.buyWithNx(smallPrice)) {
                cm.setSkin(skin[selection]);
            } else {
                cm.sendOk(insufficientNxMsg());
            }
        } else if (beauty === 1) {
            if (cm.buyWithNx(smallPrice)) {
                cm.setHair(hairs[selection]);
            } else {
                cm.sendOk(insufficientNxMsg());
            }
        } else if (beauty === 2) {
            if (cm.buyWithNx(smallPrice)) {
                cm.setFace(lenses[selection]);
            } else {
                cm.sendOk(insufficientNxMsg());
            }
        } else if (beauty === 3) {
            if (cm.buyWithNx(smallPrice)) {
                p.setGender(p.getGender() === 1 ? 0 : 1);
                p.getClient().getSession().write(MaplePacketCreator.getCharInfo(p));
                p.getMap().removePlayer(p);
                p.getMap().addPlayer(p);
            } else {
                cm.sendOk(`Sorry, you don't have enough NX to purchase a gender change.\r\n\r\nPaypal NX: #b${cm.getNx(1)}#k\r\nMaple points: #r${cm.getNx(2)}#k\r\nCard NX: #d${cm.getNx(3)}#k`);
            }
        } else if (beauty === 4) {
            const result = ii.getAllColors(selection);
            if (result.size() < 1 || ~filteredHairs.indexOf(Math.floor(selection / 10)) || filteredFaces.some(ff => sameFace(selection, ff))) {
                cm.sendOk("Sorry, it seems we don't have that ID!");
            } else {
                a = result.stream().mapToInt(identity).toArray();
                cm.sendStyle(`Changing your look will cost you #r${largePrice} NX#k, plus another #r${smallPrice} NX#k if a different color than you already have is chosen.\r\nPick one:`, a);
                notEnteredId = false;
            }
        } else if (beauty === 5) {
            if (p.getVotePoints() >= 3) {
                const newName = cm.getText();
                if (~MapleCharacter.getIdByName(newName, 0)) {
                    cm.sendOk("That name is already in use!");
                    cm.dispose();
                    return;
                }
                if (!MapleCharacterUtil.isNameLegal(newName) || ~("" + newName).toLowerCase().indexOf("xiuz")) {
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
                cm.sendOk(`Sorry, you don't have enough Vote Points to purchase a name change.\r\n\r\nVote Point count: #b${p.getVotePoints()}#k`);
            }
        } else if (beauty >= 100 && beauty < 400) {
            if (cm.buyWithNx(largePrice)) {
                cm.setHair(hairs[selection]);
            } else {
                cm.sendOk(insufficientNxMsg());
            }
        } else if (beauty >= 400 && beauty < 700) {
            if (cm.buyWithNx(largePrice)) {
                cm.setFace(faces[selection]);
            } else {
                cm.sendOk(insufficientNxMsg());
            }
        }
        if (notEnteredId) {
            cm.dispose();
            return;
        }
    } else if (status === 3) {
        let price = largePrice;

        if (a[selection] < 30000) { // Face
            const color = Math.floor(p.getFace() % 1000 / 100);
            if (Math.floor(a[selection] % 1000 / 100) !== color) {
                price += smallPrice;
            }
            if (cm.buyWithNx(price)) {
                cm.setFace(a[selection]);
            } else {
                cm.sendOk(insufficientNxMsg());
            }
        } else { // Hair
            const color = p.getHair() % 10;
            if (a[selection] % 10 !== color) {
                price += smallPrice;
            }
            if (cm.buyWithNx(price)) {
                cm.setHair(a[selection]);
            } else {
                cm.sendOk(insufficientNxMsg());
            }
        }
        cm.dispose();
        return;
    }
}
