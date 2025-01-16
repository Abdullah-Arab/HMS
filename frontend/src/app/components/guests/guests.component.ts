import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  signal,
  inject,
} from '@angular/core';
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
} from '@taiga-ui/kit';
import { TuiTable } from '@taiga-ui/addon-table';
import { FormsModule } from '@angular/forms';
import ApiResponse from '../../../types/api-response';
import Guest from '../../../types/guest';
import { RouterLink } from '@angular/router';
import { GuestsService } from 'src/app/services/guests.service';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [
    TitleComponent,
    TuiTabs,
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
    RouterLink,
  ],
  templateUrl: './guests.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestsComponent implements OnInit {
  guestsData = signal<ApiResponse<Guest[]> | undefined>(undefined);
  guestsCount = signal<number | undefined>(undefined);
  isLoading = signal<boolean>(true);

  guestService: GuestsService = inject(GuestsService);
  currentPage = 0; // Start from 0 for tui-pagination
  pageSize = 10; // Default number of items per page
  pageSizeOptions = [5, 10, 20, 50]; // Options for items per page
  router: any;

  ngOnInit() {
    this.fetchGuests();
  }

  // Fetch guests with pagination
  fetchGuests(): void {
    this.isLoading.set(true);
    const apiPage = this.currentPage + 1; // Convert to backend's 1-based index
    this.guestService
      .getGuests({
        page: apiPage,
        limit: this.pageSize,
      })
      .subscribe({
        next: (res:ApiResponse<Guest[]>) => {
          const response: ApiResponse<Guest[]> = res;
          if (response.status === 'error') {
            console.error('Error fetching guests', response.error);
            return;
          }
          this.guestsData.set(response);
        },
        error: (error: ApiResponse<String>) => {
          console.error('Error fetching guests', error);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  // Handle page change
  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchGuests();
  }

  // Handle limit change
  onLimitChange(limit: number): void {
    this.pageSize = limit;
    this.currentPage = 0;
    this.fetchGuests();
  }

  navigateToGuestDetails(id: string): void {
    this.router.navigate([`/guests/${id}`]);
  }
}
