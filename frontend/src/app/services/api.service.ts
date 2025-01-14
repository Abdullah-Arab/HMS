import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Options } from 'types/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private HttpClient: HttpClient
  ) { }


  // get
  get<T>(url: string, options: Options) : Observable<T>{
    return this.HttpClient.get<T>(url, options).pipe(
      retry(3),
      catchError((res) => {
        console.error('Error fetching rooms (service)', res.error.message);
        return throwError(res.error);
      })
    ) as Observable<T>;
  }
}
