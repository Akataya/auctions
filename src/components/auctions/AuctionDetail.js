import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAuction, fetchBids } from "../../actions";
import BidList from "../bids/BidList";
import { Link } from "react-router-dom";

class AuctionDetail extends Component {
  componentDidMount() {
    this.props.fetchAuction(this.props.match.params.id);
  }

  render() {
    if (!this.props.auction) {
      return <div>Loading</div>;
    }

    const {
      id,
      title,
      base_price,
      start_datetime,
      end_datetime,
      description
    } = this.props.auction;

    return (
      <div>
        <h1>{title}</h1>
        <h5>Base price: {base_price}</h5>
        <p>Start: {start_datetime}</p>
        <p>End: {end_datetime}</p>
        <p>Description: {description}</p>
        <h2>Bids:</h2>

        <Link
          to={`${this.props.auction.id}/bid`}
          className="ui green basic button"
        >
          Create Bid
        </Link>
        <BidList currentAuctionId={this.props.auction.id} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { auction: state.auctions[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchAuction }
)(AuctionDetail);
