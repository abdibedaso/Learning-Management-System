import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  endpoint: string = 'http://localhost:3900/api/teachers';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

search(query:string):Observable<any[]>{

  let api = `${this.endpoint}/courses?courseName=${query}`;
  return this.http.get(api)
      .pipe(
        map((response: any) => response.items)
      );
  }
/* GET heroes whose name contains search term */
searchHeroes(query: string): Observable<any> {
  let api = `${this.endpoint}/courses?courseName=${query}`;
  // if (!query.trim()) {
  //   // if not search term, return empty hero array.
  //   return of([]);
  // }
  return this.http.get(api)
      .pipe(
        catchError(this.handleError('searchHeroes', []))
      )
}
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.log(`failed: ${error.message}`);
    return of(result as T);
  };
}

}


