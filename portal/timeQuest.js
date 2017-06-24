/*
 * Time Lane quest portal script
 * Used for several (15?) portals along Time Lane.
 *
 * Checks for if the player has done the
 * requisite quest(s) to get to the next map.
 */

var questIds = [12000, 12001, 12002];

function enter(pi) {
    var p = pi.getPlayer();
    var thisMapId = p.getMap().getId();

    switch (thisMapId) {
        case 270010000:
            if (p.completedCQuest(questIds[0])) {
                pi.warp(270010100);
                return true;
            }
            p.dropMessage("You may not enter this portal prior to completing The One Who Wants To Walk Down Memory Lane.");
            return false;
        case 270010500:
            if (p.completedCQuest(questIds[1])) {
                pi.warp(270020000);
                return true;
            }
            p.dropMessage("You may not enter this portal prior to completing Regrets Run Rampant.");
            return false;
        case 270020500:
            if (p.completedCQuest(questIds[2])) {
                pi.warp(270030000);
                return true;
            }
            p.dropMessage("You may not enter this portal prior to completing Onward Unto Oblivion.");
            return false;
        case 270030500:
            if (p.completedCQuest(questIds[2])) {
                pi.warp(270040000);
                return true;
            }
            p.dropMessage("You may not enter this portal prior to completing Onward Unto Oblivion.");
            return false;
        case 270040000:
            if (p.completedCQuest(questIds[2])) {
                pi.warp(270040100);
                return true;
            }
            p.dropMessage("You may not enter this portal prior to completing Onward Unto Oblivion.");
            return false;
        default:
            var mapStage = Math.floor(thisMapId / 10000) % 10;
            if (mapStage === 1) {
                if (p.completedCQuest(questIds[0])) {
                    pi.warp(thisMapId + 10);
                    return true;
                }
                p.dropMessage("You may not enter this portal prior to completing The One Who Wants To Walk Down Memory Lane.");
                return false;
            } else if (mapStage === 2) {
                if (p.completedCQuest(questIds[1])) {
                    pi.warp(thisMapId + 10);
                    return true;
                }
                p.dropMessage("You may not enter this portal prior to completing Regrets Run Rampant.");
                return false;
            }
            if (p.completedCQuest(questIds[2])) {
                pi.warp(thisMapId + 10);
                return true;
            }
            p.dropMessage("You may not enter this portal prior to completing Onward Unto Oblivion.");
            return false;
    }
}
