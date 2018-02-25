import { RouterModule } from '@angular/router';
import { Android } from './android/android.component';
import { Callback } from './callback/callback.component';
import { Connect } from './connect/connect.component';
import { Login } from './login/login.component';
import { Home } from './home/home.component';
import { Posts } from './posts/posts.component';
import { Profile } from './profile/profile.component';
import { Machine } from './machine/machine.component';
import { Skills } from './skills/skills.component';
import { StarWars } from './star-wars/star-wars.component';




export const routing = RouterModule.forRoot([
  {
    path: 'home',
    component: Home
  },
  {
    path: 'android',
    component: Android
  },
  {
    path: 'callback',
    component: Callback
  },
  {
    path: 'connect',
    component: Connect
  },
  {
    path: 'posts',
    component: Posts
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'machine',
    component: Machine
  },
  {
    path: 'skills',
    component: Skills
  },
  {
    path: 'star-wars',
    component: StarWars
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]);
