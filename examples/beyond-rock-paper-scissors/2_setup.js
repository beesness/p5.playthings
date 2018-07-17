/**
  * The setup() function is executed once, before the start of the "game loop" (ie the draw() function).
  * It's normally used to initialise all the visual elements of the game (aka sprites)
  */

var robot = {}    // represents the artificial player
var human = {}    // represents the human player
var buttons = {}  // buttons for the human player
function setup()
{
  // set up the game canvas (in other words, our playground)
  // we'll make it as wide and high as the browser window
  // https://p5js.org/reference/#/p5/createCanvas
  createCanvas(windowWidth, windowHeight)

  // create a sprite for the robot
  let x = width * 0.5 // in the horizontal centre
  let y = height * 0.3 // towards the top of the screen
  // http://p5play.molleindustria.org/docs/classes/p5.play.html#method-createSprite
  robot = createSprite(x, y)
  robot.addImage(images.robot)
  // robot.debug = true
  robot.scale = getScale()

  // create the buttons
  game.doThisForEachElement(function(element)
  {
    createButton(element.name)
  })

  // reset the scores
  resetScores()
}

function createButton(type)
{
  // reject "types" that are not game.availableMoves
  if (game.elementExists(type) == false) return console.error(type + ' is not an available move')

  let x = getButtonX()
  let y = height * 0.7 // almost at the bottom of the screen
  // http://p5play.molleindustria.org/docs/classes/p5.play.html#method-createSprite
  let button = createSprite(x, y)
  button.addImage(images[type])
  // button.debug = true
  button.scale = getScale()
  button.mouseActive = true // track mouse/touch interactions on this button
  buttons[type] = button // add this button to the buttons "bucket"
}

// work out where the next button shoudl be positioned, horizontally
function getButtonX()
{
  let buttonsAlreadyThere = Object.keys(buttons).length
  let xFactor = 0.25
  let x = width * (xFactor + xFactor * buttonsAlreadyThere)
  return x
}

// resize images according to the available space on screen
function getScale()
{
  let scale = (windowWidth > 600) ? 0.5 : 0.3
  return scale
}

function resetScores()
{
  robot.score = 0
  human.score = 0
}
