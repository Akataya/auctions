import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import history from "../history";

import LoginPage from "./users/LoginPage";
import SignupPage from "./users/SignupPage";
import AuctionList from "./auctions/AuctionList";
import AuctionDetail from "./auctions/AuctionDetail";
import AuctionCreate from "./auctions/AuctionCreate";
import AuctionEdit from "./auctions/AuctionEdit";
import AuctionDelete from "./auctions/AuctionDelete";
import BidList from "./bids/BidList";
import BidDetail from "./bids/BidDetail";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={AuctionList} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/auctions/:id" exact component={AuctionDetail} />
            // <Route path="/auctions/:id/bids" exact component={BidList} />
            <Route path="/auctions/edit/:id" exact component={AuctionEdit} />
            <Route
              path="/auctions/delete/:id"
              exact
              component={AuctionDelete}
            />
            <Route path="/new" exact component={AuctionCreate} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
