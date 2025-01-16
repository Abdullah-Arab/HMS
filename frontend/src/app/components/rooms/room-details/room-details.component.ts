import { Component, signal } from '@angular/core';
import { TuiTabs } from '@taiga-ui/kit';
import { TitleComponent } from '../../title/title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-details',
  imports: [TuiTabs, TitleComponent],
  templateUrl: './room-details.component.html'
})
export class RoomDetailsComponent {
  roomId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  tabs = signal([
    { title: 'Details', icon: 'book-text' },
    { title: 'History', icon: 'history' },
  ]);
  protected activeItemIndex = 0;

  protected onClick(item: string): void {
    console.log('Clicked', item);
  }

  ngOnInit(): void {
    // Retrieve the 'id' parameter from the route
    this.roomId = this.route.snapshot.paramMap.get('id');
    console.log('Room ID:', this.roomId);

    // get room details by id
  }
}
