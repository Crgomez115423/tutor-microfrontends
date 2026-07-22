import { Routes } from '@angular/router';

import { DashboardComponent } from './microfrontends/dashboard-mf/dashboard/dashboard';
import { BookingComponent } from './microfrontends/booking-mf/booking/booking';
import { HistoryComponent } from './microfrontends/history-mf/history/history';
import { ProfileComponent } from './microfrontends/profile-mf/profile/profile';
import { LoginComponent } from './microfrontends/auth-mf/login/login';

import { TutorsComponent } from './pages/tutors/tutors';

import { AuthGuard } from './core/services/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'tutors',
    component: TutorsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  }

];