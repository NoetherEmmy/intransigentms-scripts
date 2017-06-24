# Coding guidelines

**All scripts MUST pass [jshint](http://jshint.com/install/) with the following settings with zero errors and zero warnings!!! There is a single exception, see below.**

```json
{
    "curly": true,
    "eqeqeq": true,
    "esversion": 6,
    "futurehostile": true,
    "globals": {
        "cm": false,
        "Java": false,
        "print": false,
        "mi": false,
        "pq": false,
        "map": false,
        "rm": false,
        "qm": false,
        "em": false,
        "chooseRandom": false,
        "jsArray": false,
        "range": false
    },
    "latedef": "nofunc",
    "laxcomma": true,
    "noarg": true,
    "nocomma": true,
    "nonbsp": true,
    "nonew": true,
    "singleGroups": true,
    "strict": "global",
    "unused": true,
    "varstmt": true
}
```

## Style

+ Do not use tabs (ASCII character 9) in code, ever. Use spaces (ASCII character 32) instead.
+ Use 4 spaces per level of indentation, always.
+ Use indentation appropriately and consistently, as shown throughout the examples here.
+ All scripts **MUST** pass [jshint](http://jshint.com/install/) on the settings above with zero errors and zero warnings, with the following exception:
    - Top-level declarations (basically just `function` declarations) that are called "into" from outside of the script will end up being marked as "declared but unused" by jshint, which is of course OK since there's just no way for jshint to know that it actually *is* used.
    - This applies to any parameters of said functions.
    - This usually happens with scripts that implement interfaces, e.g. the `start` function in NPC scripts.
+ Lines should not be longer than 120 characters (ideally no longer than 79). The only exception:
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

    - or:

        ```javascript
        cm.sendSimple(`\
        #eglares more intensely#n\r\n\r\n\
        \
        #L0#I said, what the #efuck#n are you looking at? (brandish weapon)#l\r\n\
        #L1#You in there, Mr. Steward?#l\r\n\
        #L2#(blow into his face)#l\r\n\
        #L3#(walk away cautiously)#l`);
        ```

+ Use semicolons. Do not rely on automatic semicolon insertion (ASI).
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

    "use strict";

    let status; // Only if it's an NPC
    const constant =
        [ "This"
        , "has"
        , "some"
        , "constants"
        , "in"
        , "it"
        ];
    const justAnotherConstant = 5140002;
    const notAConstantButIsInitialized = [];
    let theseAre
      , variables
      , thatNeedToPersist
      , butWill
      , beAssigned
      , later;

    function shortHelperFunctionsCanGo(here) {
        return foo * here;
    }
    ```

+ Never leave trailing whitespace, or in other words, the following regex should always return 0 matches on any script upon using Ctrl+F (or grep): `[ \t]+$`
+ Use lowerCamelCase for variable names and function names. Clones or other "temporary" variables can be prefixed or suffixed with a single underscore, like so:

    ```javascript
    const thisIsAnArray = ["Such", 7.3, "disparate", NaN, "types"];
    const thisIsAnArray_ = thisIsAnArray.concat();
    ```

+ Integral values should be written without a decimal point:

    ```javascript
    // Bad:
    const hundred = 100.0;

    // Good:
    const hundred = 100;
    ```

+ Keep a single leading zero in the ones' place even if not necessary, but no trailing zeroes:

    ```javascript
    // Bad:
    const half = .5;

    // Worse:
    const half = .50;

    // Good:
    const half = 0.5;
    ```

+ When writing self-invoking functions, use the following syntax:

    ```javascript
    (function() {
        print("Hi!");
        // ...
    })();
    ```

+ Single line comments (`//`) should either be on their own line, or be separated from the code that they trail by one or two spaces. In addition, there should be exactly one space between the `//` and the contents of the comment, unless the comment is simply disabling ("commenting out") code, in which case there should be no space between `//` and the disabled code.
+ Use plain english in comments (interspersed with code terms as necessary), with capitalization and punctuation.
+ All script files must end with a trailing newline.
+ There should be blank lines between all function declarations.
+ Array literals should be arranged like the following when the array is large enough:

    ```javascript
    const someInts =
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
    let x = 0
      , y = 0
      , z = 0;
    ```

+ Newlines in string literals are done Windows/CRLF style, viz. `\r\n`
    - Because of this, template literal strings should not contain (unescaped) literal newlines:

        ```javascript
        // Bad:
        const str = `line ${i}
        line ${i + 1}`;

        // OK:
        const str = `line ${i}\r\nline ${i + 1}`;

        // Also OK, but often unnecessary:
        const str = `\
        line ${i}\r\n\
        line ${i + 1}`;
        ```

+ Prefer to use template literals over string concatenation when doing string interpolation, although either is fine.
+ String literals that aren't template literals should be denoted using double quotes (`"..."`) unless the literal is exactly 1 character long, in which case single quotes (`'...'`) are appropriate.
+ Do not make calls to constructors without using the `new` keyword, even if it would not functionally make a difference.
+ When there are multiple `Java.type()` invocations, they should all be lined up near the top of the script and spaced out to be in line with one another:

    ```javascript
    const Element                = Java.type("net.sf.odinms.server.life.Element");
    const ElementalEffectiveness = Java.type("net.sf.odinms.server.life.ElementalEffectiveness");
    const MapleInventoryType     = Java.type("net.sf.odinms.client.MapleInventoryType");
    const MapleLifeFactory       = Java.type("net.sf.odinms.server.life.MapleLifeFactory");
    const MapleMonsterStats      = Java.type("net.sf.odinms.server.life.MapleMonsterStats");
    const MapleStat              = Java.type("net.sf.odinms.client.MapleStat");
    const Point                  = Java.type("java.awt.Point");
    const PortalScriptManager    = Java.type("net.sf.odinms.scripting.portal.PortalScriptManager");
    const SkillFactory           = Java.type("net.sf.odinms.client.SkillFactory");
    ```

+ Avoid "magic numbers". If there is a number (or string) constant that is used multiple times throughout the code and/or that needs some kind of name or explanation (e.g. an item ID), give it a variable name and put it near the top of the file with the other constants.

## Method

+ The first non-comment statement of all scripts should be `"use strict";`.
+ **Do not use** `var`**.**
+ Prefer to use `const` as often as possible, otherwise use `let`.
    - Remember that `const` only ensures that the variable name is not reassigned. That is, it does **not** guarantee immutability nor that members of that object aren't reassigned, so it is acceptable to do things like:

        ```javascript
        const arr = [];

        arr.push(3);
        const three = arr.pop();

        const obj = {};

        obj.x = 4;
        const four = obj.x;
        obj.x = 5;
        const five = obj.x;
        ```

    - Unnecessary use of `let` can often be avoided using ternary conditionals (`? :`) or self-executing functions:

        ```javascript
        // Bad:
        let x;
        if (y) {
            x = y + 1;
        } else {
            x = 0;
        }

        // Good:
        const x = y ? y + 1 : 0;

        // Bad:
        let x;
        try {
            x = foo();
        } catch (e) {
            x = bar();
        }

        // Good:
        const x = (function() {
            try {
                return foo();
            } catch (e) {
                return bar();
            }
        })();
        ```

+ Do not declare a variable without using `const` or `let`. This implicity creates a global variable. If a global variable is needed, just declare it in the global scope near the top of the script using `const`, or `let` if necessary.
+ When using Java types/classes, import then using the `Java.type` method; do not use the Rhino method:

    ```javascript
    // Bad:
    const Status = Packages.net.sf.odinms.client.MapleQuestStatus.Status;
    const isComplete = cm.getQuestStatus(9999).equals(Status.COMPLETED);

    // Even worse:
    const isComplete =
        cm.getQuestStatus(9999)
          .equals(Packages.net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED);

    // Good:
    const Status = Java.type("net.sf.odinms.client.MapleQuestStatus.Status");
    const isComplete = cm.getQuestStatus(9999).equals(Status.COMPLETED);
    ```

+ Do not `load('nashorn:mozilla_compat.js');`. This means using `Java.type()` as shown above, and not using `for each` loops, as shown below.
+ Never use the `Array` or `String` constructors, ever.

    ```javascript
    // Bad:
    const a = new Array(0, 1, 3, 7);

    // Good:
    const a = [0, 1, 3, 7];

    // Bad:
    cm.sendOk("There are currently " + String(parties * partySize) + " people here.");

    // Good:
    cm.sendOk("There are currently " + (parties * partySize) + " people here.");

    // Even better:
    cm.sendOk(`There are currently ${parties * partySize} people here.`);
    ```

+ Never make comparisons using `==` or `!=`. Always use `===` or `!==` instead, unless two non-primitive and non-null Java objects are being compared, in which case use `.equals()`.
+ Do not use `for each` loops. Prefer to use `.forEach()` instead. Failing that, use `for ... of ...`, and failing that, use a C-like for loop:

    ```javascript
    // Bad!:
    for each (var potato in potatoes) {
        p.dropMessage(potato.name());
    }

    // OK:
    for (let i = 0; i < potatoes.length; ++i) {
        p.dropMessage(potatoes[i].name());
    }

    // Better:
    for (const potato of potatoes) {
        p.dropMessage(potato.name());
    }

    // Very nice:
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
    let status = 0;

    function start() {
        status = -1;
        action(1, 0, 0);
    }

    // Good:
    let status;

    function start() {
        status = -1;
        action(1, 0, 0);
    }

    // Bad:
    let pName = "";
    if (p.getLevel() > 60) {
        pName = "Big baddy";
    } else {
        pName = "Lil baddy";
    }

    // Good:
    let pName;
    if (p.getLevel() > 60) {
        pName = "Big baddy";
    } else {
        pName = "Lil baddy";
    }

    // Best:
    const pName = p.getLevel() > 60 ? "Big baddy" : "Lil baddy";
    ```

+ Wherever `console.log();` or Java's `System.out.println();` would be used, use `print();` instead; this is for debugging purposes only.
+ Prefer using `switch` statements over chains of `if`/`else if`/`else`.
+ When writing NPC scripts, the `action()` function as well as any other functions that need to access the player should start with the statement `const p = cm.getPlayer();` so that `getPlayer()` no longer has to be called again, and the player can simply be referenced as `p` throughout.
    - This also applies ot other scripts, if the corresponding player is accessed often.
+ Avoid using explicit loops (`for`, `while`) and temporary variables (e.g. `let i = 0;`, `const objectsCollectedInLoop = [];`). Prefer to use `Array` methods like `.forEach()` `.map()`, `.filter()`, `.reduce()`, `.reduceRight()`, `.every()`, etc. instead, unless explicit loops are necessary or these methods are problematic in the specific case in question.
    - When dealing with collections directly from native Java, the same  rule applies, but with the `Iterable#forEach` method and with `Stream` methods.
+ Don't pass numbers to Java methods that accept integral types (`int`, `long`, `short`, `byte`) unless you can guarantee that the number will always be integral; this often means using `Math.floor`, `Math.ceil`, or `Math.round`, as appropriate.
+ Explicitly throwing exceptions should be rare in script code, and when it is done, should have a string detailing a description of the exception passed in to the constructor:

    ```javascript
    throw new RuntimeError("This very specific bad thing happened at runtime!");
    ```

+ Do not ignore caught exceptions unless there is an explicit and **controlled** reason for doing so.
+ Avoid extensively manipulating or creating new instances of Java `Collection`s. Instead, either use encapsulated methods (thus not having to work with the `Collection`s at all), or convert them to native Javascript collections, e.g.:

    ```javascript
    const playerLevels = [];

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

    - Or, even better:

        ```javascript
        const playerLevels =
            jsArray(
                p.getParty()
                 .getMembers()
            )
            .map(function(chr) {
                return chr.getLevel();
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
