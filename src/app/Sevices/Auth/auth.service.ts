import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//const AUTH_API = environment.apiUrl + '/api/Login';
const AUTH_API ="http://localhost:56472/api/Login/LoginUser";
const AUTH_API_Admin ="http://localhost:56472/api/Login/LoginAdmin";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({

  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}


  loginUser(email: string, password: string): Observable<any> { 
   return this.http.get(AUTH_API+"?UserName="+email+"&Password="+password)
  }
    
  loginAdmin(username: string, password: string): Observable<any> { 
    return this.http.get(AUTH_API_Admin+"?UserName="+username+"&Password="+password)
   }
}
