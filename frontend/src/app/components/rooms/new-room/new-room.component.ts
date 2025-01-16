import { Component, inject } from '@angular/core';
import { TitleComponent } from '../../title/title.component';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule, TuiInputNumberModule } from '@taiga-ui/legacy';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { AsyncPipe, Location } from '@angular/common';
import Room from 'types/room';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-room',
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
    TuiInputNumberModule,
    AsyncPipe,
  ],
  templateUrl: './new-room.component.html',
})
export class NewRoomComponent {
  roomId: string | null = null;
  room: Room | undefined = undefined;
  roomService: RoomService = inject(RoomService);

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
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  onCancel() {
    // go back
    this.location.back();
  }

  onSubmit() {
    console.log('Form Submitted:', this.roomForm.value);
    // Call the service to save changes
    this.roomService
      .createRoom({
        name: this.roomForm.value.name ?? '',
        room_number: Number(this.roomForm.value.number!),
        capacity: Number(this.roomForm.value.capacity!),
      })
      .subscribe({
        next: (room) => {
          console.log('Room created:', room);
          this.location.back();
        },
        error: (error) => {
          console.error('Error creating room:', error);
        },
      });

    this.roomForm.disable();
  }
}
