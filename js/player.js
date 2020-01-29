class Player {
  constructor(weapon) {
    this.position = [500, 250];
    this.direction = "d";
    this.size = [50, 60];
    this.velocity = 10; // less is fast
    this.moveIntervalUp = undefined;
    this.moveIntervalDown = undefined;
    this.moveIntervalLeft = undefined;
    this.moveIntervalRight = undefined;
    this.shootInterval = undefined;
    this.shootCadency = 1000;
    this.canShoot = true;
    this.action = "walk"
    this.animationDict = {
      "walk": {
        "w": [12, 520, 45, 55],
        "s": [12, 647, 45, 55],
        "d": [12, 711, 45, 55],
        "a": [12, 584, 45, 55],
      },
      "shoot": {
        "w": [12, 1035, 45, 55],
        "s": [12, 1160, 45, 55],
        "d": [12, 1223, 45, 55],
        "a": [12, 1095, 45, 55],
      }
    };
    this.intervalWalkAnimation;
    this.intervalShootAnimation;
    this.lifePoints = 4;
    this.weapon = weapon;
    this.bullets = [];
  }

  _shootAnimation() {
    if (!this.intervalShootAnimation) {

      this.intervalShootAnimation = setInterval(function () {
        if (this.animationDict[this.action][this.direction][0] > 700) { this.animationDict[this.action][this.direction][0] = 12 }
        this.animationDict[this.action][this.direction][0] = this.animationDict[this.action][this.direction][0] + 64;
      }.bind(this), this.weapon.cadency - 165);

    }
  }

  _walkAnimation() {
    if (!this.intervalWalkAnimation) {
      this.intervalWalkAnimation = setInterval(function () {
        if (this.animationDict[this.action][this.direction][0] > 500) { this.animationDict[this.action][this.direction][0] = 16 }
        this.animationDict[this.action][this.direction][0] = this.animationDict[this.action][this.direction][0] + 64;
      }.bind(this), this.velocity + 40);
    }
  }

  _blockShoot() {
    this.canShoot = false
    setTimeout(function () { this.canShoot = true }.bind(this), this.weapon.cadency);
  }


  inBorders() {
    let yesNo = false
    if (this.position[0] >= (1000 - this.size[0])) {
      this.position[0] -= 1
    } else if (this.position[1] <= 0) {
      this.position[1] += 1
    } else if (this.position[0] <= 0) {
      this.position[0] += 1
    } else if (this.position[1] >= (520 - this.size[1])) {
      this.position[1] -= 1
    } else {
      yesNo = true
    }
    return yesNo
  }

  shoot() {
    if (!this.shootInterval) {
      this.shootInterval = setInterval(function () {
        if (this.canShoot) {
          this._blockShoot();
          if (this.weapon.munition > 0) {
            this.bullets.push(new Bullet(this.position, this.direction, this.weapon.maxDistance, this.weapon.regression, this.weapon.damage));
            this.action = "shoot"
            document.getElementById("arrowEffect").play() // INTENTAR SACAR DE AQUI, ESO ES DE VIEW
            this._shootAnimation()
            this.weapon.munition--;
          }
        }
      }.bind(this), this.velocity);
    }
  }

  stopShoot() {
    clearInterval(this.shootInterval)
    clearInterval(this.intervalShootAnimation)
    this.intervalShootAnimation = undefined;
    this.action = "walk";
    this.shootInterval = undefined;
  }

  move(newDirection) {
    this.direction = newDirection
    if (this.action == "walk") {
      this._walkAnimation()
      switch (newDirection) {
        case "w":
          if (!this.moveIntervalUp) {
            this.moveIntervalUp = setInterval(function () {
              if (this.inBorders()) {
                this.position = [this.position[0], this.position[1] - 1]
              }
            }.bind(this), this.velocity);
          }
          break;
        case "s":
          if (!this.moveIntervalDown) {
            this.moveIntervalDown = setInterval(function () {
              if (this.inBorders()) {
                this.position = [this.position[0], this.position[1] + 1]
              }
            }.bind(this), this.velocity);
          }
          break;
        case "a":
          if (!this.moveIntervalLeft) {
            this.moveIntervalLeft = setInterval(function () {
              if (this.inBorders()) {
                this.position = [this.position[0] - 1, this.position[1]]
              }
            }.bind(this), this.velocity);
          }
          break;
        case "d":
          if (!this.moveIntervalRight) {
            this.moveIntervalRight = setInterval(function () {
              if (this.inBorders()) {
                this.position = [this.position[0] + 1, this.position[1]]
              }
            }.bind(this), this.velocity);
          }
          break;
      }
    }
  };

  stop(direction) {
    clearInterval(this.intervalWalkAnimation)
    this.intervalWalkAnimation = undefined
    switch (direction) {
      case "w":
        clearInterval(this.moveIntervalUp)
        this.moveIntervalUp = undefined;
        break;
      case "s":
        clearInterval(this.moveIntervalDown)
        this.moveIntervalDown = undefined;
        break;
      case "d":
        clearInterval(this.moveIntervalRight)
        this.moveIntervalRight = undefined;
        break;
      case "a":
        clearInterval(this.moveIntervalLeft)
        this.moveIntervalLeft = undefined;
        break;
    }
  }

  die() {
    console.log("die")

    /*clearInterval(this.moveIntervalDown)
    clearInterval(this.moveIntervalUp)
    clearInterval(this.moveIntervalRight)
    clearInterval(this.moveIntervalLeft)*/
  };

}
