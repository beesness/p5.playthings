/** 
  * In this file we'll store reusable blocks of code, aka functions
  */

// resize the p5.js canvas when the browser window changes size
function windowResized() 
{
//  console.log('Resizing canvas to ' +  windowWidth + 'x' + windowHeight)
  resizeCanvas(windowWidth, windowHeight)
}

// add an image in the centre of the screen
function clue(img)
{
  let x = (width-img.width)/2,
      y = (height-img.height)/2
  image(img, x, y)
}