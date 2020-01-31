class Box {
  constructor(position) {
    this.content;
    this.itemType;
    this._generate()
    this.position = position;
    this.size = 20
  }


  hitsPlayer(playerPosition, playerSize) {
    if (this.position[0] < playerPosition[0] + playerSize[0] &&
      this.position[0] + this.size > playerPosition[0] &&
      this.position[1] < playerPosition[1] + playerSize[1] &&
      this.position[1] + this.size > playerPosition[1]) {
      return true
    }
    return false
  }

  _generate() {
    let typesOfThings = 2
    let r = Math.round(Math.random() * typesOfThings)
    if (r == 0) {
      this.itemType = "life"
    } else if (r == 1) {
      this.itemType = "weapon"
    } else {
      this.itemType = "munition"
    }
    switch (this.itemType) {
      case "life":
        this.content = 2
        break;
      case "weapon":
        let r = Math.round(Math.random() * 1)
        if (r == 0) {
          this.content = "metralleta"
        } else {
          this.content = "revolver"
        }
        break;
      case "munition":
        this.content = 10
        break;
    }
  }
}