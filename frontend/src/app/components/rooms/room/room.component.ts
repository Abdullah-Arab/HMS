import { Component, signal } from '@angular/core';
import { TitleComponent } from '../../title/title.component';
import { TuiTabs } from '@taiga-ui/kit';
import { RoomsDetailsComponent } from '../rooms-details/rooms-details.component';

@Component({
  selector: 'app-room',
  imports: [TuiTabs, RoomsDetailsComponent],
  templateUrl: './room.component.html',
})
export class RoomComponent {
  tabs = signal([
    { title: 'Details', icon: 'book-text' },
    { title: 'History', icon: 'history' },
  ]);
  protected activeItemIndex = 0;

  protected onClick(item: string): void {
    console.log('Clicked', item);
  }
}
