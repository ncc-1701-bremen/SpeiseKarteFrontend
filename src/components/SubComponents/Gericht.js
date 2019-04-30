import React, { Component } from 'react';

class Gericht extends Component {

  render() {

    return (
      <div>
        <h4>Gericht</h4>
        <ul>
            {
            <li>{gericht.name} <span>{gericht.price}€</span></li>
              
            }
          </ul>
        </div>
    )
  }
}

export default Gericht;
