/*
 * SCPQ script, map ID: 5005
 * The Library
 */

"use strict";

const Point = Java.type("java.awt.Point");

const obsReactId = 9990000;
const trigReactId = 2008007;
// First element of obsLocs should be
// the dead/noncontrolled obstacle location
const obsLocs =
[
    new Point(984,   -122),  new Point(-354, -122),  new Point(-995, -122),  new Point(462,  -122),
    new Point(1393,  -122),  new Point(-385, -605),  new Point(639,  -605),  new Point(2026, -605),
    new Point(-1034, -1014), new Point(1096, -1014), new Point(1445, -1014), new Point(1849, -1014)
];
const trigLocs =
[
    new Point(-708, 133),  new Point(260,   133),  new Point(1255, 133),  new Point(1751, 133),
    new Point(2249, 133),  new Point(-1096, -347), new Point(-783, -347), new Point(1201, -350),
    new Point(2261, -350), new Point(-1109, -759), new Point(841,  -759), new Point(1300, -759)
];
let obsIds = [];
const trigIds = [];
let foreignObs;

function init() {
    map.restartRespawnWorker();

    // Set up obstacles
    obsIds = obsLocs.map(ol => mi.registerObstacle(obsReactId, ol));

    mi.listenForPlayerMovement();

    map.setDropsDisabled(true);
}

function mapRegistered(pqmi) {
    if (pqmi.getMap().getId() === 5006) {
        /* Set up triggers */
        const shuffled = obsIds.slice(1);
        shuffled.fisherYates();
        obsIds = [obsIds[0]].concat(shuffled);

        trigLocs.fisherYates();

        // Start at i = 1 because first element of obsLocs/obsIds should be
        // the dead/noncontrolled obstacle
        range(1, Math.ceil((obsIds.length - 1) / 2) + 1).forEach(i => {
            const obsId1 = obsIds[i];
            const obsId2 = obsIds[i - 1];
            trigIds.push(mi.registerTrigger(
                trigReactId,
                trigLocs[i - 1],
                () => {
                    if (!mi.toggleObstacle(obsId1)) {
                        print("Toggle obstacle failure: " + obsId1);
                    }

                    if (!mi.toggleObstacle(obsId2)) {
                        print("Toggle obstacle failure: " + obsId2);
                    }
                }
            ));
        });

        // Set up triggers to control some of $pqmi's obstacles
        const _foreignObs = pqmi.registeredObstacleIds();
        foreignObs = [];
        for (let i = Math.ceil((_foreignObs.size() - 1) / 2) + 1; i < _foreignObs.size(); ++i) {
            foreignObs.push(_foreignObs.get(i));
        }
        /*
        range(Math.ceil((_foreignObs.size() - 1) / 2) + 1, _foreignObs.size()).forEach(function(i) {
            foreignObs.push(_foreignObs.get(i));
        });
        */

        const toggleFn = (foreignOb1, foreignOb2) =>
            () => {
                if (!pqmi.toggleObstacle(foreignOb1)) {
                    print("Toggle obstacle failure: " + foreignOb1);
                }

                if (!pqmi.toggleObstacle(foreignOb2)) {
                    print("Toggle obstacle failure: " + foreignOb2);
                }
            };

        let i;
        for (i = 0; i < foreignObs.length && trigLocs.length > trigIds.length; ++i) {
            const thePoint = trigLocs[trigIds.length];
            const _i = +i;
            let randForeignObsId = Math.floor(Math.random() * (foreignObs.length - 1));
            if (randForeignObsId >= _i) {
                randForeignObsId++;
            }
            const foreignOb1 = foreignObs[_i];
            const foreignOb2 = foreignObs[randForeignObsId];

            if (thePoint) {
                /*
                trigIds.push(mi.registerTrigger(
                    trigReactId,
                    thePoint,
                    foreignObs[i],
                    pqmi
                ));
                */
                trigIds.push(mi.registerTrigger(
                    trigReactId,
                    thePoint,
                    toggleFn(foreignOb1, foreignOb2)
                ));
            }
        }

        // Collect IDs of obstacles to be controlled by $pqmi
        const foreignControlledObs = [];
        for (; i < obsIds.length; ++i) {
            foreignControlledObs.push(obsIds[i]);
        }

        /* Send a call to $pqmi to set up its triggers */
        pqmi.invokeMethod("registerTrigs", foreignControlledObs, mi);
    }
}

function playerHit(p, dmg, attacker) {
    if (attacker !== null) {
        map.silentKillMonster(attacker.getObjectId());
    }
}

function playerHitObstacle(player, obstacle) {
    /*
    var rect = obstacle.getRect();
    player.dropMessage(
        "You hit obstacle with position (" +
        rect.x +
        ", " +
        rect.y +
        ") and dimensions " +
        rect.width +
        " x " +
        rect.height +
        "."
    );
    */
}

function heardPlayerMovement(player, position) {
    //player.dropMessage("You moved to (" + position.x + ", " + position.y + ")");
}

function dispose() {
    pq.getPlayers().forEach(p => {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.clearDrops();
}
