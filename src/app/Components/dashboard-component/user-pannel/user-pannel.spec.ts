import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPannel } from './user-pannel';

describe('UserPannel', () => {
  let component: UserPannel;
  let fixture: ComponentFixture<UserPannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPannel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPannel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
