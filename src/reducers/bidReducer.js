import _ from "lodash";
import { FETCH_BIDS, FETCH_BID } from "../actions/types";
import { LOCATION_CHANGE } from "react-router-redux";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BIDS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_BID:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
