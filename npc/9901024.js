/*
 * Computer
 * Lilin's Manor | Escaping The Back Way
 *
 * ID: 9901024
 */

function PlainFile(name, contents, accesslv) {
    this.name = name;
    this.contents = contents;
    this.accesslv = accesslv;
}

function Executable(name, exe, accesslv) {
    this.name = name;
    this.exe = exe;
    this.accesslv = accesslv;
}

function BlockedDir(name) {
    this.name = name;
}

String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; ++i) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash * 15485863;
};

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&");
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
          position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

var status;
var maxDist = 100;
var terminalStart = "#k#b\t\tmaekra@lilingfm: [";
var startText = "#ejudging by the hulking metal casing and the screen on top, you judge this to be some kind of computer; and to your surprise, it's powered on already#n\r\n\r\n#eeven more surprising is the fact that the operating system is already booted into a user -- this place really needs to get its security shit straight#n\r\n\r\n#ethe terminal reads:#n\r\n\r\n";
var terminalPwd, terminalEnd;

function splitPath(path) {
    var split;
    if (path.indexOf("/") === -1 && path !== "." && path !== ".." && path !== "~") {
        split = terminalPwd.concat([path]);
    } else {
        split = path.split("/");
    }
    if (split[0] === "") {
        split[0] = "/";
    }
    if (split[split.length - 1] === "") {
        split.pop();
    }
    if (split[0] === "..") {
        split.shift();
        split = terminalPwd.slice(0, -1).concat(split);
    } else if (split[0] === ".") {
        split.shift();
        split = terminalPwd.concat(split);
    } else if (split[0] === "~") {
        split.shift();
        split = ["/", "home", "maekra"].concat(split);
    }
    return split;
}

function findData(s, splitted) {
    var split;
    if (splitted) {
        split = s;
    } else {
        split = splitPath(s);
    }
    if (split.length < 1) {
        return undefined;
    }
    var data = dirTree[split[0]];
    for (var i = 1; i < split.length; ++i) {
        if (data) {
            data = data[split[i]];
        } else {
            return undefined;
        }
    }
    if (!data) {
        return undefined;
    }
    return data;
}

