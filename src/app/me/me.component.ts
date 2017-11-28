import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { Http } from '@angular/http';


@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class Me implements OnInit {

  loggedIn;
  displayName;
  photoURL;

  constructor(private af: AngularFire, private http: Http){
  }

  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        this.loggedIn = false;
        console.log("Logged in?", this.loggedIn);
        return
      }
        this.loggedIn = true;
        console.log("Logged in?", this.loggedIn);
        console.log("Auth", authState.facebook);
    });
  }
}
