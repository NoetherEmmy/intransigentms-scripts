var deathlyFear = 4031448;

function enter(pi) {
    if (!pi.haveItem(deathlyFear)) {
        pi.gainItem(deathlyFear, 1);
    }
	pi.warp(220070400, "out00");
	return true;
}
