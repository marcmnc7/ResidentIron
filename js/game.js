class Game {
    constructor(options) {
        this.player = options.player;
        this.gamePoints = 0;
        this.context = options.context;
        this.bullets = [];
        this.zombies = [];
        this.canvas_loop = undefined;
        this.zombies_loop = undefined;
    }

    _zombieToPlayerPosition(zombie){

        let playerX = this.player.position[0]
        let playerY = this.player.position[1]
        let zombieX = zombie.position[0]
        let zombieY = zombie.position[1]
        let diffX = Math.abs(playerX - zombieX)
        let diffY = Math.abs(playerY - zombieY)
        if (zombie.canChangeDir){

            if(diffX > diffY){
                if(playerX > zombieX){
                    zombie._move("d")
                } else {
                    zombie._move("a")
                }
            } else {
                if(playerY > zombieY){
                    zombie._move("s")
                } else {
                    zombie._move("w")
                }
            }
            zombie._blockDirection()
        } else {
            zombie._move(zombie.direction)
        }
    }

    _generateZombies(){
        return setInterval(function(){            
            let newZombieFrom = Math.round(Math.random() * 4)
            switch (newZombieFrom) {
                case 1:
                    this.zombies.push(new Zombie([Math.random() * 1000, 520], "w"))
                    break;
                case 2:
                    this.zombies.push(new Zombie([Math.random() * 1000, -20], "s"))
                    break;
                case 3:
                    this.zombies.push(new Zombie([1000, Math.random() * 520], "a"))
                    break;
                case 4:
                    this.zombies.push(new Zombie([-20, Math.random() * 520], "d"))
                    break;
                }
        }.bind(this), 1000);
    }
    
    _drawPlayer(){
        this.context.fillStyle = "green";
        const image = document.getElementById("playerImage");
        this.context.drawImage(
            image,
            this.player.animationDict[this.player.action][this.player.direction][0], this.player.animationDict[this.player.action][this.player.direction][1], this.player.animationDict[this.player.action][this.player.direction][2], this.player.animationDict[this.player.action][this.player.direction][3],
            this.player.position[0], this.player.position[1], this.player.size[0], this.player.size[1]
            );
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

            this._zombieToPlayerPosition(zombie);
            this.context.fillStyle = "black";
            const image = document.getElementById("zombieImage");
            this.context.drawImage(
                image,
                zombie.animationDict[zombie.action][zombie.direction][0], zombie.animationDict[zombie.action][zombie.direction][1], zombie.animationDict[zombie.action][zombie.direction][2], zombie.animationDict[zombie.action][zombie.direction][3],
                zombie.position[0], zombie.position[1], zombie.size[0], zombie.size[1]
                );
            
            
            let hitBullet = zombie._recievesBullet(this.bullets)
            if(hitBullet){
                hitBullet._destroy();
                this.bullets.splice(this.bullets.indexOf(hitBullet))
                zombie._destroy();
                this.gamePoints += 20
                document.getElementById("points").innerText = this.gamePoints
                if(zombie.lifePoints === 0){    
                    this.zombies.splice(this.zombies.indexOf(zombie), 1)
                }
            }
            if(zombie.hit(this.player)){
                document.getElementById("lifes").innerText = this.player.lifePoints;
                if(this.player.lifePoints === 0){
                    this._stop()
                    this.player.die()
                    document.getElementById("gameOverScreen").style.display = "block";
                    document.getElementById("game").style.display = "none";
                }
            }
        });
    };

    _update(){
        console.log("Update")
        this._cleanCanvas();
        this._drawBullets();
        this._drawZombies();
        this._drawPlayer();
        this._canvasLoop();
    }


    _canvasLoop(){
        return window.requestAnimationFrame(this._update.bind(this));
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
                    if(this.player.canShoot){
                        this.player._blockShoot();
                        this.bullets.push(new Bullet(this.player.position, this.player.direction));
                        break;
                    }
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
        this.context.clearRect(0, 0, 1000, 520)
    }

    _stop(){
        this._cleanCanvas();
        this._update = function(){};
        clearInterval(this.canvas_loop)
        clearInterval(this.zombies_loop)
    }

    start(){
        let canvas_loop = this._canvasLoop();
        this._assignControlsToKeys();
        let zombies_loop = this._generateZombies();
    };
}
