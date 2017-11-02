import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  food: FirebaseListObservable<any[]>;
  restaurants: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire){
  }

  ngOnInit() {
    this.food = this.af.database.list('/food');
    this.restaurants = this.af.database.list('/restaurants');
  }
}
