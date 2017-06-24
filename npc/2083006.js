/*
 * Time Gate
 *
 * ID: 2083006
 * Takes players to various timelines of Neo City.
 */

var timelines =
[
    { mapId: 240070100, name: "Year 2021: Average Town",       levelReq: 50  },
    { mapId: 240070200, name: "Year 2099: Midnight Harbor",    levelReq: 55  },
    { mapId: 240070300, name: "Year 2215: Bombed City Center", levelReq: 60  },
    { mapId: 240070400, name: "Year 2215: Ruined City",        levelReq: 65  },
    { mapId: 240070500, name: "Year 2230: Dangerous Tower",    levelReq: 70  },
    { mapId: 240070600, name: "Year 2503: Air Battleship",     levelReq: 75  },
    { mapId: 683070400, name: "Year 2227: Dangerous City",     levelReq: 120 },
    { mapId: 683070500, name: "Year ????: Permanent Nadir",    levelReq: 140 },
];

var status;
var selection_;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    if (
        mode < 0 ||
        ((status < 1 || type === 4 || type === 12) && mode === 0)
    ) {
        cm.dispose();
        return;
    }
    status += mode === 1 ? 1 : -1;

    switch (status) {
        case 0:
            var msg = "#eyou walk near this portal and feel a chill in your bones from the sheer bizarreness of the machine and the high-pitched whine it emits to those who are close enough#n\r\n\r\n#eyou are feeling particularly reckless today, and decide to fiddle around with the panel on the side#n\r\n\r\n#eyou find a small inscription under one of the hinged protective covers:#n\r\n\r\n";
            msg += timelines.map(function(timeline, index) {
                return "#L" +
                       index +
                       "#" +
                       timeline.name +
                       "  |  Required level: " +
                       timeline.levelReq +
                       "#l";
            }).join("\r\n");

            cm.sendSimple(msg);
            break;
        case 1:
            selection_ = selection;
            if (p.getLevel() >= timelines[selection_].levelReq) {
                cm.sendSimple("#eyou press down gingerly upon the large red button on the side of the machine, and to your brief terror, the machine stops its incessant humming and falls almost silent#n\r\n\r\n#esuddenly, the recepticle of the machine begins to change appearance; you think it's probably working#n\r\n\r\n#L0#(enter the recepticle)#l\r\n#L1#(walk away from the giant machine)#l");
            } else {
                cm.sendOk("#eyou hastily push down the large red button on the side of the machine and hop into its recepticle, but the machine senses your haste and immaturity and rejects you outright, hurling you backwards onto the ground#n");
                cm.dispose();
                return;
            }
            break;
        case 2:
            if (selection === 0) {
                cm.warp(timelines[selection_].mapId);
            }
            cm.dispose();
            return;
    }
}
