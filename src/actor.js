import {
  Sprite,
  SpriteSheet,
  degToRad,
} from '/lib/kontra.min.mjs';
/**
 * Represents an interactive character of the game.
 *
 * @class Actor
 */
export default class Actor {
  /**
   * Creates an instance of Actor.
   *
   * @param {number} x
   * @param {number} y
   * @param {*} image
   * @param {*} map
   * @memberof Actor
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
          frames: 0,
          loop: false,
        },
        walk: {
          frames: [0, 1, 2, 3, 4, 5, 6, 7],
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
  }

  /**
   * Updates the actor position.
   *
   * @memberof Actor
   */
  update() {
    if (!this.moving) {
      if (this.direction === 'left') {
        this.sprite.rotation = degToRad(90);
        this.moveTo(this.x - 1, this.y);
      } else if (this.direction === 'right') {
        this.sprite.rotation = degToRad(-90);
        this.moveTo(this.x + 1, this.y);
      } else if (this.direction === 'up') {
        this.sprite.rotation = degToRad(180);
        this.moveTo(this.x, this.y - 1);
      } else if (this.direction === 'down') {
        this.sprite.rotation = degToRad(0);
        this.moveTo(this.x, this.y + 1);
      }
    }
    if (this.sprite.x < this.x * 16 + 8) {
      this.sprite.x += 2;
    } else if (this.sprite.x > this.x * 16 + 8) {
      this.sprite.x -= 2;
    } else if (this.sprite.y < this.y * 16 + 8) {
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
   * Renders the actor.
   *
   * @memberof Actor
   */
  render() {
    this.sprite.render();
  }

  /**
   * Tries to move the actor to the specified map coordinates.
   *
   * @param {number} x
   * @param {number} y
   * @memberof Actor
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
