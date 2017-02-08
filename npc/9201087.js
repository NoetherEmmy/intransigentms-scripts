load('nashorn:mozilla_compat.js');
/** 
 * Kate
 * ID: 9201087
 **/ 

var status = 0;

function start() { 
    status = -1;
    action(1, 0, 0); 
} 

function action (mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
		} else {
            status--;
		}
		if (status == 0) {
			cm.sendNext("Hi there. I'm the maid around these parts; just let me know if there's anything you need. A new pair of breeches, perhaps...");
			cm.dispose();
			return;
		}
	}
}