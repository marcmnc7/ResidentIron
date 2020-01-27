class Player {
    constructor() {
      this.position = [250, 250];
      this.direction = "d";
      this.size = 40;
      this.velocity = 2;
      this.moveIntervalUp = undefined;
      this.moveIntervalDown = undefined;
      this.moveIntervalLeft = undefined;
      this.moveIntervalRight = undefined;
      this.shootCadency = 1000;
      this.canShoot = true;
      this.action = "walk"
      this.animationDict = {
          "walk": {
              "w": [16,525,35,55],
              "s": [16,652,35,55],
              "d": [16,717,35,55],
              "a": [16,589,35,55],
          }
      };
      this.intervalWalkAnimation;
    }


    _walkAnimation(){
      console.log(this.intervalWalkAnimation)
      if(!this.intervalWalkAnimation){
        this.intervalWalkAnimation = setInterval(function(){
            if(this.animationDict[this.action][this.direction][0] > 500){this.animationDict[this.action][this.direction][0]=16}
            this.animationDict[this.action][this.direction][0] = this.animationDict[this.action][this.direction][0]+64;
        }.bind(this), 50);
      }
    }
    
    _blockShoot(){
      this.canShoot = false
      setTimeout(function(){this.canShoot = true }.bind(this), this.shootCadency);
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
      this.action = "walk"
      this._walkAnimation()
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

    die(){
      console.log("die")
      
      /*clearInterval(this.moveIntervalDown)
      clearInterval(this.moveIntervalUp)
      clearInterval(this.moveIntervalRight)
      clearInterval(this.moveIntervalLeft)*/
    };

}
