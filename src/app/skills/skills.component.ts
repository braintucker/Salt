import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { Http } from '@angular/http';



@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class Skills implements OnInit {

  loggedIn;

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
    });
  }
}
