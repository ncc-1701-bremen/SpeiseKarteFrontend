import React, { Component } from 'react';
import './../../assets/css/Gericht.css';

class Gericht extends Component {

  render() {

    return (
      <div className="gericht">
        <h4>Gericht</h4>
        <ul>
          {this.props.componentData.data.name} {this.props.componentData.data.price}€
        </ul>
      </div>
      
    )
  }
}

export default Gericht;
