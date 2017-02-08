load('nashorn:mozilla_compat.js');
/* Mos
    Leafre : Leafre (240000000)
    
    Refining NPC: 
    * Level 110 weapons - Stimulator allowed
*/

importPackage(Packages.net.sf.odinms.client);

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var stimulator = false;
var item, mats, matQty, cost, stimID;

var daggerIngredients =
[
    [4001079, 1], [4011001, 1], [4011002, 1]
];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i, selStr, weapon, itemSet, matSet, matQtySet, costSet;
    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status === 0 && mode === 1) {
        selStr = "A dragon's power is not to be underestimated. If you like, I can add its power to one of your weapons. However, the weapon must be powerful enough to hold its potential...#b";
        var options = ["What's a stimulator?", "Create a Warrior weapon", "Create a Bowman weapon", "Create a Magician weapon", "Create a Thief weapon",
            "Create a Warrior weapon with a Stimulator", "Create a Bowman weapon with a Stimulator", "Create a Magician weapon with a Stimulator", "Create a Thief weapon with a Stimulator", "I have a special dagger for you."];
        for (i = 0; i < options.length; ++i) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
            
        cm.sendSimple(selStr);
    }
    else if (status === 1 && mode === 1) {
        selectedType = selection;
        if (selectedType > 4 && selectedType < 9)
        {
            stimulator = true;
            selectedType -= 4;
        }
        else
            stimulator = false;
        if (selectedType === 0) { //What's a stim?
            cm.sendNext("A stimulator is a special potion that I can add into the process of creating certain items. It gives it stats as though it had dropped from a monster. However, it is possible to have no change, and it is also possible for the item to be below average. There's also a 10% chance of not getting any item when using a stimulator, so please choose wisely.");
            cm.dispose();
        }
        else if (selectedType === 1){ //warrior weapon
            selStr = "Very well, then which Warrior weapon shall recieve a dragon's power?#b";
            weapon = new Array ("Dragon Carbella#k - Lv. 110 One-Handed Sword#b","Dragon Axe#k - Lv. 110 One-Handed Axe#b","Dragon Mace#k - Lv. 110 One-Handed BW#b","Dragon Claymore#k - Lv. 110 Two-Handed Sword#b","Dragon Battle Axe#k - Lv. 110 Two-Handed Axe#b","Dragon Flame#k - Lv. 110 Two-Handed BW#b",
                "Dragon Faltizan#k - Lv. 110 Spear#b","Dragon Chelbird#k - Lv. 110 Polearm#b");
            for (i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType === 2){ //bowman weapon
            selStr = "Very well, then which Bowman weapon shall recieve a dragon's power?#b";
            weapon = new Array ("Dragon Shiner Bow#k - Lv. 110 Bow#b","Dragon Shiner Cross#k - Lv. 110 Crossbow#b");
            for (i = 0; i < weapon.length; ++i) {
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType === 3){ //magician weapon
            selStr = "Very well, then which Magician weapon shall recieve a dragon's power?#b";
            weapon = new Array ("Dragon Wand#k - Lv. 108 Wand#b","Dragon Staff#k - Lv. 110 Staff#b");
            for (i = 0; i < weapon.length; ++i) {
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType === 4){ //thief weapon
            selStr = "Very well, then which Thief weapon shall recieve a dragon's power?#b";
            weapon = new Array ("Dragon Kanzir#k - Lv. 110 STR Dagger#b","Dragon Kreda#k - Lv. 110 LUK Dagger#b","Dragon Green Sleve#k - Lv. 110 Claw#b");
            for (i = 0; i < weapon.length; ++i) {
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType === 9) { // Cornian's Dagger
            if (cm.itemQuantity(4001079) > 0) {
                var msg = "Oh, wow. I mean, it looks a bit roughed up, but I can make that dagger of yours look and feel as good as new with just a few materials:\r\n";
                for (i = 0; i < daggerIngredients.length; ++i) {
                    msg += "\r\n\t #i" + daggerIngredients[i][0] + "#  x" + daggerIngredients[i][1];
                }
                msg += "\r\n\r\nDo you have these things for me right now?";
                cm.sendYesNo(msg);
            } else {
                cm.sendOk("I don't see any... very impressive daggers. Are you sure you're at the right place?");
                cm.dispose();
                return;
            }
        }
    }
    else if (status === 2 && mode === 1) {
        selectedItem = selection;
        if (selectedItem === -1 && type === 1) { // Dagger
            var hasIngredients = true;
            for (i = 0; i < daggerIngredients.length; ++i) {
                if (cm.itemQuantity(daggerIngredients[i][0]) < daggerIngredients[i][1]) {
                    hasIngredients = false;
                    break;
                }
            }
            if (hasIngredients) {
                daggerIngredients.forEach(function(ingredient) { cm.gainItem(ingredient[0], -ingredient[1]); });
                cm.gainItem(4001078, 1);
                cm.sendOk("Alright, good stuff! Here ya go, " + (cm.getPlayer().getGender() === 0 ? "lad" : "lass") + "!\r\n\r\n#i4001078#");
                cm.dispose();
                return;
            } else {
                cm.sendOk("I don't think you quite have all of them.");
                cm.dispose();
                return;
            }
        }
        if (selectedType === 1){ //warrior weapon
            itemSet = new Array(1302059,1312031,1322052,1402036,1412026,1422028,1432038,1442045);
            matSet = new Array(new Array(1302056,4000244,4000245,4005000),new Array(1312030,4000244,4000245,4005000),new Array(1322045,4000244,4000245,4005000),new Array(1402035,4000244,4000245,4005000),
                new Array(1412021,4000244,4000245,4005000),new Array(1422027,4000244,4000245,4005000),new Array(1432030,4000244,4000245,4005000),new Array(1442044,4000244,4000245,4005000));
            matQtySet = new Array(new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8));
            costSet = new Array(120000,120000,120000,120000,120000,120000,120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType === 2){ //bowman weapon
            itemSet = new Array(1452044,1462039);
            matSet = new Array(new Array(1452019,4000244,4000245,4005000,4005002),new Array(1462015,4000244,4000245,4005000,4005002));
            matQtySet = new Array(new Array(1,20,25,3,5),new Array(1,20,25,5,3));
            costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType === 3){ //magician weapon
            itemSet = new Array(1372032,1382036);
            matSet = new Array(new Array(1372010,4000244,4000245,4005001,4005003),new Array(1382035,4000244,4000245,4005001,4005003));
            matQtySet = new Array(new Array(1,20,25,6,2),new Array(1,20,25,6,2));
            costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType === 4){ //thief weapon
            itemSet = new Array(1332049,1332050,1472051);
            matSet = new Array(new Array(1332051,4000244,4000245,4005000,4005002),new Array(1332052,4000244,4000245,4005002,4005003),new Array(1472053,4000244,4000245,4005002,4005003));
            matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5),new Array(1,20,25,2,6));
            costSet = new Array(120000,120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        
        var prompt = "You want me to make a #t" + item + "#? In that case, I'm going to need specific items from you in order to make it. Make sure you have room in your inventory, though!#b";
        
        if (stimulator) {
            stimID = getStimID(item);
            prompt += "\r\n#i" + stimID + "# 1 #t" + stimID + "#";
        }

        if (mats instanceof Array) {
            for (i = 0; i < mats.length; ++i) {
                prompt += "\r\n#i" + mats[i] + "# " + matQty[i] + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i" + mats + "# " + matQty + " #t" + mats + "#";
        }
        
        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost + " meso";
        }
        
        cm.sendYesNo(prompt);
    }
    else if (status === 3 && mode === 1) {
        var complete = true;
        
        if (cm.getMeso() < cost) {
            cm.sendOk("My fee is for the good of all of Leafre. If you cannot pay it, then be gone.");
        } else {
            if (mats instanceof Array) {
                for (i = 0; complete && i < mats.length; i++)
                {
                    if (matQty[i] === 1) {
                        if (!cm.haveItem(mats[i]))
                        {
                            complete = false;
                        }
                    }
                    else {
                        var count = 0;
                        var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats[i]).iterator();
                        while (iter.hasNext()) {
                            count += iter.next().getQuantity();
                        }
                        if (count < matQty[i])
                            complete = false;
                    }                   
                }
            } else {
                var count = 0;
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats).iterator();
                while (iter.hasNext()) {
                    count += iter.next().getQuantity();
                }
                if (count < matQty)
                    complete = false;
            }
        }
            
        if (stimulator){ //check for stimulator
            if (!cm.haveItem(stimID))
            {
                complete = false;
            }
        }
        
        if (!complete) 
            cm.sendOk("I'm afraid that without the correct items, the dragon's essence would... not make for a very reliable weapon. Please bring the correct items next time.");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            }
            else
                cm.gainItem(mats, -matQty);
                
            cm.gainMeso(-cost);
            if (stimulator){ //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0)
                {
                    var ii = Packages.net.sf.odinms.server.MapleItemInformationProvider.getInstance();
                    var newItem = ii.randomizeStats(ii.getEquipById(item));
                    Packages.net.sf.odinms.server.MapleInventoryManipulator.addFromDrop(cm.getC(), newItem, "Created " + item  + " at Mos (2080000, map 240000000) using a stimulator");
                    cm.sendOk("The process is complete. Treat your weapon well, lest you bring the wrath of the dragons upon you.");
                }
                else
                {
                    cm.sendOk("Unfortunately, the dragon's essence has... conflicted with your weapon. My apologies for your loss.");
                }
            }
            else //just give basic item
            {
                cm.gainItem(item, 1);
                cm.sendOk("The process is complete. Treat your weapon well, lest you bring the wrath of the dragons upon you.");
            }
        }
        cm.dispose();
    }
}

function getStimID(equipID){
    var cat = Math.floor(equipID / 10000);
    var stimBase = 4130002; //stim for 1h sword
    
    switch (cat){
        case 130: //1h sword, do nothing
            break;
        case 131: //1h axe
            stimBase++;
            break;
        case 132: //1h bw
            stimBase += 2;
            break;
        case 140: //2h sword
            stimBase += 3;
            break;
        case 141: //2h axe
            stimBase += 4;
            break;
        case 142: //2h bw
            stimBase += 5;
            break;
        case 143: //spear
            stimBase += 6;
            break;
        case 144: //polearm
            stimBase += 7;
            break;
        case 137: //wand
            stimBase += 8;
            break;
        case 138: //staff
            stimBase += 9;
            break;
        case 145: //bow
            stimBase += 10;
            break;
        case 146: //xbow
            stimBase += 11;
            break;
        case 133: //dagger
            stimBase += 12;
            break;
        case 147: //claw
            stimBase += 13;
            break;
    }
    
    return stimBase;
}
