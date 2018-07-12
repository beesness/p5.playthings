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
  * The setup() function runs once, before the start of the game loop (ie the draw() function).
  * It's generally used to initialise all the visual elements of the game
  */

var robot = {}            // represents the artificial player
var human = {}            // represents the human player
var rock, paper, scissors // 3 buttons for the human player

function setup()
{
  // https://p5js.org/reference/#/p5/createCanvas
  createCanvas(windowWidth, windowHeight)

  // http://p5play.molleindustria.org/docs/classes/p5.play.html#method-createSprite
  // createSprite(x, y)
  rock = createSprite(width*0.25, height*0.8)
  //  http://p5play.molleindustria.org/docs/classes/Sprite.html#method-addImage
  rock.addImage(images.rock)
  rock.scale = 0.5 // half the size
  rock.onMousePressed = playRock

  paper = createSprite(width*0.5, height*0.8)
  paper.addImage(images.paper)
  paper.scale = 0.5
  paper.onMousePressed = playPaper

  scissors = createSprite(width*0.75, height*0.8)
  scissors.addImage(images.scissors)
  scissors.scale = 0.5
  scissors.onMousePressed = playScissors

  robot = createSprite(width*0.5, height*0.2)
  robot.addImage(images.robot)
  robot.scale = 0.5
  // robot.velocity.y = 0.2 // slowly falling

  // reset scores
  robot.score = 0
  human.score = 0
}

/**
  * The draw function is executed every frame
  */

function draw()
{
  // clear the previous frame
  clear()

  // update the scores
  textSize(53)
  fill('white')
  text(robot.score, 20, robot.position.y)
  text(human.score, 20, rock.position.y)

  // check for collisions between bullets (if there are any bullets)
  if (human.bullet && robot.bullet)
  {
    human.bullet.bounce(robot.bullet, bulletsHit)
  }

  // redraw everything
  drawSprites()
}

/**
  * How do we work out if you're winning, losing or drawing?
  * We need to know:
  * 1) which move you made
  * 2) which move the computer made
  * We'll store these 2 pieces of information in 2 variables
  */

var potentialMoves = ['rock', 'paper', 'scissors']

function playRock()
{
  playMove('rock')
}

function playPaper()
{
  playMove('paper')
}

function playScissors()
{
  playMove('scissors')
}

function getRandomMove()
{
  // https://p5js.org/reference/#/p5/random
  var randomMove = random(potentialMoves)
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
  // updateScores(winner)

  // OPTION 2: fire bullets
  // update scores when bullets collide
  fireBullets()
}

function getWinner()
{
  // no winner by default, ie it's a tie
  var winner = null

  console.log('\nyou played ' + human.move)
  console.log('robot says ' + robot.move)

  if (human.move == robot.move) // if human.move is the same as robot.move
  {
    console.log("we have a tie")
  }
  else
  {
    if (human.move == 'rock')
    {
      if (robot.move == 'paper')
      {
        console.log("robot wins")
        winner = robot
      }
      else
      {
        console.log("you win")
        winner = human
      }
    }
    else if (human.move == 'paper')
    {
      if (robot.move == 'scissors')
      {
        console.log("robot wins")
        winner = robot
      }
      else
      {
        console.log("you win")
        winner = human
      }
    }
    else if (human.move == 'scissors')
    {
      if (robot.move == 'rock')
      {
        console.log("robot wins")
        winner = robot
      }
      else
      {
        console.log("you win")
        winner = human
      }
    }
  }

  return winner
}

function updateScores(winner)
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

  var chosenButton = this[human.move]

  robot.bullet = createSprite(robot.position.x, robot.position.y)
  robot.bullet.addImage(images[robot.move])
  robot.bullet.scale = 0.2
  robot.bullet.setCollider('circle',0,0, robot.bullet.width/2)
  // robot.bullet.debug = true
  robot.bullet.attractionPoint(5, chosenButton.position.x, chosenButton.position.y)
  robot.bullet.life = 200

  human.bullet = createSprite(chosenButton.position.x, chosenButton.position.y)
  human.bullet.addImage(images[human.move])
  human.bullet.scale = 0.2
  human.bullet.setCollider('circle',0,0, human.bullet.width/2)
  // human.bullet.debug = true
  human.bullet.attractionPoint(5, robot.position.x, robot.position.y)
  human.bullet.life = 200

  // change the winner sprite mass for bouncing effects
  var winner = getWinner()
  if (winner) winner.bullet.mass = 2
}

function bulletsHit()
{
  console.log('bulletsHit')

  var winner = getWinner()
  updateScores(winner)

  // remove bullets
  // human.bullet.remove()
  // robot.bullet.remove()

  // TODO screenshake

  // TODO unfreeze buttons
}
