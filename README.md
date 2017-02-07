# intransigentms-scripts

Scripts for the [IntransigentMS](http://www.intransigentms.com/?base=main) Maplestory private server.

Main repo (server code) can be found here: [https://github.com/NoetherEmmy/intransigentms](https://github.com/NoetherEmmy/intransigentms)

These scripts are evaluated by the [Nashorn](https://wiki.openjdk.java.net/display/Nashorn/Main) engine, so everything here must be compliant with the [ECMAScript 5.1 standard](http://www.ecma-international.org/ecma-262/5.1/), with a few exceptions for special features of Nashorn. Notably:

* Importing classes/types

    ```javascript
    var MapleCharacter = Java.type("net.sf.odinms.client.MapleCharacter");
    ```

* Printing to the console for debugging purposes

    ```javascript
    print("test");
    ```

* Single-line functions

    ```javascript
    function square(x) {
        return x * x;
    }

    // becomes:

    function square(x) x * x
    ```

For coding style, see the guidelines.
