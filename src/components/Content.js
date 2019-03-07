import React, { Component } from 'react';
import ComponentLibrary from './ComponentLibrary';

class Content extends Component {

  render() {

    return (
      <div className="content" style={this.props.editingMode ? {width: '65vw'} : {}}>
          {
              this.props.components.map(component => {
                const componentData = this.props.componentData[component];
                const CurrentComponent = ComponentLibrary[componentData.componentType];
                const { editingMode } = this.props;

                return (
                    <div className={"component" + (editingMode ? " edit" : "")}
                         style={{width: componentData.data.size.width + "%", height: componentData.data.size.height + "%"}}
                         draggable={editingMode} key={component}>
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
