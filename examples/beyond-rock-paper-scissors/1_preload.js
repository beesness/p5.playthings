/**
  * Let's create a new Game instance and set its rules
  * the Game code is in game.js
  */

var game = new Game()

// classic rock-paper-scissors
game.addElement('rock',     ['scissors'],   'assets/gem-stone.png')
game.addElement('paper',    ['rock'],       'assets/paper.png')
game.addElement('scissors', ['paper'],      'assets/scissors.png')

// https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors#Additional_weapons
// One popular five-weapon expansion is "rock-paper-scissors-Spock-lizard", invented by Sam Kass and Karen Bryla, which adds "Spock" and "lizard" to the standard three choices.
// "Spock" is signified with the Star Trek Vulcan salute, while "lizard" is shown by forming the hand into a sock-puppet-like mouth.
// Spock smashes scissors and vaporizes rock; he is poisoned by lizard and disproven by paper.
// Lizard poisons Spock and eats paper; it is crushed by rock and decapitated by scissors.
// game.addElement('rock',     ['scissors', 'lizard'],   'assets/fist.png')
// game.addElement('paper',    ['rock', 'spock'],        'assets/open-hand.png')
// game.addElement('scissors', ['paper', 'lizard'],      'assets/victory.png')
// game.addElement('lizard',   ['spock', 'paper'],       'assets/ok-hand.png')
// game.addElement('spock',    ['scissors', 'rock'],     'assets/spock.png')

/**
  * It's good practice to load assets (images and sounds) in the preload() function
  * This will be executed once, before all other functions
  */

var images = {}
function preload()
{
  // preload all images
    // robot image
    images.robot = loadImage('assets/robot-face.png')
    // game elements images
    let elements = game.elementsAsArray
    for (var e=0; e<elements.length; e++)
    {
      let element = elements[e]
      images[element.name] = loadImage(element.image)
    }
}
