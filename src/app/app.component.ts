import { Component, OnInit, AnimationTransitionEvent } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import  'rxjs/add/operator/take'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private af: AngularFire, private auth: AuthService){
  }

  private _opened: boolean = false;
  private _modeNum: number = 0;
  private _positionNum: number = 0;
  private _dock: boolean = false;
  private _closeOnClickOutside: boolean = false;
  private _closeOnClickBackdrop: boolean = false;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = false;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;
  foods: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;


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
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  private _onOpenStart(): void {
    //console.info('Sidebar opening');
  }

  private _onOpened(): void {
    //console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
    //console.info('Sidebar closing');
  }

  private _onClosed(): void {
    //console.info('Sidebar closed');
  }
}
