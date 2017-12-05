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
  input = (<HTMLInputElement>document.getElementById("post"));
  articleId = 6;

  constructor(private af: AngularFire, private http: Http, private auth: Auth){

    af.database.list('/articles').subscribe( x => {
      this.articles = x;
      console.log("This is articles: ", this.articles);
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

  submit(date: Date, post: string, title: string) {
    // let postRef = this.af.database.object('/articles/' + this.articleId);
    //Need to check the current posts that exist in the object and decide what id this
    //post should recieve

    this.af.database.object('/articles/' + this.articleId).update({
      date: date,
      post: post,
      title: title
    });
    console.log("this is the title", title);
    console.log("this is the date", date);
    console.log("this is the post", post);
  }
}
