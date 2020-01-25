# ResidentIron

El propóstio del juego es matar zombies y ganar puntos por ello. Se trata de conseguir la mayor puntuación posbile.

El juego termina cuando el personaje queda sin vida.

La pantalla del juego es un lienzo de toda la pantalla que incorpora:
- El personaje --> Se controla su direccion con las teclas de dirección del teclado. Puede disparar con la tecla espacio. Tiene 4 puntos de vida.
- Los obstaculos --> No se pueden traspasar ni por el personaje, ni por las balas, ni por los zombies.
- Las cajas --> Se crean aleatoriamente en un punto del lienzo. Cuando el personaje las recoge, gana 1 punto de vida o se le cambia el arma, depende de lo que contenga ésta.
    - Armas -> La sujeta el personaje. Hay 3 tipos y tienen 300 pixels de alcanze y 1 segundo de cadencia de disparo:
        - Tipo1: Tiene fuerza 1 (resta 1 punto de vida al zombie) 
        - Tipo2: Tiene fuerza 2 (resta 2 punto de vida al zombie)
        - Tipo3: Tiene fuerza 3 (resta 3 punto de vida al zombie)
- Los zombies --> Van entrando por los bordes de la pantalla y se dirigen hacia el personaje para golpearlo. Tienen 3 puntos de vida y cada golpe que da resta 1 punto de vida al personaje.


Extras:
- Antes de empezar el juego hay una selección del tipo de personaje (diferente skin) y de pantalla (diferentes obstàculos fijos).
- Hacer que no se muestre todo el lienzo desde un inicio, sino que sea como un zoom permanente y el jugador no vea toda la pantalla.
- Hacer 2 tipos de zombies. Con mas daño y vida o que incluso disparen bolas fuego.
- Hacer que se guarden las puntuaciones y mostrarlas en inicio.
- Hacer que las armas tengan diferente tipo de disparo grafico, no solo diferente daño.
- Poner efectos de sonido y musica de fondo.
- Que las armas tengan municion, diferente alcanze y cadencia, etc.
- Poder pausar el juego
- Poder elegir la velocidad de creacion y andadura de los zombies
- Que cuando los zombies reciben un disparo tengan regresion, ...
- Que los obstaculos se puedan romper
- Etc.

* * *

## MVP
### Technique
Html5 __Canvas__ and __Javascript__

### Game states
* __Start Screen__

  * Título
  * Botón de jugar

* __Game Screen__

  * Canvas

* __Game Over Screen__
  
  * Mostrar puntuación obtenida
  * Botón de "Play again"
  * Botón de volver al inicio

### Game

* Al inicio dibujar obstaculos, crear el personaje, arrancar la creacion de zombies y la creación de cajas.
* Mover el personaje e ir disparando zombies.
* Ir chequeando golpes recibidos por cada zombie y destruirlo si se da el caso. Sumar puntos cuando esto ultimo pase.
* Ir chequeando golpes que los zombies le dan al personaje.
* Si el personaje queda sin vida -> Game Over -> Mostrar pantalla de Game Over.

* * *

## BACK LOG

Extras. Comentados mas arriba.

* * *

## Data structure

__main.js__

````
createStartScreen(id);
createGameScreen(id);
createGameOverScreen(id);
destroyStartScreen();
destroyGameScreen();
destroyGameOverScreen();
var game = new Game({
    ctx: ctx,
});
game.init();

````

__Game.js__

````
function Game(){
  this.player = new Player();
  this.obstacles = obstacles;
};
Game.drawObstacles();
Game.drawPlayer();
Game.startGeneratingZombies();
Game.startGeneratingBoxes();
Game.gameOver();
Game.init();
````

__Player.js__

````
function Player(){
  this.position = [50, 50];
  this.direction = "d";
  this.weapon = 1;
  this.lifePoints = 4;
};
Player.move();
Player.shoot();
Player.recieveDamage();
Player.die();
````

__Zombie.js__

````
function Zombie(position, direction){
  this.position = position;
  this.direction = direction;
  this.lifePoints = 3;
};
Zombie.move();
Zombie.hit();
Zombie.recieveDamage();
Zombie.die()
````

__Obstacle.js__

````
function Obstacle(){
  this.width = 10;
  this.height = 10;
};
````

__Weapon.js__

````
function Weapon(type, damage){
  this.type = type;
  this.damage = damage;
  this.pixelsScope = 200;
  this.cadence = 1;
};
````

## Links

[Github](https://github.com/marcmnc7/lab-final-project-M1)