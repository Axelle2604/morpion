import React, { Component } from 'react';
import Box from './Box.js';
import './morpion.css';

const defaultMorpionState = {
  endGame: false,
  draw: false,
  restartGame: false,
  player: 'Joueur Rouge',
  txtPlayer: ' txtPlayerRed',
  playerIsPlaying: true,
  color: 'red',
  tabResult: [null, null, null, null, null, null, null, null, null],
  index: 1,
  winner: '',
};

class Morpion extends Component {
  constructor() {
    super();

    this.state = defaultMorpionState;
  }

  restartGame() {
    console.log('restart');
    this.setState({ restartGame: true }, this.setState(defaultMorpionState));
  }

  checkWinner(nbBox) {
    const isFilled = this.state.tabResult.filter(cell => cell === null);

    if (isFilled.length === 0) {
      this.setState(
        {
          draw: true,
          endGame: true,
        },
        () => this.checkIfEndGame()
      );
    }

    const victoryConditions = [[0, 1, 2], [1, 4, 7], [0, 4, 8], [2, 4, 6]];

    const filteredVictoryConditions = victoryConditions.filter(
      someVictoryConditions => someVictoryConditions.includes(nbBox)
    );

    const victoryBlue = filteredVictoryConditions.find(victory =>
      victory.every(victoryIndex => this.state.tabResult[victoryIndex] === 0)
    );

    const victoryRed = filteredVictoryConditions.find(victory =>
      victory.every(victoryIndex => this.state.tabResult[victoryIndex] === 1)
    );

    if (victoryBlue) {
      this.setState({
        winner: 'joueur Bleu',
        endGame: true,
      });
    }

    if (victoryRed) {
      this.setState({
        winner: 'joueur Rouge',
        endGame: true,
      });
      return <div className="txtVictory">Victoire du joueur Rouge</div>;
    }
  }

  // Change user playing and his color
  changePlayer(nbBox, idPlayer) {
    const { playerIsPlaying, tabResult } = this.state;
    if (playerIsPlaying) {
      this.setState(
        {
          player: 'Joueur Bleu',
          txtPlayer: ' txtPlayerBlue',
          playerIsPlaying: false,
          color: 'blue',
          index: 0,
          tabResult: [
            ...tabResult.slice(0, nbBox),
            idPlayer,
            ...tabResult.slice(nbBox + 1),
          ],
        },
        () => this.checkWinner(nbBox)
      );
    } else {
      this.setState(
        {
          player: 'Joueur Rouge',
          txtPlayer: ' txtPlayerRed',
          playerIsPlaying: true,
          color: 'red',
          index: 1,
          tabResult: [
            ...tabResult.slice(0, nbBox),
            idPlayer,
            ...tabResult.slice(nbBox + 1),
          ],
        },
        () => this.checkWinner(nbBox)
      );
    }
  }

  checkIfEndGame() {
    if (this.state.endGame) {
      if (this.state.draw) {
        console.log('égalité');
        return (
          <div>
            <div className="txtDraw">Égalité !</div>
            <button onClick={this.restartGame.bind(this)}>Restart</button>
          </div>
        );
      } else {
        return (
          <div>
            <div className={'txtEndGame' + this.state.txtPlayer}>
              Victoire du {this.state.winner} !
            </div>
            <button onClick={this.restartGame.bind(this)}>Restart</button>
          </div>
        );
      }
    }
  }

  render() {
    const { playerIsPlaying, color, player, index } = this.state;

    return (
      <div className="morpion">
        <div className={'txtPlayer' + this.state.txtPlayer}>{player}</div>
        <div className="containerMorpion">
          <div className="row">
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={0}
              idPlayer={index}
              restart={this.state.restartGame}
            />
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={1}
              idPlayer={index}
              restart={this.state.restartGame}
            />
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={2}
              idPlayer={index}
              restart={this.state.restartGame}
            />
          </div>
          <div className="row">
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={3}
              idPlayer={index}
              restart={this.state.restartGame}
            />
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={4}
              idPlayer={index}
              restart={this.state.restartGame}
            />
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={5}
              idPlayer={index}
              restart={this.state.restartGame}
            />
          </div>
          <div className="row">
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={6}
              idPlayer={index}
              restart={this.state.restartGame}
            />
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={7}
              idPlayer={index}
              restart={this.state.restartGame}
            />
            <Box
              player={playerIsPlaying}
              color={color}
              changePlayer={this.changePlayer.bind(this)}
              box={8}
              idPlayer={index}
              restart={this.state.restartGame}
            />
          </div>
          <div>{this.checkIfEndGame()}</div>
        </div>
      </div>
    );
  }
}

export default Morpion;
