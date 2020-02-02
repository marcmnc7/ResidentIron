class Zombie {
  constructor(position, direction) {
    this.position = position;
    this.direction = direction;
    this._move(direction);
    this.size = [40, 55];
    this.hitVelocity = 1000;
    this.type = "normal";
    this.action = "walk";
    this.walkVelocity = 0.2;
    this.intervalWalkAnimation;
    this.intervalHitAnimation;
    this.timeBlockDir = 1500;
    this.lifePoints = 3;
    this.canChangeDir = true;
    this.canHit = true;
    this.animationDict = {
      "walk": {
        "w": [16, 525, 35, 55],
        "s": [16, 652, 35, 55],
        "d": [16, 715, 35, 55],
        "a": [16, 589, 35, 55],
      },
      "hit": {
        "w": [16, 270, 35, 55],
        "s": [16, 397, 35, 55],
        "d": [16, 462, 35, 55],
        "a": [16, 334, 35, 55],
      },
    };
  }

  _blockHit() {
    this.canHit = false
    setTimeout(function () { this.canHit = true }.bind(this), this.hitVelocity);
  }

  _blockDirection() {
    this.canChangeDir = false
    setTimeout(function () { this.canChangeDir = true }.bind(this), this.timeBlockDir);
  }

  recievesBullet(bullets) {
    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i];
      if (this.position[0] < bullet.position[0] + bullet.size[0] &&
        this.position[0] + this.size[0] > bullet.position[0] &&
        this.position[1] < bullet.position[1] + bullet.size[1] &&
        this.position[1] + this.size[1] > bullet.position[1]) {
        this.lifePoints = this.lifePoints - bullet.damage;
        switch (this.direction) {
          case "s":
            this.position = [this.position[0], this.position[1] - bullet.regression];
            break;
          case "w":
            this.position = [this.position[0], this.position[1] + bullet.regression];
            break
          case "d":
            this.position = [this.position[0] - bullet.regression, this.position[1]];
            break;
          case "a":
            this.position = [this.position[0] + bullet.regression, this.position[1]];
            break;
        }
        return bullet
      }
      return false
    }
  }

  canHitPlayer(player) {
    if (this.canHit) {
      if (this.position[0] + 20 < player.position[0] + player.size[0] &&
        this.position[0] + this.size[0] > player.position[0] + 20 &&
        this.position[1] + 20 < player.position[1] + player.size[1] &&
        this.position[1] + this.size[1] > player.position[1] + 20) {
        this._blockHit()
        this._hitAnimation()
        this.action = "hit";
        return true
      }
      this.action = "walk"
      return false
    }
  }


  _walkAnimation() {
    if (!this.intervalWalkAnimation) {
      this.intervalWalkAnimation = setInterval(function () {
        if (this.animationDict[this.action][this.direction][0] > 500) { this.animationDict[this.action][this.direction][0] = 16 }
        this.animationDict[this.action][this.direction][0] = this.animationDict[this.action][this.direction][0] + 64;
      }.bind(this), 200);

    }
  }

  _hitAnimation() {
    if (!this.intervalHitAnimation) {
      this.intervalHitAnimation = setInterval(function () {
        if (this.animationDict[this.action][this.direction][0] > 300) { this.animationDict[this.action][this.direction][0] = 16 }
        this.animationDict[this.action][this.direction][0] = this.animationDict[this.action][this.direction][0] + 64;
      }.bind(this), 370);

    }
  }

  _move(direction) {
    if (this.action == "walk") {
      this._walkAnimation();
      this.direction = direction;
      switch (direction) {
        case "w":
          this.position = [this.position[0], this.position[1] - this.walkVelocity];
          break;
        case "s":
          this.position = [this.position[0], this.position[1] + this.walkVelocity];
          break
        case "a":
          this.position = [this.position[0] - this.walkVelocity, this.position[1]];
          break;
        case "d":
          this.position = [this.position[0] + this.walkVelocity, this.position[1]];
          break;
      }
    };
  }
}

class ZombiePro extends Zombie {
  constructor(position, direction) {
    super(position, direction);
    this.lifePoints = 5;
    this.walkVelocity = 0.5;
    this.timeBlockDir = 1200;
    this.type = "pro";
  }

}