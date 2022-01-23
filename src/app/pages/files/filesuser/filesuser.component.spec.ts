import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesuserComponent } from './filesuser.component';

describe('FilesuserComponent', () => {
  let component: FilesuserComponent;
  let fixture: ComponentFixture<FilesuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
