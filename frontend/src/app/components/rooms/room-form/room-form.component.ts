import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '../../title/title.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiButton, TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import Room from '../../../../types/room';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-room-form',
  imports: [
    TitleComponent,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiDataList,
    TuiDataListWrapper,
    ReactiveFormsModule,
    TuiButton,
  ],

  templateUrl: './room-form.component.html',
})
export class RoomFormComponent {
  roomForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  roomService: RoomService = inject(RoomService);

  constructor(private formBuilder: FormBuilder) {
    this.roomForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: [''],
    });
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.roomForm.valid) {
      this.isLoading = true;

      const newRoom: Partial<Room> = {
        room_number: this.roomForm.get('number')?.value,
        capacity: this.roomForm.get('capacity')?.value,
        name: this.roomForm.get('name')?.value,
      };

      this.roomService.createRoom(newRoom).subscribe({
        next: (response) => {
          this.successMessage = 'Room added successfully!';
          this.roomForm.reset(); // Reset the form
        },
        error: (error) => {
          this.errorMessage =
            error.message || 'An error occurred while adding the room.';
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage =
        'Please fix the errors in the form before submitting.';
    }
  }
}