var commands =
{
    "bash": new Executable("bash", function() {
        try {
            var argArray = [].slice.call(arguments);
            var commandWord = argArray[0];
            var command = commands[commandWord];
            if (!command) {
                var possibleExe;
                if (commandWord.indexOf("/") === -1) {
                    possibleExe = findData(terminalPwd.concat([commandWord]), true);
                } else {
                    possibleExe = findData(commandWord, false);
                }
                if (possibleExe instanceof PlainFile && possibleExe.name.endsWith(".sh")) {
                    if (possibleExe.contents.indexOf("112.11.0.112") !== -1) {
                        redSwitch();
                        return "Exit code 0.";
                    } else if (possibleExe.contents.indexOf("112.11.0.111") !== -1) {
                        blueSwitch();
                        return "Exit code 0.";
                    } else if (possibleExe.contents.indexOf("112.11.0.110") !== -1) {
                        yellowSwitch();
                        return "Exit code 0.";
                    } else {
                        return "Exit code 1.";
                    }
                }

                return "Could not find the executable specified: " + commandWord;
            }
            return command.exe.apply(this, argArray.slice(1));
        } catch (e) {
            return "" + e.message;
        }
    }, 0),
    "bzip2": new Executable("bzip2", function(path) {
        if (!path) {
            return "Error: path must be specified.";
        }
        var splitted;
        if (path.indexOf("/") === -1) {
            splitted = terminalPwd.concat([path]);
        } else {
            splitted = path.split("/");
        }
        var data = findData(splitted, true);
        if (data instanceof PlainFile || data instanceof Executable) {
            var dir = findData(splitted.slice(0, -1), true);
            var fileName = splitted[splitted.length - 1] + ".zip";
            dir[fileName] = new PlainFile(fileName, (data instanceof PlainFile ? data.contents : data.exe).toString().hashCode().toString(16), 0);
            return "New file: " + fileName + " successfully created.";
        } else {
            return "Could not find specified path.";
        }
    }, 0),
    "chmod": new Executable("chmod", function() {
        return "Access denied.";
    }, 1),
    "cd": new Executable("cd", function(path) {
        if (!path) {
            return "Error: path must be specified.";
        }
        var data = findData(path, false);
        if (data instanceof BlockedDir) {
            return "You do not have the privileges necessary to access this directory.";
        } else if (data instanceof PlainFile || data instanceof Executable) {
            return "The path you are trying to access is not a directory.";
        } else if (!data) {
            return "Could not find specified path.";
        } else {
            terminalPwd = splitPath(path);
            return "";
        }
    }, 0),
    "cp": new Executable("cp", function(path1, path2) {
        try {
            var copied = findData(path1, false);
            var path2Split = splitPath(path2);
            var destDir = findData(path2Split.slice(0, -1), true);
            var destFileName = path2Split[path2Split.length - 1];

            if (copied instanceof PlainFile || copied instanceof Executable) {
                if (destDir instanceof BlockedDir) {
                    return "You do not have the privileges necessary to access the destination directory.";
                } else if (destDir instanceof PlainFile || destDir instanceof Executable) {
                    return "The destination path you are trying to access is not valid.";
                } else if (!destDir) {
                    return "Could not find specified destination path.";
                } else {
                    var already = destDir[destFileName];
                    if (already) {
                        return "There already exists a file with the specified name.";
                    } else {
                        destDir[destFileName] = copied;
                        return "File successfully copied.";
                    }
                }
            } else {
                return "Could not find copiable file at specified path, or you do not have permissions to copy the specified directory.";
            }
        } catch (e) {
            return "Error finding paths. Make sure both of your arguments are correct.";
        }
    }, 1),
    "echo": new Executable("echo", function() {
        var argArray = [].slice.call(arguments);
        return argArray.join(" ");
    }, 0),
    "grep": new Executable("grep", function(regex, glob) {
        var r = new RegExp(".{0,5}" + regex + ".{0,5}", "g");
        var g = new RegExp(escapeRegExp(glob).replace("*", ".*"), "i");
        var data = findData(terminalPwd, true);
        var toSearch = [];
        for (var f in data) {
            if (g.test(f)) {
                toSearch.push(f);
            }
        }
        if (toSearch.length < 1) {
            return "No file names matched.";
        }
        var results = [];
        toSearch.forEach(function(filename) {
            var file = data[filename];
            if (file) {
                var matches = [];
                var match = r.exec(file.contents);
                while (match !== null) {
                    matches = matches.concat(match);
                    match = r.exec(file.contents);
                }
                matches = matches.slice(0, 100);
                if (matches.length > 0) {
                    results.push("#r" + filename + "#k (" + matches.length + "):");
                    results = results.concat(matches.map(function(m) {
                        return "\t\t" + m;
                    }));
                } else {
                    return "No matches found.";
                }
            }
        });
        return results.join("\r\n");
    }, 0),
    "help": new Executable("help", function() {
        return "HELP GUIDE\r\n" +
               "==============================\r\n" +
               "bash <args>: Runs the arguments through bash. Useful for running *.sh files.\r\n" +
               "bzip2 <path>: Compresses a file using the bzip2 algorithm.\r\n" +
               "chmod <path> <level>: Change the access permissions to file system objects (files and directories).\r\n" +
               "cd <path>: Changes the current working directory.\r\n" +
               "cp <tocopy> <destination>: Copies a file or directory to another location.\r\n" +
               "echo <string>: Echoes an inputted string to stdout.\r\n" +
               "grep <regex> <filenameglob>: Searches for all matches with the specified regular expression in the files matching the [globbed] filename pattern.\r\n" +
               "exit: Exits the terminal.\r\n" +
               "help: Shows this message.\r\n" +
               "kill <pid>: Kills a process with the specified process ID.\r\n" +
               "logout: Log out of the current user.\r\n" +
               "ls [path]: Lists all files and directories in the current working directory, or in the path specified.\r\n" +
               "pwd: Prints current working directory to stdout.\r\n" +
               "cat <file>: Prints the contents of a file to stdout.\r\n" +
               "rm <path>: Removes a file or directory.\r\n" +
               "rmdir <emptydir>: Removes an empty directory.\r\n" +
               "su: Attempts to log in as the root user.\r\n" +
               "sudo <command>: Executes a command as the root user.";
    }, 0),
    "kill": new Executable("kill", function(pid) {
        return "Access denied.";
    }, 1),
    "ls": new Executable("ls", function(path) {
        var dir = path ? findData(path, false) : findData(terminalPwd, true);
        var out = "";
        var i = 0;
        for (var o in dir) {
            if (dir[o] instanceof PlainFile || dir[o] instanceof Executable) {
                out += o + "  ";
            } else {
                out += "#k#r" + o + "#k#d  ";
            }
            if (i % 4 === 3) {
                out += "\r\n";
            }
            i++;
        }
        if (i % 4 === 0) {
            out = out.substring(0, out.length - 4);
        }
        return out;
    }, 1),
    "pwd": new Executable("pwd", function() {
        return terminalPwd.join("/").replace("//", "/");
    }, 1),
    "cat": new Executable("cat", function(path) {
        var data = findData(path, false);
        if (!data) {
            return "Could not find file specified.";
        }
        if (data instanceof PlainFile) {
            return data.contents;
        }
        if (data instanceof Executable) {
            return data.exe.toString().hashCode().toString(16);
        }
        return "Could not read file. Are you sure it's a file?";
    }, 1),
    "rm": new Executable("rm", function(path) {
        if (!path) {
            return "Syntax: rm <path>";
        }
        return "Access denied.";
    }, 1),
    "rmdir": new Executable("rmdir", function(path) {
        return "Could not find empty directory at specified path.";
    }, 1),
    "su": new Executable("su", function() {
        return "Password is incorrect.";
    }, 1),
    "sudo": new Executable("sudo", function() {
        return "User is not in sudoers file.\r\nThis incident will be reported.";
    }, 1)
};

