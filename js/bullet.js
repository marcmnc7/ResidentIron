class Bullet {
    constructor(position, direction, maxDistance, regression, damage) {
        this.position = position;
        this.initialPosition = [...position]
        this.size = [0, 0]
        this.intervalShoot = undefined;
        this.maxBulletDistance = maxDistance;
        this.direction = direction;
        this.regression = regression;
        this._set_size()
        this._move(direction);
        this.damage = damage;
    }

    _destroy() {
        clearInterval(this.intervalShoot)
    }

    _set_size() {
        if (this.direction == "d" || this.direction == "a") {
            this.size = [30, 10]
        } else {
            this.size = [10, 30]
        }
    }

    _move(direction) {
        switch (direction) {
            case "w":
                this.intervalShoot = setInterval(function () {
                    this.position = [this.position[0], this.position[1] - 2]
                }.bind(this), 1);
                break;
            case "s":
                this.intervalShoot = setInterval(function () {
                    this.position = [this.position[0], this.position[1] + 2]
                }.bind(this), 1);
                break
            case "a":
                this.intervalShoot = setInterval(function () {
                    this.position = [this.position[0] - 2, this.position[1]]
                }.bind(this), 1);
                break;
            case "d":
                this.intervalShoot = setInterval(function () {
                    this.position = [this.position[0] + 2, this.position[1]]
                }.bind(this), 1);
                break;
        }
    }
}