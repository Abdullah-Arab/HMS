import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGuestComponent } from './new-guest.component';

describe('NewGuestComponent', () => {
  let component: NewGuestComponent;
  let fixture: ComponentFixture<NewGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
