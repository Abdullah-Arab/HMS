import { Component, inject } from '@angular/core';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule } from '@taiga-ui/legacy';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { AsyncPipe, Location } from '@angular/common';
import Reservation from 'types/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiButton,
    TuiInputModule,
    ReactiveFormsModule,
    TuiError,
    TuiFieldErrorPipe,
    TuiTextfield,
    AsyncPipe,
  ],
  templateUrl: './new-reservation.component.html',
})
export class ReservationsComponent {
  reservationService: ReservationsService = inject(ReservationsService);

  protected readonly reservationForm = new FormGroup({
    guestName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    roomNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    checkInDate: new FormControl('', Validators.required),
    checkOutDate: new FormControl('', Validators.required),
  });

  constructor(private location: Location) {}

  onCancel() {
    // Navigate back
    this.location.back();
  }

  onSubmit() {
    console.log('Form Submitted:', this.reservationForm.value);
    // Call the service to save changes
    this.reservationService.createReservation({} as Reservation).subscribe({
      next: (reservation) => {
        console.log('Reservation created:', reservation);
        this.location.back();
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
      },
    });

    this.reservationForm.disable();
  }
}
