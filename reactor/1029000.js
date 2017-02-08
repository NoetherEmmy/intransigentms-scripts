/*
 * ID: 1029000
 *
 * Land of the Wild Boar
 * Kills all Jr. Boogies
 */

var jrBoogie1 = 3230300;
var jrBoogie2 = 3230301;

function act() {
    var p = rm.getPlayer();
    var map = p.getMap();
    map.getAllMonsters().forEach(function(m) {
        if (m.getId() === jrBoogie1 || m.getId() === jrBoogie2) {
            map.killMonster(m, p, false);
        }
    });
}
