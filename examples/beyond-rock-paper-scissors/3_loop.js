/**
  * The touchEnded() function is executed every time a human player presses the mouse or touches the screen
  */
function touchEnded()
{
  // console.log('touchEnded')
  // console.log('buttons.rock.mouseIsOver ' + buttons.rock.mouseIsOver)

  game.doThisForEachElement(function(element)
  {
    let name = element.name
    if (buttons[name].mouseIsOver) playMove(name)
  })

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

  y = height * 0.9
  text(human.score, x, y)
}

function playMove(move)
{
  // console.log('play ' + move)
  human.move = move
  robot.move = game.randomElementName

  // OPTION 1: no bullets
  // let winner = getWinner()
  // updateScore(winner)

  // OPTION 2: fire bullets
  // update scores when bullets collide
  fireBullets()
}

function getWinner()
{
  let winnerMove = game.getWinnerMove(human.move, robot.move),
      winner = null

  if (winnerMove == human.move) winner = human
  if (winnerMove == robot.move) winner = robot

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
