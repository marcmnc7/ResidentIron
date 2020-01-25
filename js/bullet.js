class Bullet{
    constructor(position, direction){
        this.position = position;
        this.initialPosition = [...position]
        this.size = 10;
        this.intervalShoot = undefined;
        this.maxBulletDistance = 200;
        this.direction = direction;
        this._move(direction);
    }

    _destroy(){
        clearInterval(this.intervalShoot)
    }

    _move(direction){
        switch (direction) {
            case "w":
                this.intervalShoot = setInterval(function(){
                    this.position = [this.position[0], this.position[1]-2]
                }.bind(this), 1);
              break;
            case "s":
                this.intervalShoot = setInterval(function(){
                    this.position = [this.position[0], this.position[1]+2]
                }.bind(this), 1);
                break
            case "a":
                this.intervalShoot = setInterval(function(){
                    this.position = [this.position[0]-2, this.position[1]]
                }.bind(this), 1);
              break;
            case "d":
                this.intervalShoot = setInterval(function(){
                    this.position = [this.position[0]+2, this.position[1]]
                }.bind(this), 1);
              break;
          }
    }
}