import React, { Component } from 'react';
import Unity, { UnityContent } from "react-unity-webgl";

import Panel from './content/Panel.js'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };

    window.unityContent = new UnityContent(
      "UnityBuild/Build/UnityBuild2.json",
      "UnityBuild/Build/UnityLoader.js"
    );

    window.unityContent.on("loaded", () => {
        // WELL DON'T COUNT ON THIS
        this.setState({
          isLoaded: true
        });
    });
  }

  _onMouseMove(e) {

    try {
      let mouseCoords = `${e.pageX} ${e.pageY}`;

      if(window.unityContent && this.state.isLoaded) {
        window.unityContent.send(
          "TextDisplayer",
          "UpdateDoubleMousePosition",
          mouseCoords
        );
      };
    } catch (e) {}
  }

  render() {
    return (
      <div className="App" onMouseMove={this._onMouseMove.bind(this)} >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-container">

          <Panel unityContent={window.unityContent} isLoading={!this.state.isLoaded}/>
          <Unity unityContent={window.unityContent} width="1024px" height="576px"/>

        </div>
      </div>
    );
  }
}

export default App;
