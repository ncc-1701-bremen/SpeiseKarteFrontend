import React, { Component } from 'react';
import Preisliste from './Preisliste';
import Gericht from './Gericht';

class Menue extends Component {

  render() {

    return (
      <div>
        <h3>Menue</h3>
        <Preisliste/>
        <Gericht/>
      </div>
    )
  }
}

export default Menue;
