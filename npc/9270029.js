load('nashorn:mozilla_compat.js');
/* 	Johnson
	Upper level of training camp
*/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (status == 0) {
		cm.sendNext("A -- a -- acHOOOOOOOOOOOOOOOOOOOOO~~~\r\n\r\nFuck. #eschniff#n\r\n\r\nO -- oh, hey. I um; I didn't see you there, sorry.");
	} else if (status == 1) {
		cm.sendNextPrev("You're new here. They told me you'd be here, I think.\r\n\r\nI'm #bJohnson#k, and I'm supposed to tell you about this world because apparently where you come from it's a lot different. Or something like that.\r\n\r\nWhat's your name, anyways?");
	} else if (status == 2) {
		cm.sendNextPrev("Well then hello, #h #. Is that a common name where you come from, or...?\r\n\r\nAhem; nevermind.");
	} else if (status == 3) {
		cm.sendNextPrev("This is #dIntransigentMS#k, so when you die, you can't come back -- it's not like other worlds. Luckily you can pass down some of your money as well as a single heirloom item in your will, so not all is lost.\r\n\r\nThere's a few other things you should know. #bKarcasa#k and #bJack#k can fill you in on some of it, but I'll tell you about one thing you likely aren't used to: the way we do experience.");
	} else if (status == 4) {
		cm.sendNextPrev("You see, this world is nominally #g4x#k experience. But it's not what it says on the tin./r/nOnce you start levelling beyond level 10, #ryour experience rate will start to ramp up#k (or rather, step up every couple of levels). At higher levels you may be capable of quite astounding experience multipliers, like #g26x#k or #g32x#k!");
	} else if (status == 5) {
		cm.sendNextPrev("There's one other thing too, with the experience. Your experience multiplier #rchanges quite significantly based on the level of monster you are fighting compared to your own level#k.\r\n\r\nFighting a monster that is exactly your level will leave your experience multiplier unaffected. Fighting one that is 5 levels #ebelow#n you will only net you 50% as much experience, and one that is 5 levels #eabove#n you will net you 150% as much.\r\n\r\nAny monster that is 10 levels or more below you #rwon't get you any experience#k, but as monsters get higher and higher above your level, you get #dlots#k of experience!");
	} else if (status == 6) {
		cm.sendNextPrev("Anyways, that's all for now. You can have a chat with Jack, and Karcasa too. They can tell you more.");
	} else if (status > 6) {
		cm.dispose();
		return;
	}
}