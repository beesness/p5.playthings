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
