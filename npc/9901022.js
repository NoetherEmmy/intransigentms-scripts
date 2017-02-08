/*
 * Safe
 * Strangely Empty | The Chef's Kitchen
 *
 * ID: 9901022
 */

var NPCScriptManager = Java.type("net.sf.odinms.scripting.npc.NPCScriptManager");
var TimerManager     = Java.type("net.sf.odinms.server.TimerManager");

var status;
var mapId = 5008;
var ballroomMap = 5009;
var chefNpc = 9901023;
var ingredientPlurals =
[
    "potatoes",         "vegan chickens",    "granolas",            "dills",
    "stale cakes",      "quinoas",           "dandelion greens",    "tequilas",
    "rose petals",      "lentils",           "mashed cauliflowers", "beets",
    "almond flours",    "jicamas",           "noodles",             "figs",
    "dulses",           "black beans",       "chickpeas",           "guavas",
    "yuccas",           "chives",            "arugulas",            "avocados",
    "brussels sprouts", "artichokes",        "squash blossoms",     "zucchini",
    "spelts",           "farros",            "amaranths",           "millets",
    "toasted rices",    "eggplants",         "carrots",             "root beers",
    "smoked tofu",      "orange zests",      "saffrons",            "turmerics",
    "cumins",           "jackfruits",        "jasmine teas",        "mints",
    "coconuts",         "frozen peas",       "elderflower syrups",  "blackberries",
    "pumpkins",         "cinnamons",         "lacinato kales",      "seitans",
    "kombu",            "miso",              "tahini",              "hazelnuts",
    "tamari",           "molasses",          "tomatoes",            "chia seeds",
    "cashews",          "steel-cut oats",    "porcini",             "harissas",
    "kimchi",           "sauerkrauts",       "cucumbers",           "gingers",
    "penne",            "polentas",          "phyllos",             "cremini",
    "shallots",         "leeks",             "asparaguses",         "smoked paprikas",
    "tamarinds",        "olive oils",        "spinaches",           "balsamic reductions",
    "black sea salts",  "srirachas",         "lemons",              "chocolates",
    "garlics",          "herbs de provence", "kalamatas",           "dijons",
    "horseradishes",    "corianders",        "lavenders",           "fresh ground peppers",
    "vanilla beans",    "poppy seeds",       "mangoes",             "nectarines",
    "walnuts",          "wheatgrasses",      "marmalades",
];
var tMan, nsm;

function plural(s) {
    var slice = s.slice(0, -1);
    var i;
    for (i = 0; i < ingredientPlurals.length; ++i) {
        if (ingredientPlurals[i].indexOf(slice) !== -1) {
            return ingredientPlurals[i];
        }
    }
}

