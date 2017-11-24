import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';


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
  photoURL;
  onFb = false;
  constructor(private af: AngularFire, private http: Http){
  }

  //get currently logged in user
  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        console.log("NOT LOGGED IN", authState);
        //console.log("onFb", this.onFb);
        this.displayName = null;
        this.photoURL = null;
        return
      }
        console.log("LOGGED IN", authState);
        // console.log("onFb", this.onFb);
        let userRef = this.af.database.object('/users/' + authState.uid);

        if(authState.facebook){
          let userId = authState.facebook.uid;
          //console.log("USER ID EXIST AND IS", authState.facebook.uid);

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
        this.photoURL = authState.auth.photoURL;
    });
  }

  console() {
    //why does this still carry the uid, when after-login contains the accessToken?
    this.af.auth.subscribe( authState => {
      console.log("This is the current authState:", authState);
    })
  }


  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
      scope: ['public_profile', 'user_friends']
    }).then((authState: any) => {
      //after logging in, the uid is removed and an accessToken is added
      if(!authState.facebook.uid){
        console.log("FACEBOOK UID DOESN'T EXIST")}
        console.log("AFTER LOGIN:", authState);
      //creating a user in the firebase database with the users
      //first_name & last_name, along with their access_token
      this.af.database.object('/users/' + authState.uid).update({
        accessToken: authState.facebook.accessToken
      })
    });
    this.onFb = true;
  }

  login() {
    this.onFb = false;
    this.af.auth.login({
      email: this.email,
      password: this.password
    }, {
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    })
    .then(authState => console.log('LOGIN-THEN', authState))
    .catch(error => console.log("LOGIN-ERROR", error));
  }

  logout() {
    this.af.auth.logout();
    this.onFb = false;
  }

  register(form: NgForm) {
    if(this.onFb) {
      console.log("Already logged with fb");
      alert("Already logged with fb");
      form.resetForm();
      return
    }
    let em = this.email;
    let pswd = this.password;
    this.af.auth.createUser({
      email: em,
      password: pswd
    })
    .then(authState => {
      //console.log("REGISTER-THEN", authState)
      authState.auth.sendEmailVerification();
    })
    .catch(error => {
      console.log("REGISTER-ERROR", error);
      this.err = error;
      console.log("err", this.err);
    });
    form.resetForm();
  }
}
