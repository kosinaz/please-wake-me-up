import {
  initKeys,
  bindKeys,
  keyPressed,
  emit,
} from '../lib/kontra.min.mjs';
import Actor from './actor.js';
/**
 * Represents the player character.
 *
 * @class Player
 */
export default class Player extends Actor {
  /**
   * Creates an instance of Player.
   *
   * @param {*} map
   * @memberof Player
   */
  constructor(map) {
    super(map);
    initKeys();
    bindKeys(['left', 'right', 'up', 'down'], (e) => {
      e.preventDefault();
    });
  }

  /**
   * Updates the player position.
   *
   * @memberof Player
   */
  update() {
    if (!this.sprite) {
      return;
    }
    if (this.sprite.x === this.x * 16 + 8 &&
      this.sprite.y === this.y * 16 + 8) {
      this.direction = null;
    }
    if (!this.moving) {
      if (keyPressed('left')) {
        this.direction = 'left';
      } else if (keyPressed('right')) {
        this.direction = 'right';
      } else if (keyPressed('up')) {
        this.direction = 'up';
      } else if (keyPressed('down')) {
        this.direction = 'down';
      }
    }
    super.update();
  }

  /**
   * Tries to move the player to the specified map coordinates.
   *
   * @param {number} x
   * @param {number} y
   * @memberof Player
   */
  moveTo(x, y) {
    const tileID = this.map.tileAtLayer('dynamic', {col: x, row: y});
    if (tileID === 11) {
      emit('playerLeft');
    } else if (
      tileID === 9 ||
      tileID === 10 ||
      tileID === 13 ||
      tileID === 14 ||
      tileID === 16
    ) {
      emit('playerDied');
    } else if (
      tileID !== 3 &&
      tileID !== 4 &&
      tileID !== 7 &&
      tileID !== 8
    ) {
      this.sprite.playAnimation('walk');
      this.moving = true;
      this.x = x;
      this.y = y;
      emit('playerMoved', x, y);
    }
  }
}
