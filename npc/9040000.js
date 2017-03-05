/*
 * Shuang
 * Victoria Road | Excavation Site<Camp> (ID 101030104)
 *
 * Start of Sharenian Party Quest (Guild Quest)
 */

var status;
var GQItems =
[
    1032033, 4001024, 4001025, 4001026,
    4001027, 4001028, 4001031, 4001032,
    4001033, 4001034, 4001035, 4001037
];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var i, em, eim;
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (status === 0) {
        cm.sendSimple("The path to Sharenian starts here. What would you like to do? #b\r\n#L0#Start a Guild Quest#l\r\n#L1#Join your guild's Guild Quest#l");
    } else if (status === 1) {
        if (selection === 0) { // Start
            if (p.getGuildId() === 0 || p.getGuildRank() >= 3) { // No guild or not guild master/jr. master
                cm.sendNext("Only a Master or Jr. Master of the guild can start an instance.");
                cm.dispose();
                return;
            } else {
                // No true requirements, make an instance and start it up
                //cm.startPQ("ZakumPQ");
                em = cm.getEventManager("GuildQuest");
                if (em === null) {
                    cm.sendOk("This trial is currently under construction.");
                } else {
                    if (getEimForGuild(em, p.getGuildId()) !== null) {
                        cm.sendOk("Your guild already has an active instance. Please try again later.");
                    } else {
                        // Start GQ
                        var guildId = p.getGuildId();
                        eim = em.newInstance(guildId);
                        em.startInstance(eim);

                        // Force the two scripts on portals in the map
                        var map = eim.getMapInstance(990000000);

                        map.getPortal(5).setScriptName("guildwaitingenter");
                        map.getPortal(4).setScriptName("guildwaitingexit");

                        eim.registerPlayer(p);
                        cm.guildMessage("The guild has been entered into the Guild Quest. Please report to Shuang at the Excavation Camp on channel " + cm.getC().getChannel() + ".");

                        // Remove all GQ items from player entering
                        for (i = 0; i < GQItems.length; ++i) {
                            cm.removeAll(GQItems[i]);
                        }
                    }
                }
                cm.dispose();
                return;
            }
        } else if (selection === 1) { // Entering existing GQ
            if (p.getGuildId() === 0) { // No guild or not guild master/jr. master
                cm.sendNext("You must be in a guild to join an instance.");
                cm.dispose();
                return;
            } else {
                em = cm.getEventManager("GuildQuest");
                if (em === null) {
                    cm.sendOk("This trial is currently under construction.");
                } else {
                    eim = getEimForGuild(em, p.getGuildId());
                    if (eim === null) {
                        cm.sendOk("Your guild is currently not registered for an instance.");
                    } else {
                        if ("true".equals(eim.getProperty("canEnter"))) {
                            eim.registerPlayer(p);
                            // Remove all GQ items from player entering
                            for (i = 0; i < GQItems.length; ++i) {
                                cm.removeAll(GQItems[i]);
                            }
                        } else {
                            cm.sendOk("I'm sorry, but the guild has gone on without you. Try again later.");
                        }
                    }
                }
                cm.dispose();
                return;
            }
        }
    }
}

function getEimForGuild(em, id) {
    var stringId = "" + id;
    return em.getInstance(stringId);
}
