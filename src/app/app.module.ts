import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { Callback } from './callback/callback.component';
import { Connect } from './connect/connect.component';
import { Home } from './home/home.component';
import { LoggedIn } from './logged-in/logged-in.component';
import { Login } from './login/login.component';
import { Machine } from './machine/machine.component';
import { Posts } from './posts/posts.component';
import { Profile } from './profile/profile.component';
import { Skills } from './skills/skills.component';

import { Auth } from './auth.service';


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
    AppComponent, Callback, Connect, Home, LoggedIn, Login, Machine, Posts, Profile, Skills
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule, HttpModule, SidebarModule.forRoot(), routing
  ],
  providers: [Auth, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent, Callback, Connect, Home, LoggedIn, Login, Machine, Posts, Profile, Skills]
})
export class AppModule { }
