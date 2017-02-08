load('nashorn:mozilla_compat.js');
var status = 0;
var regcost = 499;
var vipcost = 999;
var deathcost = 5000000;
var tempvar;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 1)
            status++; if (mode == 0 && status == 1) {
			cm.dispose();
			return;
		} if (mode == 0 && status == 2) {
			cm.sendNext("We offer other kinds of services, too, so please think carefully and then make your decision.");
			cm.dispose();
			return;
		}
        if (status == 0) {            
			cm.sendNext("Welcome. We're the Sleepywood Hotel. Our hotel works hard to serve you the best at all times. If you are tired and worn out from hunting, how about a relaxing stay at our hotel?");
		}
		if (status == 1) {
			var normal;
			if (cm.getPlayer().getMap().getId() == 105040400) {
				normal = "We offer three kinds of rooms for our service. Please choose the one of your liking.\r\n#b#L0#Regular sauna (" + regcost + " mesos per use)#l\r\n#L1#VIP sauna (" + vipcost + "mesos per use)#l";
			} else {
				normal = "Welcome! What can I help you with?";
			}
			var s = "";
			if (cm.getPlayer().getDeathPenalty() > 0) {
				s = "\r\n#L2#I don't feel so good.#l";
			}
			cm.sendSimple(normal + s + "\r\n#L3#(walk away)#l");
		}
		if (status == 2) {
			tempvar = selection;
			if (tempvar == 0) {
				cm.sendYesNo("You have chosen the regular sauna. Your HP and MP will recover fast and you can even purchase some items there. Are you sure you want to go in?");
			}
			if (tempvar == 1) {
				cm.sendYesNo("You've chosen the VIP sauna. Your HP and MP will recover even faster than that of the regular sauna and you can even find a special item in there. Are you sure you want to go in?");
			}
			if (tempvar == 2) {
				cm.sendYesNo("#egrimaces#n\r\n\r\nI can tell. You look like you saw a ghost!\r\n\r\nI think I have just the thing for you, something that can give you a really good rest. But it's going to cost you " + String(deathcost) + " mesos for the treatment. Do you want to pay?");
			}
			if (tempvar == 3) {
				cm.dispose();
				return;
			}
		}
		if (status == 3) {
			if (tempvar == 0) {
				if (cm.getMeso() >= regcost) {
					cm.warp(105040401);
					cm.gainMeso(-regcost);
				} else {
					cm.sendNext("I'm sorry. It looks like you don't have enough mesos. It will cost you at least " + regcost + " mesos to stay at our hotel.");
				}
			} else if (tempvar == 1) {
				if (cm.getMeso() >= vipcost) {
					cm.warp(105040402);
					cm.gainMeso(-vipcost);
				} else {
					cm.sendNext("I'm sorry. It looks like you don't have enough mesos. It will cost you at least " + regcost + " mesos to stay at our hotel.");
				}
			} else if (tempvar == 2) {
				if (cm.getMeso() >= deathcost) {
					if (cm.getPlayer().canStrengthen()) {
						cm.getPlayer().updateLastStrengthening();
						cm.gainMeso(-deathcost);
						cm.getPlayer().decrementDeathPenaltyAndRecalc(cm.getPlayer().getDeathFactor());
					} else {
						cm.sendNext(String(cm.getPlayer().getStrengtheningTimeString()));
					}
				} else {
					cm.sendNext("I'm sorry. It looks like you don't have enough mesos. It will cost you at least " + String(deathcost) + " mesos for this treatment.");
				}
			}
			cm.dispose();
			return;
		}
	}
}