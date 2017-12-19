import { Component, OnInit, AnimationTransitionEvent } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Auth } from './auth.service';
import 'rxjs/add/operator/map';
import  'rxjs/add/operator/take'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private af: AngularFire, public auth: Auth){
    auth.handleAuthentication();
  }

   _opened: boolean = false;
   _modeNum: number = 0;
   _positionNum: number = 0;
   _dock: boolean = false;
   _closeOnClickOutside: boolean = false;
   _closeOnClickBackdrop: boolean = false;
   _showBackdrop: boolean = false;
   _animate: boolean = true;
   _trapFocus: boolean = true;
   _autoFocus: boolean = true;
   _keyClose: boolean = false;
   _autoCollapseHeight: number = null;
   _autoCollapseWidth: number = null;
   loggedIn;
   onFb;



  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if(!authState) {
        this.loggedIn = false;
        return
      }
        this.loggedIn = true;
    });
  }
  logout() {
    this.af.auth.logout();
    this.onFb = false;
    this.loggedIn = false;
  }
  _toggleSidebar() {
    this._opened = !this._opened;
  }
  _onOpenStart(): void {
    //console.info('Sidebar opening');
  }

  _onOpened(): void {
    //console.info('Sidebar opened');
  }

  _onCloseStart(): void {
    //console.info('Sidebar closing');
  }

 _onClosed(): void {
    //console.info('Sidebar closed');
  }
}