var cakes =
"Array.prototype.fisherYates = function() {" +
"\r\n    for (let i = this.length - 1; i > 0; --i) {" +
"\r\n        const swapIndex = Math.floor(Math.random() * (i + 1));" +
"\r\n        const temp = this[swapIndex];" +
"\r\n        this[swapIndex] = this[i];" +
"\r\n        this[i] = temp;" +
"\r\n    }" +
"\r\n};" +
"\r\n" +
"\r\nconst ingredients =" +
"\r\n[" +
"\r\n    `2 tablespoons unsweetened cocoa powder`," +
"\r\n    `1/4 cup of sugar`," +
"\r\n    `2 tsp of all purpose flour`," +
"\r\n    `2 ounces bittersweet chocolate`," +
"\r\n    `1/2 stick of unsalted butter`," +
"\r\n    `1 large egg`," +
"\r\n    `2 egg yolks`," +
"\r\n    `1 tsp of salt`," +
"\r\n    `1/2 cup butter, softened`," +
"\r\n    `1 cup brown sugar`," +
"\r\n    `1 teaspoon vanilla extract`," +
"\r\n    `1 egg`," +
"\r\n    `2 cups all-purpose flour`," +
"\r\n    `1 teaspoon baking soda`," +
"\r\n    `1/2 teaspoon baking powder`," +
"\r\n    `1 cup plain yogurt`," +
"\r\n    `1/2 cup margarine`," +
"\r\n    `1 cup chopped pecans`," +
"\r\n    `1 cup flaked coconut`," +
"\r\n    `1 (18.25 ounce) package German chocolate cake mix`," +
"\r\n    `1 (8 ounce) package cream cheese`," +
"\r\n    `1/2 cup margarine`," +
"\r\n    `2 1/2 cups all-purpose flour`," +
"\r\n    `2 cups sugar`," +
"\r\n    `2/3 cup cocoa powder`," +
"\r\n    `2 tsp baking soda`," +
"\r\n    `1 tsp salt`," +
"\r\n    `2 cups coffee (or water)`," +
"\r\n    `2/3 cup vegetable oil`," +
"\r\n    `2 tsp vanilla extract`," +
"\r\n    `2 tsp vinegar (apple cider or distilled white vinegar)`" +
"\r\n];" +
"\r\n" +
"\r\n(function() {" +
"\r\n    ingredients.fisherYates();" +
"\r\n    const used = ingredients.slice(0, 8);" +
"\r\n    " +
"\r\n    const recipeDisplay = document.getElementById(\"recipe\");" +
"\r\n    recipeDisplay.innerHTML = used.map(" +
"\r\n        u => \"<li>\" + u.replace(new RegExp(/[0-9]+[0-9|/|\\.]*/, \"g\"), match => \"<b>\" + match + \"</b>\") + \"</li>\"" +
"\r\n    )" +
"\r\n    .reduce((accu, u) => accu + u);" +
"\r\n}());" +
"\r\n";

