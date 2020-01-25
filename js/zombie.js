class Zombie{
    constructor(position, direction){
        this.position = position;
        this.direction = direction;
        this._move(direction);
        this.size = 20;
    }
    
    
    _move(direction){
        switch (direction) {
            case "w":
                this.intervalShoot = setInterval(function(){
                    this.position = [this.position[0], this.position[1]-2]
                }.bind(this), 200);
              break;
            case "s":
                this.intervalShoot = setInterval(function(){
                    this.position = [this.position[0], this.position[1]+2]
                }.bind(this), 200);
                break
            case "a":
                this.intervalShoot = setInterval(function(){
                    this.position = [this.position[0]-2, this.position[1]]
                }.bind(this), 200);
              break;
            case "d":
                this.intervalShoot = setInterval(function(){
                    this.position = [this.position[0]+2, this.position[1]]
                }.bind(this), 200);
              break;
          }
    }

    hit(){};
    checkCollision(){};
    die(){};
}
