import React, { Component } from 'react';
import Content from './Content';
import Sidepicture from './Sidepicture';

class Page extends Component {

    render() {
        console.log(this.props)
        return (
            <div className="page">
                {this.props.pageData.sidePicture && <Sidepicture/>}
                <Content components={this.props.pageData.components} componentData={this.props.pageData.componentInfos}/>
            </div>
        )
    }
}

export default Page;