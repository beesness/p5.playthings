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

  resetGame()

  // visualise some the game state through datGUI
  datGUI.add(game, 'state').listen()
}

function resetGame()
{
  // reset game state
  game.state = "reset"
}
