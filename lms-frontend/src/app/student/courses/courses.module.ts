import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EnroledComponent } from './enroled/enroled.component';
import { LearnComponent } from './learn/learn.component';



@NgModule({
  declarations: [
    ListComponent,
    EnroledComponent,
    LearnComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoursesModule { }
