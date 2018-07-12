/**
  * Any data that you need to access/manipulate throughout the program
  * must be declared outside of a function
  *
  * Data which is not meant to change is "constant"
  * aka const
  * conventionally constant names are UPPERCASE
  */

const GAME =
{
  howManyFaces: 3,
  faceScaleIncrement: 0.01,
  scoreIncrement: 1,
  scoreToWin: 100,
  resetTrigger: 32, // space bar
  timeToReset: 2, // in seconds
  states: // list of possible game states
  {
    reset: "the game can (re)start",
    playing: 'the game is being played',
    over: 'the game is over',
  }
}

// initial data about a generic sprite
const SPRITE =
{
  emojis:
  {
    neutral:
    {
      src: 'assets/neutral-face_1f610.png'
    },
    skull:
    {
      src: 'assets/skull_1f480.png'
    },
    drooling:
    {
      src: 'assets/drooling-face_1f924.png'
    }
  },
  states:
  {
    reset: 'neutral',
    playing: 'neutral',
    over: 'skull',
    won: 'drooling',
    lost: 'neutral'
  },
  size: 120, // in pixels
  scale: 0.5 // 0 to "infinite", 1 = 100%
}



/**
  * Anything that changes while the program runs is "variable"
  * aka var
  */

var sprites = []
var game = {}

// see https://workshop.chromeexperiments.com/examples/gui/
var datGUI = null
