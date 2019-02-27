import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import Login from './components/Login.js';
import Speisekarte from './components/Speisekarte.js';
import jssha from 'jssha';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: this.getUrlParameters()[0] !== 'authenticate',
      salt: "df78af8787h4jfmlkksd9s",
      data: {
        swipeTimer: 10,
        pages: ['page1', 'page2'],
        pageInfos: {
          page1: {
            headline: 'page1',
            sidePicture: true,
            components: ['component1', 'component2'],
            componentInfos: {
              component1: {
                componentType: 'priceList',
                data: {
                  size: {
                    height: 20,
                    width: 100
                  },
                  products: [
                    {
                      name: 'burger',
                      price: 10
                    },
                    {
                      name: 'fries',
                      price: 15
                    }]
                }
              },
              component2: {
                componentType: 'image',
                data: {
                  size: {
                    height: 20,
                    width: 100
                  },
                  imgUri: 'exampleBase64'
                }
              }
            }
          },
          page2: {
            headline: 'page2',
            sidePicture: true,
            components: ['component1', 'component2'],
            componentInfos: {
              component1: {
                componentType: 'priceList',
                data: {
                  size: {
                    height: 20,
                    width: 100
                  },
                  products: [
                    {
                      name: 'burger',
                      price: 10
                    },
                    {
                      name: 'fries',
                      price: 15
                    }]
                }
              },
              component2: {
                componentType: 'image',
                data: {
                  size: {
                    height: 20,
                    width: 100
                  },
                  imgUri: 'exampleBase64'
                }
              }
            }
          }
        }
      }

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

  authenticateSocket = (user, password) => {
    this.socket = openSocket('http://localhost:5000/authenticate');
    this.socket.on('connect', function(){
      this.socket.emit('authentication', {username: user, password: password});
      this.socket.on('authenticated', function(data) {
        console.log(data);
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

  onAuth = (e) => {
    e.preventDefault();
    const username =  e.target.username.value;
    const password =  e.target.password.value;
    const jsShaObj =  new jssha('SHA-256', 'TEXT');
    jsShaObj.update(this.state.salt + password);
    this.authenticateSocket(username, jsShaObj.getHash('HEX'));
  }

  render() {
    return (
      <div>
        <h1>APP</h1>
        {this.state.loggedIn ?
          <Speisekarte data={this.state.data}/>
          : <Login onAuth={this.onAuth}/>
        }
      </div>
    );
  }
}

export default App;
