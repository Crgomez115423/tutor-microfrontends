import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Tutor {
  id: number;
  name: string;
  specialty: string;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  private tutors: Tutor[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      specialty: 'Arquitectura Front-End',
      available: true
    },
    {
      id: 2,
      name: 'María Gómez',
      specialty: 'Angular',
      available: true
    },
    {
      id: 3,
      name: 'Carlos Ruiz',
      specialty: 'JavaScript',
      available: false
    }
  ];

  getTutors(): Observable<Tutor[]> {
    return of(this.tutors);
  }

}
