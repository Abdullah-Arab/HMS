import Room from '../../../types/room';
import ApiResponse from '../../../types/api-response';
import { RoomService } from './../../services/room.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiDropdown, TuiLoader, TuiTitle } from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiItemsWithMore,
  TuiProgressBar,
  TuiRadioList,
  TuiStatus,
  TuiTabs,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { TitleComponent } from '../title/title.component';
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    FormsModule,
    TuiButton,
    TuiDropdown,
    TuiItemsWithMore,
    TuiStatus,
    TuiTable,
    TuiTitle,
    TuiLoader,
    TitleComponent,
    TuiTabs,
  ],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {
  roomsData = signal<ApiResponse<Room> | undefined>(undefined);
  isLoading = signal<boolean>(true);
  protected activeItemIndex = 0;

  roomService: RoomService = inject(RoomService);

  constructor() {}

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

  protected get checked(): boolean | null {
    // const every = this.data.every(({ selected }) => selected);
    // const some = this.data.some(({ selected }) => selected);

    // return every || (some && null);
    return null;
  }

  protected onCheck(checked: boolean): void {
    //   this.data.forEach((item) => {
    //     item.selected = checked;
    //   });
  }

  protected onClick(item: string): void {
      console.log('Clicked', item);
  }
}
