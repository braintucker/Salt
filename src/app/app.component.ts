import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import  'rxjs/add/operator/take'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  foods: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private af: AngularFire){
  }

  ngOnInit() {
    this.foods = this.af.database.list('/foods', {
      query: {
        orderByKey: true
      }
    });

    this.restaurants = this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'name'
      }
    })
      .map(restaurants => {
        restaurants.map(restaurant => {
          restaurant.featureTypes = [];
          for (var f in restaurant.features)
            restaurant.featureTypes.push(this.af.database.object('/features/' + f));
        });
        return restaurants;
      });
  }
}
