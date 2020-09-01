import {
  on,
} from '/lib/kontra.min.mjs';
import Actor from './actor.js';
/**
 * Represents the ball character.
 *
 * @class Ball
 */
export default class Ball extends Actor {
  /**
   * Creates an instance of Ball.
   *
   * @param {*} map
   * @param {number} id
   * @memberof Ball
   */
  constructor(map, id) {
    super(map, id);
    on('playerMoved', (x, y) => {
      if (this.direction) {
        return;
      }
      if (this.x === x) {
        if (this.y > y) {
          this.direction = 'up';
        } else {
          this.direction = 'down';
        }
      } else if (this.y === y) {
        if (this.x > x) {
          this.direction = 'left';
        } else {
          this.direction = 'right';
        }
      }
    });
  }

  /**
   * Tries to move the ball to the specified map coordinates.
   *
   * @param {number} x
   * @param {number} y
   * @memberof Ball
   */
  moveTo(x, y) {
    super.moveTo(x, y);
    const tileID = this.map.tileAtLayer('dynamic', {col: x, row: y});
    if (
      tileID === 3 ||
      tileID === 4 ||
      tileID === 7 ||
      tileID === 8
    ) {
      this.map.setTileAtLayer('dynamic', {col: x, row: y}, 1);
      this.direction = null;
      this.moving = false;
    } else if (
      tileID === 9 ||
      tileID === 10 ||
      tileID === 13 ||
      tileID === 14
    ) {
      this.map.setTileAtLayer('dynamic', {col: x, row: y}, 15);
      this.sprite = null;
    }
  }
}
