import {
  Sprite,
  initKeys,
  bindKeys,
  keyPressed,
} from '/lib/kontra.min.mjs';
/**
 * Represents the player character.
 *
 * @class Player
 */
export default class Player {
  /**
   * Creates an instance of Player.
   *
   * @param {number} x
   * @param {number} y
   * @param {HTMLImageElement} image
   * @param {*} map
   * @memberof Player
   */
  constructor(x, y, image, map) {
    this.x = x;
    this.y = y;
    // eslint-disable-next-line new-cap
    this.sprite = Sprite({
      x: x * 16, // starting x,y position of the sprite
      y: y * 16,
      image: image,
    });
    this.map = map;
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
    if (!this.moving) {
      if (keyPressed('left')) {
        this.moveTo(this.x - 1, this.y);
      } else if (keyPressed('right')) {
        this.moveTo(this.x + 1, this.y);
      }
    }
    if (!this.moving) {
      if (keyPressed('up')) {
        this.moveTo(this.x, this.y - 1);
      } else if (keyPressed('down')) {
        this.moveTo(this.x, this.y + 1);
      }
    }
    if (this.sprite.x < this.x * 16) {
      this.sprite.x += 2;
    } else if (this.sprite.x > this.x * 16) {
      this.sprite.x -= 2;
    }
    if (this.sprite.y < this.y * 16) {
      this.sprite.y += 2;
    } else if (this.sprite.y > this.y * 16) {
      this.sprite.y -= 2;
    }
    if (this.sprite.x === this.x * 16 & this.sprite.y === this.y * 16) {
      this.moving = false;
    }
    this.sprite.update();
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
    if (this.map.tileAtLayer('layer', {col: x, row: y}) !== 35) {
      this.moving = true;
      this.x = x;
      this.y = y;
    }
  }
}
