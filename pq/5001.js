/*
 * SCPQ script, map ID: 5001
 * The Lobby
 */

"use strict";

function init() {
    pq.getPlayers().forEach(function(p) {
        p.dropMessage(
            "The manor's lobby is lengthy, and several apparently unassociated people are milling about just outside of the gala."
        );
        mi.setPlayerProperty(p, "intimidated", false);
        mi.setPlayerProperty(p, "persuaded", false);
    });
}

function dispose() {
    pq.getPlayers().forEach(function(p) {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.clearDrops();
}
