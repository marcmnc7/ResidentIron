class Bullet {
    constructor(position, direction, maxDistance, regression, damage) {
        this.initialPosition = [...position]
        this.position = position;
        this.direction = direction;
        this.maxBulletDistance = maxDistance;
        this.regression = regression;
        this.damage = damage;
        this.size = [5, 20]
        this._move(direction);
        this._correct_size()
        this.intervalShoot = 1;
    }

    _correct_size() {
        if (this.direction == "d" || this.direction == "a") {
            this.size = [20, 5]
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

    destroy() {
        this.intervalShoot = undefined;
        clearInterval(this.intervalShoot)
    }
}