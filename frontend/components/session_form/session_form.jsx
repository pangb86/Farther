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
        <ul>
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
        <label>Email
          <input type="text"
            value={this.state.email}
            onChange={this.update('email')}
            className="login-input"
          />
        </label>
      );
    }
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="login-prompt">
            {this.props.formType === "signup" ? "Sign Up" : "Log In"}
          </div>
          {this.renderErrors()}
          <br/>
          <div className="login-form">
            <label>Username
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
                autoFocus
              />
            </label>
            <br/>
            {this.renderEmailInput()}
            <br/>
            <label>Password
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>
            <input type="submit"
              value={this.props.formType === "signup" ? "Sign Up" : "Log In"}/>
          </div>
        </form>
      </div>
    );
  }
}

export default SessionForm;
