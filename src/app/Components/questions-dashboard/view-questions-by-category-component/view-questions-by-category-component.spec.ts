import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionsByCategoryComponent } from './view-questions-by-category-component';

describe('ViewQuestionsByCategoryComponent', () => {
  let component: ViewQuestionsByCategoryComponent;
  let fixture: ComponentFixture<ViewQuestionsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuestionsByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuestionsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
