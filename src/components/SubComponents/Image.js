import React, { Component } from 'react';
import '../../assets/css/Image.css';

class Image extends Component {

    render() {
        return (
            <div className="image">
                <img src={this.props.componentData.data.imgUri}></img>
            </div>
        )
    }
}

export default Image;
