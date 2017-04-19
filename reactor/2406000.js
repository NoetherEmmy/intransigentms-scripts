/*
 * 2406000.js
 * Nine Spirit's Nest
 *
 * Part of "Dragon Squad's Mission" quest
 */

var NPCScriptManager = Java.type("net.sf.odinms.scripting.npc.NPCScriptManager");
var Status           = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");

var questId = 3706;

function act() {
    var p = rm.getPlayer();
    if (rm.getReactor().getState() === 2) {
        var qs = p.getQuest(questId);
        if (qs.getStatus() === Status.STARTED) {
            NPCScriptManager.getInstance().start(p.getClient(), 2081008);
        } else {
            p.dropMessage(
                5,
                "Nine Spirit's Nest is only available to those on the " +
                    qs.getQuest().getName() +
                    " quest."
            );
        }
    }
}
