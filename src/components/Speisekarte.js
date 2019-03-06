import React, { Component } from 'react';
import Page from './Page';

class Speisekarte extends Component {

  render() {
    console.log(this.props.data)
    return (
      <div>
          {
              this.props.data.pages.map(page => {
                  return(
                      <Page key={page} pageData={this.props.data.pageInfos[page]}/>
                  )
              })
          }
      </div>
    )
  }
}

export default Speisekarte;
