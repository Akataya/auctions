import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";

class LoginPage extends Component {
  onSubmit = formValues => {
    this.props.login(formValues);
  };

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(LoginPage);
