import {catchError, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const apiUrl = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub: any): Observable<any> {
    return this.http.post('http://localhost:5000/subscribe', sub).pipe(retry(3), catchError(this.handleError<any>('addPushSubscriber')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
