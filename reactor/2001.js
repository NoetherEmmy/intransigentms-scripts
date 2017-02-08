/*
 * 2001.js: SCPQ Recipe Box Reactor
 * 
 * Drops Recipe
 */

var recipe = 4031396;

function act() {
    var r = rm.getReactor();
    rm.dropItem(recipe);
    r.getMap().removeReactor(r.getObjectId());
}
