import { Component, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../../title/title.component';
import { TuiTabs } from '@taiga-ui/kit';
import { RoomsDetailsComponent } from '../rooms-details/rooms-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  imports: [TuiTabs, RoomsDetailsComponent, TitleComponent],
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
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
