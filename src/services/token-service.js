import * as jwtDecode from 'jwt-decode';

export default class TokenService {

    static JWT_KEY = 'JWT_KEY';

    setToken(token) {
        localStorage.setItem(TokenService.JWT_KEY, token);
    }

    getRawToken() {
        return localStorage.getItem(TokenService.JWT_KEY);
    }

    getDecodedToken() {
        const rawToken = this.getRawToken();
        let result = null;
        if (rawToken) {
            result = jwtDecode(rawToken);
        }
        return result;
    }

    hasToken() {
        const token = localStorage.getItem(TokenService.JWT_KEY);
        return token != null && token !== '';
    }
    
}