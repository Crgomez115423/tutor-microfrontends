import { Routes } from '@angular/router';

import { Shell } from './shell/shell/shell';

import { DashboardComponent } from './microfrontends/dashboard-mf/dashboard/dashboard';
import { BookingComponent } from './microfrontends/booking-mf/booking/booking';
import { HistoryComponent } from './microfrontends/history-mf/history/history';
import { ProfileComponent } from './microfrontends/profile-mf/profile/profile';
import { LoginComponent } from './microfrontends/auth-mf/login/login';

import { AuthGuard } from './core/services/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: Shell,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        component: DashboardComponent
      },

      {
        path: 'booking',
        component: BookingComponent
      },

      {
        path: 'history',
        component: HistoryComponent
      },

      {
        path: 'profile',
        component: ProfileComponent
      }

    ]
  }

];