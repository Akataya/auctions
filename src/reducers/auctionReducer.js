import _ from "lodash";
import {
  FETCH_AUCTIONS,
  FETCH_AUCTION,
  CREATE_AUCTION,
  EDIT_AUCTION,
  DELETE_AUCTION
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_AUCTIONS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_AUCTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_AUCTION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_AUCTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_AUCTION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
