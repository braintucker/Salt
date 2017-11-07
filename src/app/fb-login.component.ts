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
  constructor(private af: AngularFire, private http: Http){
  }


  //get currently logged in user
  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        console.log("NOT LOGGED IN");
        this.displayName = null;
        this.photoURL = null;
        return
      }
        //console.log("LOGGED IN && AUTHSTATE:", authState);
        let userRef = this.af.database.object('/users/' + authState.uid);
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


        this.displayName = authState.auth.displayName;
        this.photoURL = authState.auth.photoURL;

    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
      scope: ['public_profile', 'user_friends']
    }).then((authState: any) => {
      //console.log("AFTER LOGIN:", authState);
      
      //creating a user in the firebase database with the users
      //first_name & last_name, along with their access_token
      this.af.database.object('/users/' + authState.uid).update({
        accessToken: authState.facebook.accessToken
      })
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
