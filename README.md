# intransigentms-scripts

Scripts for the [IntransigentMS](http://www.intransigentms.com/?base=main) Maplestory private server.

Main repo (server code) can be found here: [https://github.com/NoetherEmmy/intransigentms](https://github.com/NoetherEmmy/intransigentms)

These scripts are evaluated by the [Nashorn](https://wiki.openjdk.java.net/display/Nashorn/Main) engine, so everything here must be compliant with the [ECMAScript 6 standard](http://www.ecma-international.org/ecma-262/6.0/), with a few exceptions for special features of Nashorn. Notably:

* Importing classes/types

    ```javascript
    const MapleCharacter = Java.type("net.sf.odinms.client.MapleCharacter");
    ```

* Printing to the console for debugging purposes

    ```javascript
    print("test");
    ```

For coding style, see the guidelines.
