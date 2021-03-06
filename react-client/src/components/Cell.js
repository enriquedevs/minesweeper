import React, { Component } from "react";
import classNames from "classnames";

class Cell extends Component {

  constructor(props) {
    super(props);
    this.state = props.cellState ? props.cellState : { clicked: false, flag: "" };
  }

  handleClick({ target }) {
    let { row, column, incCellsClicked, value } = this.props;
    let { clicked, flag } = this.state;
    if (Cell.isEndGame) return; // Cell.isEndGame is initialized on App.js when starting the game
    if (!flag) this.setState({ clicked: true });
    if (!clicked && value !== "☀") incCellsClicked(row, column, flag);
    // Empty cell click --> recursion
    if (value === "" && target.id === `${row}_${column}`)
      this.recursionClick(target, row, column);
    // click bomb scenario --> end game
    if (value === "☀" && !flag) {
      Cell.isEndGame = true;
      target.style.backgroundColor = "black";
      this.props.notifyEndGame(row, column, true);
    }
  }

  handleContextMenu(e) {
    e.preventDefault();
    let { row, column, updateCellState } = this.props;
    let { clicked, flag } = this.state;
    if (!clicked) {
      flag = flag ? "" : "⚑";
      updateCellState(row, column, clicked, flag);
      this.setState({ flag })
    }
  }

  recursionClick(target, row, column) {
    target.id = `${row}_${column}_`;
    let rowList = [row - 1, row, row + 1];
    let colList = [column - 1, column, column + 1];
    for (let i of rowList) {
      for (let j of colList) {
        setImmediate(() => {
          if (document.getElementById(`${i}_${j}`))
            document.getElementById(`${i}_${j}`).click();
        });
      }
    }
  }

  render() {
    let { row, column, value } = this.props;
    let { clicked, flag } = this.state;
    let cellsClass = classNames({
      cell: true,
      clicked,
      bomb: value === "☀"
    });
    return (
      <td
        id={`${row}_${column}`}
        className={cellsClass}
        onClick={this.handleClick.bind(this)}
        onContextMenu={this.handleContextMenu.bind(this)}
      >
        {clicked && !flag ? value : ""}
        {flag}
      </td>
    );
  }
}

export default Cell;
