/*
 * SCPQ script, map ID: 5007
 * Storage and Refrigeration
 *
 * Map has spawns for mob 7110301
 */

"use strict";

const Point = Java.type("java.awt.Point");

const trigReactId = 2008007;
const stunTime = 7 * 1000;
const fallenYThreshold = 0;

const trigLocs =
[
    new Point(639, -355), new Point(392, -355)
];
const trigIds = [];
const possibleIngredients =
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
const dishTypes =
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
const recipes1 = {};
const recipes2 = {};
let sharedRecipe, answer;

function init() {
    map.restartRespawnWorker();

    // Housekeeping
    mi.setLevelLimit(58);
    map.setDropsDisabled(true);
    mi.listenForPlayerMovement();

    // Generate recipes/puzzle
    possibleIngredients.fisherYates();

    for (let j = 0; j < 4; ++j) {
        const ingredients = [];
        const ingredientQuantities = [];
        const stockQuantities = [];
        let name = "";

        for (let i = 0; i < 4; ++i) {
            ingredients.push(possibleIngredients.pop());
            ingredientQuantities.push(Math.floor(Math.random() * 8) + 2);
        }
        for (let i = 0; i < 2; ++i) {
            stockQuantities.push([ingredients[i], Math.floor(Math.random() * 30) + 30]);
        }

        name += ingredients[0].slice(0, 1).toUpperCase() + ingredients[0].slice(1);
        for (let i = 1; i < ingredients.length; ++i) {
            name += " " + ingredients[i];
        }
        name += " " + dishTypes[Math.floor(Math.random() * dishTypes.length)];

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

    const ingredients = [];
    const ingredientQuantities = [];
    let name = "";

    let canMake = 30000000; // Magic large number

    for (const recipeName in recipes1) {
        const recipe = recipes1[recipeName];
        const ingredientIndex = Math.floor(Math.random() * 2);
        const ingredientQuantity = Math.floor(Math.random() * 8) + 2;
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
    for (const recipeName in recipes2) {
        const recipe = recipes2[recipeName];
        const ingredientIndex = Math.floor(Math.random() * 2);
        const ingredientQuantity = Math.floor(Math.random() * 8) + 2;
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
    for (let i = 1; i < ingredients.length; ++i) {
        name += " " + ingredients[i];
    }
    name += " " + dishTypes[Math.floor(Math.random() * dishTypes.length)];

    sharedRecipe = {
        name: name,
        ingredients: ingredients,
        ingredientQuantities: ingredientQuantities,
        serves: Math.floor(Math.random() * 8) + 2
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
