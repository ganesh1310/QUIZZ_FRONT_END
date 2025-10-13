import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllQuestionsComponent } from './get-all-questions-component';

describe('GetAllQuestionsComponent', () => {
  let component: GetAllQuestionsComponent;
  let fixture: ComponentFixture<GetAllQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
