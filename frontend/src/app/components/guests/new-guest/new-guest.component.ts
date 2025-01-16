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
import Guest from 'types/guest';
import { GuestsService } from 'src/app/services/guests.service';

@Component({
  selector: 'app-new-guest',
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
  templateUrl: './new-guest.component.html',
})
export class NewGuestComponent {
  guestService: GuestsService = inject(GuestsService);

  protected readonly guestForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(private location: Location) {}

  onCancel() {
    // Navigate back
    this.location.back();
  }

  onSubmit() {
    console.log('Form Submitted:', this.guestForm.value);
    // Call the service to save changes
    this.guestService
      .createGuest({
        name: this.guestForm.value.name ?? '',
        email: this.guestForm.value.email ?? '',
        phone: this.guestForm.value.phone ?? '',
      } as Guest)
      .subscribe({
        next: (guest) => {
          console.log('Guest created:', guest);
          this.location.back();
        },
        error: (error) => {
          console.error('Error creating guest:', error);
        },
      });

    this.guestForm.disable();
  }
}
