import React, { Component } from 'react';
import defaultComponents from './componentDefaults.json';
import './../assets/css/Editor.css';

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
    renderEditingValues = (componentObj, subComponent, isParentArray = false) => {
        const subComponentArray = subComponent.split('::');
        let title = subComponentArray[subComponentArray.length-1];
        // Capitalize the title
        title = title.charAt(0).toUpperCase() + title.slice(1);

        // Recursive iteration for objects
        if (componentObj !== null && typeof componentObj === 'object') {
            return(
                <div key={title} className="editor-div">
                    {!isParentArray && <h3>{title}</h3>}
                    {
                        Object.keys(componentObj).map(key => {
                            return this.renderEditingValues(componentObj[key], `${subComponent}::${key}`, Array.isArray(componentObj));
                        })
                    }
                </div>
            )
        } else {
            return (
                <label key={title}>
                    {title}: <input type='text' data-statemap={subComponent} value={this.selectValue(subComponent)} onChange={this.onChange}/>
                </label>
            )
        }
    }

    // Select the value from nested object
    selectValue = (objectString) => {
        let dataObject = this.props;
        const mapArray = objectString.split('::');

        if (typeof mapArray !== 'string') {
            for (let key of mapArray) {
                dataObject = dataObject[key];
            }
            return dataObject;
        } else {
            return dataObject[mapArray];
        }
    }

    // On change event
    onChange = (event) => {
        const mapArray = event.target.dataset.statemap.split('::');
        if (typeof mapArray !== 'string') {
            let tempObj = this.props.componentData;
            let tempNewObj = {};
            const newComponentObject = tempNewObj;

            // Dynamic recursive object update for unknown structured objects
            for(let key of mapArray) {
                if (typeof tempObj[key] === 'object' && typeof tempObj === 'object' && !Array.isArray(tempObj[key]) && !Array.isArray(tempObj)) {
                    tempNewObj[key] = {
                        ...tempObj[key]
                    }
                    tempNewObj = tempNewObj[key]
                    tempObj = tempObj[key]
                } else if (Array.isArray(tempObj[key]) || Array.isArray(tempObj)) {
                    tempNewObj = tempNewObj[key]
                    tempObj = tempObj[key]
                } else {
                    tempNewObj[key] = event.target.value;
                }
            }


            const { page, component } = this.props.selectedComponent;
            this.props.setComponentData(page, component, newComponentObject.data);
        }
    }

    saveEditing = () => {
        this.props.deselectComponent();
        this.props.saveData();
    }

    render() {
        return (
            (this.props.selectedComponent ?
                <div className="editor">
                    {this.renderEditingValues(this.props.componentData.data, 'componentData::data')}
                    <div className="buttons">
                        <button onClick={this.props.deselectComponent}>Cancel</button>
                        <button onClick={this.saveEditing}>Save</button>
                    </div>
                    <div className="page-buttons">
                        <button onClick={this.props.genFunctions.createPage}>Add Page</button>
                        <button onClick={() => {this.props.deselectComponent(true); this.props.genFunctions.deletePage(this.props.selectedComponent.page)}}>Delete Page</button>
                    </div>
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
