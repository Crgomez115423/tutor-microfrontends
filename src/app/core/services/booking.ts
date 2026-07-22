import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {



  private reservationsSubject =
    new BehaviorSubject<any[]>([]);

  reservations$ =
    this.reservationsSubject.asObservable();

  constructor() {

    const stored = localStorage.getItem('reservations');

    if (stored) {
      this.reservationsSubject.next(JSON.parse(stored));
    } else {
      // Add demo reservations when none exist to show history
      const demo = [
        {
          id: 1001,
          tutor: 'Juan Pérez',
          subject: 'Revisión de componentes',
          date: '2026-06-14 10:00',
          status: 'Confirmada'
        },
        {
          id: 1002,
          tutor: 'María Gómez',
          subject: 'Introducción a Angular',
          date: '2026-05-27 16:00',
          status: 'Completada'
        }
      ];

      this.reservationsSubject.next(demo);
      localStorage.setItem('reservations', JSON.stringify(demo));
    }

  }

  saveReservation(reservation: any) {

    const current =
      this.reservationsSubject.value;

    const updated = [
      ...current,
      reservation
    ];

    this.reservationsSubject.next(
      updated
    );

    localStorage.setItem(
      'reservations',
      JSON.stringify(updated)
    );

  }

  updateReservationStatus(id: number, status: string) {
    const current = this.reservationsSubject.value;
    const updated = current.map(r => {
      if (r.id === id) {
        return { ...r, status };
      }
      return r;
    });

    this.reservationsSubject.next(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  }






    getTutors(): Observable<any[]> {

    return of([
      {
        id: 1,
        name: 'John Rondón Suárez',
        specialty: 'Arquitectura Front-End'
      },
      {
        id: 2,
        name: 'María Gómez',
        specialty: 'Angular'
      },
      {
        id: 3,
        name: 'Carlos Ruiz',
        specialty: 'JavaScript'
      }
    ]);

  }

}
