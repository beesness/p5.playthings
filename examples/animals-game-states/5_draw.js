/** 
  * The draw function runs in a loop
  * as fast as your computer can make it run
  * or as fast/slow as you tell it to be by setting the frameRate variable. 
  */

function draw() 
{
  // clear the previous frame
  clear()
  
  // press P to start playing, O to trigger game over, R to restart
  switch(game.state)
  {
    case "reset":
      drawReset()
      break
    case "playing":
      drawPlaying()
      break
    case "over":
      drawOver()
      break
  }

  // redraw everything
  drawSprites()
}

function drawReset()
{
  // paint the screen dark blue
  // https://p5js.org/reference/#/p5/background
  background(23,23,53)
  
  // show a clue of what to press
  clue(imgPlaying)
  
  // your game logic will be more sophisticated
  // in this examples we're just listening for a key press  
  if (keyWentDown("p"))
  {
    // change game state to "playing"
    game.state = "playing"
  }
}

function drawPlaying()
{
  // paint the screen yellow
  // https://p5js.org/reference/#/p5/background
  background(253, 223, 0)
  
  // show a clue of what to press
  clue(imgOver)

  // your game logic will be more sophisticated
  // in this examples we're just listening for a key press    
  if (keyWentDown("o"))
  {
    // change game state to "over"
    game.state = "over"
  }
}

function drawOver()
{
  // paint the screen red
  // https://p5js.org/reference/#/p5/background
  background(223, 0, 53)
  
  // show a clue of what to press
  clue(imgReset)

  // your game logic will be more sophisticated
  // in this examples we're just listening for a key press   
  if (keyWentDown("r"))
  {
      // change game state to "reset"
      game.state = "reset"
  }
}