import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';



@Component({
  selector: 'logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedIn implements OnInit {
  email = '';
  password = '';
  err;
  displayName;
  photoURL;
  onFb = false;
  loggedIn;
  constructor(private af: AngularFire, private http: Http){
  }

  //get currently logged in user
  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        //console.log("NOT LOGGED IN", authState);
        //console.log("onFb", this.onFb);
        this.displayName = null;
        this.photoURL = null;
        this.loggedIn = false;
        return
      }
        //console.log("LOGGED IN", authState);
        this.loggedIn = true;
        console.log("Logged in??????????????", this.loggedIn);
        // console.log("onFb", this.onFb);
        let userRef = this.af.database.object('/users/' + authState.uid);

        if(authState.facebook){

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
}
