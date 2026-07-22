import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  goToDashboard() {
    this.router.navigate(['/']);
  }

  goToBooking() {
    this.router.navigate(['/booking']);
  }

  goToTutors() {
    this.router.navigate(['/tutors']);
  }

  goToHistory() {
    this.router.navigate(['/history']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
