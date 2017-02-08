/*
 * SCPQ script, map ID: 5006
 * The Basement
 */

/* jshint loopfunc: true */

var JavaMath = Java.type("java.lang.Math");
var Point    = Java.type("java.awt.Point");

var obsReactId = 9990001;
var trigReactId = 2008007;
// First element of obsLocs should be
// the dead/noncontrolled obstacle location
var obsLocs =
[
    new Point(-1881, -384), new Point(1201, -1397), new Point(369, -1397),   new Point(-105, -1397),
    new Point(740, -922),   new Point(328, -922),   new Point(-255, -922),   new Point(-1420, -922),
    new Point(675, -384),   new Point(-1079, -384), new Point(-1048, -1397), new Point(0, -2400)
];
var trigLocs =
[
    new Point(-1489, -104), new Point(-1217, -104),  new Point(-20, -104),   new Point(1559, -104),
    new Point(1532, -646),  new Point(611, -642),    new Point(38, -642),    new Point(209, -642),
    new Point(-1867, -642), new Point(-1425, -1116), new Point(-511, -1116), new Point(1577, -1116),
    new Point(1281, -628)
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

function registerTrigs(foreignObsIds, pqmi) {
    // Start at i = 1 because first element of obsLocs/obsIds should be
    // the dead/noncontrolled obstacle
    var localObsIds = obsIds.slice(1, Math.ceil((obsIds.length - 1) / 2) + 1);
    localObsIds.fisherYates();

    trigLocs.fisherYates();

    var i;
    for (i = 0; i < localObsIds.length; ++i) {
        //trigIds.push(mi.registerTrigger(trigReactId, trigLocs[i], localObsIds[i]));
        (function() {
            var _i = i;
            var randObsId = Math.floor(JavaMath.random() * (localObsIds.length - 1));
            if (randObsId >= _i) randObsId++;
            var localObsId1 = localObsIds[_i];
            var localObsId2 = localObsIds[randObsId];

            trigIds.push(mi.registerTrigger(
                trigReactId,
                trigLocs[_i],
                function() {
                    if (!mi.toggleObstacle(localObsId1)) {
                        print("Toggle obstacle failure: " + localObsId1);
                    }

                    if (!mi.toggleObstacle(localObsId2)) {
                        print("Toggle obstacle failure: " + localObsId2);
                    }
                }
            ));
        })();
    }

    // Set up triggers to control some of the foreign obstacles
    for (i = 0; i < foreignObsIds.length; ++i) {
        (function() {
            var _i = i;
            trigIds.push(mi.registerTrigger(
                trigReactId,
                trigLocs[trigIds.length],
                //foreignObsIds[i],
                //pqmi
                function() {
                    try {
                        pqmi.toggleObstacle(foreignObsIds[_i]);
                    } catch (ignored) {
                        print(ignored + ", " + foreignObsIds[_i]);
                    }

                    var randForeignObsId = Math.floor(JavaMath.random() * (foreignObsIds.length - 1));
                    if (randForeignObsId >= _i) randForeignObsId++;
                    try {
                        pqmi.toggleObstacle(foreignObsIds[randForeignObsId]);
                    } catch (ignored) {
                        print(ignored + ", " + foreignObsIds[_i]);
                    }
                }
            ));
        })();
    }
}

function dispose() {
    pq.getPlayers().forEach(function(p) {
        if (p.getClient().getCM() !== null) {
            p.getClient().getCM().dispose();
        }
    });
    map.clearDrops();
}
