import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <section class="jumbotron mt-lg-5 text-center">
  <section class="jumbotron mt-lg-5 text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Welcome</h1>
        <p class="lead text-muted">Web application for the documentation and delivery of free educational courses, training programs, or learning and development programs.</p>
        
        <p>
          <a routerLink="/signin" class="btn btn-primary my-2 mr-md-4">Start Learning</a>
          <a routerLink="/instructor" class="btn btn-secondary my-2">Become Instructor</a>
        </p>
      </div>
    </section>
    </section>
  `,
  styles: [``]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
