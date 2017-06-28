/*
 * SCPQ script, map ID: 5000
 * Starting map; On the way to Lilin's Manor
 */

"use strict";

const Collections        = Java.type("java.util.Collections");
const Double             = Java.type("java.lang.Double");
const MapleMapObjectType = Java.type("net.sf.odinms.server.maps.MapleMapObjectType");
const Point              = Java.type("java.awt.Point");
const TimerManager       = Java.type("net.sf.odinms.server.TimerManager");

const nextMap = 5001;
const stageTime = 2;
const tMan = TimerManager.getInstance();
let warnSchedule, warpSchedule;
let batKillTask;

function init() {
    map.restartRespawnWorker();

    pq.getPlayers().forEach(p => {
        p.dropMessage(
            "It's gotten very dark outside, making it difficult to see your surroundings properly -- including your enemies. You are in a state of Darkness."
        );
        p.giveDebuff(121, 8, stageTime * 60 * 1000 - 500); // Level 8 [max] Darkness for 4 minutes minus a little; the duration of this stage.
    });

    warnSchedule = tMan.schedule(
        () =>
            pq.getPlayers().forEach(p =>
                p.dropMessage(
                    5,
                    "Bearlywyne: \"Looks like we're just about here are Lilin's Manor. Watch yer step on the way out, will ya?\""
                )
            ),
        stageTime * 60 * 1000 - 15 * 1000 // 15 seconds from the end.
    );

    warpSchedule = tMan.schedule(() => {
        pq.registerMap(nextMap);
        pq.getPlayers().forEach(p => p.changeMap(nextMap));
        pq.unregisterMap(map.getId());
    }, stageTime * 60 * 1000); // At the end.

    batKillTask = tMan.register(() => {
        const mobs =
            map.getMapObjectsInRange(
                new Point(),
                Double.POSITIVE_INFINITY,
                Collections.singletonList(MapleMapObjectType.MONSTER)
            );
        if (mobs.size() > 6) {
            map.silentKillMonster(mobs.get(0).getObjectId());
        }
    }, 9 * 100);

    map.setDropsDisabled(true);
}

function playerHit(player, damage, attacker) {
    if (attacker !== null) {
        player.giveDebuff(125, 9, 4 * 1000); // Level 9 [max] Poison for 4 seconds.
        pq.addPoints(-10);
    }
}

function dispose() {
    warnSchedule.cancel(false);
    warpSchedule.cancel(false);
    batKillTask.cancel(false);
    map.clearDrops();
}
