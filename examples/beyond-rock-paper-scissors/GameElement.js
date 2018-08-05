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
