class Game {
    constructor(options) {
        this.player = options.player
        this.gamePoints = 0;
        this.context = options.context
    }
    
    _drawPlayer(){
        let playerPosition = this.player.position
        let playerSize = this.player.size
        this.context.fillStyle = "green";
        this.context.fillRect(playerPosition[0], playerPosition[1], playerSize, playerSize);
    };

    _update(){
        this._cleanCanvas();
        this._drawPlayer();
        this._canvasLoop();
    }

    _canvasLoop(){
        this.interval = window.requestAnimationFrame(this._update.bind(this));
    };


    _assignControlsToKeys() {
        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 38: // arrow up
                    this.player.move("w");
                    break;
                case 40: // arror down
                    this.player.move("s");
                    break;
                case 37: // arror left
                    this.player.move("a");
                    break;
                case 39: // arrow right
                    this.player.move("d");
                    break;
            }
        });
        document.addEventListener('keyup', e => {
            switch (e.keyCode) {
                case 38: // arrow up
                    this.player.stop("w");
                    break;
                case 40: // arror down
                    this.player.stop("s");
                    break;
                case 37: // arror left
                    this.player.stop("a");
                    break;
                case 39: // arrow right
                    this.player.stop("d");
                    break;
            }
        });
    }

    _cleanCanvas() {
        this.context.clearRect(0, 0, 500, 500)
    }

    start(){
        this._canvasLoop();
        this._assignControlsToKeys();
    };
}
