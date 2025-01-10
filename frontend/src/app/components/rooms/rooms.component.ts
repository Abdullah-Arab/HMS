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
  isEditing = signal<boolean>(false);
  selectedRoom = signal<Room | null>(null);

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

  // Add a new room
  addRoom(): void {
    console.log('Add Room clicked');
    this.isEditing.set(false);
    this.selectedRoom.set(null);
  }

  // Edit an existing room
  editRoom(room: Room): void {
    this.isEditing.set(true);
    this.selectedRoom.set(room);
  }

  // Save room (create or update)
  saveRoom(room: Room): void {
    if (this.isEditing()) {
      this.roomService.updateRoom(room.id!, room).subscribe({
        next: () => {
          this.fetchRooms();
          this.selectedRoom.set(null);
        },
        error: (error) => console.error('Error updating room', error),
      });
    } else {
      this.roomService.createRoom(room).subscribe({
        next: () => {
          this.fetchRooms();
          this.selectedRoom.set(null);
        },
        error: (error) => console.error('Error creating room', error),
      });
    }
  }

  // Delete a room
  deleteRoom(id: string): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => this.fetchRooms(),
        error: (error) => console.error('Error deleting room', error),
      });
    }
  }

  // Cancel editing or adding
  cancel(): void {
    this.selectedRoom.set(null);
  }
}
