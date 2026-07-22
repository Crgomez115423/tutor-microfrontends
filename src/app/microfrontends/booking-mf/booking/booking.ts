import { Component, OnInit } from '@angular/core';
import {BookingService} from '../../../core/services/booking';
import { TutorService } from '../../../core/services/tutor.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking',
  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './booking.html'
})
export class BookingComponent implements OnInit {

  reservationCreated = false;

  currentStep = 1;

  tutors: any[] = [];

  selectedTutor: any = null;

  selectedDate = '';

  constructor(
    private bookingService: BookingService,
    private tutorService: TutorService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.tutorService
      .getTutors()
      .subscribe((data: any[]) => {

        // show only available tutors when booking
        this.tutors = (data || []).filter((t: any) => t.available !== false);

      });

  }

  selectTutor(tutor: any) {

    this.selectedTutor = tutor;

    this.currentStep = 2;

  }

  confirmDate() {

    this.currentStep = 3;

  }



  confirmBooking() {

    this.bookingService.saveReservation({

      id: Date.now(),

      tutor: this.selectedTutor.name,

      subject:
      this.selectedTutor.specialty,

      date: this.selectedDate,

      status: 'Confirmada'

    });
    this.reservationCreated = true;





  }
  goToHistory() {
    this.router.navigate(['/history']);
  }

}
