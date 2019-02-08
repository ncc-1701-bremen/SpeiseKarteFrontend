import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSockt from 'socket.io-client';

class App extends Component {

  componentDidMount() {
    this.socket = openSockt('http://localhost:5000');
    this.socket.on('test', val => console.log(val));
    this.socket.emit('backtest');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
