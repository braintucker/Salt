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

  constructor(private af: AngularFire, private auth: Auth){
    auth.handleAuthentication();
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
  loggedIn;
  onFb;



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
  logout() {
    this.af.auth.logout();
    this.onFb = false;
    this.loggedIn = false;
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
