import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsDashboard } from './questions-dashboard';

describe('QuestionsDashboard', () => {
  let component: QuestionsDashboard;
  let fixture: ComponentFixture<QuestionsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
