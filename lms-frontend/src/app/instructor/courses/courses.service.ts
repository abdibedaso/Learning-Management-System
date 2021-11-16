import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  endpoint: string = 'http://localhost:3900/api/instructors';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService
  ) {
  }

  // create
  create(id:string, reqObj: Object): Observable<any> {
    let api = `${this.endpoint}/${id}/courses`;
    return this.http.post(api,  reqObj)
      .pipe(
        catchError(this.handleError)
      )
  }

  // getCategories
  getCourses(id:string): Observable<any> {
    let api = `${this.endpoint}/${id}/courses`;
    return this.http.get(api)
      .pipe(
        catchError(this.handleError)
      )
  }

  // getCoursesSections
  getCoursesSections({id, course_id }): Observable<any> {
    let api = `${this.endpoint}/${id}/courses/${course_id}/sections`;
    return this.http.get(api)
      .pipe(
        catchError(this.handleError)
      )
  }

  // patchCoursesSections
  patchCoursesSections({id, course_id, section:{ number, title, content }}, fileToUpload: File): Observable<any> {
    let api = `${this.endpoint}/${id}/courses/${course_id}/sections`;
    const formData: FormData = new FormData();
    formData.append('content', fileToUpload, fileToUpload.name);
    
    formData.append('number', number);
    formData.append('title', title);
    // , {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data;')}
    return this.http.post(api, formData)
      .pipe(
        map(() => { return true; }),
        catchError(this.handleError)
      )
  }

  // getCategories
  getCategories(): Observable<any> {
    let api = `http://localhost:3900/api/categories`;
    return this.http.get(api,  {
    })
      .pipe(
        catchError(this.handleError)
      )
  }

  // // Sign-in
  // signIn(user: User) {
  //   return this.http.post<any>(`${this.endpoint}/auth`, {
  //     ...user
  //   }, { headers: this.headers})
  //     .subscribe((res: any) => {

  //       let {_id, name, email, role } = this.getDecodedAccessToken(res.data.token); // decode token
  //       // console.log(_id, name, email, role); // show decoded token object in console

  //       this.cookieService.set('access_token', res.data.token);
  //       // console.log(this.cookieService.get('access_token'));

  //       // localStorage.setItem('access_token', res.data.token)
  //       // this.getUserProfile(_id).subscribe((res) => {
  //         this.currentUser = {_id, name, email, role};
  //         if(this.isStudent)
  //           this.router.navigate(['user/' + _id]);
  //         else if(this.isInstructor)
  //           this.router.navigate([`instructor/${_id}/courses`]);
  //       // })
  //     })
  // }

  // getToken() {
  //   return this.cookieService.get('access_token');
  // }

  // get isLoggedIn(): boolean {
  //   let authToken = this.cookieService.get('access_token');
  //   return (authToken !== '') ? true : false;
  // }

  // doLogout() {
  //   let removeToken = this.cookieService.delete('access_token');
  //   // if (removeToken !== null) {
  //     this.router.navigate(['home']);
  //   // }
  // }

  // // User profile
  // getUserProfile(id): Observable<any> {
  //   // let api = `${this.endpoint}/user/${id}`;
  //   // return this.http.get(api, { headers: this.headers }).pipe(
  //   //   map((res: Response) => {
  //   //     return res || {}
  //   //   }),
  //   //   catchError(this.handleError)
  //   // )
  //   return new Observable().pipe(
  //       map(_ => {
  //         let {_id, name, email, role } = this.getDecodedAccessToken(this.cookieService.get('access_token'));
  //         return {_id, name, email, role };
  //       }),
  //       catchError(this.handleError)
  //   );
  // }

  // getCurrentUserProfile(): Observable<any> {
  //   return of(this.getDecodedAccessToken(this.cookieService.get('access_token')));
  // }

  // getCurrentUserRole(): Observable<any> {
  //   return of(this.getDecodedAccessToken(this.cookieService.get('access_token')).role); 
  // }
  
  // get isInstructor(): boolean {
  //   let role:string;

  //  this.getCurrentUserRole().subscribe(res => {
  //     role = res;
  //   })
  //   console.log(role);
  //   return role == 'Instructor' ? true : false;
   
  // }
  
  // get isStudent(): boolean {
  //   let role:string;

  //  this.getCurrentUserRole().subscribe(res => {
  //     role = res;
  //   })
  //   console.log(role);
    
  //   return role == 'Student' ? true : false;
  // }

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

  // getDecodedAccessToken(token: string): any {
  //   try{
  //       return jwt_decode(token);
  //   }
  //   catch(Error){
  //       return null;
  //   }
  // }
}