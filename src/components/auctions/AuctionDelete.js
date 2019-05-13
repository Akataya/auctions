import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { fetchAuction, deleteAuction } from "../../actions";

class AuctionDelete extends Component {
  componentDidMount() {
    this.props.fetchAuction(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteAuction(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.auction) {
      return "Are you sure you want to delete this auction?";
    }

    return `Are you sure you want to delete this auction with title: ${
      this.props.auction.title
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Auction"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { auction: state.auctions[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchAuction, deleteAuction }
)(AuctionDelete);
