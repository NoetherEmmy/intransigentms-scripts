/*
 * T-1337
 * ID: 9201101
 * Daily Prize NPC
 */

/* jshint ignore: start */
// seedrandom.min.js
!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/4294967296},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);
/* jshint ignore: end */

var status;
var playername;
var currentday = 0;
var ores = [4010000, /* Bronze Ore */ 4010001, /* Steel Ore */ 4010002, /* Mithril Ore */ 4010003, /* Adamantium Ore */ 4010004, /* Silver Ore */ 4010005, /* Orihalcon Ore */ 4010006, /* Gold Ore */ 4010007, /* Lidium Ore */ 4020000, /* Garnet Ore */ 4020001, /* Amethyst Ore */ 4020002, /* AquaMarine Ore */ 4020003, /* Emerald Ore */ 4020004, /* Opal Ore */ 4020005, /* Sapphire Ore */ 4020006, /* Topaz Ore */ 4020007, /* Diamond Ore */ 4020008, /* Black Crystal Ore */ 4004000, /* Power Crystal Ore */ 4004001, /* Wisdom Crystal Ore */ 4004002, /* DEX Crystal Ore */ 4004003, /* LUK Crystal Ore */ 4004004 /* Dark Crystal Ore */ ];
var morphs = [2210005, /* Tigun Transformation Bundle */ 2210002, /* Grey Piece */ 2210006, /* Rainbow-colored Snail Shell */ 2210000, /* Orange Mushroom Piece */ 2210001, /* Ribbon Pig Piece */ 2210007, /* Change to Ghost */ 2210008, /* Ghost Candy */ 2210010, /* Potion of Transformation */ 2210011 /* Potion of Transformation */ ];
var elixirs = [2022105, /* Green Malady's Candy */ 2022107, /* Blue Malady's Candy */ 2020011, /* W Ramen */ 2022015, /* Mushroom Miso Ramen */ 2020016 /* Cheesecake */ ];
var refinedores = [4011000, /* Bronze Plate */ 4011001, /* Steel Plate */ 4011002, /* Mithril Plate */ 4011003, /* Adamantium Plate */ 4011004, /* Silver Plate */ 4011005, /* Orihalcon Plate */ 4011006, /* Gold Plate */ 4021000, /* Garnet */ 4021001, /* Amethyst */ 4021002, /* AquaMarine */ 4021003, /* Emerald */ 4021004, /* Opal */ 4021005, /* Sapphire */ 4021006, /* Topaz */ 4021007, /* Diamond */ 4021008, /* Black Crystal */ 4005000, /* Power Crystal */ 4005001, /* Wisdom Crystal */ 4005002, /* DEX Crystal */ 4005003, /* LUK Crystal */ 4005004 /* Dark Crystal */ ];
var buffs = [2022108, /* Horntail Squad: Victory */ 2022109, /* The Breath of Nine Spirit */ 2022179, /* Gelt Chocolate */ 2022117, /* Maple Syrup */ 2022179, /* Onyx Apple */ 2022273, /* Ssiws Cheese */ 2022277, /* Sunblock */ ];
var scrolls = [2040914, /* Scroll for Shield for Weapon Att. */ 2040919, /* Scroll for Shield for Magic Att. */ 2040804, /* Scroll for Gloves for ATT */ 2040817, /* Scroll for Gloves for Magic Att. */ 2040504, /* Scroll for Overall Armor for DEF */ 2040526, /* Scroll for Overall Armor for INT */ 2040401, /* Scroll for Topwear for DEF 60% */ 2040421, /* Scroll for Topwear for HP 60% */ 2040601, /* Scroll for Bottomwear for DEF 60% */ 2040621, /* Scroll for Bottomwear for HP 60% */  2041016, /* Scroll for Cape for INT 60% */  2041019, /* Scroll for Cape for DEX 60% */ ];
var present = [3992005 /* Red Gift-Box Ornament */ ];

