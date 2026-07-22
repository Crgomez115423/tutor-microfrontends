import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getDashboardData(): Observable<any> {
    return of({

      student: {
        id: 1,
        name: 'Cristian Gómez',
        program: 'Maestría en Arquitectura de Software',
        email: 'cristian.gomez@tutorconnect.edu',
        semester: 2
      },

      nextTutorial: {
        id: 101,
        tutor: 'John Rondón Suárez',
        subject: 'Arquitectura Front-End',
        date: '20/07/2026',
        hour: '4:00 PM',
        modality: 'Virtual',
        status: 'Confirmada'
      },

      stats: {
        activeTutorials: 3,
        tutorialHistory: 12,
        pendingRequests: 2,
        availableTutors: 8
      },

      notifications: [
        {
          id: 1,
          message: 'Tu tutoría de Angular ha sido confirmada.',
          date: '16/07/2026'
        },
        {
          id: 2,
          message: 'Nuevo horario disponible con el tutor Carlos Ruiz.',
          date: '15/07/2026'
        }
      ],

      upcomingTutorials: [
        {
          tutor: 'María Gómez',
          subject: 'Angular',
          date: '23/07/2026'
        },
        {
          tutor: 'Carlos Ruiz',
          subject: 'JavaScript Avanzado',
          date: '28/07/2026'
        }
      ]

    });
  }

}
