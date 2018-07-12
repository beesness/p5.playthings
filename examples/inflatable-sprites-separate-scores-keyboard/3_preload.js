/** 
  * It's advisable (but not necessary) to load assets in the preload function 
  * otherwise they may appear with a little delay
  */

function preload()
{
  // https://p5js.org/reference/#/p5/loadImage
  // preload all the images
  for (var key in SPRITE.emojis) 
  { 
    let emoji = SPRITE.emojis[key]
    emoji.img = loadImage(emoji.src) 
  }
  
  //initialise the dat.GUI interface
  datGUI = new dat.GUI()
}