var dirTree =
{
    "/": {
        "bin": commands,
        "home": {
            "thechef": new BlockedDir("thechef"),
            "maekra": {
                "switches": {
                    "yellowswitch.sh": new PlainFile("yellowswitch.sh", 'isdnProviderRemoteNet=112.11.0.110;isdnYourProviderRemoteNet=11.1.0.10;isdnOnlineService="Provider";remoteNet=$(eval "echo \$$(echo isdn${isdnOnlineService}RemoteNet)");remoteNet=$(eval "echo \$$(echo isdnProviderRemoteNet)");remoteNet=$(eval "echo \$isdnProviderRemoteNet");remoteNet=$(eval "echo $isdnProviderRemoteNet");echo "$remoteNet";chkMirrorArchs () { arch="$1";if [ "$(eval "echo \${$(echo get$(echo -ne $arch |;sed \'s/^\(.\).*/\1/g\' | tr \'a-z\' \'A-Z\';echo $arch |;sed \'s/^.\(.*\)/\1/g\')):-false}")" = true ];then return 0;else return 1;fi;};getSparc="true";unset getIa64;chkMirrorArchs sparc;echo $?;chkMirrorArchs Ia64;echo $?', 0),
                    "blueswitch.sh": new PlainFile("blueswitch.sh", 'isdnProviderRemoteNet=112.11.0.111;isdnYourProviderRemoteNet=11.1.0.11;isdnOnlineService="Provider";remoteNet=$(eval "echo \$$(echo isdn${isdnOnlineService}RemoteNet)");remoteNet=$(eval "echo \$$(echo isdnProviderRemoteNet)");remoteNet=$(eval "echo \$isdnProviderRemoteNet");remoteNet=$(eval "echo $isdnProviderRemoteNet");echo "$remoteNet";chkMirrorArchs () { arch="$1";if [ "$(eval "echo \${$(echo get$(echo -ne $arch |;sed \'s/^\(.\).*/\1/g\' | tr \'a-z\' \'A-Z\';echo $arch |;sed \'s/^.\(.*\)/\1/g\')):-false}")" = true ];then return 0;else return 1;fi;};getSparc="true";unset getIa64;chkMirrorArchs sparc;echo $?;chkMirrorArchs Ia64;echo $?', 0),
                    "redswitch.sh": new PlainFile("redswitch.sh", 'isdnProviderRemoteNet=112.11.0.112;isdnYourProviderRemoteNet=11.1.0.12;isdnOnlineService="Provider";remoteNet=$(eval "echo \$$(echo isdn${isdnOnlineService}RemoteNet)");remoteNet=$(eval "echo \$$(echo isdnProviderRemoteNet)");remoteNet=$(eval "echo \$isdnProviderRemoteNet");remoteNet=$(eval "echo $isdnProviderRemoteNet");echo "$remoteNet";chkMirrorArchs () { arch="$1";if [ "$(eval "echo \${$(echo get$(echo -ne $arch |;sed \'s/^\(.\).*/\1/g\' | tr \'a-z\' \'A-Z\';echo $arch |;sed \'s/^.\(.*\)/\1/g\')):-false}")" = true ];then return 0;else return 1;fi;};getSparc="true";unset getIa64;chkMirrorArchs sparc;echo $?;chkMirrorArchs Ia64;echo $?', 0)
                },
                "music": {
                    "mr-scribs": {
                        "sonatas": {
                            "1.flac": new PlainFile("1.flac", "e9ccf6b8826ff61f602c1c24531d72e1ffcf6288d7db9d7f718d27f88654121d", 0),
                            "2.flac": new PlainFile("2.flac", "d33516faa40675f6a723b551a439e228c19fd2e5b35dfa98ed107518cde1768d", 0),
                            "3.flac": new PlainFile("3.flac", "9225edb638f67aded8606a7a33b5f83710b5c71f6e5a3111dd27f276a88a2015", 0),
                            "4.flac": new PlainFile("4.flac", "354225f77451f5c60be686e5b3c3210184eecbc21f49378bcaa2e61c6922c870", 0),
                            "5.flac": new PlainFile("5.flac", "e4d97407958b0b14ea9e77dede300f4832fa8967f8ee9323631862d926c49022", 0),
                            "6.flac": new PlainFile("6.flac", "bba367437cc7c1e5eb7404026d5fd2c614d1585c6af5d0beed986a74b2e40ac1", 0),
                            "7.flac": new PlainFile("7.flac", "58e2791934fdd9cfdd6d0e892cb6ca4894abc58559de0ec04d51bc2801bad291", 0),
                            "8.flac": new PlainFile("8.flac", "8e35c2cd3bf6641bdb0e2050b76932cbb2e6034a0ddacc1d9bea82a6ba57f7cf", 0),
                            "9.flac": new PlainFile("9.flac", "de5d4c47c67cad3744042d8dc8ab925b2e5b07f2560ae9cdb31834ec35140099", 0),
                            "10.flac": new PlainFile("10.flac", "46dfabd81142d05adf3e4ff37ec878c7c4c2f44765dd68d9fb053f6f1bf51e09", 0)
                        },
                        "op-42": {
                            "1.flac": new PlainFile("1.flac", "b5291e8994d4924828168a886d1e0e351e593b5a045f925993b9ce47062e0be3", 0),
                            "2.flac": new PlainFile("2.flac", "d2cd23faa62ab03115c3d84f1cf0fefc1c9797cca6f864998557548c32d4243d", 0),
                            "3.flac": new PlainFile("3.flac", "d86560c3bbea524cd25905d06cb128104dc79fce3776b0ca8a17d13dd8b4b1b7", 0),
                            "4.flac": new PlainFile("4.flac", "004c58dccf4d9f480db7c2eb7e3aa4ce380964b3560dcd78a2787b596e12761d", 0),
                            "5.flac": new PlainFile("5.flac", "980033c798ca93b8efa55db8743f3e95868133c7ab0bc963f9c0f0d1bd989ca8", 0)
                        }
                    },
                    "pretend": {
                        "bones-in-the-soil": {
                            "Two-Too-High.flac": new PlainFile("Two-Too-High.flac", "3fc820b1c3761e309e5d05e3b20b600c12cc3182c7932f50f2fbe940de5b492b", 0),
                            "Bones-In-The-Soil.flac": new PlainFile("Bones-In-The-Soil.flac", "cc52780d9ab059d89dffd367565e3641a559f33e70e59cad5d48b5079b3e6109", 0),
                            "Alive-In-The-Tone.flac": new PlainFile("Alive-In-The-Tone.flac", "be4699818244f7a52da683bb13b2ab391003a764478ac393e0a4786357c4ef16", 0),
                            "Those-Luminous-Noises.flac": new PlainFile("Those-Luminous-Noises.flac", "0c2f30e486002b3e865a4a40f671313fc24de1f76b8f36708c4f5f45ccaa2b18", 0),
                            "Legs-To-Walk-Us.flac": new PlainFile("Legs-To-Walk-Us.flac", "e3f7f2f1353ae6724025c34b983834edf799577952c4b95d8b9d379d8ef09067", 0),
                            "Holy-Destination.flac": new PlainFile("Holy-Destination.flac", "b1b53d0908c96b7d03d381b1433332ef2814efc0ebcadf397af909b044ee6357", 0),
                            "Dream-Shiver.flac": new PlainFile("Dream-Shiver.flac", "c9ebdda6b4a09a62446ecf7131ea090bf6d20a07f60b90e04c51d123c3488fa8", 0),
                            "Flairs.flac": new PlainFile("Flairs.flac", "23e3e0844b4fa795fb303bfa239d1c698ab6a8f007df51602bb4ce13ccb4c4cf", 0),
                            "Guided-Spirits.flac": new PlainFile("Guided-Spirits.flac", "7d38ee33d526f5fe06d4d078e9297d3dc43d225c14c99a244e4208c4843d06c2", 0),
                            "Spiral-Born-Black.flac": new PlainFile("Spiral-Born-Black.flac", "0af9f0f4436812bf8ece6ccad5dbd515ba46124d6c9dff2f5d244b95582aed10", 0)
                        }
                    },
                    "yowie": {
                        "Trina.flac": new PlainFile("Trina.flac", "afd6724a7d657d20a6911957c501a8e225bab1f974f0846dedb1c091df9ea87c", 0),
                        "Tamika.flac": new PlainFile("Tamika.flac", "4d0ae8684891db9dd2f8d474d0324f20234886e0d1c207c61d8f1fe2e4474db7", 0),
                        "Tara.flac": new PlainFile("Tara.flac", "7fc1368798b75e28d780c61cd2f227a25c61e0503e9f144dcb3ab1cf73cc6cf0", 0),
                        "Tenesha.flac": new PlainFile("Tenesha.flac", "4ae9b5541fcd17e52cd1845fc09d99811d51ca201c9923ed3cfbf3e7f8b35d38", 0),
                        "Toni.flac": new PlainFile("Toni.flac", "26e205da5fd003747c73b0497da70347902d5b3b14d6b469383ef37d4b02b078", 0),
                        "Towanda.flac": new PlainFile("Towanda.flac", "7192a5d9eb2b648d72d00db7dd5811436a4e0af96334814eb7663a8692c7f46c", 0),
                    },
                    "thelonious-monk": {
                        "well-you-neednt.flac": new PlainFile("well-you-neednt.flac", "acb6da2d8907487947d9ccdded63c2469a658b255d09895ede2c13d6a954da5d", 0),
                        "epistrophe.flac": new PlainFile("epistrophe.flac", "9f5012f4d1aa8a1ef3c2439732c8f80f63d3c107a190aa6b0a6f1d2fb36ed21b", 0),
                        "brilliant-corners.flac": new PlainFile("brilliant-corners.flac", "74504b20c3eb16995403c562d9bd6f8e815371f7100d036f1129b8f232b59d33", 0),
                        "straight-no-chaser.flac": new PlainFile("straight-no-chaser.flac", "37381b3d6bd9e47dc94bb7f15d5bfd70277d9dbaa9a251fe5945f764cc316386", 0)
                    }
                },
                "documents": {
                    "fuck.txt": new PlainFile("fuck.txt", "6", 0),
                    "cakes.js": new PlainFile("cakes.js", cakes, 0)
                },
                "porn": {
                    "yousickfuck.txt": new PlainFile("yousickfuck.txt", "Quit looking through my personal files, Blumen.", 0)
                }
            },
            "blumen": new BlockedDir("blumen"),
            "asst": new BlockedDir("asst")
        },
        "tmp": {
            "systemd-private-45f6e919add1b85728dd6398b": new PlainFile("systemd-private-45f6e919add1b85728dd6398b", "800baf6a0c80d143af49ecf6eed7b73b8844f31096b3509044063fef3e0a65a3ce6d7ab1dea9332c197d1830cb980732ef921c4079b923cea772d3ef9fdc4f54d0122b8adf2a7ad1ed2dae8c83e940b965b054d252dc3f6ba617511f8e8d9817", 0),
            "ssh-kFEleZEhekL": new PlainFile("ssh-kFEleZEhekL", "#0003724463036709879739752739169", 0)
        },
        "etc": {
            "host.conf": new PlainFile("host.conf", "order hosts,bind\r\nmulti off", 0),
            "issue": new PlainFile("issue", "Fruitbuntu 34.09.09.06 RFC \\n \\l", 0)
        },
        "lib": new BlockedDir("lib"),
        "usr": {
            "games": {
                "memory-match": new Executable("memory-match", function() {
                    return "beep, boop!\r\n(the mesmerising sounds of the computer cause you to forget everything, and you lose the memory game)";
                }, 0),
                "solitaire": new Executable("solitaire", function() {
                    return "#eyou manage to lose a game of Solitaire, after what seems like an eternity#n";
            }, 0),
                "alien-invasion": new Executable("alien-invasion", function() {
                    return "You strike an alien for an unknown amount of damage.\r\nThe alien is displeased, but their anatomy is strange enough to you that you cannot tell how displeased they are.\r\nThe alien strikes back.\r\n#eCRITICAL HIT!#n\r\nYou lose!\r\nYou are probed, sorry.";
                }, 0)
            },
            "share": {
                "java": new Executable("java", function() {
                    return "2147483647\r\nNullPointerException\r\nClassCastException in Main.java: \"I thought Java was statically typed?\"\r\nVector v = new Vector(3, 4, 5); Vector u = new Vector(7, 3, 1); return v.plus(u).scalarMultiply(5).dotProduct(u).subtract(u.dotProduct(v));";
                }, 0),
                "python": new Executable("python", function() {
                    return "spaces = [max(lenarray) for lenarray in [[len(line[a]) for line in splitted if len(line) > a] for a in range(longestline)]]";
                }, 0),
                "php": new Executable("php", function() {
                    return "Fatal error: Exception thrown without a stack frame in Unknown on line 0";
                }, 0),
                "c-sharp": new Executable("c-sharp", function() {
                    return "static internal sealed partial readonly enum class PiecewiseBananaNetworkingAccessLevels { ...";
                }, 0)
            }
        }
    }
};

