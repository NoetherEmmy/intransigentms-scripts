/*
 * SCPQ script, map ID: 5008
 * The Chef's Kitchen
 */

"use strict";

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
