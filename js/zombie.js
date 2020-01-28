class Zombie{
    constructor(position, direction){
        this.position = position;
        this.direction = direction;
        this._move(direction);
        this.size = [40, 60];
        this.intervalMove = undefined;
        this.canHit = true;
        this.hitVelocity = 1000;
        this.action = "walk"
        this.animationDict = {
            "walk": {
                "w": [16,525,35,55],
                "s": [16,652,35,55],
                "d": [16,715,35,55],
                "a": [16,589,35,55],
            }
        };
        this.walkVelocity = 0.5
        this.intervalWalkAnimation;
        this.timeBlockDir = 1500;
        this.canChangeDir = true;
    }

    _blockHit(){
        this.canHit = false
        setTimeout(function(){this.canHit = true }.bind(this), this.hitVelocity);
    }

    _blockDirection(){
        this.canChangeDir = false
        setTimeout(function(){this.canChangeDir = true }.bind(this), this.timeBlockDir);
    }

    _destroy(){
        clearInterval(this.intervalMove)
    }
    
    _recievesBullet(bullets){
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            if (this.position[0] < bullet.position[0] + bullet.size &&
                this.position[0] + this.size[0] > bullet.position[0] &&
                this.position[1] < bullet.position[1] + bullet.size &&
                this.position[1] + this.size[1] > bullet.position[1]) {
                    return bullet
                }
            return false
        }
    }

    hit(player){
        /*
        // mirar si hay un zombie en > y. Si es asi, hacer:
        this.context.globalCompositeOperation='destination-over';
        // volver a source over
        this.context.globalCompositeOperation='source-over';
        */
        if (this.canHit){
            if (this.position[0]+20 < player.position[0] + player.size[0] &&
                this.position[0] + this.size[0] > player.position[0]+20 &&
                this.position[1]+20 < player.position[1] + player.size[1] &&
                this.position[1] + this.size[1] > player.position[1]+20) {
                    this._blockHit()
                    return true
                }
            return false
        }        
    }

    _walkAnimation(){
        if(!this.intervalWalkAnimation){

            this.intervalWalkAnimation = setInterval(function(){
                if(this.animationDict[this.action][this.direction][0] > 500){this.animationDict[this.action][this.direction][0]=16}
                this.animationDict[this.action][this.direction][0] = this.animationDict[this.action][this.direction][0]+64;
            }.bind(this), 200);
        
        }
    }

    _move(direction){
        this.action = "walk";
        this._walkAnimation();
        this.direction = direction;
        switch (direction) {
            case "w":
                this.position = [this.position[0], this.position[1]-0.2];
              break;
            case "s":
                this.position = [this.position[0], this.position[1]+0.2];
                break
            case "a":
                this.position = [this.position[0]-0.2, this.position[1]];
              break;
            case "d":
                this.position = [this.position[0]+0.2, this.position[1]];
              break;
          }
    }



}
