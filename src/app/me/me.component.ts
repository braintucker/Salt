import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';



@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class Me implements OnInit {

  loggedIn;
  displayName;
  photoURL;

  constructor(private af: AngularFire, private http: Http, private auth: Auth){
  }

  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        this.loggedIn = false;
        console.log("Logged in with firebase?", this.loggedIn);
        return
      }
        this.loggedIn = true;
        console.log("Logged in with firebase?", this.loggedIn);
        console.log("Auth", authState.facebook);
    });
  }
}
