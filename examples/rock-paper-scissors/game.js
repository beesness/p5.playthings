/**
  * We store all the available moves for this game in one "constant" (const)
  * that is, a block of memory that stays constant throughout the game
  */

const AVAILABLE_MOVES = ['rock', 'paper', 'scissors']

/**
  * It's good practice to load assets (images and sounds) in the preload() function
  * This will be executed once, before all other functions
  */

var images = {}
function preload()
{
  // preload all images
  images.rock = loadImage('assets/gem-stone.png')
  images.paper = loadImage('assets/paper.png')
  images.scissors = loadImage('assets/scissors.png')
  images.robot = loadImage('assets/robot-face.png')
}

/**
  * The setup() function is executed once, before the start of the "game loop" (ie the draw() function).
  * It's normally used to initialise all the visual elements of the game (aka sprites)
  */

var robot = {}    // represents the artificial player
var human = {}    // represents the human player
var buttons = {}  // 3 buttons for the human player

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

  // create the 3 buttons (rock, paper and scissors)
  createButton('rock')
  createButton('paper')
  createButton('scissors')

  // reset scores
  resetScores()
}

function createButton(type)
{
  // reject "types" that are not included in AVAILABLE_MOVES
  if (AVAILABLE_MOVES.indexOf(type) < 0) return console.error(type + ' is not an available move')

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

// this is for resizing images
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

// the touchEnded() function is executed every time a human player presses the mouse or touches the screen
function touchEnded()
{
  // console.log('touchEnded')
  // console.log('buttons.rock.mouseIsOver ' + buttons.rock.mouseIsOver)

  if (buttons.rock.mouseIsOver) playMove('rock')
  if (buttons.paper.mouseIsOver) playMove('paper')
  if (buttons.scissors.mouseIsOver) playMove('scissors')

  // prevent this function from firing twice
  // see https://p5js.org/reference/#/p5/touchEnded
  return false
}

/**
  * The draw function is executed every frame
  */

function draw()
{
  // clear the previous frame
  clear()

  // visualise the scores
  showScores()

  // check for collisions between bullets (if there are any bullets)
  if (human.bullet && robot.bullet)
  {
    human.bullet.bounce(robot.bullet, bulletsHit)
  }

  // redraw everything
  drawSprites()
}

function showScores()
{
  textAlign(CENTER, CENTER)
  textSize(53)
  fill('white')

  let x = robot.position.x
  let y = height * 0.1
  text(robot.score, x, y)

  x = buttons.paper.position.x
  y = height * 0.9
  text(human.score, x, y)
}

function getRandomMove()
{
  // https://p5js.org/reference/#/p5/random
  var randomMove = random(AVAILABLE_MOVES)
  return randomMove
}

function playMove(move)
{
  // console.log('play ' + move)
  human.move = move
  robot.move = getRandomMove()

  // TODO keep track of moves for future AI :)

  // OPTION 1: no bullets
  // var winner = getWinner()
  // updateScore(winner)

  // OPTION 2: fire bullets
  // update scores when bullets collide
  fireBullets()
}

/**
  * How do we work out if you're winning, losing or drawing?
  * We need to know:
  * 1) which move you made (human.move)
  * 2) which move the computer made (robot.move)
  * then we can compare those two pieces of information
  */
function getWinner()
{
  // no winner by default, ie it's a tie
  let winner = null

  // console.log('\nyou played ' + human.move)
  // console.log('robot says ' + robot.move)

  if (human.move == robot.move) // if human.move is the same as robot.move
  {
    // console.log("we have a tie")
    // do nothing, leave winner = null
  }
  else // if human and robot played different moves instead...
  {
    if (human.move == 'rock')
    {
      if (robot.move == 'paper') winner = robot
      else winner = human
    }
    else if (human.move == 'paper')
    {
      if (robot.move == 'scissors') winner = robot
      else winner = human
    }
    else if (human.move == 'scissors')
    {
      if (robot.move == 'rock') winner = robot
      else winner = human
    }
  }

  // if (winner) console.log( (winner == human) ? 'you win' : 'robot wins' )
  return winner
}

function updateScore(winner)
{
  if (winner == robot) incrementScore(robot)
  if (winner == human) incrementScore(human)
  // if it's a tie, do nothing...
}

function incrementScore(player)
{
  player.score = player.score + 1 // increment score value by 1
}

function fireBullets()
{
  // TODO freeze buttons

  let chosenButton = buttons[human.move]

  robot.bullet = createSprite(robot.position.x, robot.position.y)
  robot.bullet.addImage(images[robot.move])
  robot.bullet.scale = getScale() / 2
  robot.bullet.setCollider('circle',0,0, robot.bullet.width/2)
  // robot.bullet.debug = true
  robot.bullet.attractionPoint(5, chosenButton.position.x, chosenButton.position.y)
  robot.bullet.life = 200

  human.bullet = createSprite(chosenButton.position.x, chosenButton.position.y)
  human.bullet.addImage(images[human.move])
  human.bullet.scale = getScale() / 2
  human.bullet.setCollider('circle',0,0, human.bullet.width/2)
  // human.bullet.debug = true
  human.bullet.attractionPoint(5, robot.position.x, robot.position.y)
  human.bullet.life = 200

  // in case there is a winner (not a draw)
  // change the winner sprite mass for a nice bouncing effect
  let winner = getWinner()
  if (winner) winner.bullet.mass = 2
}

function bulletsHit()
{
  // console.log('bulletsHit')

  // in case there is a winner (not a draw)
  // update the score
  let winner = getWinner()
  if (winner) updateScore(winner)

  // TODO screenshake
  // TODO unfreeze buttons
}
