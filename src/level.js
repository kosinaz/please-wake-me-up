import {
  TileEngine,
  dataAssets,
  on,
  emit,
} from '../lib/kontra.min.mjs';
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
    this.create(level);
  }

  /**
   * Start the specified level.
   *
   * @param {number} level
   * @memberof Level
   */
  create(level) {
    this.level = level;
    this.levelData = [...dataAssets['data/level' + level].layers[0].data];
    console.log();
    // eslint-disable-next-line new-cap
    this.map = TileEngine(dataAssets['data/level' + level]);
    this.map.setLayer(
        'dynamic',
        [...dataAssets['data/level' + level].layers[0].data],
    );
    this.player = new Player(this.map);
    this.balls = [];
    this.spawners = this.map.layerMap.actor.objects;
    for (let i = 1; i < this.spawners.length; i += 1) {
      this.balls.push(new Ball(this.map, i));
    }
    on('playerLeft', () => {
      this.destroy();
      if (level < 3) {
        this.create(level + 1);
      }
    });
    on('playerDied', () => {
      this.destroy();
      this.create(this.level);
    });
  }

  /**
   * Stops the current level and removes everything.
   *
   * @memberof Level
   */
  destroy() {
    this.map = null;
    this.player.destroy();
    this.balls.forEach((ball) => {
      ball.destroy();
    });
  }

  /**
   * Updates all the game content.
   *
   * @memberof Game
   */
  update() {
    this.balls.forEach((ball) => {
      if (!ball.sprite) {
        return;
      }
      if (this.player.x === ball.x && this.player.y === ball.y) {
        emit('playerDied');
      }
      ball.update();
    });
    this.player.update();
  }

  /**
   * Renders all the game content.
   *
   * @memberof Game
   */
  render() {
    if (!this.map) {
      return;
    }
    this.map.renderLayer('dynamic');
    this.player.render();
    this.balls.forEach((ball) => {
      ball.render();
    });
  }
}
