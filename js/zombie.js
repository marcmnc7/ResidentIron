class Zombie{
    constructor(position, direction){
        this.position = position;
        this.direction = direction;
        this._move(direction);
        this.size = 20;
        this.intervalMove = undefined; 
    }


    _destroy(){
        console.log(this.intervalMove)
        clearInterval(this.intervalMove)
    }
    
    _recievesBullet(bullets){
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            if (this.position[0] < bullet.position[0] + bullet.size &&
                this.position[0] + this.size > bullet.position[0] &&
                this.position[1] < bullet.position[1] + bullet.size &&
                this.position[1] + this.size > bullet.position[1]) {
                    console.log("Collision")
                    return bullet
            }
            return false
        }
    }

    _move(direction){
        switch (direction) {
            case "w":
                this.intervalMove = setInterval(function(){
                    this.position = [this.position[0], this.position[1]-2]
                }.bind(this), 200);
              break;
            case "s":
                this.intervalMove = setInterval(function(){
                    this.position = [this.position[0], this.position[1]+2]
                }.bind(this), 200);
                break
            case "a":
                this.intervalMove = setInterval(function(){
                    this.position = [this.position[0]-2, this.position[1]]
                }.bind(this), 200);
              break;
            case "d":
                this.intervalMove = setInterval(function(){
                    this.position = [this.position[0]+2, this.position[1]]
                }.bind(this), 200);
              break;
          }
    }



}
