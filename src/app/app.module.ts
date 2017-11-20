import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';

import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { Login } from './login.component';

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
    AppComponent, Login
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule, HttpModule, SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent, Login]
})
export class AppModule { }
