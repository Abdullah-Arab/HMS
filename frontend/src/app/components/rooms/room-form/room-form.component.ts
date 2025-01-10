import { Component, inject, OnInit, signal } from '@angular/core';
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
import Room from 'types/room';
import { RoomService } from '../../../services/room.service';
import ApiResponse from '../../../../types/api-response';

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
  isLoading = signal(false);
  apiResponse = signal<ApiResponse<Room> | undefined>(undefined);

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService
  ) {
    this.roomForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: [''],
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.isLoading.set(true);

      const newRoom = {
        room_number: this.roomForm.get('number')?.value,
        capacity: this.roomForm.get('capacity')?.value,
        name: this.roomForm.get('name')?.value,
      };

      this.roomService.createRoom(newRoom).subscribe({
        next: (res: ApiResponse<Room>) => {
          this.apiResponse.set(res);
          if (res.status === 'success') {
            this.roomForm.reset();
          } else {
            console.error('Error creating room:', res.error);
          }
        },
        error: (error) => {
          const errorResponse: ApiResponse<Room> = {
            status: 'error',
            message: 'Failed to add room',
            error: error.message || error,
          };
          this.apiResponse.set(errorResponse);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      const invalidResponse: ApiResponse<Room> = {
        status: 'error',
        message: 'Form validation failed',
        error: 'Please fix the form errors before submitting.',
      };
      this.apiResponse.set(invalidResponse);
    }
  }
}
