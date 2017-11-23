import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
      email:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  renderErrors() {
    if (this.props.errors) {
      return(
        <ul className="login-errors">
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  renderEmailInput() {
    if (this.props.formType === "signup") {
      return(
        <label>
          <input type="text"
            value={this.state.email}
            onChange={this.update('email')}
            className="login-input"
            placeholder="Email"
          />
        </label>
      );
    }
  }

  demoLogin(e) {
    e.preventDefault();
    let demoUser = { user: {username: "Demo_User", password: "password"} };
    this.props.login(demoUser);
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-form-container">
          <form onSubmit={this.handleSubmit} className="login-form-box">
            <div className="login-prompt">
              {this.props.formType === "signup" ? "Sign Up" : "Log In"}
            </div>
            {this.renderErrors()}
            <div className="login-form">
              <label>
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className="login-input"
                  placeholder="Username"
                  autoFocus
                />
              </label>
              <br/>
              {this.renderEmailInput()}
              <br/>
              <label>
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className="login-input"
                  placeholder="Password"
                />
              </label>
              <br/>
              <input type="submit"
                value={this.props.formType === "signup" ? "SIGNUP" : "LOGIN"}/>
              <button onClick={this.demoLogin}>DEMO LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SessionForm;
