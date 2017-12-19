import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';


@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class Skills implements OnInit {

  loggedIn;
  logAuth;

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
