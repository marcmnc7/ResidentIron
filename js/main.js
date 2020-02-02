document.addEventListener('DOMContentLoaded', (event) => {

    // GET AND DEFINE ALL ELEMENTS
    let screenStart = document.getElementById("startScreen");
    let screenGame = document.getElementById("game");
    let btnGoSelect = document.getElementById("go_select");
    let btnGoInstructions = document.getElementById("go_instructions");
    let btnPlay = document.getElementById("start_game");
    let btnInstructionsToHome = document.getElementById("instrToHome")
    let returnHomeBtn = document.getElementById("toHome");
    let playAgainBtn = document.getElementById("playAgain");
    let gameOverScreen = document.getElementById("gameOverScreen");
    let selectScreen = document.getElementById("selectScreen");
    let instructionsScreen = document.getElementById("instructionsScreen");
    let canvas = document.getElementById('canvas')
    let game = undefined;
    ctx = canvas.getContext('2d');

    // GO TO INSTRUCTIONS
    btnGoInstructions.addEventListener("click", function () {
        document.getElementById("michael").play()
        screenStart.style.display = "none";
        instructionsScreen.style.display = "block";
    });

    // FROM INSTRUCTIONS TO HOME
    btnInstructionsToHome.addEventListener("click", function () {
        screenStart.style.display = "block";
        instructionsScreen.style.display = "none";
    });

    // GO TO SELECT PLAYER AND WEAPON
    btnGoSelect.addEventListener("click", function () {
        document.getElementById("michael").play()
        screenStart.style.display = "none";
        selectScreen.style.display = "block";
    });

    // SLIDER MUY CUTRE
    let p1 = document.getElementById("p1")
    let p2 = document.getElementById("p2")
    let a1 = document.getElementById("a1")
    let a2 = document.getElementById("a2")
    let pnext1 = document.getElementById("pnext1");
    let pnext2 = document.getElementById("pnext2");
    let pnext3 = document.getElementById("pnext3");
    let pbefore1 = document.getElementById("pbefore1");
    let pbefore2 = document.getElementById("pbefore2");
    let pbefore3 = document.getElementById("pbefore3");
    let anext1 = document.getElementById("anext1");
    let anext2 = document.getElementById("anext2");
    let abefore1 = document.getElementById("abefore1");
    let abefore2 = document.getElementById("abefore2");
    pnext1.addEventListener("click", function () {
        p1.style.display = "none"
        p2.style.display = "block"
    })
    pnext2.addEventListener("click", function () {
        p2.style.display = "none"
        p3.style.display = "block"
    })
    pnext3.addEventListener("click", function () {
        p3.style.display = "none"
        p1.style.display = "block"
    })
    pbefore1.addEventListener("click", function () {
        p1.style.display = "none"
        p2.style.display = "block"
    })
    pbefore2.addEventListener("click", function () {
        p2.style.display = "none"
        p3.style.display = "block"
    })
    pbefore3.addEventListener("click", function () {
        p3.style.display = "none"
        p1.style.display = "block"
    })
    anext1.addEventListener("click", function () {
        a1.style.display = "none"
        a2.style.display = "block"
    })
    anext2.addEventListener("click", function () {
        a2.style.display = "none"
        a1.style.display = "block"
    })
    abefore1.addEventListener("click", function () {
        a1.style.display = "none"
        a2.style.display = "block"
    })
    abefore2.addEventListener("click", function () {
        a2.style.display = "none"
        a1.style.display = "block"
    })

    // PLAY BUTTON
    btnPlay.addEventListener("click", function () {
        let arma = new Revolver();
        let personaje = "player_one"
        if (a1.style.display != "none") {
            arma = new Metralleta()
        }
        if (p2.style.display == "block") {
            personaje = "player_two"
        } else if (p3.style.display == "block") {
            personaje = "player_three"
        }
        selectScreen.style.display = "none";
        screenGame.style.display = "block";
        game = new Game({
            context: ctx,
            player: new Player(personaje, [arma])
        });
        document.getElementById("michael").pause()
        game.start()
    });

    // RETURN TO HOME
    returnHomeBtn.addEventListener("click", function () {
        document.getElementById("michael").play()
        screenStart.style.display = "block";
        document.body.style.backgroundImage = "url(../src/bgZombie.jpg)"
        gameOverScreen.style.display = "none";
    });

    // PLAY AGAIN
    playAgainBtn.addEventListener("click", function () {
        let arma = new Revolver();
        let personaje = "player_one"
        if (a1.style.display != "none") {
            arma = new Metralleta()
        }
        if (p2.style.display == "block") {
            personaje = "player_two"
        } else if (p3.style.display == "block") {
            personaje = "player_three"
        }
        selectScreen.style.display = "none";
        screenGame.style.display = "block";
        gameOverScreen.style.display = "none";
        screenGame.style.display = "block";
        game = new Game({
            context: ctx,
            player: new Player(personaje, [arma])
        });
        game.start()
    });

})
