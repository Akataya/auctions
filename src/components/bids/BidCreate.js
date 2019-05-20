import React, { Component } from "react";
import { connect } from "react-redux";
import { createBid } from "../../actions";
import BidForm from "./BidForm";

class BidCreate extends Component {
  onSubmit = formValues => {
    this.props.createBid(this.props.match.params.id, formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Bid for:</h3>
        <BidForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { auction: state.auctions[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { createBid }
)(BidCreate);
