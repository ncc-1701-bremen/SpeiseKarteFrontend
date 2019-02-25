import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      submitted: false,
      loading: false
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    const {submitted, username, password, loading} = this.state;

    return (
      <div>
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
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

export default Login;
