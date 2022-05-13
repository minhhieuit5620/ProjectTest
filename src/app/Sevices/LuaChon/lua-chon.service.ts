import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LuaChonService {

  constructor( private http: HttpClient) { }

  getall(data:LuaChon_DTO):Observable<LuaChon_DTO> {
    return this.http.post<LuaChon_DTO>(environment.apiUrl+'/api/CauHoi/GetAllCauHoi',data);
  }
  // getall():Observable<NhomCauHoi[]>{
  //   return this.http.post<NhomCauHoi[]>(environment.apiUrl+'/api/Nhom/GetAllNhomCauHoi');
  // }
  Add_NCH(data:LuaChon_DTO):Observable<LuaChon_DTO>{
    return this.http.post<LuaChon_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }

  getOne(id:Number) {
    return this.http.get<LuaChon_Data[]>(environment.apiUrl+'/api/CauHoi/GetCauHoiById/'+id);
  }

  getks() {
    return this.http.get<LuaChon_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/50');
  }


  Put_NCH(data:LuaChon_DTO):Observable<LuaChon_DTO>{
    return this.http.post<LuaChon_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }
  Delete_NCH(id:Number,data:LuaChon_DTO):Observable<LuaChon_DTO>{
    return this.http.post<LuaChon_DTO>(environment.apiUrl+'/api/CauHoi/Delete_CauHoi/'+id,data);
  }
}
