import { combineReducers } from "redux";
import auctionReducer from "./auctionReducer";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import bidReducer from "./bidReducer";

export default combineReducers({
  auctions: auctionReducer,
  form: formReducer,
  auth: authReducer,
  bids: bidReducer
});
