import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: string;
  memberSince: string;
  phone: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        this.currentUserSubject.next(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  login(username: string, password: string): Observable<boolean> {
    if (!username || !password) {
      return of(false);
    }

    const user: User = {
      username,
      password,
      fullName: 'Estudiante de Prueba',
      email: `${username.toLowerCase().replace(/\s+/g, '.')}@tutorconnect.com`,
      role: 'Estudiante',
      memberSince: '2024-09-01',
      phone: '+57 312 555 0190',
      location: 'Bogotá, Colombia'
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

}
