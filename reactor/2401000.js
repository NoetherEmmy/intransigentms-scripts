/*
 * 2401000
 * Reactor that spawns (spawned) Horntail
 */

function act() {
    var p = rm.getPlayer();
    p.dropMessage(
        5,
        "You must talk to the Crystal of Roots to summon Horntail."
    );
    /*
    rm.changeMusic("Bgm14/HonTale");
    rm.spawnMonster(8810026, 71, 260);
    rm.killMonster(8810026);
    rm.mapMessage(6, "From the depths of his cave, Horntail emerges!");
    rm.createMapMonitor(240050400, "sp");
    rm.getReactor().getMap().addMapTimer(12 * 60 * 60, 240000000);
    */
}
