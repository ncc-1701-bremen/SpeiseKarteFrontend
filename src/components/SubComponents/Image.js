import React, { Component } from 'react';

class Image extends Component {

    render() {
        console.log(this.props)
        return (
            <div className="image">
                <img src={this.props.componentData.data.imgUri} height="150" width="200"></img>
            </div>
        )
    }
}

export default Image;
