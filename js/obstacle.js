class Obstacle {
  constructor(position) {
    this.position = position;
    this.size = [60, 60];
  }

  hitPlayer(player) {
    if (this.position[0] + 20 < player.position[0] + player.size[0] &&
      this.position[0] + this.size[0] > player.position[0] + 20 &&
      this.position[1] + 20 < player.position[1] + player.size[1] &&
      this.position[1] + this.size[1] > player.position[1] + 20) {
      return true
    }
    return false
  }

  _recievesBullet(bullets) {
    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i];
      if (this.position[0] < bullet.position[0] + bullet.size[0] &&
        this.position[0] + this.size[0] > bullet.position[0] &&
        this.position[1] < bullet.position[1] + bullet.size[1] &&
        this.position[1] + this.size[1] > bullet.position[1]) {
        this.lifePoints = this.lifePoints - bullet.damage;
        return bullet
      }
      return false
    }
  }

}