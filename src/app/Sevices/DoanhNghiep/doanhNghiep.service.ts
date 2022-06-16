import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { doanhNghiep_Data } from 'src/app/model/DoanhNghiep/doanhNghiep-Data.model';
import { DoanhNghiep_DTO } from 'src/app/model/DoanhNghiep/doanhNghiep.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class doanhNghiepService {

  constructor( private http: HttpClient) {
   }

// get dữ liệu
  getallDN(data:DoanhNghiep_DTO):Observable<DoanhNghiep_DTO> {
    return this.http.post<DoanhNghiep_DTO>(environment.apiUrl+'/api/DoanhNghiep/GetAllDoanhNghiep',data);
  }

  Add_DN(data:DoanhNghiep_DTO):Observable<DoanhNghiep_DTO>{
    return this.http.post<DoanhNghiep_DTO>(environment.apiUrl+'/api/DoanhNghiep/Add_Or_Update',data);
  }

  searchDN(search:string,data:DoanhNghiep_DTO):Observable<DoanhNghiep_DTO>{
    return this.http.post<DoanhNghiep_DTO>(environment.apiUrl+'/api/DoanhNghiep/SearchDN/'+search,data);
  }

  getByName(name:string) {
    return this.http.get<doanhNghiep_Data[]>(environment.apiUrl+'/api/DoanhNghiep/GetDoanhNghiepByName/'+name);
  }
  




  getOne(id:Number) {
    return this.http.get<CauHoi_Data[]>(environment.apiUrl+'/api/DoanhNghiep/GetDoanhNghiepByID/'+id);
  }
  
  Put(data:DoanhNghiep_DTO):Observable<DoanhNghiep_DTO>{
    return this.http.post<DoanhNghiep_DTO>(environment.apiUrl+'/api/DoanhNghiep/Add_Or_Update',data);
  }
  Delete(id:Number,data:DoanhNghiep_DTO):Observable<DoanhNghiep_DTO>{
    return this.http.post<DoanhNghiep_DTO>(environment.apiUrl+'/api/DoanhNghiep/Delete_DN/'+id,data);
  }  
}
