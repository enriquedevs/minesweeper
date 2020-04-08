import React, { Component } from "react";
import Cell from "./Cell";
import {
  nestedArray,
  populateNestedArray,
  valsAdjacentCounts,
  defaultCellsState
} from "../helpers";

class Map extends Component {
  constructor(props) {
    super(props);
    let mapSize = 15;
    let bombCount = 10;
    this.state = {
      mapSize,
      bombCount,
      theMap: valsAdjacentCounts(
        populateNestedArray(nestedArray(mapSize, mapSize), "☀", bombCount),
        "☀"
      ),
      cellsClicked: 1,
      cellsState: defaultCellsState(mapSize, mapSize)
    };
  }

  incCellsClicked(row, col, flag) {
    let { mapSize, bombCount, cellsClicked } = this.state;
    let safeCells = mapSize * mapSize - bombCount;
    this.setState({
      cellsClicked: cellsClicked + 1
    });
    this.updateCellState(row, col, true, flag)
    if (cellsClicked >= safeCells) alert("☀☀☀ You have won! ☀☀☀");
  }

  updateCellState(row, col, clicked, flag) {
    let { cellsState } = this.state;
    cellsState[`${row}_${col}`] = { clicked, flag }
    this.setState({ cellsState })
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.theMap.map((item, row) => {
              return (
                <tr key={row} className="mapRow">
                  {item.map((subitem, col) => {
                    const cellState = this.state.cellsState[`${row}_${col}`];
                    return (
                      <Cell
                        key={col}
                        row={row}
                        column={col}
                        value={subitem}
                        cellState={cellState}
                        updateCellState={this.updateCellState.bind(this)}
                        incCellsClicked={this.incCellsClicked.bind(this)}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Map;
