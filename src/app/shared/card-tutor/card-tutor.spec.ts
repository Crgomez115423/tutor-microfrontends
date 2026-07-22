import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTutor } from './card-tutor';

describe('CardTutor', () => {
  let component: CardTutor;
  let fixture: ComponentFixture<CardTutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTutor],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTutor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
