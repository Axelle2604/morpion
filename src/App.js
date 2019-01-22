import React, { Component } from 'react';
import Morpion from './components/Morpion.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Morpion</h1>
        <Morpion />
      </div>
    );
  }
}

export default App;
