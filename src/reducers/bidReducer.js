import _ from "lodash";
import {
  FETCH_BIDS,
  FETCH_BID,
  CREATE_BID,
  EDIT_BID,
  DELETE_BID
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BIDS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_BID:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_BID:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_BID:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_BID:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
