/* eslint class-methods-use-this: ["error", { "exceptMethods":
["setSession", "logout", "isAuthenticated"] }] */
import auth0 from 'auth0-js';
import AUTH_CONFIG from './auth0-variables';
import history from '../history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    state: 'mystate',
    nonce: 'hSTjMpBgxuRXhlg8c~KQEdQeYJx0dXbast',
  });

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    // this.signup = this.signup.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    this.auth0.login(
      { realm: AUTH_CONFIG.dbConnectionName, username, password },
      (err, authResult) => {
        if (err) {
          console.log(err);
          alert(`Error: ${err.description}. Check the console for further details.`);
        }
        console.log('USER INFO');
        console.log(authResult);
      },
    );
  }

  signup(email, password) {
    this.auth0.signup(
      { connection: AUTH_CONFIG.dbConnectionName, email, password },
      (err) => {
        if (err) {
          console.log(err);
          alert(`Error: ${err.description}. Check the console for further details.`);

          return;
        }

        this.auth0.login({ realm: AUTH_CONFIG.dbConnectionName, username: email, password },
          (error) => {
            if (error) {
              console.log(error);
              alert(`Error: ${error.description}. Check the console for further details.`);
            }
          },
        );
      },
    );
  }

  loginWithGoogle() {
    this.auth0.authorize({ connection: 'google-oauth2' });
  }

  loginWithFacebook() {
    this.auth0.authorize({ connection: 'facebook' });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('--------------------------------------------');
        console.log(JSON.stringify(authResult));
        console.log(authResult.idTokenPayload);
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/login');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    // history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/login');
  }

  getAccessToken() {
    console.log(this);
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
