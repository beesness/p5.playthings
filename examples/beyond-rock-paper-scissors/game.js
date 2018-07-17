class GameElement
{
  constructor(name)
  {
    this._name = name
    this._beats = {}
    this._image = null
  }

  get name()
  {
    return this._name
  }

  set image(url)
  {
    this._image = url
  }

  get image()
  {
    return this._image
  }

  set beats(stringOrArray)
  {
    if (stringOrArray.constructor === Array)
    {
      let array = stringOrArray
      for (var e=0; e<array.length; e++)
      {
        let element = array[e]
        this._beats[element] = true
      }
    }
    else
    {
      let element = stringOrArray
      this._beats[element] = true
    }
  }

  get beats()
  {
    return this._beats
  }
}

class Game
{
  constructor()
  {
    this._elements = {}
  }

  addElement(name, beats, image)
  {
    let element = new GameElement(name)
    if (beats) element.beats = beats
    if (image) element.image = image
    this._elements[name] = element
  }

  getElement(name)
  {
    return this._elements[name]
  }

  // return true/false if the element exists or not
  elementExists(name)
  {
    return name in this._elements
  }

  get elementNames()
  {
    return Object.keys(this._elements)
  }

  doThisForEachElement(_function)
  {
    let self = this
    Object.keys(this._elements).forEach(function(elementName)
    {
      _function(self.getElement(elementName))
    })
  }

  getWinnerMove(move1, move2)
  {
    let winner = null
    if (move1 !== move2)
    if (this._elements[move1].beats[move2]) winner = move1
    if (this._elements[move2].beats[move1]) winner = move2
    return winner
  }

  get randomElementName()
  {
    let elementNames = this.elementNames,
        randomIndex = Math.floor(Math.random() * elementNames.length)
    return elementNames[randomIndex]
  }
}
