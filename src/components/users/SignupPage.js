import React, { Component } from "react";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";
import { signup } from "../../actions/authActions";

class SignupPage extends Component {
  onSubmit = formValues => {
    this.props.signup(formValues);
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <SignupForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { signup }
)(SignupPage);
