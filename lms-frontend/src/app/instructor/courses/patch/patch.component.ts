import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from './../courses.service';

@Component({
  selector: 'app-patch',
  template: `
  <section class="jumbotron mt-4 ">
    <!-- <div class="row mb-2">
      <div class="col-6">
        <h1>{{title}}</h1>
        <p class="lead">{{category}}|{{language}}</p>
      </div>
      <div class="col-6"> -->
        <form class="col-12 mt-4" [formGroup]="courseInfo" >     
          <div class="row mb-2">
            <div class="col-6">
              <h1>{{title}}</h1>
              <p class="lead">{{category}}|{{language}}</p>
            </div>
            <div class="col-6">
              <!-- Text input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="form6Example3">Title</label>
                <input type="text" id="form6Example3" class="form-control"  formControlName="title" placeholder="Enter Title" [value]="title" (input)="childTitle($event)" required/>
              </div>

              <!-- 2 column grid layout with text inputs for the first and last names -->
              <div class="row mb-4">
                <div class="col">
                  <div class="form-outline">
                    <label class="form-label" for="form6Example1">Category</label>
                    <select class="form-control" id="exampleFormControlSelect1" formControlName="category" placeholder="Choose Category" [value]="" (input)="childCategory($event)" required>
                      <!-- <option *ngFor="let category of categories; let i = index" [value]="categories[i].name">
                        {{categories[i].name}}
                      </option> -->
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-outline">
                    <label class="form-label" for="form6Example2">Language</label>
                    <input type="text" id="form6Example2" class="form-control" formControlName="language" placeholder="Enter Language" [value]="language" (input)="childLanguage($event)" required/>
                  </div>
                </div>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block mb-1">Update</button>
            </div>    
          </div>
        </form>
      <!-- </div>
    </div> -->
  </section>

  <section class="container-fluid col-10">
    
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <form class="needs-validation" [formGroup]="sectionsInfo" >
        
        <h5 class="border-bottom border-gray pb-2 mb-0">Course Sections</h5>

        <div class="media text-muted row">
                  
          <ul class="list-group col-12 ml-2">
            <li class="list-group-item " formArrayName="section" *ngFor="let section of sectionsInfo.get('section')['controls']; let i = index;">
              <div [formGroupName]="i" class="row">

                <!-- <div class="col-4">
                  <input type="text" formControlName="name" class="form-control" id="firstName" placeholder="Section name" value="" required>
                  <span *ngIf="section.get('name').errors && section.get('name').hasError('required')" class="validation">* required</span>
                </div> -->
                
                <div class="col-0">
                  <input hidden type="text" formControlName="_id" value="" required>
                  <input hidden type="text" formControlName="number" value="" required>
                  <svg class="bd-placeholder-img rounded m-1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                    <rect width="100%" height="100%" fill="#007bff"></rect>
                    <text x="35%" y="50%" fill="white" dy=".3em">{{i+1}}</text>
                  </svg>  
                </div>

                <div class="col-4">
                  <input type="text" formControlName="title" class="form-control" id="title" placeholder="Section title" value="" required>
                  <span *ngIf="section.get('title').errors && section.get('title').hasError('required')" class="validation">* required</span>
                </div>

                <div class="col-5">
                  <input *ngIf="true" (change)="handleFileInput($event.target.files, i)" type="file" formControlName="content" class="form-control-file" id="content" placeholder="Section content" value="" required>
                  <!-- <span *ngIf="section.get('content').errors && section.get('content').hasError('required')" class="validation">* required</span> -->
                </div>

                <div class="col-0">
                  <a *ngIf="(section.get('content').value != '')" (click)="deleteSection(i)" type="button" class="btn btn-sm btn-info mr-2">View</a>
                  <button (click)="deleteSection(i)" type="button" class="btn btn-sm btn-danger">Delete</button>
                </div>

              </div>
            </li>
          </ul>

        </div>

        <small class="d-block text-right mt-3">
          <button (click)="patchSectionInfo()"  class="btn  ml-2 btn-sm btn-primary" >Update</button>
          <button (click)="addSection()" type="button" class="btn  ml-2 btn-sm btn-primary"> Add Sections</button>
      </small>
      </form>



    </div>

  </section>


  <!-- <div class="container-lg">
      
  
        </div> -->
  `,
  styles: [`
    .validation {
      color: red;
    }
  `
  ]
})
export class PatchComponent implements OnInit {
  title: string = null;
  category: string = null;
  language: string = null;
  
  sections: Object[] = [];

  courseInfo : FormGroup;
  sectionsInfo : FormGroup;
  
  private fileToUpload: File[] = [];

  constructor(private formBuilder : FormBuilder,
    public coursesService: CoursesService,
    public router: Router,
    private _route: ActivatedRoute) {
      
  }
  
  childTitle(e:any){this.title = e.target.value;}
  childCategory(e:any){this.category = e.target.value;}
  childLanguage(e:any){this.language = e.target.value;}

  ngOnInit(): void { 

    this.courseInfo = this.formBuilder.group({
      title:[],
      category:[],
      language:[]
    });
    
    this._route.queryParams.subscribe(params => {
      setTimeout(_=>{
        this.title = JSON.parse(params.title) as string;
        this.courseInfo.get('title').setValue(JSON.parse(params.title) as string);
        this.category = JSON.parse(params.category) as string;
        this.courseInfo.get('category').setValue(JSON.parse(params.category) as string);
        this.language = JSON.parse(params.language) as string;
        this.courseInfo.get('language').setValue(JSON.parse(params.language) as string);
      }, 0)
    });

    this.sectionsInfo = this.formBuilder.group({
      section : this.formBuilder.array([])
    })
    
    this.setDefaultData();

  }

  addSection(_id = null, number = "", title = "", content = ""){
    let section = this.sectionsInfo.get('section') as FormArray;
    section.push(this.formBuilder.group({
      _id: [_id],
      number: [number, [Validators.required]],
      title : [title, [Validators.required]],
      content : [content, [Validators.required]]
    }));
  }

  deleteSection(index){
    let section = this.sectionsInfo.get('section') as FormArray;
    section.removeAt(index);
  }

  handleFileInput(files: FileList, index) {
    this.fileToUpload[index] = files.item(0);
  }

  patchSectionInfo(){
    // console.log('data is ', this.sectionsInfo.value.section[index]);

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.patchCoursesSections({id, course_id, section: this.sectionsInfo.value.section }, this.fileToUpload).subscribe((res) => {
        // this.router.navigate(['instructor', id, 'courses']);
    })

  }

  setDefaultData(){

    let id = this._route.snapshot.paramMap.get('id');
    let course_id = this._route.snapshot.paramMap.get('course_id');
    
    this.coursesService.getCoursesSections({id, course_id}).subscribe((res) => {
      // console.log(res);

      this.sections = res;
      
      res.forEach(section => {
          // console.log(section);
          setTimeout(_=>this.addSection(section._id, section.number, section.title, section.content));
      });
      // this.router.navigate(['instructor', id, 'courses']);
    });

  }

}
