import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class AuctionForm extends Component {
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
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="base_price"
          component={this.renderInput}
          label="Enter Base Price"
        />
        <Field
          name="start_datetime"
          component={this.renderInput}
          label="Enter Start Date and Time"
        />
        <Field
          name="end_datetime"
          component={this.renderInput}
          label="Enter End Date and Time"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    // only ran if the user did not enter a Title
    errors.title = "You must enter a title";
  }

  if (!formValues.base_price) {
    // only ran if the user did not enter a base price
    errors.base_price = "You must enter a base price";
  }

  if (!formValues.start_datetime) {
    // only ran if the user did not enter a start datetime
    errors.start_datetime = "You must enter a start datetime";
  }

  if (!formValues.end_datetime) {
    // only ran if the user did not enter a end datetime
    errors.end_datetime = "You must enter a end datetime";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "AuctionForm",
  enableReinitialize: true,
  validate
})(AuctionForm);
