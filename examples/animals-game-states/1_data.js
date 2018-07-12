/** 
  * Any data that you need to access/manipulate throughout the program 
  * must be declared outside of a function
  */

/**
  * Anything that changes while the program runs is "variable"
  * aka var
  */  

/**
  * GAME STATE 
  * Let's assume we have three game states
  * 1. "reset" before we start playing
  * 2. "playing" when playing
  * 3. "over" when play is over
  */
var game = {}
game.state = "reset" // the initial state

// see https://workshop.chromeexperiments.com/examples/gui/
var datGUI = null

// to visualise the different states, each game state will have a colour and an image 
var imgReset, imgPlaying, imgOver

