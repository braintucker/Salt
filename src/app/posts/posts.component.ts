import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Auth } from '../auth.service';
import 'rxjs/add/operator/map';
import  'rxjs/add/operator/take'

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class Posts implements OnInit {

  loggedIn;
  isBrian;
  articles;
  exists;
  articleId;


  constructor(private af: AngularFire, public auth: Auth){

    af.database.list('/articles').subscribe( x => {
      this.articles = x;
      console.log("This is articles length: ", this.articles.length);
    });

  }

  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        this.loggedIn = false;
        console.log("Logged in with firebase?", this.loggedIn);
        console.log("Logged in with auth0?", this.auth.isAuthenticated());
        return
      }

        //Code to check if I logged in with Facebook
        if(authState.uid === '9q7ZqhWxohV7T9H7YMBfi2xi56M2') {
          this.isBrian = true;
        }
        else{
          this.isBrian = false;
        }

        this.loggedIn = true;
        console.log("is Brian?", this.isBrian);
        console.log("Logged in with firebase?", this.loggedIn);
        console.log("Logged in with auth0?", this.auth.isAuthenticated());
    });
  }

  submit(date: Date, aId: number, post: string, title: string) {
    // Need to add an update button that will allow you to update a post based on the post id number

    let length = this.articles.length;

    if(length > 0)
    {
      aId = length + 1;
    }
    else{
      aId = 1;
    }

    this.af.database.object('/articles/' + aId).update({
      date: date,
      id: aId,
      post: post,
      title: title
    });


    // console.log("this is the title", title);
    // console.log("this is the date", date);
    // console.log("this is the post", post);
    // console.log("this is the length", length);
    // console.log("this is the id", aId);

  }
}
