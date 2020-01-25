class Game {
    constructor() {
        this.player = new Player()
        this.obstacles = [[x,y], [x, y]]
    }
    
    drawObstacles(){};
    drawPlayer(){};
    startGeneratingZombies(){};
    startGeneratingBoxes(){};
    gameOver(){};
    init(){};
  }
