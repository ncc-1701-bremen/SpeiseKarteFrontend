import React, { Component } from 'react';
import ComponentLibrary from './ComponentLibrary';

class Content extends Component {
  dragStart = (event) => {
      event.dataTransfer.setData('Text/html', event.target.id);
  }

   // Create new components when the component type is dropped into the content area
   onDropTrig = (event) => {
      event.preventDefault();
      const droppedElementArr = event.dataTransfer.getData("text/html").split('::');
      if(droppedElementArr[0] === 'creating') {
          this.props.createComponent(droppedElementArr[1], this.props.page);
      }
   }

    preventDefault = (event) => {
      event.preventDefault();
    }

  render() {

    return (
      <div className="content" style={this.props.editingMode ? {width: '65vw'} : {}} onDrop={this.onDropTrig} onDragOver={this.preventDefault}>
          {
              this.props.components.map(component => {
                const componentData = this.props.componentData[component];
                const CurrentComponent = ComponentLibrary[componentData.componentType];
                const { editingMode } = this.props;

                return (
                    <div id={`existing::${this.props.page}::${component}`} className={"component" + (editingMode ? " edit" : "")}
                         style={{width: componentData.data.size.width + "%", height: componentData.data.size.height + "%"}}
                         draggable={editingMode} key={component} onDragStart={this.dragStart}>
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
