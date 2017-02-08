/*
    Flo - Crossroad of Time (220040200)
*/

// Doesn't have any info about this one, job quest?

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        if (status === 0 && mode === 0) {
            cm.dispose();
            return;
        }
        if (mode === 0) {
            cm.dispose();
            return;
        }
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (status === 0) {
            cm.sendOk("You seem to have no reason to meet based Thanatos.");
            cm.dispose();
            return;
        }
    }
}
