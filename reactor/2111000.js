/*
 * 2111000.js: Zakum Party Quest Chest | summons 3 "Mimics"
 */

function act() {
    rm.playerMessage(5, "Oh dear! There were monsters in the chest!");
    rm.spawnMonster(9300004, 3);
}
