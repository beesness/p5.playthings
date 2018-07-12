/** 
  * The draw function runs in a loop
  * as fast as your computer can make it run
  * or as fast/slow as you tell it to be by setting the frameRate variable. 
  */

function draw() 
{
  // clear the previous frame
  clear()
  
  // switch game states
  switch(game.state)
  {
    case GAME.states.reset:
      drawReset()
      break
    case GAME.states.playing:
      drawPlaying()
      break
    case GAME.states.over:
      drawOver()
      break
  }

  // redraw everything
  drawSprites()
}

function drawReset()
{
  wobbleSprites()
}

function drawPlaying()
{
  if (spritesOverlap()) gameOver()
}

function drawOver()
{
  wobbleSprites()
}

function keyPressed() 
{
  console.log('keyPressed', key)
  // switch game states
  switch(game.state)
  {
    case GAME.states.reset:
      // the game is ready to start
      game.state = GAME.states.playing
      break

    case GAME.states.playing:
      switch (key)
      {
        case 'W':
          incrementScale(sprites[0])
          incrementScore(sprites[0])
          break
        case 'B':
          incrementScale(sprites[1])
          incrementScore(sprites[1])
          break
        case 'O':
          incrementScale(sprites[2])
          incrementScore(sprites[2])
          break
      }
      break
    
    case GAME.states.over:
      // do nothing
      break
  }
}


function incrementScale(sprite)
{
  sprite.scale += GAME.faceScaleIncrement
}

function incrementScore(sprite)
{
  sprite.score += GAME.scoreIncrement
  if (sprite.score >= GAME.scoreToWin) gameWon(sprite)
}

function spritesOverlap()
{
  let overlap = false
  
  for (let s=0; s<sprites.length; s++)
  {
    let sprite = sprites[s]
    for (let n=s+1; n<sprites.length; n++)
    {
      let nextSprite = sprites[n]
      if (sprite.overlap(nextSprite)) overlap = true
    }
  }  
  return overlap
}

function wobbleSprites()
{
  sprites.forEach(function(sprite)
  {
    sprite.position.x += random(-2, 2)
    sprite.position.y += random(-3, 3)
  })
}

function gameOver()
{
  console.log('game over')
  
  game.state = GAME.states.over
  
  swapFaces(SPRITE.states.over)
  
  // start the timer to let the game restart
  gameResettable()
}

function gameWon(sprite)
{
  console.log('game won')
  
  gameOver()
  
  // swap the winning sprite to the winning emoji
  swapFace(sprite, SPRITE.states.won)
}

function gameResettable()
{
  setTimeout(function()
  { 
    resetGame()
  }, GAME.timeToReset * 1000)
}

