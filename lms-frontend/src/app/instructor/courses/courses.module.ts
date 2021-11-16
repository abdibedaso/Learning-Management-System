import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../shared/authconfig.interceptor';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { PatchComponent } from './patch/patch.component';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    PatchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: ListComponent },
        // { path: ':course_id/sections', component: CreateComponent },
        { path: ':course_id/sections', component: PatchComponent }
        // { path: ':id', component: ProfileComponent, canActivate: [InstructorAuthGuard] },
      ]),
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class CoursesModule { }
