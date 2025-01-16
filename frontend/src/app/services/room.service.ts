import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../../types/api-response';
import { catchError, Observable, retry, throwError } from 'rxjs';
import Room from 'types/room';
import { ApiService } from './api.service';
import { PaginationParams } from 'types/types';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  url = 'http://localhost:3345/api/v1/rooms';

  constructor(private api: ApiService) {}

  // Fetch all rooms
  getRooms = (params: PaginationParams): Observable<ApiResponse<Room[]>> => {
    return this.api.get<ApiResponse<Room[]>>(this.url, {
      params,
      responseType: 'json',
    });
  };

  // Fetch a single room
  getRoom = (id: string): Observable<ApiResponse<Room>> => {
    return this.api.get<ApiResponse<Room>>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  };

  // Fetch rooms count
  getRoomsCount = (): Observable<ApiResponse<number>> => {
    return this.api.get<ApiResponse<number>>(`${this.url}/count`, {
      responseType: 'json',
    });
  };

  // Create a new room
  createRoom = (room: Partial<Room>): Observable<ApiResponse<Room>> => {
    return this.api.post<ApiResponse<Room>>(this.url, room, {
      responseType: 'json',
    });
  };

  // Update an existing room
  updateRoom = (id: string, room: Partial<Room>): Observable<ApiResponse<Room>> => {
    return this.api.put<ApiResponse<Room>>(`${this.url}/${id}`, room, {
      responseType: 'json',
    });
  };

  // Delete a room
  deleteRoom = (id: string): Observable<ApiResponse<Room>> => {
    return this.api.delete<ApiResponse<Room>>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  };

}
