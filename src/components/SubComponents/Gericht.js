import React, { Component } from 'react';
import './../../assets/css/Gericht.css';

class Gericht extends Component {

  render() {

    return (
      <div className="gericht">
        <p>{this.props.componentData.data.name} {this.props.componentData.data.price}€</p>
        <img src={this.props.componentData.data.imgUri} height="100" width="150"></img>
      </div>

    )
  }
}

export default Gericht;
