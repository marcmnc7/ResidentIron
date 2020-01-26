class Game {
    constructor(options) {
        this.player = options.player
        this.gamePoints = 0;
        this.context = options.context
        this.bullets = []
        this.zombies = []
    }

    _generateZombies(){
        setInterval(function(){            
            let newZombieFrom = Math.round(Math.random() * 4)
            switch (newZombieFrom) {
                case 1:
                    this.zombies.push(new Zombie([Math.random() * 500, 500], "w"))
                    break;
                case 2:
                    this.zombies.push(new Zombie([Math.random() * 500, -20], "s"))
                    break;
                case 3:
                    this.zombies.push(new Zombie([500, Math.random() * 500], "a"))
                    break;
                case 4:
                    this.zombies.push(new Zombie([-20, Math.random() * 500], "d"))
                    break;
                }
        }.bind(this), 1000);

    }
    
    _drawPlayer(){
        let playerPosition = this.player.position
        let playerSize = this.player.size
        this.context.fillStyle = "green";
        this.context.fillRect(playerPosition[0], playerPosition[1], playerSize, playerSize);
    };
    

    _drawBullets(){
        this.bullets.forEach(bullet => {

            this.context.fillStyle = "red";
            this.context.fillRect(bullet.position[0], bullet.position[1], bullet.size, bullet.size);
            
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


    _drawZombies(){
        this.zombies.forEach(zombie => {

            this.context.fillStyle = "black";
            this.context.fillRect(zombie.position[0], zombie.position[1], zombie.size, zombie.size);
            let hitBullet = zombie._recievesBullet(this.bullets)
            if(hitBullet){
                hitBullet._destroy();
                this.bullets.splice(this.bullets.indexOf(hitBullet))
                zombie._destroy();
                this.zombies.splice(this.zombies.indexOf(zombie), 1)
            }
            if(zombie.hit(this.player)){
                this.player.die()
            }
        });
    };

    _update(){
        this._cleanCanvas();
        this._drawBullets();
        this._drawZombies();
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
        this._generateZombies();
    };
}
