import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login implements OnInit {
  email = '';
  password = '';
  err;
  displayName;
  show1;
  show4;
  onFb = false;
  loggedIn;
  auth0;
  constructor(private af: AngularFire, private http: Http, private auth: Auth){
  }

  //get currently logged in user
  ngOnInit() {
    this.af.auth.subscribe(authState => {

      if(this.auth.isAuthenticated()) {
        this.auth0 = true;
      }
      if(!authState) {
        this.displayName = null;
        this.loggedIn = false;
        return
      }
        this.loggedIn = true;
        let userRef = this.af.database.object('/users/' + authState.uid);

        if(authState.facebook){
          let userId = authState.facebook.uid;

          userRef.subscribe(user => {
              let url = `https://graph.facebook.com/v2.8/${authState.facebook.uid}?fields=first_name,last_name&access_token=${user.accessToken}`;
              this.http.get(url).subscribe(response => {
                let user = response.json();
                //updating the user object to have first_name and last_name properties when logged in
                userRef.update({
                  firstName: user.first_name,
                  last_name: user.last_name
                });
              });
            });
          }
        this.displayName = authState.auth.displayName;
    });
  }
  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
      scope: ['public_profile', 'user_friends']
    }).then((authState: any) => {
      //after logging in, the uid is removed and an accessToken is added

      //creating a user in the firebase database with the users
      //first_name & last_name, along with their access_token
      this.af.database.object('/users/' + authState.uid).update({
        accessToken: authState.facebook.accessToken
      })
    });
    this.onFb = true;
  }
  login(form: NgForm) {
    this.onFb = false;
    this.af.auth.login({
      email: this.email,
      password: this.password
    }, {
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    })
    .catch(error => this.err = error.message);
    form.resetForm();
    this.err = null;
  }
  logout() {
    this.af.auth.logout();
    this.onFb = false;
    this.loggedIn = false;
  }
}
