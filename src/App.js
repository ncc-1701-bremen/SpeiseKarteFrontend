import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import Login from './components/Login.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: this.getUrlParameters()[0] !== 'authenticate',
      salt: "df78af8787h4jfmlkksd9s"
    }
  }

  componentDidMount() {
    const parameters = this.getUrlParameters();
    const namespace = parameters[1] ? parameters[1] : 'default';

    if(this.state.loggedIn) {
      if(parameters[0] !== 'public' && parameters[0] !== '') {
        console.warn("Did you want to use authentification? Please use /authenticate");
      }
      this.connectSocket();
    }
  }

  getUrlParameters = () => {
    const rawUrl = window.location.href.split('//');
    const parameterArray = rawUrl[1].split('/');
    parameterArray.shift();
    return parameterArray;
  }

  authenticateSocket = (password) => {
    this.socket = openSocket('http://localhost:5000/authenticate');
    this.socket.on('connect', function(){
      this.socket.emit('authentication', {username: "John", password: "password"});
      this.socket.on('authenticated', function() {
        // use the socket as usual
      });
      this.socket.on('test', (data) => console.log(data))
    }.bind(this));
  }

  connectSocket = () => {
    this.socket = openSocket('http://localhost:5000');
    this.socket.on('connect', function(){
      this.socket.on('test', (data) => console.log(data))
    }.bind(this));
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ?
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
          </div> : <Login/>}
        </div>
    );
  }
}

export default App;
