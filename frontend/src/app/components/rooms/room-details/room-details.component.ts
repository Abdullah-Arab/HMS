import { Component, inject, signal } from '@angular/core';
import { TuiFieldErrorPipe, TuiTabs } from '@taiga-ui/kit';
import { TitleComponent } from '../../title/title.component';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiNumberFormat,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiCardLarge, TuiCardMedium, TuiHeader } from '@taiga-ui/layout';
import Room from 'types/room';
import { TuiInputModule, TuiInputNumberModule } from '@taiga-ui/legacy';
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

@Component({
  selector: 'app-room-details',
  imports: [
    TuiTabs,
    TitleComponent,
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
    TuiInputNumberModule,
    AsyncPipe,
  ],
  templateUrl: './room-details.component.html',
})
export class RoomDetailsComponent {
  roomId: string | null = null;
  room: Room | undefined = undefined;
  roomService: RoomService = inject(RoomService);
  reservationsService: ReservationsService = inject(ReservationsService);

  currentReservations: Reservation[] = [];
  pastReservations: Reservation[] = [];
  upcomingReservations: Reservation[] = [];

  protected readonly roomForm = new FormGroup({
    number: new FormControl<number | null>(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern('^[0-9]*$'),
    ]),
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    capacity: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  readonly tabs = signal([
    { title: 'Details', icon: 'book-text' },
    { title: 'History', icon: 'history' },
  ]);
  protected activeItemIndex = 0;

  protected onClick(item: string): void {
    console.log('Clicked', item);
  }

  protected isEditing = false; // Tracks whether the form is in editing mode

  ngOnInit(): void {
    // Retrieve the 'id' parameter from the route
    this.roomId = this.route.snapshot.paramMap.get('id');
    console.log('Room ID:', this.roomId);

    // get room details by id
    this.fetchRoomDetails();
    this.fetchReservations();
  }

  // get room details by id
  fetchRoomDetails() {
    this.roomService.getRoom(this.roomId!).subscribe((response) => {
      console.log('Room Details:', response);
      this.room = response.data;
      this.roomForm.patchValue({
        number: this.room?.room_number,
        name: this.room?.name,
        capacity: this.room?.capacity,
      });
    });
    this.roomForm.disable(); // Keep the form disabled initially
  }

  fetchReservations() {
    const params = { page: 1, limit: 10, roomId: this.roomId! };

    this.reservationsService.getCurrentReservations(params).subscribe({
      next: (response) => {
        console.log('Current Reservations:', response);
        this.currentReservations = response.data ?? [];
      },
      error: (error) =>
        console.error('Error fetching current reservations:', error),
    });

    this.reservationsService.getPastReservations(params).subscribe(
      (response) => {
        console.log('Past Reservations:', response);
        this.pastReservations = response.data ?? [];
      },
      (error) => console.error('Error fetching past reservations:', error)
    );

    this.reservationsService.getUpcomingReservations(params).subscribe(
      (response) => {
        console.log('Upcoming Reservations:', response);
        this.upcomingReservations = response.data ?? [];
      },
      (error) => console.error('Error fetching upcoming reservations:', error)
    );
  }

  onEdit() {
    this.isEditing = true;
    this.roomForm.enable();
  }

  onCancel() {
    this.isEditing = false;
    this.roomForm.reset({
      number: this.room?.room_number,
      name: this.room?.name,
      capacity: this.room?.capacity,
    });
    this.roomForm.disable();
  }
  onDelete() {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(this.roomId!).subscribe(() => {
        alert('Room deleted successfully!');
        // Redirect or perform other actions after deletion
        this.location.back();
      });
    }
  }

  onSubmit() {
    console.log('Form Submitted:', this.roomForm.value);
    // Call the service to save changes
    this.roomService
      .updateRoom(this.roomId!, {
        name: this.roomForm.value.name ?? '',
        room_number: this.roomForm.value.number!,
        capacity: this.roomForm.value.capacity!,
      })
      .subscribe((response) => {
        console.log('Room Updated:', response);
        this.isEditing = false;
        this.roomForm.disable();
      });

    this.isEditing = false;
    this.roomForm.disable();
  }
}
