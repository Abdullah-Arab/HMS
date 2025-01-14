import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
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
import ApiResponse from '../../../types/api-response';
import { RoomService } from '../../services/room.service';
import { TuiCardMedium } from '@taiga-ui/layout';
import { TuiResponsiveDialog } from '@taiga-ui/addon-mobile';
import type { TuiResponsiveDialogOptions } from '@taiga-ui/addon-mobile';
import { RouterLink, RouterOutlet } from '@angular/router';
import Room from 'types/room';

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
  rooms: Room[] = [];
  totalRecords = 0;
  limit = 10;
  currentPage = 1; // Start with 1 for clarity
  pageSizeOptions = [5, 10, 20, 50];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.fetchRooms(this.currentPage, this.limit);
  }

  // Fetch rooms with pagination
  fetchRooms(page: number, limit: number): void {
    this.roomService.getRooms({ page, limit }).subscribe({
      next: (res: ApiResponse<Room[]>) => {
        this.rooms = res.data ?? [];
        this.totalRecords = res.pagination?.total ?? 0;
        this.currentPage = res.pagination?.page ?? 1;
      },
      error: (error) => {
        console.error('Error fetching rooms', error);
      },
    });
  }

  // Handle page change
  onPageChange(event: { page: number; limit: number }): void {
    this.fetchRooms(event.page, event.limit);
  }

  // Handle limit change
  onLimitChange(limit: number): void {
    this.limit = limit;
    this.fetchRooms(1, limit); // Reset to first page
  }
}
