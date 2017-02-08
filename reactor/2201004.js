/*
 * 2201004.js
 * Papulatus Reactor
 *
 * Performs the Papulatus commands/summons when players
 * drop the Piece of Cracked Dimension on it
 */

function act() {
    try {
        rm.mapMessage(5, "The dimensional hole has been filled by the <Piece of Cracked Dimension>.");
        rm.spawnMonster(8500000, -410, -400);
        rm.changeMusic("Bgm09/TimeAttack");
        rm.closeDoor(220080000);
        rm.closePortal(220080000, "sp");
        rm.createMapMonitor(220080000, "sp");
    } catch (e) {
        print(e.message);
        rm.mapMessage(5, "There was an error activating Papulatus: " + e.message);
    }
}
