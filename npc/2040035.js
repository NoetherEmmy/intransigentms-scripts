/*
 * Arturo
 * LPQ ending NPC
 * ID: 2040035
 */

"use strict";

let status;
const scrollRewards =
    [ 2040601 // Scroll for Bottomwear for DEF 60%
    , 2040602 // Scroll for Bottomwear for DEF 10%
    , 2041001 // Scroll for Cape for Magic Def. 60%
    , 2041002 // Scroll for Cape for Magic Def. 10%
    , 2041004 // Scroll for Cape for Weapon Def. 60%
    , 2041005 // Scroll for Cape for Weapon Def. 10%
    , 2040311 // Scroll for Earring for DEF 60%
    , 2040312 // Scroll for Earring for DEF 10%
    , 2040317 // Scroll for Earring for DEX 60%
    , 2040318 // Scroll for Earring for DEX 10%
    , 2040301 // Scroll for Earring for INT 60%
    , 2040302 // Scroll for Earring for INT 10%
    , 2040801 // Scroll for Gloves for DEX 60%
    , 2040802 // Scroll for Gloves for DEX 10%
    , 2040001 // Scroll for Helmet for DEF 60%
    , 2040002 // Scroll for Helmet for DEF 10%
    , 2040401 // Scroll for Topwear for DEF 60%
    , 2040402 // Scroll for Topwear for DEF 10%
    , 2040501 // Scroll for Overall Armor for DEX 60%
    , 2040502 // Scroll for Overall Armor for DEX 10%
    , 2040504 // Scroll for Overall Armor for DEF 60%
    , 2040505 // Scroll for Overall Armor for DEF 10%
    , 2040513 // Scroll for Overall Armor for INT 60%
    , 2040514 // Scroll for Overall Armor for INT 10%
    , 2040804 // Scroll for Gloves for ATT 60%
    , 2040805 // Scroll for Gloves for ATT 10%
    , 2040817 // Scroll for Gloves for Magic Att. 60%
    , 2040818 // Scroll for Gloves for Magic Att. 10%
    , 2040701 // Scroll for Shoes for DEX 60%
    , 2040702 // Scroll for Shoes for DEX 10%
    , 2043001 // Scroll for One-Handed Sword for ATT 60%
    , 2043002 // Scroll for One-Handed Sword for ATT 10%
    , 2044001 // Scroll for Two-Handed Sword for ATT 60%
    , 2044002 // Scroll for Two-Handed Sword for ATT 10%
    , 2043101 // Scroll for One-Handed Axe for ATT 60%
    , 2043102 // Scroll for One-Handed Axe for ATT 10%
    , 2044101 // Scroll for Two-Handed Axe for ATT 60%
    , 2044102 // Scroll for Two-Handed Axe for ATT 10%
    , 2043201 // Scroll for One-Handed BW for ATT 60%
    , 2043202 // Scroll for One-Handed BW for ATT 10%
    , 2044201 // Scroll for Two-Handed BW for ATT 60%
    , 2044202 // Scroll for Two-Handed BW for ATT 10%
    , 2044301 // Scroll for Spear for ATT 60%
    , 2044302 // Scroll for Spear for ATT 10%
    , 2044401 // Scroll for Pole Arm for ATT 60%
    , 2044402 // Scroll for Pole Arm for ATT 10%
    , 2043701 // Scroll for Wand for Magic Att. 60%
    , 2043702 // Scroll for Wand for Magic Att. 10%
    , 2043801 // Scroll for Staff for Magic Att. 60%
    , 2043802 // Scroll for Staff for Magic Att. 10%
    , 2044501 // Scroll for Bow for ATT 60%
    , 2044502 // Scroll for Bow for ATT 10%
    , 2044601 // Scroll for Crossbow for ATT 60%
    , 2044602 // Scroll for Crossbow for ATT 10%
    , 2043301 // Scroll for Dagger for ATT 60%
    , 2043302 // Scroll for Dagger for ATT 10%
    , 2044701 // Scroll for Claw for ATT 60%
    , 2044702 // Scroll for Claw for ATT 10%
    , 2044801 // Scroll for Knuckler for ATT 60%
    , 2044802 // Scroll for Knuckler for ATT 10%
    , 2044901 // Scroll for Gun for ATT 60%
    , 2044902 // Scroll for Gun for ATT 10%
    ];

const consumableRewards =
    [ 2000005 // Power Elixir
    , 2022028 // Valentine Chocolate (Dark)
    , 2002011 // Pain Reliever
    , 2022224 // Russelon's Potion [2]
    , 2022195 // Mapleade
    , 2022205 // Carrot Cake
    , 2022190 // Cherry Pie
    , 2022248 // Green Gummy Slime
    , 4031820 // Orange Gummy Slime
    , 2022308 // Jungle Juice
    , 2022211 // Durian
    , 2020000 // Salad
    , 2022023 // Tri-colored Dango
    ];

const etcRewards =
    [ 4010000 // Bronze Ore
    , 4010002 // Mithril Ore
    , 4010003 // Adamantium Ore
    , 4010004 // Silver Ore
    , 4010005 // Orihalcon Ore
    , 4010007 // Lidium Ore
    , 4020000 // Garnet Ore
    , 4020001 // Amethyst Ore
    , 4020002 // AquaMarine Ore
    , 4020004 // Opal Ore
    , 4020005 // Sapphire Ore
    , 4020006 // Topaz Ore
    , 4020007 // Diamond Ore
    , 4020008 // Black Crystal Ore
    , 4004001 // Wisdom Crystal Ore
    , 4004002 // DEX Crystal Ore
    , 4004004 // Dark Crystal Ore
    ];

const equipRewards =
    [ 1002675 // Antellion Miter
    , 1002677 // Toymaker Cap
    , 1032011 // Blue Moon
    , 1032012 // Skull Earrings
    , 1032013 // Red-Hearted Earrings
    , 1092022 // Palette
    , 1102011 // Blue Justice Cape
    , 1102012 // Red Justice Cape
    , 1102013 // White Justice Cape
    , 1102014 // Black Justice Cape
    , 1102000 // Green Napoleon
    , 1102001 // Blue Napoleon
    , 1102002 // Red Napoleon
    , 1102003 // White Napoleon
    , 1102004 // Black Napoleon
    , 1102179 // Stirgeman Cape Mk III
    , 2070011 // Maple Throwing-Stars
    ];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    const p = cm.getPlayer();
    const eim = p.getEventInstance();

    if (!eim) {
        cm.warpRandom(922010000);
        cm.dispose();
        return;
    }

    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    switch (status) {
        case 0:
            cm.sendNext(`Hello, ${p.getGender() ? "fair lady" : "comrade"}. I have arrived here just too late to provide my assistance and just early enough to congratulate your achievement.\r\n\r\nSo, congrats. I'm... sure I could have defeated the cruel beast myself, but --\r\n\r\n#eahem#n\r\n\r\nHere, have these, for your troubles...`);
            break;
        case 1:
            cm.gainItem(chooseRandom(scrollRewards), chooseRandom([1, 2]));
            cm.gainItem(chooseRandom(consumableRewards), chooseRandom(range(35, 71)));
            cm.gainItem(chooseRandom(etcRewards), chooseRandom(range(15)));
            cm.gainItem(chooseRandom(equipRewards), chooseRandom([0, 1]));
            cm.warp(221024500);
            cm.dispose();
            return;
    }
}
