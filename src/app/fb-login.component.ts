import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import  'rxjs/add/operator/take'

@Component({
  selector: 'fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLogin implements OnInit {
  displayName;
  photoURL;
  constructor(private af: AngularFire){
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
        this.displayName = authState.auth.displayName;
        this.photoURL = authState.auth.photoURL;

    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(authState => {
      console.log("AFTER LOGIN:", authState)
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
