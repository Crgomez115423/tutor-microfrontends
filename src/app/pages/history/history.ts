import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/services/booking';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.html'
})
export class HistoryComponent implements OnInit {

  reservations: any[] = [];
  filterTerm = '';
  statusFilter = '';

  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    this.bookingService
      .reservations$
      .subscribe((data: any[]) => {

        this.reservations = data;

      });

  }

    filteredReservations(): any[] {
      const term = (this.filterTerm || '').toLowerCase().trim();
      const status = (this.statusFilter || '').toLowerCase().trim();
      return this.reservations.filter(r => {
        if (status && (r.status || '').toLowerCase() !== status) return false;
        if (!term) return true;
        const hay = ((r.tutor || '') + ' ' + (r.subject || '') + ' ' + (r.date || '')).toLowerCase();
        return hay.includes(term);
      });
    }

  trackById(index: number, item: any) {
    return item.id;
  }

  changeStatus(reservation: any, status: string) {
    this.bookingService.updateReservationStatus(reservation.id, status);
  }

  statusClasses(status: string) {
    switch ((status || '').toLowerCase()) {
      case 'confirmada':
        return 'bg-blue-100 text-blue-800 border border-blue-100';
      case 'completada':
        return 'bg-green-100 text-green-800 border border-green-100';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border border-red-100';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-100';
    }
  }

}
