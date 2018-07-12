/**
  * In this file we'll store reusable blocks of code, aka functions
  */

// resize the p5.js canvas when the browser window changes size
function windowResized()
{
  console.log('Resizing canvas to ' +  windowWidth + 'x' + windowHeight)
  resizeCanvas(windowWidth, windowHeight)
}

// find non-overlapping coordinates for new sprites
function getFaceCoordinates()
{
  function getRandomCoords()
  {
    let x = random(SPRITE.size/2, width - SPRITE.size/2),
        y = random(SPRITE.size/2, height - SPRITE.size/2)

    return {x:x, y:y}
  }

  let coords = getRandomCoords(),
      overlaps = true,
      minDistance = SPRITE.size

  while (overlaps)
  {
    overlaps = false
    sprites.forEach(function(sprite)
    {
      var distance = getDistance(sprite.position.x, sprite.position.y, coords.x, coords.y)
      if (distance < minDistance) overlaps = true
    })
    if (overlaps) coords = getRandomCoords()
  }

  return coords
}

function swapFaces(state)
{
  sprites.forEach(function(sprite)
  {
    swapFace(sprite, state)
  })
}

function swapFace(sprite, state)
{
  if (!SPRITE.emojis[state])
  {
    return console.error('there is no emoji for ' + state)
  }

  let img = SPRITE.emojis[state].img
  //  http://p5play.molleindustria.org/docs/classes/Sprite.html#method-addImage
  sprite.addImage(img)
}

// Pythagoras from https://stackoverflow.com/a/20916980
function getDistance(x1, y1, x2, y2)
{
  var a = x1 - x2
  var b = y1 - y2
  return Math.sqrt(a*a + b*b)
}
