import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateDeleteComponent } from './user-update-delete.component';

describe('UserUpdateDeleteComponent', () => {
  let component: UserUpdateDeleteComponent;
  let fixture: ComponentFixture<UserUpdateDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
