import {
  Sprite,
  SpriteSheet,
  initKeys,
  bindKeys,
  keyPressed,
  degToRad,
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
    const spriteSheet = SpriteSheet({
      image: image,
      frameWidth: 16,
      frameHeight: 16,
      animations: {
        idle: {
          frames: 2,
          loop: false,
        },
        walk: {
          frames: [2, 1, 0, 1, 2, 3, 4, 3],
          frameRate: 30,
        },
      },
    });
    // eslint-disable-next-line new-cap
    this.sprite = Sprite({
      x: x * 16 + 8, // starting x,y position of the sprite
      y: y * 16 + 8,
      anchor: {x: 0.5, y: 0.5},
      animations: spriteSheet.animations,
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
        this.sprite.rotation = degToRad(90);
        this.moveTo(this.x - 1, this.y);
      } else if (keyPressed('right')) {
        this.sprite.rotation = degToRad(-90);
        this.moveTo(this.x + 1, this.y);
      }
    }
    if (!this.moving) {
      if (keyPressed('up')) {
        this.sprite.rotation = degToRad(180);
        this.moveTo(this.x, this.y - 1);
      } else if (keyPressed('down')) {
        this.sprite.rotation = degToRad(0);
        this.moveTo(this.x, this.y + 1);
      }
    }
    if (this.sprite.x < this.x * 16 + 8) {
      this.sprite.x += 2;
    } else if (this.sprite.x > this.x * 16 + 8) {
      this.sprite.x -= 2;
    }
    if (this.sprite.y < this.y * 16 + 8) {
      this.sprite.y += 2;
    } else if (this.sprite.y > this.y * 16 + 8) {
      this.sprite.y -= 2;
    }
    if (this.sprite.x === this.x * 16 + 8 &&
        this.sprite.y === this.y * 16 + 8) {
      this.sprite.playAnimation('idle');
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
    const tileID = this.map.tileAtLayer('layer', {col: x, row: y});
    if (tileID !== 3 && tileID !== 4 && tileID !== 7 && tileID !== 8) {
      this.sprite.playAnimation('walk');
      this.moving = true;
      this.x = x;
      this.y = y;
    }
  }
}
