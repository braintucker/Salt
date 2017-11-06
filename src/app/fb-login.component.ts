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
  constructor(private af: AngularFire){
  }

  ngOnInit() {}

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(authState => {
      console.log("AFTER LOGIN:", authState)
    }).catch((err) => {
      console.log("ERROR:", err);
    })
  }

  logout() {
    this.af.auth.logout();
  }
}
