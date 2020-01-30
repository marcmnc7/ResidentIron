class Game {
  constructor(options) {
    this.player = options.player;
    this.gamePoints = 0;
    this.context = options.context;
    this.zombies = [];
    this.zombiesPro = [];
    this.canvas_loop = undefined;
    this.zombies_loop = undefined;
    this.zombiesPro_loop = undefined;
  }

  _zombieToPlayerPosition(zombie) {

    let playerX = this.player.position[0]
    let playerY = this.player.position[1]
    let zombieX = zombie.position[0]
    let zombieY = zombie.position[1]
    let diffX = Math.abs(playerX - zombieX)
    let diffY = Math.abs(playerY - zombieY)
    if (zombie.canChangeDir) {

      if (diffX > diffY) {
        if (playerX > zombieX) {
          zombie._move("d")
        } else {
          zombie._move("a")
        }
      } else {
        if (playerY > zombieY) {
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

  _generateZombies() {
    this.zombies_loop = setInterval(function () {
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

  _generateZombiesPro() {
    this.zombiesPro_loop = setInterval(function () {
      let newZombieProFrom = Math.round(Math.random() * 4)
      console.log(this.zombiesPro)
      switch (newZombieProFrom) {
        case 1:
          this.zombiesPro.push(new ZombiePro([Math.random() * 1000, 520], "w"))
          break;
        case 2:
          this.zombiesPro.push(new ZombiePro([Math.random() * 1000, -20], "s"))
          break;
        case 3:
          this.zombiesPro.push(new ZombiePro([1000, Math.random() * 520], "a"))
          break;
        case 4:
          this.zombiesPro.push(new ZombiePro([-20, Math.random() * 520], "d"))
          break;
      }
    }.bind(this), 10000);
  }

  _drawPlayer() {
    const image = document.getElementById("playerImage");
    this.context.drawImage(
      image,
      this.player.animationDict[this.player.action][this.player.direction][0], this.player.animationDict[this.player.action][this.player.direction][1], this.player.animationDict[this.player.action][this.player.direction][2], this.player.animationDict[this.player.action][this.player.direction][3],
      this.player.position[0], this.player.position[1], this.player.size[0], this.player.size[1]
    );


    let c = 0;
    this.context.fillStyle = "darkred"
    for (let i = 0; i < this.player.lifePoints; i++) {
      c = (this.player.position[0] + 8) + (i * 6);
      this.context.fillRect(c, this.player.position[1] - 3, 5, 5);
    }
  };

  _drawMunitions() {
    let firstC = 0;
    let c2 = 0;
    let c = 0;
    for (let i = 0; i < this.player.weapon[this.player.weaponIndex].munition; i++) {
      let image = document.getElementById(`bulletw`);
      c2 = (i * 25 + 12)
      c = c2 % 500
      this.context.drawImage(image, (Math.floor(c2 / 500) * 11) + 10, c, 10, 20)
    }
  }

  _drawBullets() {
    this.player.bullets.forEach(bullet => {

      let image = document.getElementById(`bullet${bullet.direction}`);
      if (bullet.direction == "w" || bullet.direction == "s") {
        this.context.drawImage(
          image,
          bullet.position[0] + 10, bullet.position[1], bullet.size[0], bullet.size[1]
        );
        if (bullet.initialPosition[1] > bullet.position[1] + bullet.maxBulletDistance || bullet.initialPosition[1] < bullet.position[1] - bullet.maxBulletDistance) {
          bullet._destroy()
          this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1)
        }
      } else {
        this.context.drawImage(
          image,
          bullet.position[0], bullet.position[1] + 10, bullet.size[0], bullet.size[1]
        );
        if (bullet.initialPosition[0] > bullet.position[0] + bullet.maxBulletDistance || bullet.initialPosition[0] < bullet.position[0] - bullet.maxBulletDistance) {
          bullet._destroy()
          this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1)
        }
      }
    });
  };


  _drawZombies(arrayZombies, type) {
    arrayZombies.forEach(zombie => {

      this._zombieToPlayerPosition(zombie);
      this.context.fillStyle = "black";
      let image;
      if (type == "pro") {
        image = document.getElementById("zombiePro");
      } else {
        image = document.getElementById("zombieImage");
      }
      this.context.drawImage(
        image,
        zombie.animationDict[zombie.action][zombie.direction][0], zombie.animationDict[zombie.action][zombie.direction][1], zombie.animationDict[zombie.action][zombie.direction][2], zombie.animationDict[zombie.action][zombie.direction][3],
        zombie.position[0], zombie.position[1], zombie.size[0], zombie.size[1]
      );

      this.context.fillStyle = "green"
      let c = 0;
      for (let i = 0; i < zombie.lifePoints; i++) {
        c = (zombie.position[0] + 8) + (i * 6);
        this.context.fillRect(c, zombie.position[1] - 8, 5, 5);
      }

      let hitBullet = zombie._recievesBullet(this.player.bullets)
      if (hitBullet) {

        // BLOOD IMAGE - El zombie se printa encima enseguida. Arreglar.
        let image = document.getElementById("blood")
        this.context.drawImage(
          image,
          zombie.position[0], zombie.position[1], 20, 20
        );
        hitBullet._destroy();
        this.player.bullets.splice(this.player.bullets.indexOf(hitBullet))


        if (zombie.lifePoints <= 0) {
          this.gamePoints += 200
          let dieEffect = document.getElementById("dieEffect")
          dieEffect.volume = 0.35;
          dieEffect.play()
          zombie._destroy();
          arrayZombies.splice(arrayZombies.indexOf(zombie), 1)
        }
      }
      if (zombie.hit(this.player)) {
        let hitEffect = document.getElementById("hitEffect")
        hitEffect.play()
        if (this.player.lifePoints <= 0) {
          this._stop()
          this.player.die()
        }
      }
    });
  };


  _update() {
    console.log("Update")
    this._cleanCanvas();
    this._drawBullets();
    this._drawMunitions();
    this._drawZombies(this.zombies, "normal");
    this._drawZombies(this.zombiesPro, "pro");
    this._drawPlayer();
    this._canvasLoop();
    document.getElementById("points").innerText = this.gamePoints

  }


  _canvasLoop() {
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
          this.player.shoot();
          break
        case 75: // space
          this.player.changeWeapon();
          break
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
        case 32: // space
          this.player.stopShoot();
          break;
      }
    });
  }

  _generatePoints() {
    setInterval(() => {
      this.gamePoints++;
    }, 200);
  }

  _cleanCanvas() {
    this.context.clearRect(0, 0, 1000, 520)
  }

  _stop() {
    this._cleanCanvas();
    this._update = function () { };
    clearInterval(this.canvas_loop)
    clearInterval(this.zombies_loop)
    clearInterval(this.zombiesPro_loop)
    document.getElementById("gameMusic").pause()
    document.getElementById("zombiesSound").pause
    document.getElementById("gameOverScreen").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("finalPoints").innerText = `Tu puntuación: ${this.gamePoints}`
  }

  start() {
    document.getElementById("gameMusic").play()
    let zombiesSounds = document.getElementById("zombiesSound")
    zombiesSounds.volume = 0.1;
    zombiesSounds.play()
    let canvas_loop = this._canvasLoop();
    this._assignControlsToKeys();
    this._generateZombies();
    this._generateZombiesPro();
    this._generatePoints();
  };
}
