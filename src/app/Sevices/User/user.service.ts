import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TinTuc_Data } from 'src/app/model/TinTuc/tin-tuc-data.model';
import { TinTuc_DTO } from 'src/app/model/TinTuc/tin-tuc-DTO.model';
import { User_Data } from 'src/app/model/User/user-data.model';
import { User_DTO } from 'src/app/model/User/user-DTO.model';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  getall(data:User_DTO):Observable<User_DTO> {
    return this.http.post<User_DTO>(environment.apiUrl+'/api/User/GetAllUser',data);
  }
  searchUser(search:string,data:User_DTO):Observable<User_DTO>{
    return this.http.post<User_DTO>(environment.apiUrl+'/api/User/SearchUser/'+search,data);
  }
  
  Add_User(data:User_DTO):Observable<User_DTO>{
    return this.http.post<User_DTO>(environment.apiUrl+'/api/User/Add_Or_Update',data);
  }

  getOne(id:Number) {
    return this.http.get<User_Data[]>(environment.apiUrl+'/api/User/GetUserById/'+id);
  }
  getByName(name:string) {
    return this.http.get<User_Data[]>(environment.apiUrl+'/api/User/GetUserByNameOrEmail/'+name);
  }
 
  Put_User(data:User_DTO):Observable<User_DTO>{
    return this.http.post<User_DTO>(environment.apiUrl+'/api/User/Add_Or_Update',data);
  }
  Delete_User(id:Number,data:User_DTO):Observable<User_DTO>{
    return this.http.post<User_DTO>(environment.apiUrl+'/api/User/Delete_User/'+id,data);
  }
}
