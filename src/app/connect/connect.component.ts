import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';
import { ConnectService } from './connect.service';
import { Observable } from 'rxjs/Rx';



@Component({
  selector: 'connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class Connect implements OnInit {

  loggedIn;
  posts;

  constructor(private af: AngularFire, private http: Http, private auth: Auth, private connectService: ConnectService){
  }


  ngOnInit() {

    this.getInfo();

    this.af.auth.subscribe(authState => {
      if(!authState) {
        this.loggedIn = false;
        return
      }
        this.loggedIn = true;
    });
  }

  getInfo() {
    this.connectService.getInfo()
      .subscribe(
        resArray => this.posts = resArray,
        error => console.log("Error :: " + error)
      )
  }

}
