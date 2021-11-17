import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from './../courses.service';

@Component({
  selector: 'app-section',
  template: `
  <section class="jumbotron mt-4">
      <h1>{{title}}</h1>
      <p class="lead">{{category}}|{{language}}</p>
      <p class="lead">Offered By Instructor {{instructor.name}}</p>
      <a class="btn btn-md btn-primary mr-2" (click)="home()" role="button">Home</a>
      <a *ngIf="!enrolled" class="btn btn-md btn-primary" (click)="enroll()" role="button">Enroll</a>
      <a *ngIf="enrolled" class="btn btn-md btn-primary" routerLink="../../learn" role="button">Go to course</a>
  </section>

  <!-- <section class="container-fluid col-10">
    
    <div class="my-3 p-3 bg-white rounded shadow-sm">
        
        <h5 class="border-bottom border-gray pb-2 mb-0">Section</h5>

        <div class="media text-muted row">
                  
          <ul class="list-group col-12 ml-2">
            <li class="list-group-item">
              <div class="row">
                
                <div class="col-0">
                  <svg class="bd-placeholder-img rounded m-1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                    <rect width="100%" height="100%" fill="#007bff"></rect>
                    <text x="35%" y="50%" fill="white" dy=".3em">{{number}}</text>
                  </svg>  
                </div>

                <div class="col-12 media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <div class="d-flex justify-content-between align-items-center w-100">
                    <strong class="text-dark">{{title}}</strong>
                  </div>
                </div>

              </div>
            </li>
          </ul>

        </div>

    </div>

  </section> -->

  <div class="container-fluid mr-xl-n5 pl-xl-n5">

      <div class="row row-offcanvas row-offcanvas-right">

        <div class="col-xs-6 col-sm-2 mr-xl-5 sidebar-offcanvas" id="sidebar">
          <div *ngIf="sections != null" class="list-group">
            <a class="list-group-item" routerLinkActive="active" *ngFor="let section of sections; let i = index;" routerLink="../{{section._id}}" [queryParams]="{instructor: instructor._id | json }">{{section.title}}</a>
          </div>
        </div>
        

        <div *ngIf="content != null" class="col-xs-12 col-sm-9">

            <video autoplay="" width="800" controls muted="muted" (ended)="videoEnd()">
              <source src="{{content}}" type="video/mp4" />
            </video>

        </div>
        
      </div>

    </div>
  `,
  styles: [
  ]
})
export class SectionComponent implements OnInit {
  _id: string = null;
  title: string = null;
  number: number = null;
  content: string = null;

  courses_id: string = null;
  coursesTitle: string = null;
  category: string = null;
  language: string = null;
  
  instructor: any = {};
  sections: Object[] = [];

  progress: number = null;
  currentSections: any = {};

  enrolled: boolean = true;

  constructor(
    public coursesService: CoursesService,
    public router: Router,
    private _route: ActivatedRoute) { 
      this._route.queryParams.subscribe(params => {
        this.instructor._id = JSON.parse(params.instructor) as string;
      });
      this.onlyIfEnrolled();
      this.setCourseData(); 
      this.setMyData();
      this.setSectionData();
      // this.content = `http://localhost:3900/api/instructors/video/000b10b9e5e12c7a44e36c505e5e800b`
      
  }

  ngOnInit(): void {
  }

  setCourseData(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.getCourse({course_id}).subscribe((res) => {
      this.courses_id = res._id;
      this.coursesTitle = res.title;
      this.category = res.category;
      this.language = res.language;
      this.instructor = res.instructor;
      this.sections = res.section;
      this.progress = res.progress;
    })   

  }

  setSectionData(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    let section_id = this._route.snapshot.paramMap.get('section_id');
    
   this.coursesService.getSection({id: this.instructor._id, course_id, section_id}).subscribe((res) => {
      this._id = res[0]._id;
      this.title = res[0].title;
      this.number = res[0].number;
      this.content = `http://localhost:3900/api/instructors/video/${res[0].content}`;
    })
    
  }
  
  setMyData(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.getEnrolledCourse({id, course_id}).subscribe((res) => {
      this.currentSections = res.courses[0].section;
      this.progress = res.courses[0].progress;
    })

  }

  videoEnd(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    let section_id = this._route.snapshot.paramMap.get('section_id');
    
    this.coursesService.patchProgress({id: id, course_id, section: {title: this.title, number: this.number, progress: this.progress}, progress: this.progress}).subscribe((res) => {
      console.log(res);
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
