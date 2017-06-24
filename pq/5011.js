/*
 * SCPQ script, map ID: 5011
 * Escaping The Back Way
 */

"use strict";

const MapleInventoryManipulator = Java.type("net.sf.odinms.server.MapleInventoryManipulator");
const Point                     = Java.type("java.awt.Point");

const recipe = 4031396;
const obsReactId = 9990002;
const boxReactId = 2001;
const obsLocs =
[
    new Point(-2127, -626), new Point(1354, -949),  new Point(-1542, -626), new Point(-974, -626),
    new Point(-419, -626),  new Point(94, -626),    new Point(750, -626),   new Point(1392, -626),
    new Point(1961, -626),  new Point(-1976, -310), new Point(-1464, -366), new Point(-1363, -70),
    new Point(-967, -366),  new Point(-516, -381),  new Point(60, -246),    new Point(361, -400),
    new Point(972, -366),   new Point(1544, -356),  new Point(1922, -356),  new Point(1964, -70),
    new Point(1539, -70),   new Point(1000, -70),   new Point(492, -70)
];
const boxLocs =
[
    new Point(-1754, -498), new Point(-1269, -443), new Point(-1077, -443), new Point(-660, -443),
    new Point(-494, -443),  new Point(-74, -443),   new Point(423, -443),   new Point(1195, -443),
    new Point(1833, -443),  new Point(-1663, -167), new Point(-997, 133),   new Point(-1129, -164),
    new Point(-71, -194),   new Point(-429, -44),   new Point(328, -43),    new Point(431, -223),
    new Point(1199, -163),  new Point(1805, -153),  new Point(1821, 133),   new Point(1373, 81),
    new Point(820, 133),    new Point(366, 133)
];
let obsIds = [];
let boxIds = [];
const noop = function() {};
const fallenYThreshold = 165;

function init() {
    // Add the recipes that players gather to pq items
    pq.addPqItem(recipe);

    // Set up obstacles
    obsLocs.fisherYates();
    obsIds = obsLocs.map(function(ol) {
        return mi.registerObstacle(obsReactId, ol);
    });

    /*
     * Using Trigger to encapsulate reactor creation for boxes
     * and automate/ensure destruction on dispose. Normal Triggers
     * work just fine so long as the Action upon being hit is a no-op,
     * since delay should equal -1 so that the usual reactor respawn
     * is eschewed in favor of the act() function of the reactor script
     * cleaning up the reactor using MapleMap.removeReactor(oid).
     */
    boxIds = boxLocs.map(function(bl) {
        return mi.registerTrigger(boxReactId, bl, noop);
    });

    mi.listenForPlayerMovement();
}

function heardPlayerMovement(player, position) {
    if (position.y >= fallenYThreshold) {
        player.changeMap(5011, 2);
    }
}

function dispose() {
    pq.getPlayers().forEach(function(p) {
        MapleInventoryManipulator.removeAllById(p.getClient(), recipe, false);
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.killAllMonsters(false);
    map.clearDrops();
}
