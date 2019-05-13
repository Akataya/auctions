import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class LoginForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="username"
            component={this.renderInput}
            label="Enter Username"
          />
          <Field
            name="password"
            component={this.renderInput}
            label="Enter Password"
            type="password"
          />
          <button className="ui button primary">Login</button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.username) {
    // only ran if the user did not enter a Title
    errors.username = "You must enter your username";
  }

  if (!formValues.password) {
    errors.password = "You must enter your password";
  }

  return { errors };
};

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginForm);
