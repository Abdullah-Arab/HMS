import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../../types/api-response';
import Room from '../../types/Room';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  url = 'http://localhost:3003/api/v1/rooms';

  constructor(private http: HttpClient) {}

  // Fetch all rooms
  getRooms(page: number, limit: number): Observable<any> {
    return this.http
      .get<ApiResponse<Room[]>>(this.url, {
        params: {
          page: page.toString(),
          limit: limit.toString(),
        },
      })
      .pipe(
        retry(3),
        catchError((res) => {
          console.error('Error fetching rooms (service)', res.error.message);
          return throwError(res.error);
        })
      );
  }

  // Fetch rooms count
  getRoomsCount(): Observable<any> {
    return this.http.get<ApiResponse<number>>(`${this.url}/count`).pipe(
      retry(3),
      catchError((res) => {
        console.error(
          'Error fetching rooms count (service)',
          res.error.message
        );
        return throwError(res.error);
      })
    );
  }

  // Create a new room
  createRoom(room: Partial<Room>): Observable<any> {
    return this.http.post<ApiResponse<Room>>(this.url, room).pipe(
      catchError((res) => {
        console.error('Error creating room (service)', res.error.message);
        return throwError(res.error);
      })
    );
  }

  // Update an existing room
  updateRoom(id: string, room: Room): Observable<any> {
    return this.http.put<ApiResponse<Room>>(`${this.url}/${id}`, room).pipe(
      catchError((res) => {
        console.error('Error updating room (service)', res.error.message);
        return throwError(res.error);
      })
    );
  }

  // Delete a room
  deleteRoom(id: string): Observable<any> {
    return this.http.delete<ApiResponse<Room>>(`${this.url}/${id}`).pipe(
      catchError((res) => {
        console.error('Error deleting room (service)', res.error.message);
        return throwError(res.error);
      })
    );
  }
}
