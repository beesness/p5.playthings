/**
  * The touchEnded() function is executed every time a human player presses the mouse or touches the screen
  */
function touchEnded()
{
  // console.log('touchEnded')
  // let's see if any buttons have been pressed
  let players = game.players
  for (var p=0; p<players.length; p++)
  {
    let player = players[p]
    let buttons = player.buttonsAsArray
    for (var b=0; b<buttons.length; b++)
    {
      let button = buttons[b]
      // console.log(player.name + ' ' + button.type + ' pressed? ' + button.mouseIsOver)
      if (button.mouseIsOver)
      {
        player.currentMove = button.type
        playMoves()
      }
    }
  }

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
  let players = game.players
  for (var p=0; p<players.length; p++)
  {
    let player = players[p]
    if (player.hasActiveBullet)
    {
      let target = game.getTarget(p)
      if (target.hasActiveBullet)
      {
        player.bullet.bounce(target.bullet, bulletsHit)
      }
    }
  }

  // redraw everything
  drawSprites()
}

function showScores()
{
  textAlign(CENTER, CENTER)
  textSize(53)
  fill('white')

  let players = game.players
  for (var p=0; p<players.length; p++)
  {
    let player = players[p]
    player.showScore()
  }
}

// trigger all players to reveal their moves (and compute a winner)
function playMoves()
{
  let players = game.players
  for (var p=0; p<players.length; p++)
  {
    let player = players[p]
    if (player.type == 'robot') player.currentMove = game.randomElementName
  }
  // fire bullets
  // will update scores when bullets collide
  fireBullets()
}

function fireBullets()
{
  let players = game.players
  let winners = game.getWinners()
  for (var p=0; p<players.length; p++)
  {
    let player = players[p]
    let targetPosition = game.getTargetPosition(p)
    player.fireBullet(targetPosition)

    // in case the player is a winner (not a draw)
    // change the winner bullet mass for a nice bouncing effect
    if (winners[player.name]) player.bullet.mass = 2
  }
}

function bulletsHit(spriteA, spriteB)
{
  console.log('bulletsHit ', spriteA.name, spriteB.name)
  // update the scores
  game.updateScores()
}
