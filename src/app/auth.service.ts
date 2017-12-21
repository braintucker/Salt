import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class Auth {

  loggedIn;
  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'f5b0p1JFkLXyPa7kNMsxaw2H27nJOdCw',
    domain: 'braintuck.auth0.com',
    responseType: 'token id_token',
    audience: 'https://braintuck.auth0.com/userinfo',
    redirectUri: 'https://salt-dd59b.firebaseapp.com/#/callback',
    scope: 'openid profile'
  });

  constructor(private af: AngularFire, public router: Router) {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        this.loggedIn = false;
        return
      }
        this.loggedIn = true;
    });

  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if(profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
}



  public login(): void {

    if(this.loggedIn){
      alert("ALREADY LOGGED IN WITH FIREBASE. CANNOT LOGIN")

    }
    else{
      this.auth0.authorize();
      console.log("This is logged in", this.loggedIn);
    }
  }

  // ...
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
