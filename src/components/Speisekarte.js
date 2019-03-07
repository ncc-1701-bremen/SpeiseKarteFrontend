import React, { Component } from 'react';
import Page from './Page';
import Editor from './Editor';

class Speisekarte extends Component {

  render() {
    return (
      <div className="karte-wrapper">
          <div>
              {
                  this.props.data.pages.map(page => {
                      return(
                          <Page key={page} pageData={this.props.data.pageInfos[page]} editingMode={this.props.editingMode}/>
                      )
                  })
              }
          </div>
          {this.props.editingMode && <Editor/>}
      </div>
    )
  }
}

export default Speisekarte;
