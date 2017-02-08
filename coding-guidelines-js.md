# Coding guidelines

**All scripts MUST pass [jshint](http://jshint.com/install/) on default settings with zero errors and zero warnings!!! There is a single exception, see below.**

##Style

+ Do not use tabs (ASCII character 9) in code, ever. Use spaces (ASCII character 32) instead.
+ Use 4 spaces per level of indentation, always.
+ Use indentation appropriately and consistently, as shown throughout the examples here.
+ All scripts **MUST** pass [jshint](http://jshint.com/install/) on default settings with zero errors and zero warnings, with the following exception:
    - When concatenating scripts, do so in a minified import-statement-esque way, at the top of the file (but after the initial block comment) like so:

        ```javascript
        /* jshint ignore: start */
        // Array.prototype.findIndex polyfill
        Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(a){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var d=arguments[1],e=0;e<c;){var f=b[e];if(a.call(d,f,e,b))return e;e++}return-1}});
        /* jshint ignore: end */
        ```

    - Note that the concatenated ("imported") script is all in one line; all such "imports" should be run through this tool: [https://jscompress.com/](https://jscompress.com/)
    - Note also that there is a short description of what is being imported; this is necessary especially given that the script is minified.
+ Lines should not be longer than 120 characters (ideally no longer than 79). The only exceptions:
    - Minified scripts put at the top of the file as shown above
    - String literals that represent dialogue may be left all as one line, or may optionally be wrapped like so:

        ```javascript
        cm.sendSimple(
            "#eglares more intensely#n\r\n\r\n" +
                "#L0#I said, what the #efuck#n are you looking at? (brandish weapon)#l\r\n" +
                "#L1#You in there, Mr. Steward?#l\r\n" +
                "#L2#(blow into his face)#l\r\n" +
                "#L3#(walk away cautiously)#l"
        );
        ```

+ Use semicolons.
+ All scripts should consist of two parts, a *head* and a *body*. The body is more variant depending on the type of script, but the head should be formatted something like:

    ```javascript
    /*
     * Name of NPC/reactor/event/portal/etc.
     * ID: ID of the thing
     *
     * Area, if applicable [e.g. Orbis] | Map name, if applicable (mapId)
     *
     * Description of what this is/does
     * and its relation to other things
     * in the game.
     *
     * If this is associated
     * with a quest/party quest, list
     * quest IDs or stage IDs here as
     * applicable.
     */

    /* jshint ignore: start */
    // Description of minified script(s), obviously all of this
    // is only here if there is 1 or more included scripts.
    minifiednonsense()
    /* jshint ignore: end */

    var status; // Only if it's an NPC
    var constant =
    [
        "This",      "has", "some",
        "constants", "in",  "it"
    ];
    var justAnotherConstant = 5140002;
    var notAConstantButIsInitialized = [];
    var theseAre, variables,  thatNeedToPersist,
        butWill,  beAssigned, later;

    function shortHelperFunctionsCanGo(here) {
        return foo * here;
    }
    ```

+ Never leave trailing whitespace, or in other words, the following regex should always return 0 matches on any script upon using Ctrl+F (or grep): `[ \t]+$`
+ Use lowerCamelCase for variable names and function names. Clones or other "temporary" variables can be prefixed or suffixed with a single underscore, like so:

    ```javascript
    var thisIsAnArray = ["Such", 7.3, "disparate", NaN, "types"];
    var thisIsAnArray_ = thisIsAnArray.concat();
    ```

+ Integral values should be written without a decimal point:

    ```javascript
    // Bad:
    var hundred = 100.0;

    // Good:
    var hundred = 100;
    ```

+ Keep a single leading zero in the ones' place even if not necessary, but no trailing zeroes:

    ```javascript
    // Bad:
    var half = .5;

    // Worse:
    var half = .50;

    // Good:
    var half = 0.5;
    ```

+ When writing self-invoking functions, use the following syntax:

    ```javascript
    (function() {
        print("Hi!");
    })();
    ```

+ Single line comments (`//`) should either be on their own line, or be separated from the code that they trail by one or two spaces. In addition, there should be exactly one space between the `//` and the contents of the comment, unless the comment is simply disabling ("commenting out") code, in which case there should be no space between `//` and the disabled code.
+ Use plain english in comments (interspersed with code terms as necessary), with capitalization and punctuation.
+ All script files must end with a trailing newline.
+ There should be blank lines between all function declarations.
+ Array literals should be arranged like the following when the array is large enough:

    ```javascript
    var someInts =
    [
        415, 5,   837, 461, 101, 694, 147, 3,   81,  919,
        555, 319, 79,  597, 66,  461, 267, 567, 6,   191,
        352, 353, 444, 537, 859, 0,   97,  444, 231, 296,
        1,   987, 202, 51
    ];
    ```

+ `if`, `else if`, `else`, `while`, `for`, `try`, and `catch` blocks should follow the following style:
    - They must be enclosed with curly braces (`{}`), with one exception:
        * When there is a stand-alone `if` statement whose condition and body statements are quite short, it can be written all on one line without line breaks.
    - There should be a single space after the keyword, a single space after the parentheses, a newline after the opening curly brace, and a single newline between the end of the last statement and the closing curly brace:
        * Bad:

            ```javascript
            if(condition)
            {
                foo = new Foo();
            } else { foo = null; }
            ```

        * Good:

            ```javascript
            if (condition) {
                foo = new Foo();
            } else {
                foo = null;
            }
            ```

+ Function declarations should be of the following form:

    ```javascript
    function generateFoos(fooCount) {
        // ...
        return someFoos;
    }
    ```

+ When declaring multiple variables, indent after line breaks:

    ```javascript
    var x = 0,
        y = 0,
        z = 0;
    ```

+ Newlines in string literals are done Windows style, viz. `\r\n`
+ String literals should be denoted using double quotes (`"..."`) unless the literal is exactly 1 character long, in which case single quotes (`'...'`) are appropriate.
+ Do not make calls to constructors without using the `new` keyword, even if it would not functionally make a difference.
+ When there are multiple `Java.type()` invocations, they should all be lined up near the top of the script and spaced out to be in line with one another:

    ```javascript
    var Element                = Java.type("net.sf.odinms.server.life.Element");
    var ElementalEffectiveness = Java.type("net.sf.odinms.server.life.ElementalEffectiveness");
    var MapleInventoryType     = Java.type("net.sf.odinms.client.MapleInventoryType");
    var MapleLifeFactory       = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
    var MapleMonsterStats      = Java.type("net.sf.odinms.server.life.MapleMonsterStats");
    var MapleStat              = Java.type("net.sf.odinms.client.MapleStat");
    var Point                  = Java.type("java.awt.Point");
    var PortalScriptManager    = Java.type("net.sf.odinms.scripting.portal.PortalScriptManager");
    var SkillFactory           = Java.type("net.sf.odinms.client.SkillFactory");
    ```

+ Avoid "magic numbers." If there is a number (or string) constant that is used multiple times throughout the code and/or that needs some kind of name or explanation (e.g. an item ID), give it a variable name and put it near the top of the file with the other constants.

## Method

+ When using Java types/classes, import then using the `Java.type` method; do not use the Rhino method:

    ```javascript
    // Bad:
    var Status = Packages.net.sf.odinms.client.MapleQuestStatus.Status;
    var isComplete = cm.getQuestStatus(9999).equals(Status.COMPLETED);

    // Even worse:
    var isComplete =
        cm.getQuestStatus(9999)
          .equals(Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED);

    // Good:
    var Status = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");
    var isComplete = cm.getQuestStatus(9999).equals(Status.COMPLETED);
    ```

+ Do not `load('nashorn:mozilla_compat.js');`. This means using `Java.type()` as shown above, and not using `for each` loops, as shown below.
+ Never use the `Array` or `String` constructors, ever.

    ```javascript
    // Bad:
    var a = new Array(0, 1, 3, 7);

    // Good:
    var a = [0, 1, 3, 7];

    // Bad:
    cm.sendOk("There are currently " + String(parties * partySize) + " people here.");

    // Good:
    cm.sendOk("There are currently " + (parties * partySize) + " people here.");
    ```

+ Never make comparisons using `==` or `!=`. Always use `===` or `!==` instead, unless two non-primitive and non-null Java objects are being compared, in which case use `.equals()`.
+ Do not use `for each` loops. Prefer to use `.forEach()` instead, and failing that, use a C-like for loop:

    ```javascript
    // Bad:
    for each (var potato in potatoes) {
        p.dropMessage(potato.name());
    }

    // OK:
    for (var i = 0; i < potatoes.length; ++i) {
        p.dropMessage(potatoes[i].name());
    }

    // Good:
    potatoes.forEach(function(potato) {
        p.dropMessage(potato.name());
    });
    ```

+ Respect control flow. When control flow statements like `return;` or `break;` or `continue;` are invoked, don't put extra control flow around them that is unnecessary:

    ```javascript
    // Bad:
    if (mode < 0) {
        cm.dispose();
        return;
    } else {
        doLotsOfThings();
    }

    // Good:
    if (mode < 0) {
        cm.dispose();
        return;
    }
    
    doLotsOfThings();
    ```

+ When writing NPC scripts, `cm.dispose();` should be explicitly invoked in *all possible control paths that terminate*. This means not just letting the `action` function fall through or `return;` when the conversation is supposed to end.
+ When writing NPC scripts, **all** invocations of `cm.dispose();` should be **immediately** followed by `return;`. No exceptions, even when the `return;` is actually unnecessary (and it often is). This is to prevent bugs, especially those that crash players to the login screen.
+ Variables that need to be declared before they are really "used" and that do not need an initial value (i.e., they get their value assigned before their value is read from in all possible control paths) or that should have an initial value of `undefined` should not be assigned an initial value at all:

    ```javascript
    // Bad:
    var status = 0;

    function start() {
        status = -1;
        action(1, 0, 0);
    }

    // Good:
    var status;

    function start() {
        status = -1;
        action(1, 0, 0);
    }

    // Bad:
    var pName = "";
    if (p.getLevel() > 60) {
        pName = "Big baddy";
    } else {
        pName = "Lil baddy";
    }

    // Good:
    var pName;
    if (p.getLevel() > 60) {
        pName = "Big baddy";
    } else {
        pName = "Lil baddy";
    }
    ```

+ Do not declare variables without using `var`. This implicity creates a global variable. If a global variable is needed, declare it in the global scope near the top of the script.
+ Whereever `console.log();` or Java's `System.out.println();` would be used, use `print();` instead; this is for debugging purposes only.
+ Prefer using `switch` statements over chains of `if`/`else if`/`else`.
+ When writing NPC scripts, the `action()` function as well as any other functions that need to access the player should start with the statement `var p = cm.getPlayer();` so that `getPlayer()` no longer has to be called again, and the player can simply be referenced as `p` throughout.
    - This also applies ot other scripts, if the corresponding player is accessed often.
+ When a variable name is used multiple times throughout a function but would need to be initialized at more than one point in the function depending on the control path, initialize those variable name(s) using `var` at the very top of the function (right after `var p = cm.getPlayer();` if the function is `action()`) and get rid of `var`s on that variable in any other places throughout the function.
+ Avoid using explicit loops (`for`, `while`) and temporary variables (e.g. `var i = 0;`, `var objectsCollectedInLoop = [];`). Prefer to use `Array` methods like `.forEach()` `.map()`, `.filter()`, `.reduce()`, `.reduceRight()`, `.every()`, etc. instead, unless explicit loops are necessary or these methods are problematic in the specific case in question.
    - When dealing with collections directly from native Java, the same  rule applies, but with the `Iterable#forEach` method and with `Stream` methods.
    - When writing in this style, it is often beneficial to use some of the ECMAScript 6+ `Array.prototype` functions that were added to facilitate it. Since Nashorn implements ECMAScript 5.1, this means "importing" polyfills of these functions as needed, e.g. `.find()`, `.findIndex()`, `.includes()`.
+ Don't pass numbers to Java methods that accept integral types (`int`, `long`, `short`, `byte`) unless you can guarantee that the number will always be integral; this often means using `Math.floor`, `Math.ceil`, or `Math.round`, as appropriate.
+ Explicitly throwing exceptions should be rare in script code, and when it is done, should have a string detailing a description of the exception passed in to the constructor:

    ```javascript
    throw new RuntimeError("This very specific bad thing happened at runtime!");
    ```

+ Do not ignore caught exceptions unless there is an explicit and **controlled** reason for doing so.
+ Avoid extensively manipulating or creating new instances of Java `Collection`s. Instead, either use encapsulated methods (thus not having to work with the `Collection`s at all), or convert them to native Javascript collections, e.g.:

    ```javascript
    var playerLevels = [];

    p.getParty()
     .getMembers()
     .stream()
     .map(function(chr) {
         return chr.getLevel();
     })
     .forEach(function(lv) {
         playerLevels.push(lv);
     });
    ```

+ When manipulating/comparing against any instances of the native Java type `String`, **coerce it to a Javascript 'string' first**:

    ```javascript
    // Bad:
    if (p.getName() === "PopeUrbanII") {
        deusVult();
    }

    // Good:
    if ("" + p.getName() === "PopeUrbanII") {
        deusVult();
    }

    // We aren't doing anything except passing
    // it into another Java method here, so
    // Not great:
    otherPlayer.dropMessage("" + p.getName());

    // Good:
    otherPlayer.dropMessage(p.getName());
    ```

+ Prefer to return an empty object (e.g. an empty array) over returning `null` or `undefined`, when appropriate.
+ Generally, checking for type can be avoided. However, when it is done, use `instanceof` **unless** the check is looking for instances of...
    - `String`
    - `Boolean`
    - `Number`
    - `Function`
+ ...in which case, `typeof` should be used.
+ When writing NPC scripts, do not invoke `cm.sendSimple();` with a string that has no options for the player to select (e.g. `#L0#...#l`). In fact, this will close the conversation with an error and alert the player that the NPC is broken.
