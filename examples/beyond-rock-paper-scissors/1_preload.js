/**
  * Let's create a new Game instance and set its rules
  * the Game code is in game.js
  */

var game = new Game()

// classic rock-paper-scissors
game.addElement('rock',     ['scissors'],   'assets/gem-stone.png')
game.addElement('paper',    ['rock'],       'assets/paper.png')
game.addElement('scissors', ['paper'],      'assets/scissors.png')


/**
  * It's good practice to load assets (images and sounds) in the preload() function
  * This will be executed once, before all other functions
  */

var images = {}
function preload()
{
  // preload all images
  images.robot = loadImage('assets/robot-face.png')
  game.doThisForEachElement(function(element)
  {
    images[element.name] = loadImage(element.image)
  })
}
