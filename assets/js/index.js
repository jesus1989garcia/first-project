window.onload = function() {
    $("#play").click (function() {
        $("#wrapper").toggle();

    var canvas = document.getElementById("main-canvas");
    var game = new Game(canvas);
    game.start();
    game.music();
    }
    )
};