import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TutorService, Tutor } from '../../core/services/tutor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutors.html',
  styleUrls: ['./tutors.css']
})
export class TutorsComponent implements OnInit {

  tutors: Tutor[] = [];
  filterTerm = '';

  constructor(
    private tutorService: TutorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tutorService.getTutors().subscribe(list => {
      this.tutors = list || [];
    });
  }

  filteredTutors(): Tutor[] {
    const term = (this.filterTerm || '').toLowerCase().trim();
    if (!term) return this.tutors;
    return this.tutors.filter(t => (t.name + ' ' + t.specialty).toLowerCase().includes(term));
  }

  get availableCount(): number {
    return this.tutors.filter(t => t.available).length;
  }

  goToBooking() {
    this.router.navigate(['/booking']);
  }

}
