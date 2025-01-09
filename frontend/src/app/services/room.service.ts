import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../../types/api-response';
import Room from '../../types/room';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  url = 'http://localhost:3003/api/v1/rooms';
  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return this.http.get<ApiResponse<Room[]>>(this.url).pipe(
      retry(3),
      catchError((res) => {
        console.error('Error fetching rooms (service)', res.error.message);
        return throwError(res.error);
      })
    );
  }
}
