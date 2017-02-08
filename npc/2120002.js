load('nashorn:mozilla_compat.js');
/*
 * Steward
 * ID: 2120002
 * Quest involved: 2007
 */

var status = 0;
var id = 2007;
var dialog = new Array(0, 0);
var pselection = -1;

function start() {
    //cm.getPlayer().setStoryPoints(7);
    for (var i = 0; i < dialog.length; ++i) {
        dialog[i] = 0;
    }
    status = -1;
    action(1, 0, 0); 
}

function action (mode, type, selection) {
    pselection = selection;
    if (mode === -1) {
        cm.dispose();
        return;
    } else {
        if (mode === 0 && status === 0) {
            cm.dispose();
            return;
        }
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (!cm.onQuest(id)) {
            if (cm.getStoryPoints() <= 7) {
                if (status === 0) {
                    cm.sendNext("#eglares#n");
                    cm.dispose();
                    return;
                }
            } else {
                if (status === 0) {
                    cm.sendNext("Th -- thank you. For saving me. #eblushes#n");
                    cm.dispose();
                    return;
                }
            }
        } else if (cm.onQuest(id) && !cm.canComplete()) {
            while (true) {
                if (pselection >= 10) {
                    pselection -= 10;
                }
                selection = pselection;
                if (status === 0) {
                    cm.sendSimple("#eglares#n\r\n\r\n#L0#(wave your hand in his face)#l\r\n#L1#Hey, bucko. What are you lookin' at?#l\r\n#L2#Quit creeping around the maid, ok?#l\r\n#L3#(slap him across the cheek)#l\r\n#L4#(walk away cautiously)#l");
                } else if (status === 1) {
                    if (selection === 0) {
                        cm.sendSimple("#eno response#n\r\n\r\n#L0#(do it again)#l\r\n#L1#(blow into his face)#l\r\n#L2#(walk away cautiously)#l");
                        dialog[0] = 0;
                    } else if (selection === 1) {
                        cm.sendSimple("#eglares more intensely#n\r\n\r\n#L0#I said, what the #efuck#n are you looking at? (brandish weapon)#l\r\n#L1#You in there, Mr. Steward?#l\r\n#L2#(blow into his face)#l\r\n#L3#(walk away cautiously)#l");
                        dialog[0] = 1;
                    } else if (selection === 2) {
                        cm.sendSimple("#eThe Steward appears to briefly consider whether or not to heed your command. He then appears to decide not to.#n\r\n\r\n#L0#I'm sorry, but that was not a suggestion. (brandish weapon)#l\r\n#L1#What kind of sick fucking thing are you, anyways?#l\r\n#L2#(wave your hand in his face)#l\r\n#L3#(walk away cautiously)#l");
                        dialog[0] = 2;
                    } else if (selection === 3) {
                        cm.sendSimple("#eThe Steward firmly grabs your hand before it can reach his cheek, throws you onto the ground by your arm, and goes back to staring at nothing.#n\r\n\r\n#L0#(walk away cautiously)#l\r\n#L1#(brandish weapon silently)#l\r\n#L2#That's it. (attack)#l\r\n#L3#Ow, what the hell is up with you?#l");
                        dialog[0] = 3;
                    } else if (selection === 4) {
                        cm.dispose();
                        return;
                    }
                } else if (status === 2) {
                    if (dialog[0] === 0) {
                        if (selection === 0) {
                            cm.sendSimple("#eThe Steward's face becomes more taught#n\r\n\r\n#L0#(do it yet again)#l\r\n#L1#(walk away cautiously)#l");
                            dialog[1] = 0;
                        } else if (selection === 1) {
                            cm.sendSimple("#edoesn't flinch#n\r\n\r\n#L0#Quit creeping around the maid, ok?#l\r\n#L1#(blow into his face yet again)#l\r\n#L2#(walk away cautiously)#l");
                            dialog[1] = 1;
                        } else if (selection === 2) {
                            cm.dispose();
                            return;
                        }
                    } else if (dialog[0] === 1) {
                        if (selection === 0) {
                            cm.sendSimple("#eeyes glow#n\r\n\r\n#L0#(cautiously put weapon back in sheath)#l\r\n#L1#(ready yourself for a fight)#l\r\n#L2#(walk away cautiously)#l");
                            dialog[1] = 2;
                        } else if (selection === 1) {
                            cm.sendSimple("#elooks confused#n\r\n\r\n#L0#What's your name, anyways?#l\r\n#L1#(walk away cautiously)#l\r\n#L2#Quit creeping around the maid, ok?#l");
                            dialog[1] = 3;
                        } else if (selection === 2) {
                            status = 2;
                            dialog[0] = 0;
                            pselection = 10 + 1;
                        } else if (selection === 3) {
                            cm.dispose();
                            return;
                        }
                    } else if (dialog[0] === 2) {
                        if (selection === 0) {
                            status = 2;
                            dialog[0] = 1;
                            pselection = 10 + 0;
                        } else if (selection === 1) {
                            status = 3;
                            dialog[1] = 3;
                            pselection = 10 + 0;
                        } else if (selection === 2) {
                            status = 1;
                            pselection = 10 + 0;
                        } else if (selection === 3) {
                            cm.dispose();
                            return;
                        }
                    } else if (dialog[0] === 3) {
                        if (selection === 0) {
                            cm.dispose();
                            return;
                        } else if (selection === 1) {
                            status = 2;
                            dialog[0] = 1;
                            pselection = 10 + 0;
                        } else if (selection === 2) {
                            cm.giveBuff(5121009, 11);
                            cm.getPlayer().dropMessage(6, "You have improved attack speed due to your initiative and tactical advantage.");
                            cm.sendNext("#e#bYou get the first strike!#k The Steward's possessor has revealed itself!#n");
                            cm.spawnMonster(3220000);
                            cm.dispose();
                        } else if (selection === 3) {
                            status = 1;
                            pselection = 10 + 1;
                        }
                    }
                } else if (status === 3) {
                    if (dialog[1] === 0) {
                        if (selection === 0) {
                            cm.sendNext("#eThe Steward grabs you and sends you tumbling down to the bottom of the staircase.#n");
                            cm.dispose();
                            return;
                        } else if (selection === 1) {
                            cm.dispose();
                            return;
                        }
                    } else if (dialog[1] === 1) {
                        if (selection === 0) {
                            status = 1;
                            pselection = 10 + 2;
                        } else if (selection === 1) {
                            cm.sendNext("#e#rThe Steward attacks first!#k The Steward's possessor has revealed itself!#n");
                            cm.spawnMonster(3220000);
                            status++;
                        } else if (selection === 2) {
                            cm.dispose();
                            return;
                        }
                    } else if (dialog[1] === 2) {
                        if (selection === 0) {
                            status = 0;
                            pselection = 10 + -1;
                            for (var i = 0; i < dialog.length; ++i) {
                                dialog[i] = 0;
                            }
                        } else if (selection === 1) {
                            cm.sendNext("#eThe Steward readies himself in turn. The Steward's possessor has revealed itself! Fight!#n");
                            cm.spawnMonster(3220000);
                            cm.dispose();
                        } else if (selection === 2) {
                            cm.dispose();
                            return;
                        }
                    } else if (dialog[1] === 3) {
                        if (selection === 0) {
                            cm.sendSimple("#emouth opens\r\n\r\na strong gust of wind and autumn leaves emerge from the opened mouth#n\r\n\r\n#L0#(brandish weapon)#l\r\n#L1#(walk away cautiously)#l\r\n#L2#Quit creeping around the maid, ok?#l");
                        } else if (selection === 1) {
                            cm.dispose();
                            return;
                        } else if (selection === 2) {
                            status = 1;
                            pselection = 10 + 2;
                        }
                    }
                } else if (status === 4) {
                    if (selection === 0) {
                        status = 2;
                        dialog[0] = 1;
                        pselection = 10 + 0;
                    } else if (selection === 1) {
                        cm.dispose();
                        return;
                    } else if (selection === 2) {
                        status = 1;
                        pselection = 10 + 2;
                    }
                } else if (status === 5) {
                    cm.giveDebuff(123, 13);
                    cm.giveDebuff(126, 1);
                    cm.getPlayer().dropMessage(6, "You have been slowed.");
                    cm.dispose();
                    return;
                }
                if (selection === pselection) {
                    break;
                }
            }
        } else if (cm.onQuest(id) && cm.canComplete()) {
            if (status === 0) {
                cm.sendNext("Th -- thank you. For saving me. #eblushes#n");
                cm.dispose();
                return;
            }
        }
    }
}