import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { fetchBid, deleteBid } from "../../actions";

class BidDelete extends Component {
  componentDidMount() {
    this.props.fetchBid(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteBid(id)}
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
    if (!this.props.bid) {
      return "Are you sure you want to delete this bid?";
    }

    return `Are you sure you want to delete this bid with amount: ${
      this.props.bid.amount_offered
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Bid"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { bid: state.bids[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchBid, deleteBid }
)(BidDelete);
