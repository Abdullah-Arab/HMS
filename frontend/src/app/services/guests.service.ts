import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import ApiResponse from '../../types/api-response';
import Guest from '../../types/guest';
import { PaginationParams } from 'types/types';

@Injectable({
  providedIn: 'root',
})
export class GuestsService {
  private url = 'http://localhost:3345/api/v1/guests';

  constructor(private api: ApiService) {}

  // Fetch all guests
  getGuests(params: PaginationParams): Observable<ApiResponse<Guest[]>> {
    return this.api.get<ApiResponse<Guest[]>>(this.url, {
      params,
      responseType: 'json',
    });
  }

  // Fetch a single guest
  getGuest(id: string): Observable<ApiResponse<Guest>> {
    return this.api.get<ApiResponse<Guest>>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }

  // Create a new guest
  createGuest(guest: Partial<Guest>): Observable<ApiResponse<Guest>> {
    return this.api.post<ApiResponse<Guest>>(this.url, guest, {
      responseType: 'json',
    });
  }

  // Update an existing guest
  updateGuest(
    id: string,
    guest: Partial<Guest>
  ): Observable<ApiResponse<Guest>> {
    return this.api.put<ApiResponse<Guest>>(`${this.url}/${id}`, guest, {
      responseType: 'json',
    });
  }

  // Delete a guest
  deleteGuest(id: string): Observable<ApiResponse<Guest>> {
    return this.api.delete<ApiResponse<Guest>>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }
}
