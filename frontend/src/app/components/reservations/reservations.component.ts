import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiTabs } from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule, TuiInputNumberModule } from '@taiga-ui/legacy';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-reservations',
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
  templateUrl: './reservations.component.html',
})
export class ReservationsComponent {
  readonly tabs = signal([
    { title: 'Table', icon: 'table' },
    { title: 'Calendar', icon: 'calendar' },
  ]);
  protected activeItemIndex = 0;
  protected onClick(item: string): void {
    console.log('Clicked', item);
  }
}
