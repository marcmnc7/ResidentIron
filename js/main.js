document.addEventListener('DOMContentLoaded', (event) => {

    let screenStart = document.getElementById("startScreen");
    let screenGame = document.getElementById("game");
    let btnPlay = document.getElementById("start_game");
    let returnHomeBtn = document.getElementById("toHome");
    let playAgainBtn = document.getElementById("playAgain");
    let gameOverScreen = document.getElementById("gameOverScreen");
    let game = undefined;



    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d');


    btnPlay.addEventListener("click", function () {
        screenStart.style.display = "none";
        screenGame.style.display = "block";
        game = new Game({
            context: ctx,
            player: new Player(new Metralleta())
        });
        game.start()
    });

    returnHomeBtn.addEventListener("click", function () {
        screenStart.style.display = "block";
        gameOverScreen.style.display = "none";
    });

    playAgainBtn.addEventListener("click", function () {
        gameOverScreen.style.display = "none";
        screenGame.style.display = "block";
        game = new Game({
            context: ctx,
            player: new Player()
        });
        game.start()
    });


})

