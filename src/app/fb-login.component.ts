import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';


@Component({
  selector: 'fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLogin implements OnInit {
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
        console.log("onFb", this.onFb);
        this.displayName = null;
        this.photoURL = null;
        return
      }
        //create conditional checking if facebook uid exist, throwing error becuase that
        //value doens't exist and it tries to assign url value with null value of
        //authState.facebook.uid
        console.log("LOGGED IN && AUTHSTATE:", authState);
        console.log("onFb", this.onFb);
        let userRef = this.af.database.object('/users/' + authState.uid);

        if(authState.facebook){
          let userId = authState.facebook.uid;
          console.log("USER ID EXIST AND IS", authState.facebook.uid);

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

        if(authState.facebook.uid){
          console.log("FACEBOOK UID EXISTS and this happens before the login()'s .then()'", authState)}


        this.displayName = authState.auth.displayName;
        this.photoURL = authState.auth.photoURL;

    });
  }

  console() {
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

  loginEmail() {
    console.log("This will make input fields appear")
    this.onFb = false;
  }

  logout() {
    this.af.auth.logout();
    this.onFb = false;
  }

  register() {

    if(this.onFb) {
      console.log("Already logged with fb");
      alert("Already logged with fb");
      return
    }

    this.af.auth.createUser({
      email: 'brian.briantucker@gmail.com',
      password: 'tester123!'
    })
    .then(authState => {
      console.log("REGISTER-THEN", authState)
      //authState.auth.sendEmailVerification()
    })
    .catch(error => {
      console.log("REGISTER-ERROR", error);
      alert("Account already registered");
    });
  }
}