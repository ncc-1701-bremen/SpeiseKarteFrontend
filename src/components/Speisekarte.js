import React, { Component } from 'react';
import Sidepicture from './Sidepicture.js';
import Menue from './Menue.js';

class Speisekarte extends Component {

  render() {
    console.log(this.props.data)
    return (
      <div>
        <h2>Speisekarte</h2>
        <Sidepicture/>
        <Menue/>
      </div>
    )
  }
}

export default Speisekarte;