function stringifyPwd(pwd) {
    return pwd.join("/")
              .replace("//", "/")
              .replace("/home/maekra", "~");
}

function start() {
    terminalPwd = ["/", "home", "maekra"];
    terminalEnd = "]: $";
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var pq = p.getPartyQuest();
    var mi = p.getMap().getPartyQuestInstance();
    var npc = p.getMap().getNPCById(cm.getNpc());
    var text = cm.getText() ? cm.getText().substring(0, 84) : undefined;
    var tokens = text ? text.split(/ (?!\\)/).map(function(t) { return t.replace("\\ ", " "); }) : [""];

    if (mode < 1 || p.getPosition().distance(npc.getPosition()) > maxDist) {
        cm.dispose();
        return;
    }
    status++;

    var command = tokens[0];
    var out;
    if (command.indexOf("./") === 0) {
        command = command.substring(2);
        var possibleExe = findData(terminalPwd.concat([command]), true);
        if (possibleExe instanceof PlainFile && possibleExe.name.endsWith(".sh")) {
            if (possibleExe.contents.indexOf("112.11.0.112") !== -1) {
                redSwitch();
                out = "Exit code 0.";
            } else if (possibleExe.contents.indexOf("112.11.0.111") !== -1) {
                blueSwitch();
                out = "Exit code 0.";
            } else if (possibleExe.contents.indexOf("112.11.0.110") !== -1) {
                yellowSwitch();
                out = "Exit code 0.";
            } else {
                out = "Exit code 1.";
            }
        } else if (possibleExe instanceof Executable) {
            out = possibleExe.exe.apply(this, tokens.slice(1));
        }
    }

    var exe = commands[command];
    if (!exe) {
        if (command === "exit" || command === "abort" || command === "quit" || command === "logout") {
            cm.dispose();
            return;
        }
        if (status === 0 || command === "") {
            out = out ? out : "";
        } else {
            out = out ? out : "bash: " + command + ": command not found";
        }
    } else {
        out = out ? out : exe.exe.apply(this, tokens.slice(1));
    }
    if (!out) {
        out = "";
    }

    cm.sendGetText((status === 0 ? startText : "") + "#d" + out + "\r\n" + terminalStart + stringifyPwd(terminalPwd) + terminalEnd + "#k");
}

