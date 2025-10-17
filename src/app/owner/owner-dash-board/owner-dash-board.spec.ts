import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDashBoard } from './owner-dash-board';

describe('OwnerDashBoard', () => {
  let component: OwnerDashBoard;
  let fixture: ComponentFixture<OwnerDashBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerDashBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerDashBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
