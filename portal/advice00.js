function enter(pi) {
    if (pi.getPlayer().getClient().isGuest()) {
        pi.showInstruction("Welcome to the server!\r\nCurrently logged in as a guest? Create a new account if you like the server.", 350, 5);
    } else {
        var messages =
        [
            "Click on Sera to get started.",
            "You can use @commands for a list of usable commands.", 
            "Like the server? Why not ask your friends to play!",
            "Our server is open source! Check `intransigentms` out on GitHub!",
            "Have an idea or feature you'd like to see in the server? Just suggest it to a GM!"
        ];
        pi.showInstruction("Welcome to #e" + pi.serverName() + "#n!\r\n#r" + messages[Math.floor(Math.random() * messages.length)], 350, 5);
    }
    return false;
}
