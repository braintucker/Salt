import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { Http } from '@angular/http';
import { Auth } from '../auth.service';
import { Observable } from 'rxjs/Rx';



@Component({
  selector: 'star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.css']
})
export class StarWars implements OnInit {

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
