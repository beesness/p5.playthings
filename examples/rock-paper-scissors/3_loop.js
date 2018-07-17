/**
  * The touchEnded() function is executed every time a human player presses the mouse or touches the screen
  */
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
  * The draw() function is executed every frame
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
}
