import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <section class="jumbotron mt-lg-5 text-center">
    <p>
      home works!
    </p>
  </section>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
