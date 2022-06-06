import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
//const AUTH_API = environment.apiUrl + '/api/Login';

@Injectable({

  providedIn: 'root'
})
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( public router: Router) {}
  
  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/admin/Login']);
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    const token:any = localStorage.getItem('auth-admin');
    if (token)  {
      //if (this.jwtHelper.isTokenExpired(token)) {
        return true;
      //} else return false
    } else return false;
      
  }




}