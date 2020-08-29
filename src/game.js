import {
  init,
  GameLoop,
  load,
  TileEngine,
  dataAssets,
} from '/lib/kontra.min.mjs';
import Player from './player.js';
import Ball from './ball.js';

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
        'image/ball.png',
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
  create([playerImage, ballImage]) {
    // eslint-disable-next-line new-cap
    this.map = TileEngine(dataAssets['data/map']);
    this.player = new Player(35, 21, playerImage, this.map);
    this.ball = new Ball(48, 11, ballImage, this.map);
    this.ball.direction = 'down';
    this.loop.start(); // start the game
  }

  /**
   * Updates all the game content.
   *
   * @memberof Game
   */
  update() {
    this.player.update();
    this.ball.update();
  }

  /**
   * Renders all the game content.
   *
   * @memberof Game
   */
  render() {
    this.map.render();
    this.player.render();
    this.ball.render();
  }
}

new Game();
