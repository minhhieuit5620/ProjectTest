import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  constructor( private router: Router) { }
  token=localStorage.getItem('auth-user-token');
  user=localStorage.getItem('auth-user');

  ngOnInit(): void {
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
