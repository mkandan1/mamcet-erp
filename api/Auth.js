import { logOut } from "../redux/actions/authActions";
import { API } from "./API";

export class Authorization {
    static async onAuthState(dispatch) {
        try {
            const userAuthStateResult = await API.getRequest('/auth/user-state')
            if (!userAuthStateResult.success) {
                return dispatch(logOut())
            }
            console.log("user logged in")
            dispatch(setLoggedIn({ user: userAuthStateResult.user }))
            return
        }
        catch(err){
            console.error(err.message)
        }
    }
}

export class Auth {
    static async signInWithEmailAndPassword(email, password) {
        const loginResult = await API.postRequest('/auth/login', {email, password});
        if (!loginResult.success) {
            return loginResult;
        }
        return loginResult;
    }
}