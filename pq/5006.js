/*
 * SCPQ script, map ID: 5006
 * The Basement
 */

"use strict";

const Point = Java.type("java.awt.Point");

const obsReactId = 9990001;
const trigReactId = 2008007;
// First element of obsLocs should be
// the dead/noncontrolled obstacle location
const obsLocs =
[
    new Point(-1881, -384), new Point(1201, -1397), new Point(369, -1397),   new Point(-105, -1397),
    new Point(740, -922),   new Point(328, -922),   new Point(-255, -922),   new Point(-1420, -922),
    new Point(675, -384),   new Point(-1079, -384), new Point(-1048, -1397), new Point(0, -2400)
];
const trigLocs =
[
    new Point(-1489, -104), new Point(-1217, -104),  new Point(-20, -104),   new Point(1559, -104),
    new Point(1532, -646),  new Point(611, -642),    new Point(38, -642),    new Point(209, -642),
    new Point(-1867, -642), new Point(-1425, -1116), new Point(-511, -1116), new Point(1577, -1116),
    new Point(1281, -628)
];
let obsIds = [];
const trigIds = [];
//
let localObsIds;
//

function init() {
    map.restartRespawnWorker();

    // Set up obstacles
    obsIds = obsLocs.map(function(ol) {
        return mi.registerObstacle(obsReactId, ol);
    });

    mi.listenForPlayerMovement();

    map.setDropsDisabled(true);
}

function registerTrigs(foreignObsIds, pqmi) {
    // Start at i = 1 because first element of obsLocs/obsIds should be
    // the dead/noncontrolled obstacle
    localObsIds = obsIds.slice(1, Math.ceil((obsIds.length - 1) / 2) + 1);
    localObsIds.fisherYates();

    trigLocs.fisherYates();

    range(0, localObsIds.length).forEach(function(i) {
        let randObsId = Math.floor(Math.random() * (localObsIds.length - 1));
        if (randObsId >= i) {
            randObsId++;
        }
        const localObsId1 = localObsIds[i];
        const localObsId2 = localObsIds[randObsId];

        trigIds.push(mi.registerTrigger(
            trigReactId,
            trigLocs[i],
            function() {
                if (!mi.toggleObstacle(localObsId1)) {
                    print("Toggle obstacle failure: " + localObsId1);
                }

                if (!mi.toggleObstacle(localObsId2)) {
                    print("Toggle obstacle failure: " + localObsId2);
                }
            }
        ));
    });

    // Set up triggers to control some of the foreign obstacles
    range(0, foreignObsIds.length).forEach(function(i) {
        trigIds.push(mi.registerTrigger(
            trigReactId,
            trigLocs[trigIds.length],
            function() {
                try {
                    pqmi.toggleObstacle(foreignObsIds[i]);
                } catch (ignored) {
                    print(ignored + ", " + foreignObsIds[i]);
                }

                let randForeignObsId = Math.floor(Math.random() * (foreignObsIds.length - 1));
                if (randForeignObsId >= i) {
                    randForeignObsId++;
                }
                try {
                    pqmi.toggleObstacle(foreignObsIds[randForeignObsId]);
                } catch (ignored) {
                    print(ignored + ", " + foreignObsIds[i]);
                }
            }
        ));
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
