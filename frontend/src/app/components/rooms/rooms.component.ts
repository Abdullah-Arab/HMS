import { Component, inject, OnInit, signal } from '@angular/core';

import { TitleComponent } from '../title/title.component';

import {
  TuiAppearance,
  TuiButton,
  TuiDropdown,
  TuiLoader,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiStatus,
  TuiItemsWithMore,
  TuiTabs,
  TuiPagination,
  TuiDataListWrapper,
  TuiButtonSelect,
} from '@taiga-ui/kit';

import { TuiTable } from '@taiga-ui/addon-table';
import { FormsModule } from '@angular/forms';
import Room from '../../../types/room';
import ApiResponse from '../../../types/api-response';
import { RoomService } from '../../services/room.service';
import { TuiCardMedium } from '@taiga-ui/layout';


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
    TuiDataListWrapper,
    TuiPagination,
    TuiAppearance,
    TuiCardMedium,
  ],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {
  roomsData = signal<ApiResponse<Room> | undefined>(undefined);
  roomsCount = signal<number | undefined>(undefined);
  isLoading = signal<boolean>(true);

  roomService: RoomService = inject(RoomService);
  currentPage = 1;
  pageSize = 10;
  onTap() {
    console.log('Tapped');
  }

  ngOnInit() {
    this.fetchRooms();
  }

  fetchRooms(): void {
    this.roomService.getRooms(this.currentPage, this.pageSize).subscribe({
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


  onPageChange(page: number): void {
    //todo: fix this, page++
    console.log('Page change', page);

    this.currentPage = page;
    this.fetchRooms();
  }

  editRoom(room: Room): void {
    // Implement edit room logic
  }

  moreActions(room: Room): void {
    // Implement more actions logic
  }
}
