import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchAuction, editAuction } from "../../actions";
import AuctionForm from "./AuctionForm";

class AuctionEdit extends Component {
  componentDidMount() {
    this.props.fetchAuction(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editAuction(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.auction) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit an Auction</h3>
        <AuctionForm
          initialValues={_.pick(
            this.props.auction,
            "title",
            "base_price",
            "start_datetime",
            "end_datetime",
            "description"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { auction: state.auctions[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchAuction, editAuction }
)(AuctionEdit);
