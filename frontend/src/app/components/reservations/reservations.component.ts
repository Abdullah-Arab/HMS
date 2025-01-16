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
import ApiResponse from '../../../types/api-response';
import { RoomService } from '../../services/room.service';
import { TuiCardMedium } from '@taiga-ui/layout';
import { TuiResponsiveDialog } from '@taiga-ui/addon-mobile';
import type { TuiResponsiveDialogOptions } from '@taiga-ui/addon-mobile';
import { RouterLink, RouterOutlet } from '@angular/router';
import Reservation from '../../../types/reservation';
import { ReservationsService } from '../../services/reservations.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservations',
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
    DatePipe,
  ],
  templateUrl: './reservations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationsComponent implements OnInit {
  reservationsData = signal<ApiResponse<Reservation[]> | undefined>(undefined);
  isLoading = signal<boolean>(true);

  readonly tabs = signal([
    { title: 'Table', icon: 'table' },
    { title: 'Calendar', icon: 'calendar' },
  ]);
  protected activeItemIndex = 0;
  protected onClick(item: string): void {
    console.log('Clicked', item);
  }

  reservationService: ReservationsService = inject(ReservationsService);
  currentPage = 0; // Start from 0 for tui-pagination
  pageSize = 10; // Default number of items per page
  pageSizeOptions = [5, 10, 20, 50]; // Options for items per page

  ngOnInit() {
    this.fetchReservations();
  }

  // Fetch reservations with pagination
  fetchReservations(): void {
    this.isLoading.set(true);
    const apiPage = this.currentPage + 1; // Convert to backend's 1-based index
    this.reservationService
      .getReservations({
        page: apiPage,
        limit: this.pageSize,
      })
      .subscribe({
        next: (res) => {
          const response: ApiResponse<Reservation[]> = res;
          if (response.status === 'error') {
            console.error('Error fetching reservations', response.error);
            return;
          }
          this.reservationsData.set(response);
        },
        error: (error) => {
          console.error('Error fetching reservations', error);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  // Handle page change
  onPageChange(page: number): void {
    this.currentPage = page; // Update the current page (0-based index)
    this.fetchReservations(); // Fetch reservations for the new page
  }

  // Handle limit change
  onLimitChange(limit: number): void {
    this.pageSize = limit; // Update the limit
    this.currentPage = 0; // Reset to the first page
    this.fetchReservations(); // Fetch reservations with the new limit
  }
}
