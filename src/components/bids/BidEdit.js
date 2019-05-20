import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchBid, editBid } from "../../actions";
import BidForm from "./BidForm";

class BidEdit extends Component {
  componentDidMount() {
    this.props.fetchBid(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editBid(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.bid) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Bid:</h3>
        <BidForm
          initialValues={_.pick(this.props.bid, "amount_offered")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { bid: state.bids[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchBid, editBid }
)(BidEdit);
