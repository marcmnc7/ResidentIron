class Game {
    constructor(options) {
        this.player = options.player
        this.gamePoints = 0;
        this.context = options.context
        this.bullets = []
    }
    
    _drawPlayer(){
        let playerPosition = this.player.position
        let playerSize = this.player.size
        this.context.fillStyle = "green";
        this.context.fillRect(playerPosition[0], playerPosition[1], playerSize, playerSize);
    };

    _drawShoot(){
        this.bullets.forEach(bullet => {

            this.context.fillStyle = "red";
            this.context.fillRect(bullet.position[0], bullet.position[1], bullet.size, bullet.size);
            console.log(bullet.direction)
            
            if (bullet.direction == "w" || bullet.direction == "s") {
                if(bullet.initialPosition[1] > bullet.position[1]+bullet.maxBulletDistance || bullet.initialPosition[1] < bullet.position[1]-bullet.maxBulletDistance){
                    bullet._destroy()
                    this.bullets.splice(this.bullets.indexOf(bullet), 1)
                }
            } else{
                if(bullet.initialPosition[0] > bullet.position[0]+bullet.maxBulletDistance || bullet.initialPosition[0] < bullet.position[0]-bullet.maxBulletDistance){
                    bullet._destroy()
                    this.bullets.splice(this.bullets.indexOf(bullet), 1)
                }
            }
        });
    };

    _update(){
        this._cleanCanvas();
        this._drawPlayer();
        this._drawShoot();
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
                case 32: // space
                    this.bullets.push(new Bullet(this.player.position, this.player.direction));
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
