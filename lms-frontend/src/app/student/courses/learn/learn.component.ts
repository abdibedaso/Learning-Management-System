import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from './../courses.service';

@Component({
  selector: 'app-learn',
  template: `

    <div class="jumbotron mt-4">
      <h1>{{title}}</h1>
      <p class="lead">{{category}}|{{language}}</p>
      <p class="lead">Offered By Instructor {{instructor.name}}</p>
      <a class="btn btn-md btn-primary mr-2" (click)="home()" role="button">Home</a>
    </div>

    
    <section class="container-fluid col-10">
      
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <h5 class="border-bottom border-gray pb-2 mb-0">Progress</h5>
      <div class="progress border-bottom border-gray">
        <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style="width: {{(progress<10)? 8: progress}}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{progress}}%</div>
      </div>
    </div>

      <div class="my-3 p-3 bg-white rounded shadow-sm">
          
          <h5 class="border-bottom border-gray pb-2 mb-0">Course Sections</h5>

          <div class="media text-muted row">
                    
            <ul class="list-group col-12 ml-2">
              
            <li class="list-group-item"  *ngFor="let section of sections; let i = index;">

                <div class="row">
                  
                  <div class="col-1">
                    <svg class="bd-placeholder-img rounded " width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                      <rect width="100%" height="100%" fill="#007bff"></rect>
                      <text x="35%" y="50%" fill="white" dy=".3em">{{section.number}}</text>
                    </svg>  
                  </div>

                  <div class="col-12 media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div class="d-flex justify-content-between align-items-center w-100">
                      <strong class="text-dark">{{section.title}}</strong>
                      
                    </div>
                    <a routerLink="../section/{{section._id}}" [queryParams]="{instructor: instructor._id | json }" >Learn</a>
                  </div>

                </div>
              </li>
            </ul>

          </div>

          <small class="d-block text-right mt-3">
            <button  class="btn  ml-2 btn-sm btn-primary" >Generate Certificate</button>
            <!-- <button (click)="addSection()" type="button" class="btn  ml-2 btn-sm btn-primary"> Add Sections</button> -->
        </small>

      </div>

    </section>

    
  `,
  styles: [
  ]
})
export class LearnComponent implements OnInit {
  title: string = null;
  category: string = null;
  language: string = null;
  _id: string = null;
  
  instructor: any = {};
  sections: Object[] = [];

  progress: number = null;
  currentSections: any = {};

  enrolled: boolean = true;

  constructor(
    public coursesService: CoursesService,
    public router: Router,
    private _route: ActivatedRoute) { 
      this.onlyIfEnrolled();
      this.setCourseData();
      this.setMyData();
  }

  ngOnInit(): void {
  }

  setCourseData(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.getCourse({course_id}).subscribe((res) => {
      this._id = res._id;
      this.title = res.title;
      this.category = res.category;
      this.language = res.language;
      this.instructor = res.instructor;
      this.sections = res.section;
      this.progress = this.progress * parseInt(res.section.length);
      
    });
    

  }
  
  setMyData(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.getEnrolledCourse({id, course_id}).subscribe((res) => {
      this.currentSections = res.courses[0].section;
      this.progress = res.courses[0].progress;
    });

  }

  onlyIfEnrolled(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.getEnrolledCourse({id, course_id}).subscribe((res) => {
      this.enrolled = (res !== null);
      if(!this.enrolled)
        setTimeout(_=>this.router.navigate(['user', id, 'courses', course_id]), 0)
    });

  }

  home(){
    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    setTimeout(_=>this.router.navigate(['user', id, 'courses']), 0)
  }

}
