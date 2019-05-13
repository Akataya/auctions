import React, { Component } from "react";
import { connect } from "react-redux";
import { createAuction } from "../../actions";
import AuctionForm from "./AuctionForm";

class AuctionCreate extends Component {
  onSubmit = formValues => {
    this.props.createAuction(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create an Auction</h3>
        <AuctionForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createAuction }
)(AuctionCreate);
