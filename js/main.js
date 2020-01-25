document.addEventListener('DOMContentLoaded', (event) => {
    let canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d');

    game = new Game({
        context: ctx,
        player: new Player()
    });
    game.start()
})

