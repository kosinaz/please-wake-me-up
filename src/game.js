import {
  init,
  GameLoop,
  load,
  TileEngine,
  dataAssets,
} from '/lib/kontra.min.mjs';
import Player from './player.js';

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
      update: this.update.bind(this),
      render: this.render.bind(this),
    });
    load(
        'image/player.png',
        'image/tileset.png',
        'data/map.json',
    ).then(this.create.bind(this));
  }

  /**
   * Creates the game content.
   *
   * @param {HTMLImageElement} [playerImage]
   * @memberof Game
   */
  create([playerImage]) {
    // eslint-disable-next-line new-cap
    this.map = TileEngine(dataAssets['data/map']);
    this.player = new Player(10, 10, playerImage);
    this.loop.start(); // start the game
  }

  /**
   * Updates all the game content.
   *
   * @memberof Game
   */
  update() {
    this.player.update();
  }

  /**
   * Renders all the game content.
   *
   * @memberof Game
   */
  render() {
    this.map.render();
    this.player.render();
  }
}

new Game();
