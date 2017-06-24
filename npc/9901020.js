/*
 * Recipe Shard
 * Lilin's Manor West Wing | Storage & Refrigeration
 *
 * ID: 9901020
 */

var status;
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
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    if (mode < 0 || (status < 1 && mode === 0)) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;
    switch (status) {
        case 0:
            var recipes = mi.invokeMethod("getRecipes", 1);
            var recipeText = "#eas you bend down to read the scrap of a notebook on the ground, you notice that it's a small piece of the Chef's master recipe book, containing only a few recipes:#n";
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

            var sharedRecipe = mi.invokeMethod("getSharedRecipe");

            recipeText += "\r\n\r\n#e" + sharedRecipe.name + "#n\r\n";
            for (i = 0; i < sharedRecipe.ingredients.length; ++i) {
                recipeText += "\t #b" +
                              sharedRecipe.ingredientQuantities[i] +
                              "#k #d" +
                              plural(sharedRecipe.ingredients[i]) +
                              "#k\r\n";
            }

            recipeText += "Serves #b" + sharedRecipe.serves + "#k.";

            cm.sendOk(recipeText);
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
