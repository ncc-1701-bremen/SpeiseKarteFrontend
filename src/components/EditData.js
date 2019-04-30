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


    render() {
        return (
            <div>
                <form name="form" onSubmit={this.props.onAuth}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button disabled={loading}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Editor;