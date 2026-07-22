import { Routes } from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import {BookingComponent} from './pages/booking/booking';
import {HistoryComponent} from './pages/history/history';import {Profile}from './pages/profile/profile';import {LoginComponent} from './pages/login/login';
import { TutorsComponent } from './pages/tutors/tutors';
import { AuthGuard } from './core/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
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
    component: Profile,
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
