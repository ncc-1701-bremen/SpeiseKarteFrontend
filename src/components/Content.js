import React, { Component } from 'react';
import ComponentLibrary from './ComponentLibrary';

class Content extends Component {

  render() {

    return (
      <div className="content">
          {
              this.props.components.map(component => {
                const componentData = this.props.componentData[component];
                const CurrentComponent = ComponentLibrary[componentData.componentType];

                return (
                    <div className={"component"} style={{width: componentData.data.size.width + "%", height: componentData.data.size.height + "%"}}>
                        <CurrentComponent key={component} componentData={componentData}/>
                    </div>
                )
              })
          }
      </div>
    )
  }
}

export default Content;
