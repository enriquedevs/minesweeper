import React, { Component } from "react";
const { Select, Button, TextInput } = require('react-materialize');

class GameSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      rows: 5,
      cols: 5,
      bombs: 5,
      time: null,
      enableUser: true,
      showExistingUserOptions: false,
      showGameSettings: false,
      enableGameSettings: true,
      showStartGame: false,
      showGameList: false
    }
  }

  selectUser() {
    this.setState({enableUser: false, showExistingUserOptions: false, showGameSettings: true, showStartGame: true});
  }

  startGame() {
    let {rows, cols, bombs} = this.state
    this.setState({enableGameSettings: false, showStartGame: false});
    this.props.startGame(rows, cols, bombs);
  }

  fetchExistingGames() {
    // TODO
  }

  loadExistingGame() {
    // TODO
  }

  saveGame() {
    // TODO
  }

  render() {
    const optionValues = [5,6,7,8,9,10,11,12,13,14,15];
    let { enableUser, showExistingUserOptions, showGameSettings, enableGameSettings, showGameList, showStartGame, user } = this.state
    return (
      <div>
        <TextInput 
          label="Username"
          value={this.state.user}
          disabled={!enableUser}
          onChange={(event) => this.setState({user: event.target.value})}
        />
        {enableUser && 
          <Button onClick={this.selectUser.bind(this)} disabled={user === null || user.length < 1}>Select User</Button>
        }
        {showExistingUserOptions &&
          <div>
            <Button>Start new Game</Button>
            <br/><br/>
            <Button>Load/View Existing Game</Button>
          </div>
        }
        {showGameSettings &&
          <div className="row">
            <Select
              multiple={false}
              label="Number of Rows"
              value={this.state.rows}
              disabled={!enableGameSettings}
              onChange={(event) => this.setState({rows: event.target.value})}
            >
              {optionValues.map(v =>
                <option value={v}>{v}</option>
              )}
            </Select>
            <Select
              multiple={false}
              label="Number of Columns"
              value={this.state.cols}
              disabled={!enableGameSettings}
              onChange={(event) => this.setState({cols: event.target.value})}
            >
              {optionValues.map(v =>
                <option value={v}>{v}</option>
              )}
            </Select>
            <Select
              multiple={false}
              label="Number of Bombs"
              value={this.state.bombs}
              disabled={!enableGameSettings}
              onChange={(event) => this.setState({bombs: event.target.value})}
            >
              {optionValues.map(v =>
                <option value={v}>{v}</option>
              )}
            </Select>
          </div>
        }
        {showStartGame && <Button onClick={this.startGame.bind(this)}>Start Game</Button> }
        {showGameList &&
          <div>
            Existing games: To Do
          </div>
        }
        {!enableGameSettings &&
          <div className="row">
            <p>Time elapsed: 00:00:00</p>
            <Button>Save and Return to new Settings</Button>
          </div>
        }
      </div>
    );
  }
}

export default GameSettings;