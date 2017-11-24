import { RouterModule } from '@angular/router';
import { Login } from './login/login.component';
import { Me } from './me/me.component';
import { Skills } from './skills/skills.component';

export const routing = RouterModule.forRoot([
  {
    path: 'me',
    component: Me
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
    redirectTo: '/login',
    pathMatch: 'full'
  }
]);
