import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { LoggedIn } from './logged-in/logged-in.component';
import { Login } from './login/login.component';
import { Me } from './me/me.component';
import { Posts } from './posts/posts.component';
import { Skills } from './skills/skills.component';

import { Auth } from './auth.service';
// import { AUTH_PROVIDERS } from 'angular2-jwt';


export const firebaseConfig = {
    apiKey: "AIzaSyA_GX29gvNxI_UqNKOgJAAGonlx7mRTQs4",
    authDomain: "salt-dd59b.firebaseapp.com",
    databaseURL: "https://salt-dd59b.firebaseio.com",
    projectId: "salt-dd59b",
    storageBucket: "",
    messagingSenderId: "862902714864"
};

@NgModule({
  declarations: [
    AppComponent, LoggedIn, Login, Me, Posts, Skills
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule, HttpModule, SidebarModule.forRoot(), routing
  ],
  providers: [Auth, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent, LoggedIn, Login, Me, Posts, Skills]
})
export class AppModule { }
