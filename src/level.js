import {
  TileEngine,
  dataAssets,
} from '/lib/kontra.min.mjs';
import Player from './player.js';
import Ball from './ball.js';
/**
 * Represents the level character.
 *
 * @class Level
 */
export default class Level {
  /**
   * Creates an instance of Level.
   *
   * @param {number} level
   * @memberof Level
   */
  constructor(level) {
    // eslint-disable-next-line new-cap
    this.map = TileEngine(dataAssets['data/level'+ level]);
    this.player = new Player(36, 19, this.map);
    this.ball = new Ball(47, 21, this.map);
  }

  /**
   * Updates all the game content.
   *
   * @memberof Game
   */
  update() {
    if (this.player.x === this.ball.x && this.player.y === this.ball.y) {
      this.player.dead = true;
      this.ball.direction = null;
    }
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
