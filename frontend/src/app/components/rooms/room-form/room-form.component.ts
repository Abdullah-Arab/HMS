import { Component, OnInit } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder) {
    this.roomForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: [''],
    });
  }

  onSubmit(): void {
    console.log('hey');
    if (this.roomForm.valid) {
      console.log('Form Submitted Successfully!', this.roomForm.value);
    } else {
      console.log('Form Submission Failed. Please check the fields.');
    }
  }

  get roomNumberContent() {
    return this.roomForm.get('number')?.value;
  }

  get roomCapacityContent() {
    return this.roomForm.get('capacity')?.value;
  }
}
