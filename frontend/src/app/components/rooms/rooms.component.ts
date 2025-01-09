import { Component, inject, OnInit, signal } from '@angular/core';

import { TitleComponent } from '../title/title.component';

import { TuiButton, TuiDropdown, TuiLoader, TuiTitle } from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiProgressBar,
  TuiRadioList,
  TuiStatus,
  TuiItemsWithMore,
  TuiTabs,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { TuiTable } from '@taiga-ui/addon-table';
import { FormsModule } from '@angular/forms';
import Room from '../../../types/room';
import ApiResponse from '../../../types/api-response';
import { RoomService } from '../../services/room.service';
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    TuiTabs,
    TitleComponent,
    TuiButton,
    TuiStatus,
    TuiTitle,
    FormsModule,
    TuiDropdown,
    TuiItemsWithMore,
    TuiTable,
    TuiLoader,
  ],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {
  roomsData = signal<ApiResponse<Room> | undefined>(undefined);
  isLoading = signal<boolean>(true);
  roomService: RoomService = inject(RoomService);
  onTap () {
    console.log('Tapped');
  };

  ngOnInit() {
    this.roomService.getRooms().subscribe({
      next: (res) => {
        console.log('res fetched', res);

        const response: ApiResponse<Room> = res;

        if (response.status === 'error') {
          console.error('Error fetching rooms', response.error);
          return;
        }
        this.roomsData.set(response);
      },
      error: (error) => {
        console.error('Error fetching rooms', error);
        this.isLoading.set(false);
        this.roomsData.set(error);
      },
      complete: () => {
        console.log('Rooms fetch complete');
        this.isLoading.set(false);
      },
    });
  }
}
