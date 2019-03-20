import React, { Component } from 'react';
import './../../assets/css/Preisliste.css';

class Preisliste extends Component {

  render() {
    return (
        <div className="pricelist">
          <h4>Preisliste</h4>
          <ul>
            {
              this.props.componentData.data.products.map(product => {
                return(
                  <li>{product.name} <span>{product.price}€</span></li>
                )
              })
            }
          </ul>
        </div>
    )
  }
}

export default Preisliste;