function isPrime(n) {
    if (n <= 1) {
        return false;
    }
    if (n <= 3) {
        return true;
    }
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }
    var i = 5;
    while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
        i = i + 6;
    }
    return true;
}

function redSwitch() {
    var p = cm.getPlayer();
    var mi = p.getMap().getPartyQuestInstance();
    var obsCount = mi.obstacleCount();
    var obsIdList = mi.registeredObstacleIds();
    var i;

    for (i = 0; i < obsCount; ++i) {
        if (!isPrime(i)) {
            mi.toggleObstacle(obsIdList.get(i));
        }
    }
}

function blueSwitch() {
    var p = cm.getPlayer();
    var mi = p.getMap().getPartyQuestInstance();
    var obsCount = mi.obstacleCount();
    var obsIdList = mi.registeredObstacleIds();
    var i;

    for (i = 0; i < obsCount; ++i) {
        if (i % 3 < 2) {
            mi.toggleObstacle(obsIdList.get(i));
        }
    }
}

function yellowSwitch() {
    var p = cm.getPlayer();
    var mi = p.getMap().getPartyQuestInstance();
    var obsCount = mi.obstacleCount();
    var obsIdList = mi.registeredObstacleIds();
    var i;

    for (i = 0; i < obsCount; ++i) {
        if (isPrime(i) || i % 5 === 0) {
            mi.toggleObstacle(obsIdList.get(i));
        }
    }
}
