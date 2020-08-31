import {
  imageAssets,
  initKeys,
  bindKeys,
  keyPressed,
} from '/lib/kontra.min.mjs';
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
   * @param {number} x
   * @param {number} y
   * @param {*} map
   * @memberof Player
   */
  constructor(x, y, map) {
    super(x, y, imageAssets['image/player'], map);
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
   * Renders the player.
   *
   * @memberof Player
   */
  render() {
    this.sprite.render();
  }

  /**
   * Tries to move the player to the specified map coordinates.
   *
   * @param {number} x
   * @param {number} y
   * @memberof Player
   */
  moveTo(x, y) {
    const tileID = this.map.tileAtLayer('layer', {col: x, row: y});
    if (tileID !== 3 && tileID !== 4 && tileID !== 7 && tileID !== 8) {
      this.sprite.playAnimation('walk');
      this.moving = true;
      this.x = x;
      this.y = y;
    }
  }
}
