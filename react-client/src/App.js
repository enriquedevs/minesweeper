import React, { Component } from "react";
import Map from "./components/Map";
import GameSettings from "./components/GameSettings"
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
    this.state = {
      cellsClicked: 1,
      mapObject: {
        rows: 5,
        cols: 5,
        bombs: 5,
        board: valsAdjacentCounts(
          populateNestedArray(nestedArray(5, 5), "☀", 5),
          "☀"
        ),
        cellsState: defaultCellsState(5, 5),
        visible: false
      },
      gameSettings: {
        user: null,
        time: 0,
        gameSelected: 0
      }
    };
  }

  incCellsClicked(row, col, flag) {
    let { rows, cols, bombs } = this.state.mapObject;
    let { cellsClicked } = this.state;
    let safeCells = rows * cols - bombs;
    this.setState({ cellsClicked: cellsClicked + 1 });
    this.updateCellState(row, col, true, flag);
    if (cellsClicked >= safeCells) alert("☀☀☀ You have won! ☀☀☀");
  }

  updateCellState(row, col, clicked, flag) {
    let { cellsState } = this.state.mapObject;
    cellsState[`${row}_${col}`] = { clicked, flag };
    this.setState({ mapObject: { ...this.state.mapObject, cellsState: cellsState}});
  }

  startGame(rows, cols, bombs) {
    let mapObject = {
      rows,
      cols,
      bombs,
      board: valsAdjacentCounts(populateNestedArray(nestedArray(rows, cols), "☀", bombs),"☀"),
      cellsState: defaultCellsState(rows, cols),
      visible: true
    }
    this.setState({mapObject});
    this.setState({cellsClicked: 1});
  }

  render() {
    let {mapObject} = this.state
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
            gameSettings={this.state.gameSettings}
          />
          <br />
          {mapObject.visible &&
            <Map
              className="center"
              mapObject={this.state.mapObject}
              incCellsClicked={this.incCellsClicked.bind(this)}
              updateCellState={this.updateCellState.bind(this)}
            />
          }
          <br />
        </div>
      </div>
    );
  }
}

export default App;