import {
  init,
  GameLoop,
  load,
} from '/lib/kontra.min.mjs';
import Level from './level.js';

/**
 * Represents the game.
 *
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   *
   * @memberof Game
   */
  constructor() {
    const {canvas} = init();
    canvas.width = screen.availWidth;
    canvas.height = screen.availHeight;
    // eslint-disable-next-line new-cap
    this.loop = GameLoop({
      update: () => {
        this.level.update();
      },
      render: () => {
        this.level.render();
      },
    });
    load(
        'image/player.png',
        'image/ball.png',
        'image/tileset.png',
        'data/level1.json',
        'data/level2.json',
    ).then(() => {
      this.level = new Level(1);
      this.loop.start(); // start the game
    });
  }
}

new Game();
