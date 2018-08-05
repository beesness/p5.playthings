/**
  * The setup() function is executed once, before the start of the "game loop" (ie the draw() function).
  * It's normally used to initialise all the visual elements of the game (aka sprites)
  */

function setup()
{
  // set up the game canvas (in other words, our playground)
  // we'll make it as wide and high as the browser window
  // https://p5js.org/reference/#/p5/createCanvas
  createCanvas(windowWidth, windowHeight)

  // create the robot
  let robotData =
  {
    type: 'robot', // this has to be either 'robot' or 'human'
    name: 'Botsy', // this can be whatever name you fancy
    x: width * 0.5, // in the horizontal centre
    y: height * 0.3, // towards the top of the screen
    image: images.robot,
    scale: getScale(),
    scoreY: height * 0.1, // a bit higher than the robot sprite
    scoreX: width * 0.5 // in the horizontal centre
  }
  game.addPlayer(robotData)

  // create the human player
  let humanData =
  {
    type: 'human', // this has to be either 'robot' or 'human'
    name: '@baddeo', // this can be whatever name you fancy
    scale: getScale(),
    y: height * 0.7, // almost at the bottom of the screen
    scoreY: height * 0.9, // a bit lower than the row of buttonsAlreadyThere
    scoreX: width * 0.5 // in the horizontal centre
  }
  game.addPlayer(humanData)
}

// resize images according to the available space on screen
function getScale()
{
  let scale = (windowWidth > 600) ? 0.5 : 0.3
  return scale
}
