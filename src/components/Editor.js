import React, { Component } from 'react';
import defaultComponents from './componentDefaults.json';

class Editor extends Component {
    onDropTrig = (event) => {
        event.preventDefault();
        const droppedElementArr = event.dataTransfer.getData("text/html").split('::');
        if(droppedElementArr[0] === 'existing') {
            this.props.genFunctions.deleteComponent(droppedElementArr[2], droppedElementArr[1]);
        }
    }

    dragStart = (event) => {
        event.dataTransfer.setData('Text/html', event.target.id);
    }

    preventDefault = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="editor" onDrop={this.onDropTrig} onDragOver={this.preventDefault}>
                {
                    Object.keys(defaultComponents).map((component) => {
                        return(
                            <div id={"creating::"+component} className="editor-component" onDragStart={this.dragStart} draggable={true}>
                                <p>{component}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Editor;