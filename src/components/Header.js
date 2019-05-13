import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

class Header extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div>
        <Link to="/new" className="ui green basic button">
          Create Auction
        </Link>
        <button
          onClick={this.logout.bind(this)}
          className="ui brown basic button"
        >
          Sign Out
        </button>
      </div>
    );

    const guestLinks = (
      <div className="ui buttons">
        <Link to="/signup" className="ui yellow button">
          Sign Up
        </Link>
        <div className="or" />
        <Link to="/login" className="ui positive button">
          Login
        </Link>
      </div>
    );

    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Auctions
        </Link>
        <div className="right menu">
          <Link to="/" className="ui blue basic button">
            All Auctions
          </Link>
          {isAuthenticated ? userLinks : guestLinks}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Header);
