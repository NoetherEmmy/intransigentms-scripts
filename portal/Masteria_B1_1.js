function enter(pi) {
    var p = pi.getPlayer();
    if (p.getItemQuantity(3992040, false) > 0) {
        pi.warp(610010005, "sU6_1");
        return true;
    }
    return false;
}
