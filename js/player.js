class Player {
    constructor() {
      this.position = [250, 250];
      this.direction = "d";
      this.size = 20;
      this.velocity = 2;
      this.moveIntervalUp = undefined;
      this.moveIntervalDown = undefined;
      this.moveIntervalLeft = undefined;
      this.moveIntervalRight = undefined;
    }
    
    inBorders(){
      let yesNo = false
      if (this.position[0] >= (500-this.size)){
        this.position[0] -= 1
      } else if (this.position[1] <= 0) {
        this.position[1] += 1
      } else if (this.position[0] <= 0){
        this.position[0] += 1
      } else if (this.position[1] >= (500-this.size)){
        this.position[1] -= 1
      } else {
        yesNo = true
      }
      return yesNo
    }

    move(newDirection){
      this.direction = newDirection
      switch (newDirection) {
        case "w":
          if (!this.moveIntervalUp){
            this.moveIntervalUp = setInterval(function(){
              if (this.inBorders()){
                this.position = [this.position[0], this.position[1]-2]
              }
            }.bind(this), 10);
          }
          break;
        case "s":
          if (!this.moveIntervalDown ){
            this.moveIntervalDown = setInterval(function(){
              if (this.inBorders()){
                this.position = [this.position[0], this.position[1]+2]
              }
            }.bind(this), 10);
          }
          break;
        case "a":
          if (!this.moveIntervalLeft){
            this.moveIntervalLeft = setInterval(function(){
              if (this.inBorders()){
                this.position = [this.position[0]-2, this.position[1]]
              }
            }.bind(this), 10);
          }
          break;
        case "d":
          if (!this.moveIntervalRight){
            this.moveIntervalRight = setInterval(function(){
              if (this.inBorders()){
                this.position = [this.position[0]+2, this.position[1]]
              }
            }.bind(this), 10);
          }
          break;
      }
    };

    stop(direction){
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

    checkCollision(){};
    die(){};

}
