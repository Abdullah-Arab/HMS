import { Component, inject, signal } from '@angular/core';
import { TuiFieldErrorPipe, TuiTabs } from '@taiga-ui/kit';
import { TitleComponent } from '../../title/title.component';
import { ActivatedRoute } from '@angular/router';
import { GuestsService } from 'src/app/services/guests.service';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import Guest from 'types/guest';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, Location } from '@angular/common';
import { ReservationsService } from 'src/app/services/reservations.service';
import Reservation from 'types/reservation';
import ApiResponse from 'types/api-response';

@Component({
  selector: 'app-guest-details',
  standalone: true,
  imports: [
    TuiTabs,
    TitleComponent,
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiButton,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './guest-details.component.html',
})
export class GuestDetailsComponent {
  guestId: string | null = null;
  guest: Guest | undefined = undefined;
  guestService: GuestsService = inject(GuestsService);
  reservationsService: ReservationsService = inject(ReservationsService);

  currentReservations: Reservation[] = [];
  pastReservations: Reservation[] = [];
  upcomingReservations: Reservation[] = [];

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

  protected isEditing = false;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.guestId = this.route.snapshot.paramMap.get('id');
    this.fetchGuestDetails();
    this.fetchReservations();
  }

  fetchGuestDetails() {
    this.guestService
      .getGuest(this.guestId!)
      .subscribe((response: ApiResponse<Guest>) => {
        this.guest = response.data;
        this.guestForm.patchValue({
          name: this.guest?.name,
          email: this.guest?.email,
          phone: this.guest?.phone,
        });
      });
    this.guestForm.disable(); // Disable the form initially
  }

  fetchReservations() {
    const params = { page: 1, limit: 10, guestId: this.guestId! };

    this.reservationsService.getCurrentReservations(params).subscribe({
      next: (response) => (this.currentReservations = response.data ?? []),
      error: (error) =>
        console.error('Error fetching current reservations:', error),
    });

    this.reservationsService.getPastReservations(params).subscribe({
      next: (response) => (this.pastReservations = response.data ?? []),
      error: (error) =>
        console.error('Error fetching past reservations:', error),
    });

    this.reservationsService.getUpcomingReservations(params).subscribe({
      next: (response) => (this.upcomingReservations = response.data ?? []),
      error: (error) =>
        console.error('Error fetching upcoming reservations:', error),
    });
  }

  onEdit() {
    this.isEditing = true;
    this.guestForm.enable();
  }

  onCancel() {
    this.isEditing = false;
    this.guestForm.reset({
      name: this.guest?.name,
      email: this.guest?.email,
      phone: this.guest?.phone,
    });
    this.guestForm.disable();
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this guest?')) {
      this.guestService.deleteGuest(this.guestId!).subscribe(() => {
        alert('Guest deleted successfully!');
        this.location.back();
      });
    }
  }

  onSubmit() {
    this.guestService
      .updateGuest(this.guestId!, this.guestForm.value as Guest)
      .subscribe((response: ApiResponse<Guest>) => {
        console.log('Guest updated:', response);
        this.isEditing = false;
        this.guestForm.disable();
      });
  }
}
