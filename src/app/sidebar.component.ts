import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import  'rxjs/add/operator/take'

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class Sidebar {

  constructor(private af: AngularFire){
  }

  private _opened: boolean = false;
  foods: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;


  ngOnInit() {

  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
