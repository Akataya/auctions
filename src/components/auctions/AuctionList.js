import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAuctions } from "../../actions";

class AuctionList extends Component {
  componentDidMount() {
    this.props.fetchAuctions();
    this.timer = setInterval(() => this.props.fetchAuctions(), 5000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  renderAdmin(auction) {
    if (auction.user) {
      if (auction.user === this.props.currentUserId) {
        return (
          <div className="right floated content">
            <Link
              to={`/auctions/edit/${auction.id}`}
              className="ui button primary"
            >
              Edit
            </Link>
            <Link
              to={`/auctions/delete/${auction.id}`}
              className="ui button negative"
            >
              Delete
            </Link>
          </div>
        );
      }
    }
  }

  renderList() {
    return this.props.auctions.map(auction => {
      return (
        <div className="item" key={auction.id}>
          {this.renderAdmin(auction)}
          <div className="content">
            <Link to={`/auctions/${auction.id}`} className="header">
              {auction.title}
            </Link>
            <div>Ends on: {auction.end_datetime}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Auctions</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auctions: Object.values(state.auctions),
    currentUserId: state.auth.user.user_id,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { fetchAuctions }
)(AuctionList);
