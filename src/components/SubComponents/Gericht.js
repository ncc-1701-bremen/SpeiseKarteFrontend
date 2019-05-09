import React, { Component } from 'react';
import './../../assets/css/Gericht.css';

class Gericht extends Component {

  render() {

    console.log(this.props)
    return (
      <div className="gericht">
        <h4>Gericht</h4>
        <ul>
          {this.props.componentData.data.name} {this.props.componentData.data.price}€
          <img src={this.props.componentData.data.imgUri} height="100" width="150"></img>
        </ul>
      </div>
      
    )
  }
}

export default Gericht;