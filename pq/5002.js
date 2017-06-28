/*
 * SCPQ script, map ID: 5002
 * Ventilation Opening
 */

"use strict";

function init() {
    map.restartRespawnWorker();

    pq.getPlayers().forEach(p =>
        p.dropMessage(
            "The opening of the ventilation system is vast; impressive even for a manor of this size. The air is dank, and this passage has clearly not been attended to in quite a while."
        )
    );

    map.setDropsDisabled(true);
}

function dispose() {
    pq.getPlayers().forEach(p => {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.clearDrops();
}
