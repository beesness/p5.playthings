// inspired by https://stackoverflow.com/a/17977389
class Game
{
  constructor()
  {
    this._players = []
    this._elements = {}
  }

  // functions to do with players (either human or robot)
  addPlayer(data)
  {
    let player = new Player(data, this.elementNames)
    this._players.push(player)
  }

  get players()
  {
    return this._players
  }

  // return the target/enemy of a player, based on its index
  getTarget(index)
  {
    let player = this.players[index]
    // target will be either the next player in the players array, or the very first player in the array
    let target = (this.players[index + 1]) ? this.players[index + 1] : this.players[0]
    return target
  }

  // return the p5 position vector for the target
  getTargetPosition(index)
  {
    let target = this.getTarget(index)
    let position = (target._sprite) ? target._sprite.position : target.getButton(target.currentMove).position
    return position
  }

  // return all buttons for all players
  get buttons()
  {
    let buttons = {}
    for (var p=0; p<this.players.length; p++)
    {
      let player = this.players[p]
      buttons[player.name] = player.buttons
    }
    return buttons
  }

  // functions to do with elements (an element would be paper, for instance)
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

  get elementsCount()
  {
    return this.elementNames.length
  }

  get elementNames()
  {
    return Object.keys(this._elements)
  }

  get elementsAsArray()
  {
    let elementsArray = []
    for (var e=0; e<this.elementsCount; e++)
    {
      let element = this.getElement(this.elementNames[e])
      elementsArray.push(element)
    }
    return elementsArray
  }

  get randomElementName()
  {
    let elementNames = this.elementNames,
    randomIndex = Math.floor(Math.random() * elementNames.length)
    return elementNames[randomIndex]
  }

  // functions to do with moves
  getWinnerMove(moveA, moveB)
  {
    let winnerMove = null
    if (moveA !== moveB)
    if (this._elements[moveA].beats[moveB]) winnerMove = moveA
    if (this._elements[moveB].beats[moveA]) winnerMove = moveB
    return winnerMove
  }

  getWinner(playerA, playerB)
  {
    let winnerMove = this.getWinnerMove(playerA.currentMove, playerB.currentMove)
    if (!winnerMove) return null
    return (winnerMove == playerA.currentMove) ? playerA : playerB
  }

  getWinners()
  {
    let players = this.players,
        winners = {}
    for (var p=0; p<players.length; p++)
    {
      let player = players[p]
      let target = game.getTarget(p)
      let winner = this.getWinner(player, target)
      if (winner) winners[winner.name] = true
    }
    return winners
  }

  // functions to do with scores and win conditions

  updateScores()
  {
    let winners = this.getWinners()
    for (var p=0; p<this.players.length; p++)
    {
      let player = this.players[p]
      if (winners[player.name]) player.incrementScore()
    }
  }

  resetScores()
  {
    this._players.forEach(function(player)
    {
      player.score = 0
    })
  }

}
