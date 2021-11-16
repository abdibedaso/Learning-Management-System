import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Album example</h1>
        <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
        
        <p>
          <a href="#" class="btn btn-primary my-2 mr-md-4">Start Learning</a>
          <a href="#" class="btn btn-secondary my-2">Become Instructor</a>
        </p>
      </div>
    </section>
  `,
  styles: [``]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
