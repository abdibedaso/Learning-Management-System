import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CoursesService } from './../courses.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  template: `
  
    <section class="jumbotron mt-4 ">

      <div class="row mb-2">
        <div class="col-6">
          <h1>Courses</h1>
          <p class="lead">This example is a quick exercise to illustrate how the top-aligned navbar works.</p>
        </div>
        <div class="col-6">
        </div>
      </div>
          
    </section>
    
    <div class="container-lg">

      <div class="row">
        
        <div class="col-md-4" *ngFor="let course of courses; let i = index" [value]="courses[i]._id">
          <div class="card mb-4 shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="35%" y="50%" fill="#eceeef" dy=".3em">{{courses[i].title}}</text></svg>
            <div class="card-body">
              <p class="card-text">{{course.title}}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group mb-2">
                  <small class="text-muted ">{{courses[i].language}}</small>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary" routerLink="./instructor/{{courses[i].instructor._id}}/">Instructor {{courses[i].instructor.name}}</button>

                </div>
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-primary" routerLink="./{{courses[i]._id}}/">View</button>
                  <!-- <button type="button" class="btn btn-sm btn-outline-primary">Enroll</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  `,
  styles: [
  ]
})
export class ListComponent implements OnInit {
  categories = [];
  courses = [];

  constructor(
    public fb: FormBuilder,
    public coursesService: CoursesService,
    public router: Router,
    private actRoute: ActivatedRoute) { 
      this.getCourses();
      this.getCategories();
  }

  getCourses() {

    this.coursesService.getCourses().subscribe((res) => {
      this.courses = res.data;
    });

  }
  
  getCategories() {
    this.coursesService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
  
  ngOnInit(): void {
  }

}
