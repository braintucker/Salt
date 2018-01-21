import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';



@Component({
  selector: 'connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class Connect implements OnInit {

  loggedIn;

  constructor(private af: AngularFire, private http: Http, private auth: Auth){
  }

  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        this.loggedIn = false;
        return
      }
        this.loggedIn = true;
    });
  }
}
