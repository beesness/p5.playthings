/**
  * The setup function runs once, before the start of the game loop.
  * It's generally used to initialise all the visual elements of a game
  * (aka sprites)
  * and initialise sounds too.
  */

function setup()
{
  // https://p5js.org/reference/#/p5/createCanvas
  createCanvas(windowWidth, windowHeight)

  for (let f=0; f<GAME.howManyFaces; f++)
  {
    createFace()
  }

  resetGame()

  // visualise some variables through datGUI
  datGUI.add(game, 'state').listen()
  for (var s=0; s<sprites.length; s++)
  {
    let sprite = sprites[s]
    // console.log(s, sprite.score)
    datGUI.add(sprite, 'score', 0, 100).name('score ' + s).listen()
  }
}

function createFace()
{
  // http://p5play.molleindustria.org/docs/classes/p5.play.html#method-createSprite
  // createSprite ( x, y, width, height )
  let sprite = createSprite(0, 0, SPRITE.size, SPRITE.size)

  // collider
  // see http://p5play.molleindustria.org/docs/classes/Sprite.html#method-setCollider
  // setCollider ( type  offsetX  offsetY  width  height )
  sprite.setCollider('circle', 0, 0, SPRITE.size)
  //sprite.debug = true

  // track mouse position http://p5play.molleindustria.org/docs/classes/Sprite.html#prop-mouseActive
  sprite.mouseActive = true

  // add to the sprites array
  sprites.push(sprite)
}

function resetGame()
{
  swapFaces(SPRITE.states.reset)

  // reset sprites
  sprites.forEach(function(sprite)
  {
    // scale
    sprite.scale = SPRITE.scale

    // score
    sprite.score = 0

    // find non-overlapping coordinates for the new face
    let coords = getFaceCoordinates()
    sprite.position.x = coords.x
    sprite.position.y = coords.y
  })

  // reset game state
  game.state = GAME.states.reset
}
