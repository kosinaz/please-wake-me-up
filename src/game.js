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

    load('image/player.png', 'image/tileset.png', 'data/map.json')
        .then(([playerImage]) => {
          // eslint-disable-next-line new-cap
          map = TileEngine(dataAssets['data/map']);
          player.image = playerImage;
          loop.start(); // start the game
        });

    // eslint-disable-next-line new-cap
    const player = Sprite({
      x: 100, // starting x,y position of the sprite
      y: 100,
    });

    // eslint-disable-next-line new-cap
    const loop = GameLoop({ // create the main game loop
      update: () => { // update the game state
        if (keyPressed('left')) {
          // left arrow pressed
          player.x -= 10;
        } else if (keyPressed('right')) {
          // right arrow pressed
          player.x += 10;
        }

        if (keyPressed('up')) {
          // up arrow pressed
          player.y -= 10;
        } else if (keyPressed('down')) {
          // down arrow pressed
          player.y += 10;
        }
        player.update();
      },
      render: () => { // render the game state
        map.render();
        player.render();
      },
    });
  }
}

new Game();
