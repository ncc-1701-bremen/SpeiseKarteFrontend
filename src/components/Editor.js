import React, { Component } from 'react';
import defaultComponents from './componentDefaults.json';

class Editor extends Component {
    // Delete Components on drop
    onDropTrig = (event) => {
        event.preventDefault();
        const droppedElementArr = event.dataTransfer.getData("text/html").split('::');
        if(droppedElementArr[0] === 'existing') {
            this.props.genFunctions.deleteComponent(droppedElementArr[2], droppedElementArr[1]);
        }
        this.props.setComponentDrag(false);
    }

    // Transfer information when an element is dragged
    dragStart = (event) => {
        event.dataTransfer.setData('Text/html', event.target.id);
    }

    // We need to prevent the default behaviour of some drag events
    preventDefault = (event) => {
        event.preventDefault();
    }

    // Iterate over component data and render it
    renderEditingValues = (componentObj, subComponent) => {

    }

    // Select the value from nested object
    selectValue = () => {

    }

    // On change event
    onChange = () => {

    }

    render() {
        return (
            (this.props.selectedComponent ?
                <div className="editor">

                </div>
                :
                <div className="editor" onDrop={this.onDropTrig} onDragOver={this.preventDefault}>
                    {
                        Object.keys(defaultComponents).map((component) => {
                            return(
                                <div key={component} id={"creating::"+component} className="editor-component" onDragStart={this.dragStart} draggable={true}>
                                    <p>{component}</p>
                                </div>
                            )
                        })
                    }
                </div>)
        )
    }
}

export default Editor;
