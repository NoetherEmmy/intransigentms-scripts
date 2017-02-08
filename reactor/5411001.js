/* 
 * Branch reactor to summon Krexel
 *
 * Name: boss
 * ID: 5411001
 */

var TimerManager = Java.type("net.sf.odinms.server.TimerManager");

var mallet = 4031942;

function act() {
    if (rm.haveItem(mallet)) {
        rm.spawnMonster(9420520);
        rm.mapMessage("Krexel is awakened!");
        var p = rm.getPlayer();
        var map = p.getMap();
        TimerManager.getInstance().schedule(function() {
        	var monsters = map.getAllMonsters();
            monsters.forEach(function(monster) {
                map.killMonster(monster, p, false);
            });
        }, 2 * 1000);
        //rm.getPlayer().getMap().killAllMonsters(false);
    } else {
        rm.playerMessage("You shake this old tree's branches mightily, but without a proper tool you don't think you can hit it hard enough to awaken the mythical Krexel, if he even exists at all.");
    }
}
