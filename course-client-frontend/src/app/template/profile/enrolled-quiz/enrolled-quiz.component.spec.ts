import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledQuizComponent } from './enrolled-quiz.component';

describe('EnrolledQuizComponent', () => {
  let component: EnrolledQuizComponent;
  let fixture: ComponentFixture<EnrolledQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolledQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
