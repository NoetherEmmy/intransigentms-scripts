function enter(pi) {
    try {
        pi.warp(pi.getPlayer().getMapId() + 100, "st00");
    } catch (e) {
        pi.warp(pi.getPlayer().getMapId() + 100);
    }
    return true;
}
