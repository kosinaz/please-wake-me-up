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
   * @param {number} x
   * @param {number} y
   * @param {HTMLImageElement} image
   * @param {*} map
   * @memberof Ball
   */
  constructor(x, y, image, map) {
    super(x, y, image, map);
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
    const tileID = this.map.tileAtLayer('layer', {col: x, row: y});
    if (tileID === 3 || tileID === 4 || tileID === 7 || tileID === 8) {
      this.map.setTileAtLayer('layer', {col: x, row: y}, 1);
      this.direction = null;
      this.moving = false;
    }
  }
}
