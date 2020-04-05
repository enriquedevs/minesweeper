import React, { Component } from "react";
import Map from "./components/map";
import "./App.css";

class App extends Component {
  render() {
    const widthStyle = {
      width: "800px"
    };
    return (
      <div style={widthStyle}>
        <div className="App">
          <br />
          <Map className="map" />
        </div>
      </div>
    );
  }
}

export default App;