import React, { Component } from 'react';
import './../../assets/css/Preisliste.css';

class Preisliste extends Component {

  render() {
    return (
        <div>
          <h4>Preisliste</h4>
          <ul className="pricelist">
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
