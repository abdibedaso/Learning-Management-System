import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from './../courses.service';

@Component({
  selector: 'app-view',
  template: `
  
    <div class="jumbotron mt-4">
      <h1>{{title}}</h1>
      <p class="lead">{{category}}|{{language}}</p>
      <p class="lead">Offered By Instructor {{instructor.name}}</p>
      <a class="btn btn-md btn-primary mr-2" (click)="home()" role="button">Home</a>
      <a *ngIf="!enrolled" class="btn btn-md btn-primary" (click)="enroll()" role="button">Enroll</a>
      <a *ngIf="enrolled" class="btn btn-md btn-primary" routerLink="./learn" role="button">Go to course</a>
    </div>
    
  <section class="container-fluid col-10">
    
    <div class="my-3 p-3 bg-white rounded shadow-sm">
        
        <h5 class="border-bottom border-gray pb-2 mb-0">Course Sections</h5>

        <div class="media text-muted row">
                  
          <ul class="list-group col-12 ml-2">
            <li class="list-group-item"  *ngFor="let section of sections; let i = index;">
              <div class="row">
                
                <div class="col-0">
                  <svg class="bd-placeholder-img rounded m-1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                    <rect width="100%" height="100%" fill="#007bff"></rect>
                    <text x="35%" y="50%" fill="white" dy=".3em">{{section.number}}</text>
                  </svg>  
                </div>

                <div class="col-12 media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <div class="d-flex justify-content-between align-items-center w-100">
                    <strong class="text-dark">{{section.title}}</strong>
                  </div>
                </div>

              </div>
            </li>
          </ul>

        </div>

    </div>

  </section>
    
  `,
  styles: [
  ]
})
export class ViewComponent implements OnInit {
  title: string = null;
  category: string = null;
  language: string = null;
  _id: string = null;
  
  instructor: any = {};
  sections: Object[] = [];

  enrolled: boolean = true;

  constructor(
    public coursesService: CoursesService,
    public router: Router,
    private _route: ActivatedRoute) { 
      this.isEnrolled();
      this.setData();
  }

  ngOnInit(): void {
  }

  setData(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.getCourse({course_id}).subscribe((res) => {
      this._id = res._id;
      this.title = res.title;
      this.category = res.category;
      this.language = res.language;
      this.instructor = res.instructor;
      this.sections = res.section;
    });

  }

  isEnrolled(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.getEnrolledCourse({id, course_id}).subscribe((res) => {
      this.enrolled = (res != null)   
    });
    

  }

  enroll(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    let course = {_id: this._id, title: this.title, category: this.category, instructor: this.instructor.name, language: this.language, progress:0, section: {number: 1, title: '', progress: 0}}

    this.coursesService.postEnroll({id, course}).subscribe((res) => {
      setTimeout(_=>this.router.navigate(['user', id, 'courses', course_id, 'learn']), 0)
    })
  }

  home(){
    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    setTimeout(_=>this.router.navigate(['user', id, 'courses']), 0)
  }

}
