import { API } from "./API";

export class Auth {
    static async signInWithEmailAndPassword(email, password) {
        const loginResult = await API.postRequest('/auth/login', {email, password});
        if (!loginResult.success) {
            return loginResult;
        }
        return loginResult;
    }
}