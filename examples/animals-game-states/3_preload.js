/** 
  * It's advisable (but not necessary) to load assets in the preload function 
  * otherwise they may appear with a little delay
  */

function preload()
{ 
  //initialise the dat.GUI interface
  datGUI = new dat.GUI()
  
  // https://p5js.org/reference/#/p5/loadImage
  // preload all the images
  imgReset = loadImage('assets/r.png') 
  imgPlaying = loadImage('assets/p.png')
  imgOver = loadImage('assets/o.png')
}