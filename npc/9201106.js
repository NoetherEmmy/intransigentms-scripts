load('nashorn:mozilla_compat.js');
/*
 * Adonis
 * ID: 9201106
 * 
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
	cm.sendOk("Hi. I'm Adonis.");
	cm.dispose();
}