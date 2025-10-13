import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedUser } from './unauthorized-user';

describe('UnauthorizedUser', () => {
  let component: UnauthorizedUser;
  let fixture: ComponentFixture<UnauthorizedUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizedUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
