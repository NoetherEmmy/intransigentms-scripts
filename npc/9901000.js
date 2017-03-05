/*
 * Bouncer NPC
 * Lilin's Manor: The Lobby
 *
 * ID: 9901000
 */

/* jshint ignore: start */
// seedrandom.min.js follows
!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/4294967296},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);
/* jshint ignore: end */

var status;
var firstSelection = -1;
var persuadeDc = 700;
var intimidateDc = 700;
var diplomacyPoints = 450;
var thisMap = 5001;
var galaMap = 5004;

function start() {
    var p = cm.getPlayer();
    Math.seedrandom(p.getName() + "j" + p.getLevel() + "y" + p.getMeso() + "^" + p.getHp(), { entropy: true });
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = pq.getMapInstance(p.getMapId());
    var roll;

    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 0 && (status < 1 || type === 4)) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    switch (status) {
        case 0:
            var playerName = "" + p.getName();
            var fakeName = playerName.toLowerCase() === "bourdieu" ? "Frankel" : "Bourdieu";
            cm.sendSimple("You want in?\r\n\r\nWhat's your name? I can check if you're on the guest list.\r\n\r\n#L0#My name's " + playerName + ".#l\r\n#L1#How about you just let me and my friends here inside and we'll go on our merry way?#l\r\n#L2#My name's " + fakeName + ", and I'm here on Lilin's personal request so that I may make a surprise guest appearance. (Persuade)#l");
            break;
        case 1:
            firstSelection = selection;
            switch (firstSelection) {
                case 0:
                    cm.sendOk("#elooks through guest list#n\r\n\r\n...Yeah, you're not on here. Sorry, bud.");
                    cm.dispose();
                    return;
                case 1:
                    cm.sendSimple("Uhm, what? I'm sorry, but you're either on the guest list, or you're not welcome.\r\n\r\n#L0#Fine, then.#l\r\n#L1#I said, let us through. Now. (Intimidate)#l");
                    break;
                case 2:
                    if (mi.getPlayerProperty(p, "persuaded")) {
                        cm.sendOk("Nice try, kid. I'm not falling for that this time, either.");
                        cm.dispose();
                        return;
                    }
                    mi.setPlayerProperty(p, "persuaded", true);
                    roll = p.getTotalInt() + Math.random() * 50;
                    if (roll >= persuadeDc) {
                        cm.sendNext("#ethe bouncer appears to have believed your lies!#n\r\n\r\nOh, right, of course. Sorry for the inconvenience, sir.\r\nYou and your party can come right in.\r\n\r\n(#b" + diplomacyPoints + " points awarded#k)");
                    } else {
                        cm.sendOk("#eyour persuasive wit does not appear to impress the bouncer#n\r\n\r\nUh... you mean the famous one, right? Yeah, you don't really look like them. Nice try, though.");
                        cm.dispose();
                        return;
                    }
                    break;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 2:
            switch (firstSelection) {
                case 1:
                    if (selection === 1) {
                        if (mi.getPlayerProperty(p, "intimidated")) {
                            cm.sendOk("Nice try, kid. I told you I'm not afraid of ya.");
                            cm.dispose();
                            return;
                        }
                        mi.setPlayerProperty(p, "intimidated", true);
                        roll = p.getTotalStr() + Math.random() * 60;
                        if (roll >= persuadeDc) {
                            cm.sendNext("#ethe bouncer looks you over and seems to have decided that you aren't someone he wants to tangle with#n\r\n\r\nI... uh... s--sure. Sorry for the inconvenience, sir.\r\nYou and your party can go right ahead.\r\n\r\n(#b" + diplomacyPoints + " points awarded#k)");
                        } else {
                            cm.sendOk("#eyour physical aptitude does not appear to impress the bouncer#n\r\n\r\nYeah, I don't think so, punk. Step back and let the real guests come through, will ya?");
                            cm.dispose();
                            return;
                        }
                    } else {
                        cm.dispose();
                        return;
                    }
                    break;
                case 2:
                    pq.addPoints(diplomacyPoints);
                    pq.registerMap(galaMap);
                    cm.warpParty(galaMap);
                    pq.unregisterMap(thisMap);
                    cm.dispose();
                    return;
                default:
                    cm.dispose();
                    return;
            }
            break;
        case 3:
            pq.addPoints(diplomacyPoints);
            pq.registerMap(galaMap);
            cm.warpParty(galaMap);
            pq.unregisterMap(thisMap);
            cm.dispose();
            return;
        default:
            cm.dispose();
            return;
    }
}
