/*
 * 9208000.js: Guild Quest | Gatekeeper Puzzle Reactor
 *             Sous Chef Party Quest | Ballroom Statue
 */

var TimerManager = Java.type("net.sf.odinms.server.TimerManager");

var tMan = TimerManager.getInstance();
var ballroomMap = 5009;

function act() {
    var p = rm.getPlayer();
    var r = rm.getReactor();
    var eim = p.getEventInstance();
    var map = p.getMap();

    if (map.getId() === ballroomMap) {
        tMan.schedule(function() {
            map.destroyReactor(r.getObjectId());
        }, 600);
    } else if (eim !== null) {
        var status = eim.getProperty("stage1status");
        if (status !== null && !status.equals("waiting")) {
            var stage = parseInt(eim.getProperty("stage1phase"));
            //rm.mapMessage(6, "Stage " + stage);
            if (status.equals("display")) {
                var prevCombo = eim.getProperty("stage1combo");
                prevCombo += r.getObjectId();
                //rm.mapMessage(6, "Current Combo: " + prevCombo);
                eim.setProperty("stage1combo", prevCombo);
                if (prevCombo.length === (3 * (stage + 3))) { // End of displaying
                    eim.setProperty("stage1status", "active");
                    rm.mapMessage("The combo has been displayed; Proceed with caution.");
                    eim.setProperty("stage1guess", "");
                }
            } else { // Active
                var prevGuess = eim.getProperty("stage1guess");
                if (prevGuess.length !== 3 * (stage + 3)) {
                    prevGuess += r.getObjectId();
                    eim.setProperty("stage1guess", prevGuess);
                }
                //rm.mapMessage(6, "Current Guess: " + prevGuess);
            }
        }
    }
    //rm.mapMessage(6, "" + r.getObjectId());
}
