/*
 * Portal to the inside of the Tera Forest tree
 *
 * Script: TD_neo_inTree
 */

var mapIds =
[
    240070010, 240070020, 240070030,
    240070040, 240070050, 240070060
];

function enter(pi) {
    var to =
        mapIds
            .map(function(mapId) {
                return pi.getClient()
                         .getChannelServer()
                         .getMapFactory()
                         .getMap(mapId);
            })
            .sort(function(map1, map2) {
                if (map1.playerCount() < 1 && map1.mobCount() > 0) {
                    return -1;
                }
                if (map2.playerCount() < 1 && map2.mobCount() > 0) {
                    return 1;
                }
                if (map1.playerCount() < 1) {
                    return -1;
                }
                if (map2.playerCount() < 1) {
                    return 1;
                }
                if (map1.mobCount() > 0) {
                    return -1;
                }
                if (map2.mobCount() > 0) {
                    return 1;
                }
                return 0;
            })[0];
    pi.warp(to.getId(), "out00");
    return true;
}
