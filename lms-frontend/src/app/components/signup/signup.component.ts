import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  template: `
  <!-- <section class="vh-100" style="background-color: #eee;"> -->
  <!-- <div class="container h-100"> -->
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p class="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-2">Sign up</p>

                <form class="mx-1 mx-md-4 " [formGroup]="signupForm" (ngSubmit)="registerUser()">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example1c">Name</label>
                      <input type="text" id="form3Example1c" class="form-control" formControlName="name" placeholder="Enter name" required/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example3c">Email</label>
                      <input type="email" id="form3Example3c" class="form-control" formControlName="email" placeholder="Enter email" required/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4c">Password</label>
                      <input type="password" id="form3Example4c" class="form-control" formControlName="password" placeholder="Password" required/>
                    </div>
                  </div>

                  <!-- <div class="form-check d-flex justify-content-center mb-5">
                    <div class="form-outline flex-fill mb-0">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3c"
                    />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a>Terms of service</a>
                    </label>
                   </div>
                  </div> -->

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Sign up</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png" class="img-fluid" alt="Sample image">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
<!-- </section> -->

    <!-- <div class="auth-wrapper">
      <form class="form-signin" [formGroup]="signupForm" (ngSubmit)="registerUser()">
          <h3 class="h3 mb-3 font-weight-normal text-center">Please sign up</h3>
          <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" formControlName="name" placeholder="Enter name" required>
          </div>
          <div class="form-group">
              <label>Email address</label>
              <input type="email" class="form-control" formControlName="email" placeholder="Enter email" required>
          </div>
          <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" formControlName="password" placeholder="Password" required>
          </div>
          <button type="submit" class="btn btn-block btn-primary">Sign up</button>
      </form>
  </div> -->
  `,
  styles: ['']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      // mobile: [''],
      password: ['']
    })
  }

  ngOnInit() {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        console.log(res)
        this.signupForm.reset()
        this.router.navigate(['login']);
      }
    })
  }
}
