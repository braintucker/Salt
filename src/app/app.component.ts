import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  menu;

  constructor(private af: AngularFire) {

  }

  ngOnInit() {
    this.menu = this.af.database.list('/menu');
  }
}
