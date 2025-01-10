import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
  signal,
} from '@angular/core';
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
import { TuiResponsiveDialog } from '@taiga-ui/addon-mobile';
import type { TuiResponsiveDialogOptions } from '@taiga-ui/addon-mobile';
import { RouterLink, RouterOutlet } from '@angular/router';

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
    RouterLink,
  ],
  templateUrl: './rooms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnInit {
  roomsData = signal<ApiResponse<Room> | undefined>(undefined);
  roomsCount = signal<number | undefined>(undefined);
  isLoading = signal<boolean>(true);



  roomService: RoomService = inject(RoomService);
  currentPage = 0; // Start from 0 for tui-pagination
  pageSize = 10; // Default number of items per page
  pageSizeOptions = [5, 10, 20, 50]; // Options for items per page

  ngOnInit() {
    this.fetchRooms();
  }

  // Fetch rooms with pagination
  fetchRooms(): void {
    this.isLoading.set(true);
    const apiPage = this.currentPage + 1; // Convert to backend's 1-based index
    this.roomService.getRooms(apiPage, this.pageSize).subscribe({
      next: (res) => {
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

  // Handle page change
  onPageChange(page: number): void {
    this.currentPage = page; // Update the current page (0-based index)
    this.fetchRooms(); // Fetch rooms for the new page
  }

  // Handle limit change
  onLimitChange(limit: number): void {
    this.pageSize = limit; // Update the limit
    this.currentPage = 0; // Reset to the first page
    this.fetchRooms(); // Fetch rooms with the new limit
  }
}
