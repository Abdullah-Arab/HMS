import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../../types/api-response';
import Room from '../../types/room';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  url = 'http://localhost:3003/api/v1/rooms';
  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return this.http.get<ApiResponse<Room[]>>(this.url).pipe(
      catchError((error) => {
        console.error('Error fetching rooms', error);
        return throwError(error);
      })
    );
  }
}
