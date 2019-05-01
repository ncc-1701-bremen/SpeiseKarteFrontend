import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
import Login from './components/Login.js';
import Speisekarte from './components/Speisekarte.js';
import jssha from 'jssha';
import componentDefaults from './components/componentDefaults';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: this.getUrlParameters()[0] !== 'authenticate',
      editingMode: this.getUrlParameters()[2] === 'editor',
<<<<<<< HEAD
      salt: "df78af8787h4jfmlkksd9s"
=======
      salt: "df78af8787h4jfmlkksd9s",
      data: {
        swipeTimer: 10,
        pages: ['page1', 'page2'],
        pageInfos: {
          page1: {
            headline: 'page1',
            sidePicture: true,
            components: ['component1', 'component2','component3'],
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
              },
              component3: {
                componentType: 'gericht',
                data: {
                  size: {
                    height: 20,
                    width: 100
                  },
                  name: 'food',
                  price: 55,
                  imgUri: false
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
>>>>>>> with-change-interface
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    this.genFunctions = {
      createComponent: this.createNewComponent,
      deleteComponent: this.deleteOldComponent,
      createPage: this.createNewPage,
      deletePage: this.deleteOldPage
    }
  }

  componentDidMount() {
    const parameters = this.getUrlParameters();
    const namespace = parameters[1] ? parameters[1] : 'default';

    const savedAuthToken = window.localStorage.getItem('authToken');
    const saveData = window.localStorage.getItem('savedData');

    if(saveData) {
      this.setState({
        data: JSON.parse(saveData)
      });
    }

    // TODO: Get rid of multiple JSON parse commands
    if(parameters[0] === 'authenticate' && this.validityCheck(JSON.parse(savedAuthToken))) {
      this.authToken = JSON.parse(savedAuthToken);
      this.setState({
        loggedIn: true
      });
      // TODO: Currently hardcoded username has to be changed to be dynamic
      this.authenticateSocket('default', null, JSON.parse(savedAuthToken));
    }

    if(this.state.loggedIn) {
      if(parameters[0] !== 'public' && parameters[0] !== '') {
        console.warn("Did you want to use authentification? Please use /authenticate");
      }
      this.connectSocket();
    }
  }

  // Get the URL and split them by slashes in order to get the url parameters
  getUrlParameters = () => {
    const rawUrl = window.location.href.split('//');
    const parameterArray = rawUrl[1].split('/');
    parameterArray.shift();
    return parameterArray;
  }

  // Validity check for the authentification authToken
  //  TODO: Create a validity check which works with different timeznes etc.
  validityCheck = (token) => {
    let valid = false;

    if(token) {
      const currentTime = new Date().getTime()/1000;

      if (token.validity && token.validity > currentTime) {
        valid = true;
      }
    }

    return valid
  }

  // Backend Connection functions
  authenticateSocket = (user, password, token = null) => {
    this.socket = openSocket('http://localhost:5000/authenticate');
    this.socket.on('connect', function(){
      this.socket.emit('authentication', {username: user, password: password, token: token});
      this.socket.on('authenticated', (data) => {
        this.setState({
          loggedIn: true
        })
        this.socket.on('newData', (data) => {
          this.setNewData(data);
        })
        // use the socket as usual
      });
      this.socket.on('authToken', (data) => {
        this.authToken = data;
        window.localStorage.setItem('authToken', JSON.stringify(data));
      })
    }.bind(this));
  }

  connectSocket = (user) => {
    this.socket = openSocket('http://localhost:5000');
    this.socket.on('connect', function(){
      this.socket.on('newData', (data) => this.setNewData(data))
    }.bind(this));
  }

  // Login function
  onAuth = (e) => {
    e.preventDefault();
    const username =  e.target.username.value;
    const password =  e.target.password.value;
    const jsShaObj =  new jssha('SHA-256', 'TEXT');
    jsShaObj.update(this.state.salt + password);
    this.authenticateSocket(username, jsShaObj.getHash('HEX'));
  }

  // Send data to the server
  // TODO: hardcoded username should be changed to dynamic
  saveData = () => {
    this.socket.emit('changeData', {
      data: this.state.data, authToken: this.authToken, username: 'default'
    });
  }

  setNewData = (data) => {
    window.localStorage.setItem('savedData', JSON.stringify(data));
    this.setState({
      data: data
    })
  }

  // Functions for creation and deletition of components and pages
  createNewComponent = (componentType, page) => {
    const save = this.state.data;
    const latestComponent = save.pageInfos[page].components[save.pageInfos[page].components.length-1]
    const lastComponentNr = latestComponent ? latestComponent.slice(-1) : 0;
    const newComponentName = "component" + (Number(lastComponentNr) + 1);
    save.pageInfos[page].components.push(newComponentName);
    save.pageInfos[page].componentInfos[newComponentName] = componentDefaults[componentType];
    this.setState({data: save});
  }

  deleteOldComponent = (component, page) => {
    const save = this.state.data;
    const indexOfElem = save.pageInfos[page].components.indexOf(component);
    if (indexOfElem >= 0) {
        save.pageInfos[page].components.splice(indexOfElem, 1);
        delete save.pageInfos[page].componentInfos[component];
        this.setState({data: save});
    }
  }

  createNewPage = () => {
      const save = this.state.data;
      const lastPageNr = save.pages[save.pages.length-1].slice(-1);
      const newPageName = "page" + (Number(lastPageNr) + 1);
      save.pages.push(newPageName);
      // TODO: Change to default Json page infos as default
      save.pageInfos[newPageName] = save.pageInfos.page1;
      this.setState({data: save});
  }

  deleteOldPage = (page) => {
      const save = this.state.data;
      const indexOfElem = save.pages.indexOf(page);
      if (indexOfElem >= 0) {
          save.pages.splice(indexOfElem, 1);
          delete save.pageInfos[page];
          this.setState({data: save});
      }
  }

  setComponentData = (page, component, newData) => {
    const save = this.state.data;
    save.pageInfos[page].componentInfos[component].data = newData;
    this.setState({
      data: save
    })
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ?
          this.state.data &&
          <Speisekarte data={this.state.data}
                       editingMode={this.state.editingMode}
                       genFunctions={this.genFunctions}
                       setComponentData={this.setComponentData}
                       saveData={this.saveData}/>
          : <Login onAuth={this.onAuth}/>
        }
      </div>
    );
  }
}

export default App;
