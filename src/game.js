import { 
  init,
  Sprite,
  GameLoop,
  initKeys,
  bindKeys,
  keyPressed
} from '/lib/kontra.min.mjs'

let { canvas } = init();

canvas.width = screen.availWidth;
canvas.height = screen.availHeight;

initKeys();

bindKeys(['left', 'right', 'up', 'down'], (e) => {
  e.preventDefault();
});

let sprite = Sprite({
  x: 100,        // starting x,y position of the sprite
  y: 80,
  color: 'red',  // fill color of the sprite rectangle
  width: 20,     // width and height of the sprite rectangle
  height: 40,
});

let loop = GameLoop({  // create the main game loop
  update: () => { // update the game state
    if (keyPressed('left')) {
      // left arrow pressed
      sprite.x -= 10;
    }
    else if (keyPressed('right')) {
      // right arrow pressed
      sprite.x += 10;
    }

    if (keyPressed('up')) {
      // up arrow pressed
      sprite.y -= 10;
    }
    else if (keyPressed('down')) {
      // down arrow pressed
      sprite.y += 10;
    }
    sprite.update();
  },
  render: () => { // render the game state
    sprite.render();
  }
});

loop.start();    // start the game
