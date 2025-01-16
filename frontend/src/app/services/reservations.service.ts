import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import ApiResponse from '../../types/api-response';
import Reservation from '../../types/reservation';
import { PaginationParams } from 'types/types';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private url = 'http://localhost:3345/api/v1/reservations';

  constructor(private api: ApiService) {}

  // Fetch all reservations
  getReservations(
    params: PaginationParams
  ): Observable<ApiResponse<Reservation[]>> {
    return this.api.get<ApiResponse<Reservation[]>>(this.url, {
      params,
      responseType: 'json',
    });
  }

  // Fetch upcoming reservations
  getUpcomingReservations(
    params: PaginationParams
  ): Observable<ApiResponse<Reservation[]>> {
    return this.api.get<ApiResponse<Reservation[]>>(`${this.url}/upcoming`, {
      params,
      responseType: 'json',
    });
  }

  // Fetch past reservations
  getPastReservations(
    params: PaginationParams
  ): Observable<ApiResponse<Reservation[]>> {
    return this.api.get<ApiResponse<Reservation[]>>(`${this.url}/past`, {
      params,
      responseType: 'json',
    });
  }

  // Fetch current reservations
  getCurrentReservations(
    params: PaginationParams
  ): Observable<ApiResponse<Reservation[]>> {
    return this.api.get<ApiResponse<Reservation[]>>(`${this.url}/current`, {
      params,
      responseType: 'json',
    });
  }

  // Fetch a single reservation
  getReservation(id: string): Observable<ApiResponse<Reservation>> {
    return this.api.get<ApiResponse<Reservation>>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }

  // Create a new reservation
  createReservation(
    reservation: Partial<Reservation>
  ): Observable<ApiResponse<Reservation>> {
    return this.api.post<ApiResponse<Reservation>>(this.url, reservation, {
      responseType: 'json',
    });
  }

  // Update an existing reservation
  updateReservation(
    id: string,
    reservation: Partial<Reservation>
  ): Observable<ApiResponse<Reservation>> {
    return this.api.put<ApiResponse<Reservation>>(
      `${this.url}/${id}`,
      reservation,
      {
        responseType: 'json',
      }
    );
  }

  // Cancel a reservation
  cancelReservation(id: string): Observable<ApiResponse<Reservation>> {
    return this.api.delete<ApiResponse<Reservation>>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }
}
