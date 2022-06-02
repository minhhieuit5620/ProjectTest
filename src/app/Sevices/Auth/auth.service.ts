import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//const AUTH_API = environment.apiUrl + '/api/Login';
const AUTH_API ="http://localhost:56472/api/Login";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // loginAdmin(username: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'Login', { username, password });
  // }

  loginUser(email: string, password: string): Observable<any> {
   // return this.http.post(AUTH_API, { email, password });
  //  const body = new HttpParams()
  //    .set('UserName', email)
  //    .set('Password', password);
     //.set('grant_type', 'password');

   return this.http.get(AUTH_API+"?UserName="+email+"&Password="+password)
//    , body.toString(),
//    {
//      headers: new HttpHeaders()
//        .set('Content-Type', 'application/x-www-form-urlencoded')
//    }
//  );
  }
}
