load('nashorn:mozilla_compat.js');
/* Door of Dimension
   Enter 3rd job event
*/

importPackage(Packages.net.sf.odinms.client);

function start() {
	if (cm.getQuestStatus(100101).equals(MapleQuestStatus.Status.STARTED) && !cm.haveItem(4031059)) { // 
		var em = cm.getEventManager("3rdjob");
		if (em == null) {
			cm.sendOk("Sorry, but the 3rd job event script is not active.");
		} else {
			em.newInstance(cm.getChar().getName()).registerPlayer(cm.getChar());
		}
	} else {
		cm.sendOk(".....");
	}
	cm.dispose();
}

function action(mode, type, selection) {

}