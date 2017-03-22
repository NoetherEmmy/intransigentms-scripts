/*
 * SCPQ script, map ID: 5007
 * Storage and Refrigeration
 *
 * Map has spawns for mob 7110301
 */

var JavaMath = Java.type("java.lang.Math");
var Point    = Java.type("java.awt.Point");

var trigReactId = 2008007;
var stunTime = 7 * 1000;
var fallenYThreshold = 0;

var trigLocs =
[
    new Point(639, -355), new Point(392, -355)
];
var trigIds = [];
var possibleIngredients =
[
    "potato",          "vegan chicken",     "granola",            "dill",
    "stale cake",      "quinoa",            "dandelion green",    "tequila",
    "rose petal",      "lentil",            "mashed cauliflower", "beet",
    "almond flour",    "jicama",            "noodle",             "fig",
    "dulse",           "black bean",        "chickpea",           "guava",
    "yucca",           "chive",             "arugula",            "avocado",
    "brussels sprout", "artichoke",         "squash blossom",     "zucchini",
    "spelt",           "farro",             "amaranth",           "millet",
    "toasted rice",    "eggplant",          "carrot",             "root beer",
    "smoked tofu",     "orange zest",       "saffron",            "turmeric",
    "cumin",           "jackfruit",         "jasmine tea",        "mint",
    "coconut",         "frozen pea",        "elderflower syrup",  "blackberry",
    "pumpkin",         "cinnamon",          "lacinato kale",      "seitan",
    "kombu",           "miso",              "tahini",             "hazelnut",
    "tamarind",        "molasses",          "tomato",             "chia seed",
    "cashew",          "steel-cut oat",     "porcini",            "harissa",
    "kimchi",          "sauerkraut",        "cucumber",           "ginger",
    "penne",           "polenta",           "phyllo",             "cremini",
    "shallot",         "leek",              "asparagus",          "smoked paprika",
    "tamari",          "olive oil",         "spinach",            "balsamic reduction",
    "black sea salt",  "sriracha",          "lemon",              "chocolate",
    "garlic",          "herbs de provence", "kalamata",           "dijon",
    "horseradish",     "coriander",         "lavender",           "fresh ground pepper",
    "vanilla bean",    "poppy seed",        "mango",              "nectarine",
    "walnut",          "wheatgrass",        "marmalade"
];
var dishTypes =
[
    "stew",        "cake",      "sorbet",   "dip",
    "smoothie",    "casserole", "pancake",  "sandwich",
    "salad",       "soup",      "scramble", "hash",
    "flambe",      "burrito",   "muffin",   "compote",
    "fries",       "loaf",      "souffle",  "custard",
    "bake",        "curry",     "toast",    "bun",
    "spring roll", "stir fry",  "kebab",    "tart",
    "donut",       "volcano",   "pie",      "skillet",
    "wrap",        "pasta"
];
var recipes1 = {};
var recipes2 = {};
var sharedRecipe, answer;

Array.prototype.fisherYates = function() {
    for (var i = this.length - 1; i > 0; --i) {
        var swapIndex = Math.floor(JavaMath.random() * (i + 1));
        var temp = this[swapIndex];
        this[swapIndex] = this[i];
        this[i] = temp;
    }
};

function init() {
    map.restartRespawnWorker();

    // Housekeeping
    mi.setLevelLimit(58);
    map.setDropsDisabled(true);
    mi.listenForPlayerMovement();

    // Generate recipes/puzzle
    var ingredients = [];
    var ingredientQuantities = [];
    var stockQuantities = [];
    var name = "";
    var j, i;

    possibleIngredients.fisherYates();

    for (j = 0; j < 4; ++j) {
        ingredients = [];
        ingredientQuantities = [];
        stockQuantities = [];
        name = "";

        for (i = 0; i < 4; ++i) {
            ingredients.push(possibleIngredients.pop());
            ingredientQuantities.push(Math.floor(JavaMath.random() * 8) + 2);
        }
        for (i = 0; i < 2; ++i) {
            stockQuantities.push([ingredients[i], Math.floor(JavaMath.random() * 30) + 30]);
        }

        name += ingredients[0].slice(0, 1).toUpperCase() + ingredients[0].slice(1);
        for (i = 1; i < ingredients.length; ++i) {
            name += " " + ingredients[i];
        }
        name += " " + dishTypes[Math.floor(JavaMath.random() * dishTypes.length)];

        if (j % 2 === 0) {
            recipes1[name] = {
                ingredients: ingredients,
                ingredientQuantities: ingredientQuantities,
                stockQuantities: stockQuantities
            };
        } else {
            recipes2[name] = {
                ingredients: ingredients,
                ingredientQuantities: ingredientQuantities,
                stockQuantities: stockQuantities
            };
        }
    }

    ingredients = [];
    ingredientQuantities = [];
    name = "";

    var canMake = 3000000; // Magic large number
    var recipeName, recipe, ingredientIndex, ingredientQuantity;

    for (recipeName in recipes1) {
        recipe = recipes1[recipeName];
        ingredientIndex = Math.floor(JavaMath.random() * 2);
        ingredientQuantity = Math.floor(JavaMath.random() * 8) + 2;
        ingredients.push(recipe.ingredients[ingredientIndex]);
        ingredientQuantities.push(ingredientQuantity);

        canMake = Math.min(
            canMake,
            Math.floor(
                (recipe.stockQuantities[ingredientIndex][1] - recipe.ingredientQuantities[ingredientIndex]) /
                ingredientQuantity
            )
        );
    }
    for (recipeName in recipes2) {
        recipe = recipes2[recipeName];
        ingredientIndex = Math.floor(JavaMath.random() * 2);
        ingredientQuantity = Math.floor(JavaMath.random() * 8) + 2;
        ingredients.push(recipe.ingredients[ingredientIndex]);
        ingredientQuantities.push(ingredientQuantity);

        canMake = Math.min(
            canMake,
            Math.floor(
                (recipe.stockQuantities[ingredientIndex][1] - recipe.ingredientQuantities[ingredientIndex]) /
                ingredientQuantity
            )
        );
    }

    name += ingredients[0].slice(0, 1).toUpperCase() + ingredients[0].slice(1);
    for (i = 1; i < ingredients.length; ++i) {
        name += " " + ingredients[i];
    }
    name += " " + dishTypes[Math.floor(JavaMath.random() * dishTypes.length)];

    sharedRecipe = {
        name: name,
        ingredients: ingredients,
        ingredientQuantities: ingredientQuantities,
        serves: Math.floor(JavaMath.random() * 8) + 2
    };

    answer = canMake * sharedRecipe.serves;

    // Add triggers
    trigLocs.fisherYates();

    trigIds.push(mi.registerTrigger(trigReactId, trigLocs[0], function() {
        mi.setPropertyForAll("unlockedSafe", true);
    }));

    trigIds.push(mi.registerTrigger(trigReactId, trigLocs[1], function() {
        map.getCharacters().forEach(function(c) {
            c.giveDebuff(123, 13, stunTime);
        });
    }));

    mi.setPropertyForAll("failedComboCount", 0);
}

function getRecipes(num) {
    switch (num) {
        case 1:
            return recipes1;
        case 2:
            return recipes2;
        default:
            return null;
    }
}

function getSharedRecipe() {
    return sharedRecipe;
}

function getAnswer() {
    return answer;
}

function heardPlayerMovement(player, position) {
    if (position.y >= fallenYThreshold) {
        player.changeMap(5007, 0);
    }
}

function dispose() {
    pq.getPlayers().forEach(function(p) {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.clearDrops();
}
