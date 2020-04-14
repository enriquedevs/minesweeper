import React, { Component } from "react";
import Map from "./components/Map";
import Cell from "./components/Cell";
import GameSettings from "./components/GameSettings"
import Service from "./service";
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js'
import "./App.css";
import {
  nestedArray,
  populateNestedArray,
  valsAdjacentCounts,
  defaultCellsState
} from "./helpers";

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.defaultState();
  }

  defaultState() {
    return {
      cellsClicked: 1,
      endGame: 0,
      victory: 0,
      minutes: 0,
      seconds: 0,
      millis: 0,
      mapObject: {
        gameId: null,
        rows: 5,
        cols: 5,
        bombs: 5,
        board: valsAdjacentCounts(populateNestedArray(nestedArray(5, 5), "☀", 5),"☀"),
        cellsState: defaultCellsState(5, 5),
        visible: false
      }
    }
  }

  incCellsClicked(row, col, flag) {
    let { rows, cols, bombs } = this.state.mapObject;
    let { cellsClicked } = this.state;
    let safeCells = rows * cols - bombs;
    this.setState({ cellsClicked: cellsClicked + 1 });
    this.updateCellState(row, col, true, flag);
    if (cellsClicked >= safeCells) {
      alert("☀☀☀ You have won! ☀☀☀");
      this.setState({ endGame: 1, victory: 1 });
    }
  }

  updateCellState(row, col, clicked, flag) {
    let { cellsState } = this.state.mapObject;
    cellsState[`${row}_${col}`] = { clicked, flag };
    this.setState({ mapObject: { ...this.state.mapObject, cellsState: cellsState}});
  }

  notifyEndGame() {
    this.stopTimer();
    this.setState({ endGame: 1 });
  }

  startGame(rows, cols, bombs) {
    let mapObject = {
      gameId: null,
      rows,
      cols,
      bombs,
      board: valsAdjacentCounts(populateNestedArray(nestedArray(rows, cols), "☀", bombs),"☀"),
      cellsState: defaultCellsState(rows, cols),
      visible: true
    }
    this.setState({ mapObject });
    this.setState({ cellsClicked: 1, endGame: 0, victory: 0, minutes: 0, seconds: 0, millis: 0});
    this.startTimer();
    Cell.isEndGame = false;
  }

  async saveGameAndResetSettings(username, existingUser) {
    this.stopTimer();
    const { mapObject, cellsClicked, minutes, seconds, millis, victory, endGame } = this.state;
    const { gameId, rows, cols, bombs, board, cellsState,  } = mapObject;
    await Service.saveGame(username, rows, cols, bombs, JSON.stringify(board), JSON.stringify(cellsState), cellsClicked,
                           minutes, seconds, millis, victory, endGame, gameId, existingUser);
    this.setState(this.defaultState());
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.tick();
    }, 100);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  tick() {
    let millis = this.state.millis + 1;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;

    if (millis === 10) {
      millis = 0;
      seconds = seconds + 1;
    }

    if (seconds === 60) {
      millis = 0;
      seconds = 0;
      minutes = minutes + 1;
    }

    this.setState({ millis: millis, seconds: seconds, minutes: minutes });
  }

  zeroPad(value) {
    return value < 10 ? `0${value}` : value;
  }

  render() {
    let { mapObject, victory, endGame } = this.state
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <span className="brand-logo center">Minesweeper</span>
          </div>
        </nav>
        <div className="container">
          <br />
          <GameSettings 
            className="center"
            startGame={this.startGame.bind(this)}
            saveGameAndResetSettings={this.saveGameAndResetSettings.bind(this)}
          />
          <br />
          {mapObject.visible &&
            <p className="timer">TIME ELAPSED: {this.zeroPad(this.state.minutes)}:{this.zeroPad(this.state.seconds)}.0{this.state.millis}</p>
          }
          <br />
          {mapObject.visible && endGame === 1 && victory === 0 &&
            <p className="lost">YOU LOSE THIS GAME.</p>
          }
          {mapObject.visible && endGame === 1 && victory === 1 &&
            <p className="won">YOU WON THIS GAME!!!</p>
          }
          <br />
          {mapObject.visible &&
            <Map
              className="center"
              mapObject={this.state.mapObject}
              incCellsClicked={this.incCellsClicked.bind(this)}
              updateCellState={this.updateCellState.bind(this)}
              notifyEndGame={this.notifyEndGame.bind(this)}
            />
          }
          <br />
        </div>
      </div>
    );
  }
}

export default App;