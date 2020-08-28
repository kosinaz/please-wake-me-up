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
   * @memberof Player
   */
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    // eslint-disable-next-line new-cap
    this.sprite = Sprite({
      x: x * 16, // starting x,y position of the sprite
      y: y * 16,
      image: image,
    });
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
        this.x -= 1;
        this.moving = true;
      } else if (keyPressed('right')) {
        this.x += 1;
        this.moving = true;
      }
    }
    if (!this.moving) {
      if (keyPressed('up')) {
        this.y -= 1;
        this.moving = true;
      } else if (keyPressed('down')) {
        this.y += 1;
        this.moving = true;
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
}
