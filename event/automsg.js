var MaplePacketCreator = Java.type("net.sf.odinms.tools.MaplePacketCreator");

var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    setupTask = em.scheduleAtFixedRate("start", 1000 * 60 * 10);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    var message =
    [
        "This is a permadeath server. Dying comes at the price of restarting the game!",
        "If you have any suggestions, just ask the GMs!",
        "@commands will show you a list of commands.",
        "If you have any questions, you can go to a nearby Maple Administrator, our website, or simply directly contact a GM."
    ];
    em.getChannelServer().broadcastPacket(MaplePacketCreator.sendYellowTip("[IntransigentMS] " + message[Math.floor(Math.random() * message.length)]));
}
