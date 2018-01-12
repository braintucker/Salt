import { RouterModule } from '@angular/router';
import { Callback } from './callback/callback.component';
import { Login } from './login/login.component';
import { Home } from './home/home.component';
import { Posts } from './posts/posts.component';
import { Profile } from './profile/profile.component';
import { Machine } from './machine/machine.component';
import { Skills } from './skills/skills.component';



export const routing = RouterModule.forRoot([
  {
    path: 'home',
    component: Home
  },
  {
    path: 'callback',
    component: Callback
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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]);
