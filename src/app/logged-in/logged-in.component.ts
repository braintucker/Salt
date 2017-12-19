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
  photoURL;
  constructor(private af: AngularFire, private http: Http){
  }

  //get currently logged in user
  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        this.photoURL = null;
        return
      }
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
        this.photoURL = authState.auth.photoURL;
    });
  }
}
