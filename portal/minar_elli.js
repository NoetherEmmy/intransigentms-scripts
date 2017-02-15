function enter(pi) {
    var p = pi.getPlayer();
    if (pi.haveItem(4031346)) {
        if (p.getMapId() === 240010100) {
            pi.warp(101010000, "minar00");
            return true;
        } else if (p.getMapId() === 101010000) {
            pi.warp(240010100, "elli00");
            return true;
        }

        pi.gainItem(4031346, -1);
        pi.playerMessage("The Magical Seed is spent and you are transferred to somewhere.");
    } else {
        pi.playerMessage("A Magic Seed is needed to go through the portal.");
    }
}
