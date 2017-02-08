/*
 * SCPQ script, map ID: 5008
 * The Chef's Kitchen
 */

var JavaMath = Java.type("java.lang.Math");
var Point    = Java.type("java.awt.Point");

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
    mi.setLevelLimit(60);
    map.setDropsDisabled(true);
}

function dispose() {
    pq.getPlayers().forEach(function(p) {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.killAllMonsters(false);
    map.clearDrops();
}
