class Player {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.weaponIndex = 0;
    this.direction = "s";
    this.position = [500, 250];
    this.size = [50, 60];
    this.velocity = 20; // less is fast
    this.action = "walk";
    this.lifePoints = 4;
    this.maxLifePoints = 6;
    this.canShoot = true;
    this.canWalk = true;
    this.isRecievingHit = false;
    this._inBorders();
    this.intervalWalkAnimation;
    this.intervalShootAnimation;
    this.moveIntervalUp = undefined;
    this.moveIntervalDown = undefined;
    this.moveIntervalLeft = undefined;
    this.moveIntervalRight = undefined;
    this.intervalBorders = 1;
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
      },

    };
  }

  changeWeapon() {
    this.weaponIndex++
    if (this.weaponIndex >= this.weapon.length) {
      this.weaponIndex = 0;
    }
  }

  _shootAnimation() {
    let anim_vel;
    if (this.weapon[this.weaponIndex].name == "metralleta") { anim_vel = 40 } else { anim_vel = 100 };
    if (!this.intervalShootAnimation) {
      this.intervalShootAnimation = setInterval(function () {
        if (this.animationDict[this.action][this.direction][0] > 700) { this.animationDict[this.action][this.direction][0] = 12 }
        this.animationDict[this.action][this.direction][0] = this.animationDict[this.action][this.direction][0] + 64;
      }.bind(this), anim_vel);

    }
  }

  _walkAnimation() {
    if (!this.intervalWalkAnimation) {
      this.intervalWalkAnimation = setInterval(function () {
        if (this.animationDict[this.action][this.direction][0] > 500) { this.animationDict[this.action][this.direction][0] = 12 }
        this.animationDict[this.action][this.direction][0] = this.animationDict[this.action][this.direction][0] + 64;
      }.bind(this), this.velocity + 40);
    }
  }

  _blockShoot() {
    this.canShoot = false;
    setTimeout(() => { this.canShoot = true }, this.weapon[this.weaponIndex].cadency);
  }

  _isRecievingHit() {
    this.isRecievingHit = true;
    setTimeout(() => { this.isRecievingHit = false }, 250);
  }

  _inBorders() {
    this.intervalBorders = setInterval(() => {
      let yesNo = false
      if (this.position[0] >= (1000 - this.size[0])) {
        this.position[0] -= 1
      } else if (this.position[1] <= 10) {
        this.position[1] += 1
      } else if (this.position[0] <= 10) {
        this.position[0] += 1
      } else if (this.position[1] >= (520 - this.size[1])) {
        this.position[1] -= 1
      } else {
        yesNo = true
      }
      this.canWalk = yesNo
    }, 2);
  }

  shoot() {
    if (this.canShoot && this.weapon[this.weaponIndex].munition > 0) {
      this._shootAnimation()
      this._blockShoot();
      this.action = "shoot"
      document.getElementById("arrowEffect").play() // INTENTAR SACAR DE AQUI, ESO ES DE VIEW
      this.weapon[this.weaponIndex].munition--;
      return new Bullet(this.position, this.direction, this.weapon[this.weaponIndex].maxDistance, this.weapon[this.weaponIndex].regression, this.weapon[this.weaponIndex].damage)
    }
    return false
  }

  stopShoot() {
    this.action = "walk";
    clearInterval(this.intervalShootAnimation)
    this.intervalShootAnimation = undefined;
  }

  move(newDirection) {
    this.direction = newDirection
    this.stopShoot()
    if (this.action == "walk") {
      this._walkAnimation()
      switch (newDirection) {
        case "w":
          if (!this.moveIntervalUp) {
            this.moveIntervalUp = setInterval(function () {
              if (this.canWalk && !this.isRecievingHit) {
                this.position = [this.position[0], this.position[1] - 1]
                this.size[1] = this.size[1] - 0.03
                this.size[0] = this.size[0] - 0.03
              }
            }.bind(this), this.velocity);
          }
          break;
        case "s":
          if (!this.moveIntervalDown) {
            this.moveIntervalDown = setInterval(function () {
              if (this.canWalk && !this.isRecievingHit) {
                this.position = [this.position[0], this.position[1] + 1]
                this.size[1] = this.size[1] + 0.03
                this.size[0] = this.size[0] + 0.03
              }
            }.bind(this), this.velocity);
          }
          break;
        case "a":
          if (!this.moveIntervalLeft) {
            this.moveIntervalLeft = setInterval(function () {
              if (this.canWalk && !this.isRecievingHit) {
                this.position = [this.position[0] - 1, this.position[1]]
              }
            }.bind(this), this.velocity);
          }
          break;
        case "d":
          if (!this.moveIntervalRight) {
            this.moveIntervalRight = setInterval(function () {
              if (this.canWalk && !this.isRecievingHit) {
                this.position = [this.position[0] + 1, this.position[1]]
              }
            }.bind(this), this.velocity);
          }
          break;
      }
    }
  };

  destroy() {
    clearInterval(this.intervalBorders)
    this.intervalBorders = undefined;
  }

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
}
