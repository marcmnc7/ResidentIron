# ResidentIron

El propóstio del juego es matar zombies y ganar puntos por ello. Se trata de conseguir la mayor puntuación posbile.

La pantalla del juego es de visión cenital, de un lienzo de toda la pantalla que incorpora:
- El personaje --> Se controla su direccion con las teclas de dirección del teclado. Puede disparar con la tecla espacio. Si choca con algun zombie, muere.
- Los zombies --> Van entrando por los bordes de la pantalla y siguen una dirección recta fija. Si reciben un disparo, mueren.

El juego termina cuando el personaje recibe un golpe (colisiona con un zombie).

* * *

## MVP
### Technique
Html5 __Canvas__ and Vanilla __Javascript__

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

* Dibujar el personaje y arrancar la creacion de zombies.
* Mover el personaje e ir disparando a los zombies.
* Ir comprobando por cada zombie si recibe el golpe. Si lo recibe, destruirlo y sumar puntos.
* Ir comprobando si el personaje recibe un golpe. Si es así -> Game Over -> Mostrar pantalla de Game Over.

* * *

## BACK LOG - IDEAS
- Darle puntos de vida al personaje y a los zombies, es decir, que puedan recibir mas de 1 golpe/disparo.
- Que los zombies no sigan una direccion fija, sino que se dirijan hacia el personaje para golpearlo.
- Añadir cajas y crear diferentes armas que puede llevar el personaje: Las cajas se crean aleatoriamente en un punto del lienzo. Cuando el personaje las recoge, gana 1 punto de vida o se le cambia el arma, depende de lo que contenga ésta.
- Crear diferentes tipos de armas con diferente alcanze y cadencia de disparo.
- Si en la caja que recoje el usuario hay una arma, permite que el usuario decida si cambiarla o no. O bien, que el personaje pueda tener varias armas y ir cambiandolas.
- Hacer que las armas tengan municion.
- Añadir obstaculos, que no pueden ser traspasados ni por el personaje, ni por las balas, ni por los zombies.
- Antes de empezar el juego hay una pantalla de selección del tipo de personaje (diferente skin) y de pantalla (diferentes obstàculos fijos).
- Hacer que no se muestre todo el lienzo desde un inicio, sino que sea como un zoom permanente y el jugador no vea toda la pantalla, asi como hacer que el angulo no sea 100% cenital.
- Hacer 2 tipos de zombies. Con mas daño y vida o que incluso disparen bolas fuego.
- Guardar puntuaciones i mostrar high score en pantalla inicio.
- Meterle buenos graficos a todo.
- Poner efectos de sonido y musica de fondo.
- Poder pausar el juego
- Poder elegir la velocidad de creacion y andadura de los zombies.
- Que cuando los zombies reciben un disparo tengan efecto de regresion,...
- Que los obstaculos se puedan romper.
- Que tenga mas angulos que 4. Es decir, si pulsa tecla arriba y derecha a la vez, que vaya a 45 grados.
- Etc.


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
  this.gamePoints = 0;
};
Game.drawPlayer();
Game.startGeneratingZombies();
Game.gameOver();
Game.init();
````

__Player.js__

````
function Player(){
  this.position = [50, 50];
  this.direction = "d";
};
Player.move();
Player.shoot();
Player.checkCollision();
Player.die();
````

__Zombie.js__

````
function Zombie(position, direction){
  this.position = position;
  this.direction = direction;
};
Zombie.move();
Zombie.hit();
Zombie.checkCollision();
Zombie.die()
````

## Links

[Github](https://github.com/marcmnc7/lab-final-project-M1)