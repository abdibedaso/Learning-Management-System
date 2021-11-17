import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { LearnComponent } from './learn/learn.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../shared/authconfig.interceptor';
import { ViewComponent } from './view/view.component';
import { SectionComponent } from './section/section.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ListComponent,
    EnrolledComponent,
    LearnComponent,
    ViewComponent,
    SectionComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: ListComponent },
        { path: 'enrolled', component: EnrolledComponent },
        { path: ':course_id', component: ViewComponent },
        { path: ':course_id/learn', component: LearnComponent },
        { path: ':course_id/section/:section_id', component: SectionComponent }
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
