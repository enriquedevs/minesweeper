import React, { Component } from "react";
import Map from "./components/Map";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <a class="brand-logo center">Minesweeper</a>
          </div>
        </nav>
        <div className="container">
          <br />
          <Map className="center"/>
          <br />
        </div>
      </div>
    );
  }
}

export default App;