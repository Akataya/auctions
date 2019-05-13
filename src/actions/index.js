import auctions from "../apis/auctions";
import history from "../history";
import { normalize, schema, arrayof } from "normalizr";

import {
  FETCH_AUCTIONS,
  FETCH_AUCTION,
  CREATE_AUCTION,
  EDIT_AUCTION,
  DELETE_AUCTION,
  FETCH_BIDS,
  CREATE_BID,
  EDIT_BID,
  DELETE_BID
} from "./types";

// Auction actions
export const fetchAuctions = () => async dispatch => {
  console.log("polling auction list");
  const response = await auctions.get("/auctions/");
  const myData = response.data;
  const user = new schema.Entity("user", { idAttribute: "id" });
  const auction = new schema.Entity(
    "auctions",
    { user: user },
    { idAttribute: "id" }
  );
  const auctionList = [auction];
  const mainSchema = new schema.Array({ auctions: auction, user: user });
  const normalizedData = normalize(myData, auctionList);

  dispatch({
    type: FETCH_AUCTIONS,
    payload: normalizedData.entities.auctions
  });
};

export const fetchAuction = id => async dispatch => {
  console.log("polling auction");
  const response = await auctions.get(`/auctions/${id}`);

  dispatch({ type: FETCH_AUCTION, payload: response.data });
};

export const createAuction = formValues => async (dispatch, getState) => {
  const { user_id } = getState().auth.user;
  const response = await auctions.post("/auctions/", {
    ...formValues,
    user_id
  });

  dispatch({ type: CREATE_AUCTION, payload: response.data });
  history.push("/");
};

export const editAuction = (id, formValues) => async dispatch => {
  const response = await auctions.patch(`/auctions/${id}/`, formValues);

  dispatch({ type: EDIT_AUCTION, payload: response.data });
  history.push("/");
};

export const deleteAuction = id => async dispatch => {
  await auctions.delete(`/auctions/${id}/`);

  dispatch({ type: DELETE_AUCTION, payload: id });
  history.push("/");
};

// Bids
export const fetchBids = id => async dispatch => {
  const response = await auctions.get(`auctions/${id}/bids/`);
  const myData = response.data;
  const user = new schema.Entity("user", { idAttribute: "id" });
  const bid = new schema.Entity("bids", { user: user }, { idAttribute: "id" });
  const bidList = [bid];
  const mainSchema = new schema.Array({ bids: bid, user: user });
  const normalizedData = normalize(myData, bidList);
  console.log(normalizedData.entities.bids);
  dispatch({
    type: FETCH_BIDS,
    payload: normalizedData.entities.bids
  });
};
