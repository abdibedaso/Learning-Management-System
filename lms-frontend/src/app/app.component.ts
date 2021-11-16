import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { SearchService } from './shared/search.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm fixed-top">
        <nav class="my-0 mr-md-4">
          <h5 class="my-0 mr-md-auto "> <a routerLinkActive="active" routerLink="/home">LMS</a></h5>
        </nav>
        <nav class="my-0 mr-md-auto">
          <form [formGroup]="searchForm" class="my-0 mr-md-auto font-weight-normal form-inline my-2 my-lg-0">
            <input  class="form-control mr-sm-2" type="search" placeholder="Looking for a Course" aria-label="Search">
            <button (click)="search()" class="btn btn-outline-success my-2 my-sm-0" type="submit"  >Search</button>
          </form>
        </nav>

        <input type="hidden" [routerLink]="'instructor'" routerLinkActive #instructor="routerLinkActive" />
        <nav *ngIf="!instructor.isActive" class="my-2 my-md-0 mr-md-3">
            <a *ngIf="!this.authService.isLoggedIn" class="btn btn-outline-primary" routerLinkActive="active" routerLink="/signin">Sign
          in</a>
            <a *ngIf="this.authService.isLoggedIn" class="p-2 text-dark ">User Profile</a>
            <a *ngIf="!this.authService.isLoggedIn" class="btn btn-outline-primary ml-2" routerLinkActive="active" routerLinkActive="active" routerLink="/signup">Sign up</a>
        </nav>
        <a *ngIf="(!this.authService.isLoggedIn && !instructor.isActive)" class="btn btn-outline-secondary"  routerLinkActive="active" routerLink="/instructor">Become Instructor</a>
        <button (click)="logout()" *ngIf="(this.authService.isLoggedIn && !instructor.isActive)" type="button" class="btn btn-danger">Logout</button>
        
        <nav *ngIf="instructor.isActive" class="my-2 my-md-0 mr-md-3">
            <a *ngIf="!this.authService.isLoggedIn" class="btn btn-outline-primary" routerLinkActive="active" routerLink="instructor/signin">Sign
          in</a>
            <a *ngIf="this.authService.isLoggedIn" class="p-2 text-dark ">User Profile</a>
            <a *ngIf="!this.authService.isLoggedIn" class="btn btn-outline-primary ml-2" routerLinkActive="active" routerLinkActive="active" routerLink="instructor/signup">Sign up</a>
        </nav>
        <button (click)="logout()" *ngIf="(this.authService.isLoggedIn && instructor.isActive)" type="button" class="btn btn-danger">Logout</button>

    </div>
    
    <router-outlet class=" mt-4 "></router-outlet>
  
    <!-- <footer class="text-muted">
      <div class="container">
        <p class="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Album example is © Bootstrap, but please download and customize it for yourself!</p>
        <p>New to Bootstrap? <a href="https://getbootstrap.com/">Visit the homepage</a> or read our <a href="/docs/4.3/getting-started/introduction/">getting started guide</a>.</p>
      </div>
    </footer> -->
  `,
  styles: ['']
})

export class AppComponent {
 searchForm:FormGroup;
 
  constructor(public authService: AuthService,
     private searchService:SearchService, 
     public fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
  })}

  logout() {
    this.authService.doLogout()
  }
  search(){
    // this.searchService.search(this.searchForm.value)
    console.log(this.searchService.searchHeroes(this.searchForm.value))
  }

}