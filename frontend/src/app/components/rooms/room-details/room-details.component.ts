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
import { AsyncPipe } from '@angular/common';

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
    private formBuilder: FormBuilder
  ) {}

  readonly tabs = signal([
    { title: 'Details', icon: 'book-text' },
    { title: 'History', icon: 'history' },
  ]);
  protected activeItemIndex = 0;

  protected onClick(item: string): void {
    console.log('Clicked', item);
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
  }

  ngOnInit(): void {
    // Retrieve the 'id' parameter from the route
    this.roomId = this.route.snapshot.paramMap.get('id');
    console.log('Room ID:', this.roomId);

    // get room details by id
    this.fetchRoomDetails();
  }

  onSubmit() {
    console.log('Form Submitted:', this.roomForm.value);
  }
}
