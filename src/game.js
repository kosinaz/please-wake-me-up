import {
  init,
  Sprite,
  GameLoop,
  initKeys,
  bindKeys,
  keyPressed,
  load,
  TileEngine,
  dataAssets,
} from '/lib/kontra.min.mjs';

/**
 * Represents the game.
 *
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   * @memberof Game
   */
  constructor() {
    const {canvas} = init();

    canvas.width = screen.availWidth;
    canvas.height = screen.availHeight;

    initKeys();

    bindKeys(['left', 'right', 'up', 'down'], (e) => {
      e.preventDefault();
    });

    let map;

    load('image/tileset.png', 'data/map.json').then((assets) => {
      // eslint-disable-next-line new-cap
      map = TileEngine(dataAssets['data/map']);
      loop.start(); // start the game
    });

    // eslint-disable-next-line new-cap
    const sprite = Sprite({
      x: 100, // starting x,y position of the sprite
      y: 80,
      color: 'red', // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: 40,
    });

    // eslint-disable-next-line new-cap
    const loop = GameLoop({ // create the main game loop
      update: () => { // update the game state
        if (keyPressed('left')) {
          // left arrow pressed
          sprite.x -= 10;
        } else if (keyPressed('right')) {
          // right arrow pressed
          sprite.x += 10;
        }

        if (keyPressed('up')) {
          // up arrow pressed
          sprite.y -= 10;
        } else if (keyPressed('down')) {
          // down arrow pressed
          sprite.y += 10;
        }
        sprite.update();
      },
      render: () => { // render the game state
        map.render();
        sprite.render();
      },
    });
  }
}

new Game();
