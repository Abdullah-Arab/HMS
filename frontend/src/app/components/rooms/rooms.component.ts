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
  pageSize = 10;
  currentPage = 1; // Start with 1 for clarity
  pageSizeOptions = [5, 10, 20, 50];
  totalPages = 0;
  isLoading = false;
  hasError = false;
  errorMesage = '';

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.fetchRooms(this.currentPage, this.pageSize);
  }

  // Fetch rooms with pagination
  //todo: handle next & error
  fetchRooms(page: number, limit: number): void {
    this.isLoading = true;
    this.roomService.getRooms({ page, limit }).subscribe({
      next: (res: ApiResponse<Room[]>) => {
        this.rooms = res.data ?? [];
        this.totalRecords = res.pagination?.total ?? 0;
        this.currentPage = res.pagination?.page ?? 1;
        this.totalPages = res.pagination?.totalPages ?? 0;
        this.isLoading = false;
      },
      error: (
        // error: ApiResponse<string>
        error
      ) => {
        console.error('Error fetching rooms', error);
        this.hasError = true;
        this.errorMesage = error;
        this.isLoading = false;
      },
    });
  }

  // Handle page change
  onPageChange(page: number): void {
    this.fetchRooms(page, this.pageSize);
  }

  // Handle limit change
  onLimitChange(limit: number): void {
    this.pageSize = limit;
    this.fetchRooms(1, limit); // Reset to first page
  }
}
