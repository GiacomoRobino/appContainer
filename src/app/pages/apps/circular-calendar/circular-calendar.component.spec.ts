import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularCalendarComponent } from './circular-calendar.component';

describe('CircularCalendarComponent', () => {
  let component: CircularCalendarComponent;
  let fixture: ComponentFixture<CircularCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
