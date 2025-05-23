import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFilterComponent } from './course-filter.component';

describe('CourseFilterComponent', () => {
  let component: CourseFilterComponent;
  let fixture: ComponentFixture<CourseFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
