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
}
