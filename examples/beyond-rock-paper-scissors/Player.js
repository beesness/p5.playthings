class Player
{
  constructor(data, gameElementsNames)
  {
    // type is ...
    if (!data.type) throw 'you need to set the type of player, to either "robot" or "human"'
    this._type = data.type

    // ... either robot
    if (data.type == 'robot')
    {
      this.sprite(data.x, data.y, data.image, data.scale)
    }
    else if (data.type == 'human')
    {
      this._y = data.y
      this._scale = data.scale

      // create the buttons for each move the player can make
      this._buttons = {}
      for (var e=0; e<gameElementsNames.length; e++)
      {
        let gameElementName = gameElementsNames[e]
        this.addButton(gameElementName, gameElementsNames.length)
      }
    }

    // name
    if (!data.name) throw 'player data needs a name'
    this._name = data.name

    // track moves
    this._moves = []

    // score
    if (!data.scoreX) throw 'player data needs a scoreX value'
    this._scoreX = data.scoreX
    if (!data.scoreY) throw 'player data needs a scoreY value'
    this._scoreY = data.scoreY
    // initialise score at 0 points
    this.score = 0
  }

  get type()
  {
    return this._type
    // either "human" or "robot"
  }

  get name()
  {
    return this._name
  }

  set currentMove(move)
  {
    // this._currentMove = move
    this._moves.push(move)
  }

  get currentMove()
  {
    return this._moves[this._moves.length - 1]
  }

  set score(n)
  {
    this._score = n
  }

  get score()
  {
    return this._score
  }

  incrementScore()
  {
    this.score = this.score + 1 // increment score value by 1
  }

  showScore()
  {
    text(this._score, this._scoreX, this._scoreY)
  }

  sprite(x, y, image, scale)
  {
    this._x = x
    this._y = y
    this._image = image
    this._scale = scale

    this._sprite = createSprite(this._x, this._y)
    this._sprite.addImage(this._image)
    this._sprite.scale = this._scale
  }

  // buttons
  addButton(type, maxButtons)
  {
    let x = this.getButtonX(maxButtons)
    let y = this._y
    // http://p5play.molleindustria.org/docs/classes/p5.play.html#method-createSprite
    let button = createSprite(x, y)
    button.addImage(images[type])
    button.type = type
    // button.debug = true
    button.scale = this._scale
    button.mouseActive = true // track mouse/touch interactions on this button

    // add the button to the bucket of buttons this player controls
    this._buttons[type] = button
  }

  // work out where the next button will be positioned, horizontally
  getButtonX(maxButtons)
  {
    let xFactor = 1 / (maxButtons + 1)
    let x = width * (xFactor + xFactor * this.buttonsCount)
    return x
  }

  get buttonsCount()
  {
    if (!this._buttons) return 0
    return Object.keys(this._buttons).length
  }

  get buttons()
  {
    return this._buttons
  }

  getButton(type)
  {
    return this._buttons[type]
  }

  get buttonTypes()
  {
    return Object.keys(this._buttons)
  }

  get buttonsAsArray()
  {
    let buttonsArray = []
    for (var b=0; b<this.buttonsCount; b++)
    {
      let button = this.getButton(this.buttonTypes[b])
      buttonsArray.push(button)
    }
    return buttonsArray
  }

  // bullets
  fireBullet(targetPosition)
  {
    let x = (this._sprite) ? this._sprite.position.x : this.getButton(this.currentMove).position.x
    let y = (this._sprite) ? this._sprite.position.y : this.getButton(this.currentMove).position.y

    this._bullet = createSprite(x, y)
    this._bullet.addImage(images[this.currentMove])
    this._bullet.scale = this._scale / 2
    this._bullet.setCollider('circle', 0, 0, this._bullet.width * 0.75)
    this._bullet.debug = true
    this._bullet.name = this._name
    this._bullet.attractionPoint(4, targetPosition.x, targetPosition.y)
    this._bullet.life = 200
  }

  get bullet()
  {
    return this._bullet
  }

  get hasActiveBullet()
  {
    let bullet = this.bullet
    if (!bullet) return false
    if (bullet.removed) return false
    return true
  }
}
