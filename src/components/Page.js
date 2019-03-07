import React, { Component } from 'react';
import Content from './Content';
import Sidepicture from './Sidepicture';

class Page extends Component {

    render() {
        return (
            <div className="page" style={this.props.editingMode ? {width: "80vw"} : {}}>
                {this.props.pageData.sidePicture && <Sidepicture editingMode={this.props.editingMode}/>}
                <Content components={this.props.pageData.components} componentData={this.props.pageData.componentInfos} editingMode={this.props.editingMode}/>
            </div>
        )
    }
}

export default Page;