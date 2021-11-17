import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../../../shared/auth.service';
import { CoursesService } from './../courses.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  template: `

    <!-- <div class="jumbotron">
      <h1>Navbar example</h1>
      <p class="lead">This example is a quick exercise to illustrate how the top-aligned navbar works. As you scroll, this navbar remains in its original position and moves with the rest of the page.</p>
      <a class="btn btn-lg btn-primary" routerLinkActive="active" routerLink="./id/sections" role="button">View navbar docs »</a>
    </div> -->

  <section class="jumbotron mt-4 ">
  <form class="col-12 mt-4"  [formGroup]="registerCourseForm" (ngSubmit)="registerCourse()">     
    <div class="row mb-2">
  <div class="col-6">
    <h1>Create New Course</h1>
    <p class="lead">This example is a quick exercise to illustrate how the top-aligned navbar works.</p>
  </div>
  <div class="col-6">
  <!-- Text input -->
  <div class="form-outline mb-4">
    <label class="form-label" for="form6Example3">Title</label>
    <input type="text" id="form6Example3" class="form-control"  formControlName="title" placeholder="Enter Title" required/>
  </div>

  <!-- 2 column grid layout with text inputs for the first and last names -->
  <div class="row mb-4">
    <div class="col">
      <div class="form-outline">
        <label class="form-label" for="form6Example1">Category</label>
        <select class="form-control" id="exampleFormControlSelect1" formControlName="category" placeholder="Choose Category" required>
          <option *ngFor="let category of categories; let i = index" [value]="categories[i].name">
            {{categories[i].name}}
          </option>
        </select>
      </div>
    </div>
    <div class="col">
      <div class="form-outline">
        <label class="form-label" for="form6Example2">Language</label>
        <input type="text" id="form6Example2" class="form-control"   formControlName="language" placeholder="Enter Language" required/>
      </div>
    </div>
  </div>

  <!-- Submit button -->
  <button type="submit" class="btn btn-primary btn-block mb-1">Create</button>
  </div>    
</div>
</form>

</section>

    <div class="container-lg">

      <div class="row">
        
        <div class="col-md-4" *ngFor="let course of courses; let i = index" [value]="courses[i]._id">
          <div class="card mb-4 shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="35%" y="50%" fill="#eceeef" dy=".3em">{{courses[i].title}}</text></svg>
            <div class="card-body">
              <p class="card-text">{{courses[i].title}}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <a type="button" class="btn btn-sm btn-outline-secondary" routerLink="./{{courses[i]._id}}/sections" [queryParams]="{title:courses[i].title | json, category:courses[i].category | json, language:courses[i].language | json }">Edit</a>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
                <small class="text-muted">{{courses[i].language}}</small>
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
  registerCourseForm: FormGroup;
  categories = [];
  courses = [];

  constructor(
    public fb: FormBuilder,
    public coursesService: CoursesService,
    public router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.registerCourseForm = this.fb.group({
      title: [''],
      category: [''],
      language: ['']
    });
    
    this.getCourses();
    this.getCategories();
  }

  ngOnInit() {
  }  
  
  getCourses() {

    let id = this.actRoute.snapshot.paramMap.get('id');
    
    this.coursesService.getCourses(id).subscribe((res) => {
      this.courses = res.courses;
    })
  }
  
  getCategories() {
    this.coursesService.getCategories().subscribe((res) => {
      this.categories = res;
    })
  }

  registerCourse() {
    
    let id = this.actRoute.snapshot.paramMap.get('id');
    // let course_id = this.actRoute.snapshot.paramMap.get('course_id');

    this.coursesService.create(id, this.registerCourseForm.value).subscribe((res) => {
        this.registerCourseForm.reset()
        this.getCourses();
        // this.router.navigate(['instructor', id, 'courses']);
    })
  }

}
