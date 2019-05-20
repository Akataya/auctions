import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class BidForm extends Component {
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
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="amount_offered"
          component={this.renderInput}
          label="Enter Amount to Bid"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.amount_offered) {
    errors.amount_offered = "You must enter the amount you're offering";
  }
  return errors;
};

export default reduxForm({
  form: "BidForm",
  enableReinitialize: true,
  validate
})(BidForm);
