import React, { Component } from 'react';
import Content from './Content';
import Sidepicture from './Sidepicture';

class Page extends Component {
    render() {
        return (
            <div className="page"
                 onMouseMove={this.props.onMove}
                 onTouchMove={this.props.onMove}
                 onMouseDown={((evt) => this.props.
                 onDragStart(true, evt))}
                 onTouchStart={((evt) => this.props.onDragStart(true, evt))}
                 onMouseUp={((evt) => this.props.onDragStart(false, evt))}
                 onTouchEnd={((evt) => this.props.onDragStart(false, evt))}
                 style={this.props.editingMode ? {width: "80vw", transform: `translateX(${this.props.swiperPos}px)`} :
                                                 {transform: `translateX(${this.props.swiperPos}px)`}} >
                {this.props.pageData.sidePicture && <Sidepicture editingMode={this.props.editingMode}/>}
                <Content page={this.props.page}
                         components={this.props.pageData.components}
                         componentData={this.props.pageData.componentInfos}
                         editingMode={this.props.editingMode}
                         createComponent={this.props.genFunctions.createComponent}
                         setComponentDrag={this.props.setComponentDrag}/>
            </div>
        )
    }
}

export default Page;