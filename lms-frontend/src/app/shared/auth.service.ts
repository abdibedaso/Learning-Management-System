import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3900/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/users`;
    return this.http.post(api,  {
      // ...user,
      name: user.name,
      account:{"role": "Student", email: user.email, password: user.password}
    })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/auth`, {
      ...user,
      "role": "Student"
    }, { headers: this.headers})
      .subscribe((res: any) => {

        let {_id, name, email, role } = this.getDecodedAccessToken(res.data.token); // decode token
        // console.log(_id, name, email, role); // show decoded token object in console

        this.cookieService.set('access_token', res.data.token);
        // console.log(this.cookieService.get('access_token'));

        // localStorage.setItem('access_token', res.data.token)
        // this.getUserProfile(_id).subscribe((res) => {
          this.currentUser = {_id, name, email, role};
          this.router.navigate(['user/' + _id]);
        // })
      })
  }

  getToken() {
    return this.cookieService.get('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = this.cookieService.get('access_token');
    return (authToken !== '') ? true : false;
  }

  doLogout() {
    let removeToken = this.cookieService.delete('access_token');
    if (removeToken == null) {
      this.router.navigate(['home']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    // let api = `${this.endpoint}/user/${id}`;
    // return this.http.get(api, { headers: this.headers }).pipe(
    //   map((res: Response) => {
    //     return res || {}
    //   }),
    //   catchError(this.handleError)
    // )
    return new Observable().pipe(
        map(_ => {
          let {_id, name, email, role } = this.getDecodedAccessToken(this.cookieService.get('access_token'));
          return {_id, name, email, role };
        }),
        catchError(this.handleError)
    );
  }

  
  getCurrentUserProfile(): Observable<any> {
    return of(this.getDecodedAccessToken(this.cookieService.get('access_token')));
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}