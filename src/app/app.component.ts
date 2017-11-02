import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  menu;

  constructor(af: AngularFire) {
      af.database.list('/menu').subscribe(x => {
        this.menu = x;
        console.log(this.menu);
      })
  }

}
