import React, { Component } from "react";
import Map from "./components/Map";
import GameSettings from "./components/GameSettings"
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
      mapObject: {
        rows: 5,
        cols: 7,
        bombCount: 12,
        board: valsAdjacentCounts(
          populateNestedArray(nestedArray(5, 7), "☀", 12),
          "☀"
        ),
        cellsClicked: 1,
        cellsState: defaultCellsState(5, 7)
      }
    };
  }

  incCellsClicked(row, col, flag) {
    let { rows, cols, bombCount, cellsClicked } = this.state.mapObject;
    let safeCells = rows * cols - bombCount;
    this.setState({
      cellsClicked: cellsClicked + 1
    });
    this.updateCellState(row, col, true, flag)
    if (cellsClicked >= safeCells) alert("☀☀☀ You have won! ☀☀☀");
  }

  updateCellState(row, col, clicked, flag) {
    let { cellsState } = this.state.mapObject;
    cellsState[`${row}_${col}`] = { clicked, flag }
    this.setState({ cellsState })
  }

  render() {
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <span class="brand-logo center">Minesweeper</span>
          </div>
        </nav>
        <div className="container">
          <br />
          <GameSettings className="center" />
          <br />
          <Map
            className="center"
            mapObject={this.state.mapObject}
            incCellsClicked={this.incCellsClicked.bind(this)}
            updateCellState={this.updateCellState.bind(this)}
            />
          <br />
        </div>
      </div>
    );
  }
}

export default App;