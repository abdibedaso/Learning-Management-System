import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  endpoint: string = 'http://localhost:3900/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService
  ) {
  }

  // create
  // create(id:string, reqObj: Object): Observable<any> {
  //   let api = `${this.endpoint}/${id}/courses`;
  //   return this.http.post(api,  reqObj)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  // getCourses
  getCourses(): Observable<any> {
    let api = `${this.endpoint}/courses`;
    return this.http.get(api)
      .pipe(
        catchError(this.handleError)
      )
  }

  // getCourses
  getCourse({course_id}): Observable<any> {
    let api = `${this.endpoint}/courses/${course_id}`;
    return this.http.get(api)
      .pipe(
        catchError(this.handleError)
      )
  }

  // getEnrolledCourse
  getEnrolledCourse({id, course_id}): Observable<any> {
    let api = `${this.endpoint}/students/${id}/courses/${course_id}`;
    return this.http.get(api)
      .pipe(
        catchError(this.handleError)
      )
  }

  // getCourses
  postEnroll({id, course: { _id, title, category, instructor, language, progress, section }}): Observable<any> {
    let api = `${this.endpoint}/students/${id}/courses`;
    return this.http.post(api,  {
      _id: _id,
      title: title,
      category: category,
      instructor: instructor,
      language: language,
      progress: progress,
      section: section,
    })
      .pipe(
        catchError(this.handleError)
      )
  }

  // patchProgress
  patchProgress({id, course_id, section, progress}): Observable<any> {

    let api = `${this.endpoint}/students/${id}/courses/${course_id}`;
    return this.http.patch(api, { section, progress })
      .pipe(
        catchError(this.handleError)
      )
  }

  // getSection
  getSection({id, course_id, section_id}): Observable<any> {

    let api = `${this.endpoint}/instructors/${id}/courses/${course_id}/sections/${section_id}`;
    return this.http.get(api)
      .pipe(
        catchError(this.handleError)
      )
  }

  // // getCoursesSections
  // getCoursesSections({id, course_id }): Observable<any> {
  //   let api = `${this.endpoint}/${id}/courses/${course_id}/sections`;
  //   return this.http.get(api)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  // // patchCoursesSections
  // patchCoursesSections({id, course_id, section}, fileToUpload: File[]): Observable<any> {
  //   let api = `${this.endpoint}/${id}/courses/${course_id}/sections`;
  //   const formData: FormData = new FormData();

  //   fileToUpload.forEach(element => {
  //     formData.append('content', element, element.name);
  //   });

  //   section.forEach(element => {
  //     // formData.append('number', element.number);
  //     formData.append('title', element.title);
  //     formData.append('content', element.content);
  //   });
    
  //   // , {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data;')}
  //   return this.http.post(api, formData)
  //     .pipe(
  //       map(() => { return true; }),
  //       catchError(this.handleError)
  //     )
  // }

  // getCategories
  getCategories(): Observable<any> {
    let api = `http://localhost:3900/api/categories`;
    return this.http.get(api,  {
    })
      .pipe(
        catchError(this.handleError)
      )
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
  
}