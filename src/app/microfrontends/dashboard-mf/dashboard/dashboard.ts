import {Component, OnInit, inject} from '@angular/core';
import {DashboardService} from '../../../core/services/dashboard';
import { SidebarComponent } from '../../../shared/sidebar/sidebar';
import {Router} from '@angular/router';
import { BookingService } from '../../../core/services/booking';


import { TutorService } from '../../../core/services/tutor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  studentName = '';

  nextTutorial: any = {};

  activeTutorials = 0;

  tutorialHistory = 0;

  cancelledRequests = 0;

  availableTutors = 0;

  notifications: any[] = [];

  reservations: any[] = [];
  tutors: any[] = [];


  private bookingService = inject(BookingService);
  private router = inject(Router);
  private dashboardService = inject(DashboardService);
  private tutorService = inject(TutorService);

  constructor() {}

  ngOnInit(): void {

    this.dashboardService
      .getDashboardData()
      .subscribe(data => {

        // normalize incoming dashboard data
        this.studentName = data?.student?.name ?? data?.studentName ?? '';

        this.nextTutorial = data?.nextTutorial ?? {};

        this.activeTutorials = data?.stats?.activeTutorials ?? 0;

        this.tutorialHistory = data?.stats?.tutorialHistory ?? 0;

        // legacy field in data.stats may be 'pendingRequests'
        this.cancelledRequests = data?.stats?.cancelledRequests ?? data?.stats?.pendingRequests ?? 0;

        this.availableTutors = data?.stats?.availableTutors ?? 0;

        this.notifications = data?.notifications ?? [];

      });

    this.bookingService.reservations$.subscribe((list) => {
      this.reservations = list || [];
      // Recalculate dashboard counts based on current reservations
      const active = this.reservations.filter(r => (r.status || '').toLowerCase() === 'confirmada').length;
      const completed = this.reservations.filter(r => (r.status || '').toLowerCase() === 'completada').length;
      const cancelled = this.reservations.filter(r => (r.status || '').toLowerCase() === 'cancelada').length;

      this.activeTutorials = active;
      this.tutorialHistory = completed;
      this.cancelledRequests = cancelled;

      // Recalculate available tutors: count tutors that are marked available and not booked for a confirmed session
      if (this.tutors && this.tutors.length) {
        const booked = new Set(this.reservations.filter(r => (r.status || '').toLowerCase() === 'confirmada').map(r => r.tutor));
        const available = this.tutors.filter(t => t.available && !booked.has(t.name)).length;
        this.availableTutors = available;
      }

      // compute next upcoming confirmed reservation (nearest future confirmed)
      try {
        const now = Date.now();
        const upcoming = (this.reservations || [])
          .map(r => ({ ...r, _parsed: parseDateTime(r.date) }))
          .filter(r => r._parsed && !isNaN(r._parsed.getTime()) && r._parsed.getTime() >= now && (r.status || '').toLowerCase() === 'confirmada')
          .sort((a, b) => a._parsed.getTime() - b._parsed.getTime());

        if (upcoming.length) {
          const n = upcoming[0];
          this.nextTutorial = {
            id: n.id,
            tutor: n.tutor,
            subject: n.subject,
            date: n._parsed.toLocaleDateString(),
            hour: n._parsed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            modality: n.modality ?? 'Virtual',
            status: n.status
          };
        }
      } catch (e) {
        // ignore parse errors and keep existing nextTutorial
      }
    });

    // Load tutors and compute initial available count
    this.tutorService.getTutors().subscribe((tutors: any[]) => {
      this.tutors = tutors || [];
      this.availableTutors = this.tutors.filter(t => t.available).length;
    });


  }

  goToBooking() {

    this.router.navigate(['/booking']);

  }

  goToHistory() {
    this.router.navigate(['/history']);
  }
}

function parseDateTime(s: any): Date | null {
  if (!s) return null;
  try {
    // If already a Date
    if (s instanceof Date) return s;

    // Try native parser
    let d = new Date(String(s));
    if (!isNaN(d.getTime())) return d;

    // Try replacing space with T for 'YYYY-MM-DD HH:mm' -> 'YYYY-MM-DDTHH:mm'
    const iso = String(s).replace(' ', 'T');
    d = new Date(iso);
    if (!isNaN(d.getTime())) return d;

    // Try dd/mm/yyyy
    const m = String(s).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) {
      const day = Number(m[1]);
      const month = Number(m[2]) - 1;
      const year = Number(m[3]);
      return new Date(year, month, day);
    }

  } catch (e) {
    return null;
  }

  return null;
}