function start() {
    var p = cm.getPlayer();
    Math.seedrandom("b" + p.getName() + "\\" + p.getId() + "," + p.getMeso() + "*" + p.getHp() + "z", { entropy: true });
    playername = "" + p.getName().toUpperCase();

    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else if (mode === 0 && status < 1) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendYesNo("HELLO.\r\nI AM T-1337.\r\nFOR EVERY DAY #rIN A ROW#k THAT YOU,\r\n" + playername + ", COME TO ME, I WILL GIVE YOU A PRIZE SUITABLE FOR HUMANS.\r\n\r\nWOULD YOU LIKE YOUR NEXT PRIZE?");
    } else if (status === 1) {
        var totalsetupcount = 0;
        var id, dailyprizestatus, prizeselection, prizecount, prize;
        for (id = 3990010; id < 3990017; ++id) {
            totalsetupcount += cm.itemQuantity(id);
        }
        if (totalsetupcount > 1) {
            for (id = 3990010; id < 3990017; ) {
                if (cm.itemQuantity(id) > 0) {
                    if (totalsetupcount > 1) {
                        cm.gainItem(id, -1);
                        totalsetupcount--;
                    } else {
                        break;
                    }
                } else {
                    id++;
                }
            }
        }
        if (totalsetupcount === 1) {
            dailyprizestatus = cm.dailyPrizeStatus();
            if (dailyprizestatus === 1) {
                cm.sendOk("SORRY, BUT YOU MUST WAIT ANOTHER #b" + cm.timeUntilNextPrize() + "#k HOURS TO GET YOUR NEXT PRIZE.");
                cm.dispose();
                return;
            } else if (dailyprizestatus === -1) {
                cm.sendOk("BUMMER. LOOKS LIKE YOU WAITED TOO LONG TO GET YOUR NEXT PRIZE, HUMAN! COME BACK AGAIN!");
                for (id = 3990010; id < 3990017; ++id) {
                    if (cm.itemQuantity(id) >= 1) {
                        cm.gainItem(id, cm.itemQuantity(id) * -1);
                    }
                }
                cm.dispose();
                return;
            } else if (!cm.canGetDailyPrizes()) {
                cm.sendOk("SORRY, BUT YOU MAY ONLY PARTICIPATE WITH ONE CHARACTER AT A TIME!");
                cm.dispose();
                return;
            }
            var leadingtext = "";
            for (id = 3990010; id < 3990017; ++id) {
                if (cm.itemQuantity(id) === 1) {
                    if (id !== 3990016) {
                        cm.gainItem(id, -1);
                        cm.gainItem(id + 1, 1);
                        currentday = id - 3990010 + 1;
                    } else {
                        cm.gainItem(id, -1);
                        cm.gainItem(3990010, 1);
                        currentday = 0;
                        leadingtext = "LOOKS LIKE YOU GOT A PRIZE FOR 7 DAYS IN A ROW. TIME TO START OVER!\r\n\r\n";
                    }

                    switch(currentday) {
                        case 0:
                            prizeselection = ores;
                            prizecount = Math.floor(Math.random() * 6 + 7);
                            break;
                        case 1:
                            prizeselection = morphs;
                            prizecount = 1;
                            break;
                        case 2:
                            prizeselection = elixirs;
                            prizecount = Math.floor(Math.random() * 31 + 10);
                            break;
                        case 3:
                            prizeselection = refinedores;
                            prizecount = 2;
                            break;
                        case 4:
                            prizeselection = buffs;
                            prizecount = 1;
                            break;
                        case 5:
                            prizeselection = scrolls;
                            prizecount = Math.floor(Math.random() * 3 + 4);
                            break;
                        case 6:
                            prizeselection = present;
                            prizecount = 1;
                            break;
                        default:
                            cm.sendOk("ERROR: #rcurrentday#k NOT IN CORRECT RANGE.");
                            cm.dispose();
                            return;
                    }
                    prize = prizeselection[Math.floor(Math.random() * prizeselection.length)];
                    cm.sendOk(leadingtext + "CONGRATULATIONS ON BEING HERE #b" + (currentday + 1) + "#k DAY" + (currentday > 0 ? "S" : "") + " IN A ROW.\r\n\r\nYOU NOW HAVE A #gGREEN NO. " + (currentday + 1) + "#k, AND YOUR PRIZE IS:\r\n\r\n#i" + prize + "# x" + prizecount);
                    cm.gainItem(prize, prizecount);
                    cm.updateLastDailyPrize();
                    break;
                }
            }
        } else if (totalsetupcount === 0) {
            dailyprizestatus = cm.dailyPrizeStatus();
            if (dailyprizestatus === 1) {
                cm.sendOk("SORRY, BUT YOU MUST WAIT ANOTHER #b" + cm.timeUntilNextPrize() + "#k HOURS TO GET YOUR NEXT PRIZE.");
                cm.dispose();
                return;
            }
            if (cm.canGetDailyPrizes()) {
                cm.gainItem(3990010, 1);
                currentday = 0;

                prizeselection = ores;
                prizecount = Math.floor(Math.random() * 6 + 5);
                prize = prizeselection[Math.floor(Math.random() * prizeselection.length)];
                cm.sendOk("CONGRATULATIONS ON BEING HERE #b" + (currentday + 1) + "#k DAY" + (currentday > 0 ? "S" : "") + " IN A ROW.\r\n\r\nYOU NOW HAVE A #gGREEN NO. " + (currentday + 1) + "#k, AND YOUR PRIZE IS:\r\n\r\n#i" + prize + "# x" + prizecount);
                cm.gainItem(prize, prizecount);
                cm.updateLastDailyPrize();
            } else {
                cm.sendOk("SORRY, BUT YOU MAY ONLY PARTICIPATE WITH ONE CHARACTER AT A TIME!");
                cm.dispose();
                return;
            }
        } else {
            cm.sendOk("ERROR LOCATING ITEMS IN INVENTORY.");
            cm.dispose();
            return;
        }
    }
}
