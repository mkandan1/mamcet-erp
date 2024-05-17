import { authFailure, authRequest, authSucess, logOut } from "../redux/actions/authActions";
import { API } from "./API";

export class Authorization {
  static async onAuthState(dispatch) {
    try {
      dispatch(authRequest())
      const userAuthStateResult = await API.getRequest("/auth/user-state");
      const currentPath = window.location.pathname;

      if (!userAuthStateResult.success) {
        dispatch(authFailure())
        dispatch(logOut());
        if (currentPath == "/login") {
          return;
        }
        window.location.href = "/login";
        return;
      }
      dispatch(authSucess({ user: userAuthStateResult.user }));
      return;
    } catch (err) {
      console.error(err.message);
    }
  }
}

export class Auth {
  static async signInWithEmailAndPassword(email, password) {
    const loginResult = await API.postRequest("/auth/login", {
      email,
      password,
    });
    if (!loginResult.success) {
      return loginResult;
    }
    return loginResult;
  }
}
