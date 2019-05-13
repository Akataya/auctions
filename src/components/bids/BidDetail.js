import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBid } from "../../actions";

class BidDetail extends Component {
  componentDidMount() {
    this.props.fetchBid(this.props.match.params.id);
  }

  render() {
    if (!this.props.bid) {
      return <div>Loading</div>;
    }

    const { auction, amount_offered } = this.props.bid;
    return (
      <div>
        <h1>Auction: {auction}</h1>
        <h5>Amount offered: {amount_offered}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { bid: state.bids[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchBid }
)(BidDetail);
