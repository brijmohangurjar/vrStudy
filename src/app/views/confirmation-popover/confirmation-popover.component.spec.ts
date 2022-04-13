import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPopoverComponent } from './confirmation-popover.component';

describe('ConfirmationPopoverComponent', () => {
  let component: ConfirmationPopoverComponent;
  let fixture: ComponentFixture<ConfirmationPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
