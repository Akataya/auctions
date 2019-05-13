import auctions from "../apis/auctions";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";
import history from "../history";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function signup(data) {
  return dispatch => {
    return auctions.post("/accounts/", data).then(res => {
      const token = res.data.tokens.access;
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt_decode(token)));
      history.push("/");
    });
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    history.push("/");
  };
}

export function login(data) {
  return dispatch => {
    return auctions.post("/login/", data).then(res => {
      const token = res.data.access;
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt_decode(token)));
      history.push("/");
    });
  };
}
