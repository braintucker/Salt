import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
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
  articles;
  exists;
  articleId;

  constructor(private af: AngularFire, private http: Http, private auth: Auth){

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
        this.loggedIn = true;
        console.log("Logged in with firebase?", this.loggedIn);
        console.log("Logged in with auth0?", this.auth.isAuthenticated());
    });
  }

  submit(date: Date, aId: number, post: string, title: string) {
    // let postRef = this.af.database.object('/articles/' + this.articleId);
    //Need to check the current posts that exist in the object and decide what id this
    //post should recieve

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
    console.log("this is the length", length);
    console.log("this is the id", aId);

  }
}
