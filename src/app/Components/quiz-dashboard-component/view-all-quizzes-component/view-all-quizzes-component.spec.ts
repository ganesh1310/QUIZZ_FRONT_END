import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllQuizzesComponent } from './view-all-quizzes-component';

describe('ViewAllQuizzesComponent', () => {
  let component: ViewAllQuizzesComponent;
  let fixture: ComponentFixture<ViewAllQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllQuizzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
