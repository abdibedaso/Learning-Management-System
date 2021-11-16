import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  template: `
    <div class="container">
      <div class="row">
          <div class="inner-main">
              <h2 class="mb-4">User Profile</h2>
              <p><strong>Name:</strong> {{this.currentUser['name']}}</p>
              <p><strong>Email:</strong> {{this.currentUser['email']}}</p>
          </div>
      </div>
    </div>
  `,
  styles: ['']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe(res => {
    //   console.log(res);
      
    //   this.currentUser = res;
    // })
    
    this.authService.getCurrentUserProfile().subscribe(res => {
      this.currentUser = res;
    })

  }

  ngOnInit() { }
}