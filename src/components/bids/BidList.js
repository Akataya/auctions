import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBids } from "../../actions";
import isEmpty from "lodash/isEmpty";
import BidEdit from "./BidEdit";

class BidList extends Component {
  componentDidMount() {
    this.props.fetchBids(this.props.currentAuctionId);
    this.timer = setInterval(
      () => this.props.fetchBids(this.props.currentAuctionId),
      5000
    );
  }

  componentWillUnmount() {
    this.timer = null;
  }

  getAuctionBids() {
    const bids = this.props.bids.filter(
      bid => bid.auction === this.props.currentAuctionId
    );
    return bids;
  }

  getLargestBid() {
    const auction_bids = this.getAuctionBids();
    const bids_amount = [];
    auction_bids.map(bid => {
      bids_amount.push(bid.amount_offered);
    });
    if (isEmpty(bids_amount)) {
      return <p>Not yet</p>;
    } else {
      return Math.max.apply(null, bids_amount);
    }
  }

  getLowestBid() {
    const auction_bids = this.getAuctionBids();
    const bids_amount = [];
    auction_bids.map(bid => {
      bids_amount.push(bid.amount_offered);
    });
    if (isEmpty(bids_amount)) {
      return <p>Not yet</p>;
    } else {
      return Math.min.apply(null, bids_amount);
    }
  }

  renderAdmin(bid) {
    if (bid.user) {
      if (bid.user === this.props.currentUserId) {
        return (
          <div className="right floated content">
            <Link to={`/bids/${bid.id}/edit`} className="ui button primary">
              Edit
            </Link>

            <Link to={`/bids/${bid.id}/delete`} className="ui button negative">
              Delete
            </Link>
          </div>
        );
      }
    }
  }

  renderList() {
    const auction_bids = this.getAuctionBids();
    if (isEmpty(auction_bids)) {
      return <div>No bids yet</div>;
    } else {
      return auction_bids.map(bid => {
        return (
          <div className="item" key={bid.id}>
            {this.renderAdmin(bid)}
            <div className="content">Amount offered: {bid.amount_offered}</div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Largest Bid: {this.getLargestBid()}</h2>
        <h2>Lowest bid: {this.getLowestBid()}</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    bids: Object.values(state.bids),
    currentUserId: state.auth.user.user_id,
    isAuthenticated: state.auth.isAuthenticated
    // currentAuctionId: ownProps.match.params.id
  };
};

export default connect(
  mapStateToProps,
  { fetchBids }
)(BidList);
