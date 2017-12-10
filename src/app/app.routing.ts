import { RouterModule } from '@angular/router';
import { Login } from './login/login.component';
import { Home } from './home/home.component';
import { Me } from './me/me.component';
import { Posts } from './posts/posts.component';
import { Profile } from './profile/profile.component';
import { Skills } from './skills/skills.component';



export const routing = RouterModule.forRoot([
  {
    path: 'home',
    component: Home
  },
  {
    path: 'me',
    component: Me
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
    path: 'skills',
    component: Skills
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]);
