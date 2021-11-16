import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

import { InstructorAuthGuard } from "../shared/instructor-auth.guard";

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: HomeComponent },
        { path: 'signin', component: SigninComponent },
        { path: 'signup', component: SignupComponent },
        { path: ':id', component: ProfileComponent, canActivate: [InstructorAuthGuard] },
      ]),
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule
  ]
})
export class InstructorModule { }
