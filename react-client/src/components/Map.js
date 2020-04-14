import React, { Component } from "react";
import Cell from "./Cell";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div className="board">
        <table>
          <tbody>
            {this.state.mapObject.board.map((item, row) => {
              return (
                <tr key={row} className="mapRow">
                  {item.map((subitem, col) => {
                    const cellState = this.state.mapObject.cellsState[`${row}_${col}`];
                    return (
                      <Cell
                        key={col}
                        row={row}
                        column={col}
                        value={subitem}
                        cellState={cellState}
                        incCellsClicked={this.props.incCellsClicked.bind(this)}
                        updateCellState={this.props.updateCellState.bind(this)}
                        notifyEndGame={this.props.notifyEndGame.bind(this)}
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
