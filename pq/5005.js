/*
 * SCPQ script, map ID: 5005
 * The Library
 */

/* jshint loopfunc: true */

var JavaMath = Java.type("java.lang.Math");
var Point    = Java.type("java.awt.Point");

var obsReactId = 9990000;
var trigReactId = 2008007;
// First element of obsLocs should be
// the dead/noncontrolled obstacle location
var obsLocs = 
[
    new Point(984, -122),    new Point(-354, -122),  new Point(-995, -122),  new Point(462, -122),
    new Point(1393, -122),   new Point(-385, -605),  new Point(639, -605),   new Point(2026, -605),
    new Point(-1034, -1014), new Point(1096, -1014), new Point(1445, -1014), new Point(1849, -1014)
];
var trigLocs =
[
    new Point(-708, 133),    new Point(260, 133),    new Point(1255, 133),   new Point(1751, 133),
    new Point(2249, 133),    new Point(-1096, -347), new Point(-783, -347),  new Point(1201, -350),
    new Point(2261, -350),   new Point(-1109, -759), new Point(841, -759),   new Point(1300, -759)
];
var obsIds = [];
var trigIds = [];
//var disabledSkills = [2101002, 2201002, 2301001, 4111006, 5201005];

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

    // Set up obstacles
    obsIds = obsLocs.map(function(ol) {
        return mi.registerObstacle(obsReactId, ol);
    });

    //disabledSkills.forEach(function(skillId) { mi.disableSkill(skillId); });

    mi.listenForPlayerMovement();

    map.setDropsDisabled(true);
}

function mapRegistered(pqmi) {
    if (pqmi.getMap().getId() === 5006) {
        /* Set up triggers */
        var shuffled = obsIds.slice(1);
        shuffled.fisherYates();
        obsIds = [obsIds[0]].concat(shuffled);

        trigLocs.fisherYates();

        var i;
        // Start at i = 1 because first element of obsLocs/obsIds should be
        // the dead/noncontrolled obstacle
        for (i = 1; i < Math.ceil((obsIds.length - 1) / 2) + 1; ++i) {
            (function() {
                var _i = i;
                var obsId1 = obsIds[_i];
                var obsId2 = obsIds[_i - 1];
                trigIds.push(mi.registerTrigger(
                    trigReactId,
                    trigLocs[_i - 1],
                    function() {
                        if (!mi.toggleObstacle(obsId1)) {
                            print("Toggle obstacle failure: " + obsId1);
                        }

                        if (!mi.toggleObstacle(obsId2)) {
                            print("Toggle obstacle failure: " + obsId2);
                        }
                    }
                ));
            })();
        }

        // Set up triggers to control some of $pqmi's obstacles
        var _foreignObs = pqmi.registeredObstacleIds();
        var foreignObs = [];
        for (i = Math.ceil((_foreignObs.size() - 1) / 2) + 1; i < _foreignObs.size(); ++i) {
            foreignObs.push(_foreignObs.get(i));
        }

        for (i = 0; i < foreignObs.length && trigLocs.length > trigIds.length; ++i) {
            (function() {
                var thePoint = trigLocs[trigIds.length];
                var _i = i;
                var randForeignObsId = Math.floor(JavaMath.random() * (foreignObs.length - 1));
                if (randForeignObsId >= _i) randForeignObsId++;
                var foreignOb1 = foreignObs[_i];
                var foreignOb2 = foreignObs[randForeignObsId];

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
                        function() {
                            if (!pqmi.toggleObstacle(foreignOb1)) {
                                print("Toggle obstacle failure: " + foreignOb1);
                            }

                            if (!pqmi.toggleObstacle(foreignOb2)) {
                                print("Toggle obstacle failure: " + foreignOb2);
                            }
                        }
                    ));
                }
            })();
        }

        // Collect IDs of obstacles to be controlled by $pqmi
        var foreignControlledObs = [];
        for (; i < obsIds.length; ++i) {
            foreignControlledObs.push(obsIds[i]);
        }

        /* Send a call to $pqmi to set up its triggers */
        pqmi.invokeMethod("registerTrigs", foreignControlledObs, mi);
    }
}

function playerHit(p, dmg, attacker) {
    if (attacker !== null) map.silentKillMonster(attacker.getObjectId());
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
    pq.getPlayers().forEach(function(p) {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.clearDrops();
}
