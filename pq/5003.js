/*
 * SCPQ script, map ID: 5003
 * Ventilation Main Chamber
 */

"use strict";

const Collections        = Java.type("java.util.Collections");
const Item               = Java.type("net.sf.odinms.client.Item");
const MapleCharacter     = Java.type("net.sf.odinms.client.MapleCharacter");
const MapleMapObjectType = Java.type("net.sf.odinms.server.maps.MapleMapObjectType");
const Point              = Java.type("java.awt.Point");
const Rectangle          = Java.type("java.awt.Rectangle");
const TimerManager       = Java.type("net.sf.odinms.server.TimerManager");

const keyId = 4031217; // Golden Key
const dropPositions =
[
    new Point(105, -3289),  new Point(-27, -3214),  new Point(-51, -4855),  new Point(-35, -2001),
    new Point(-51, -4483),  new Point(-96, -2436),  new Point(149, -3691),  new Point(41, -1002),
    new Point(-45, -2220),  new Point(9, -5236),    new Point(-140, -2232), new Point(141, -1159),
    new Point(113, -2562),  new Point(42, -1388),   new Point(71, -1530),   new Point(-186, -3508),
    new Point(-182, -2040), new Point(-96, -2442),  new Point(-111, -3983), new Point(23, -3631),
    new Point(-67, -721),   new Point(-35, -697),   new Point(32, -861),    new Point(-190, -2532),
    new Point(134, -2496),  new Point(-4, -778),    new Point(-92, -2884),  new Point(-163, -3437),
    new Point(-84, -3615),  new Point(-58, -869),   new Point(83, -4635),   new Point(-54, -1600),
    new Point(64, -2800),   new Point(-176, -2566), new Point(-102, -1289), new Point(-28, -4472),
    new Point(-143, -2146), new Point(2, -2432),    new Point(12, -2993),   new Point(-183, -1056),
    new Point(-17, -1229),  new Point(1, -5355),    new Point(-159, -1748), new Point(-174, -5459),
    new Point(-131, -1062), new Point(151, -5079),  new Point(-86, -4843),  new Point(-81, -4808),
    new Point(126, -2338),  new Point(-99, -2666),  new Point(29, -675),    new Point(-25, -3953)
];
const fakeCharacter = new MapleCharacter();
const bottomRect = new Rectangle(-250, 0, 550, 450); // x, y, width, height
let mobKillTask;

function init() {
    map.restartRespawnWorker();

    pq.addPqItem(keyId);

    const keyCount = 14 + 6 * pq.getPlayers().size();
    dropPositions.fisherYates();
    for (let i = 0; i < keyCount; ++i) {
        fakeCharacter.setPosition(dropPositions[i]);
        map.spawnItemDrop(
            fakeCharacter,
            fakeCharacter,
            new Item(keyId, 0, 1),
            dropPositions[i],
            true,
            false
        );
    }

    pq.getPlayers().forEach(function(p) {
        p.dropMessage(
            "You easily find the way into the next portion of the ventilation chamber, but to your surprise it seems that the ventilation plague has hoarded all of the keys!"
        );
    });

    const tMan = TimerManager.getInstance();
    mobKillTask = tMan.register(function() {
        map.getMapObjectsInRect(
               bottomRect,
               Collections.singletonList(MapleMapObjectType.MONSTER)
           )
           .forEach(function(m) {
               map.silentKillMonster(m.getObjectId());
           });
    }, 2 * 1000, 2 * 1000);

    map.toggleDrops();
}

function getBottomRect() {
    return bottomRect;
}

function dispose() {
    mobKillTask.cancel(false);
    map.clearDrops();
}
