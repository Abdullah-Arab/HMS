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

  // // Fetch rooms count
  // getRoomsCount(): Observable<any> {
  //   return this.http.get<ApiResponse<number>>(`${this.url}/count`).pipe(
  //     retry(3),
  //     catchError((res) => {
  //       console.error(
  //         'Error fetching rooms count (service)',
  //         res.error.message
  //       );
  //       return throwError(res.error);
  //     })
  //   );
  // }

  // // Create a new room
  // createRoom(room: Partial<Room>): Observable<any> {
  //   return this.http.post<ApiResponse<Room>>(this.url, room).pipe(
  //     catchError((res) => {
  //       console.error('Error creating room (service)', res.error.message);
  //       return throwError(res.error);
  //     })
  //   );
  // }

  // // Update an existing room
  // updateRoom(id: string, room: Room): Observable<any> {
  //   return this.http.put<ApiResponse<Room>>(`${this.url}/${id}`, room).pipe(
  //     catchError((res) => {
  //       console.error('Error updating room (service)', res.error.message);
  //       return throwError(res.error);
  //     })
  //   );
  // }

  // // Delete a room
  // deleteRoom(id: string): Observable<any> {
  //   return this.http.delete<ApiResponse<Room>>(`${this.url}/${id}`).pipe(
  //     catchError((res) => {
  //       console.error('Error deleting room (service)', res.error.message);
  //       return throwError(res.error);
  //     })
  //   );
  // }
}