function start() {
    tMan = TimerManager.getInstance();
    nsm = NPCScriptManager.getInstance();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    var mi2 = pq.getMapInstance(5007);

    if (mi2 === null || mode < 0 || (status < 1 && mode === 0)) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;
    switch (status) {
        case 0:
            if (mi2.getPlayerProperty(p, "kitchenFinished")) {
                if (mi2.getPlayerProperty(p, "storageFinished")) {
                    if (pq.getMapInstance(ballroomMap) === null) {
                        pq.registerMap(ballroomMap);
                    }

                    pq.getPlayers().forEach(function(c) {
                        c.changeMap(ballroomMap);
                    });

                    tMan.schedule(function() {
                        try {
                            pq.unregisterMap(5007);
                            pq.unregisterMap(5008);
                        } catch (e) {
                            print(e);
                        }
                    }, 3 * 1000 + Math.floor(Math.random() * 1000));

                    tMan.schedule(function() {
                        p.getMap().getCharacters().forEach(function(c) {
                            var client = c.getClient();
                            if (client.getCM() !== null) {
                                client.getCM().dispose();
                            }
                            nsm.start(client, chefNpc);
                        });
                    }, 1000);
                } else {
                    cm.sendOk("#eyou decide that it's probably wisest to wait on your party members in the storage room so that you can reunite#n");
                }
                cm.dispose();
                return;
            } else if (mi2.getPlayerProperty(p, "unlockedSafe")) {
                var recipes = mi2.invokeMethod("getRecipes", 2);
                var recipeText = "";
                var recipe, i;

                for (var recipeName in recipes) {
                    recipe = recipes[recipeName];
                    recipeText += "\r\n\r\n#e" + recipeName + "#n\r\n";
                    for (i = 0; i < recipe.ingredients.length; ++i) {
                        recipeText += "\t #b" +
                                      recipe.ingredientQuantities[i] +
                                      "#k #d" +
                                      plural(recipe.ingredients[i]) +
                                      "#k\r\n";
                    }

                    recipeText += "Currently in stock: ";
                    for (i = 0; i < recipe.stockQuantities.length; ++i) {
                        recipeText += "#b" +
                                      recipe.stockQuantities[i][1] +
                                      "#k #d" +
                                      plural(recipe.ingredients[i]) +
                                      "#k" +
                                      (i < recipe.stockQuantities.length - 1 ? ", " : "");
                    }
                }

                var sharedRecipe = mi2.invokeMethod("getSharedRecipe");

                recipeText += "\r\n\r\n#e" + sharedRecipe.name + "#n\r\n";
                for (i = 0; i < sharedRecipe.ingredients.length; ++i) {
                    recipeText += "\t #b" +
                                  sharedRecipe.ingredientQuantities[i] +
                                  "#k #d" +
                                  plural(sharedRecipe.ingredients[i]) +
                                  "#k\r\n";
                }

                recipeText += "Serves #b" + sharedRecipe.serves + "#k.";

                cm.sendGetNumber("#ewith the safe now unlocked remotely, you find to your surprise that it's almost entirely empty, save for a stray scrap of a notebook and a keypad built into its back side#n\r\n\r\n#epicking up the notebook scrap, you read what is apparently a tiny part of The Chef's master recipe book:#n" + recipeText + "\r\n\r\n#ethe pad has no other markings other than its 10 number keys and a single #bOK#k key#n", 0, 0, 20000);
            } else {
                cm.sendOk("#eall of your attempts to open this safe fail#n\r\n\r\n#eyou take special notice that the safe appears to be more minimally designed than you thought possible -- there are apparently no mechanisms to open it, at least from here#n");
                cm.dispose();
                return;
            }
            break;
        case 1:
            if (selection === mi2.invokeMethod("getAnswer") || isNaN(mi2.invokeMethod("getAnswer"))) {
                mi2.setPropertyForAll("kitchenFinished", true);
                if (mi2.getPlayerProperty(p, "storageFinished")) {
                    if (pq.getMapInstance(ballroomMap) === null) {
                        pq.registerMap(ballroomMap);
                    }

                    pq.getPlayers().forEach(function(c) {
                        c.changeMap(ballroomMap);
                    });

                    tMan.schedule(function() {
                        try {
                            pq.unregisterMap(5007);
                            pq.unregisterMap(5008);
                        } catch (e) {
                            print(e);
                        }
                    }, 3 * 1000 + Math.floor(Math.random() * 1000));
                    
                    tMan.schedule(function() {
                        p.getMap().getCharacters().forEach(function(c) {
                            var client = c.getClient();
                            if (client.getCM() !== null) {
                                client.getCM().dispose();
                            }
                            nsm.start(client, chefNpc);
                        });
                    }, 1000);
                } else {
                    cm.sendOk("#eyou enter the combination one last time, and the back of the safe makes a satisfying #bclick#k as it unlocks for you#n\r\n\r\n#eyou decide, however, that it's probably wisest to wait on your party members in the storage room so that you can reunite#n");
                }
            } else {
                cm.sendOk("#ethe gate makes a dampened metallic thud as if to indicate its displeasure with your attempted break-in#n");
                if (mi2.getPlayerProperty(p, "failedComboCount") < 10) {
                    mi2.setPropertyForAll("failedComboCount", mi2.getPlayerProperty(p, "failedComboCount") + 1);
                    pq.addPoints(-20);
                }
            }
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
