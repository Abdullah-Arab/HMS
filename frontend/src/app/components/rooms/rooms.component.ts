import { Component, signal } from '@angular/core';
import { TuiLoader } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit';
import { TitleComponent } from '../title/title.component';
import { RoomsDetailsComponent } from './rooms-details/rooms-details.component';
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [TuiTabs, TitleComponent, RoomsDetailsComponent],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {
  tabs = signal([
    { title: 'Details', icon: 'book-text', content: TuiLoader },
    { title: 'History', icon: 'history', content: TuiLoader },
  ]);
  protected activeItemIndex = 0;

  protected onClick(item: string): void {
    console.log('Clicked', item);
  }
}
