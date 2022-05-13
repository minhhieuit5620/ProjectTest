import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CauHoiService {

  constructor( private http: HttpClient) { }

  getall(data:CauHoi_DTO):Observable<CauHoi_DTO> {
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetAllCauHoi',data);
  }
  // getall():Observable<NhomCauHoi[]>{
  //   return this.http.post<NhomCauHoi[]>(environment.apiUrl+'/api/Nhom/GetAllNhomCauHoi');
  // }
  Add_NCH(data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }

  getOne(id:Number) {
    return this.http.get<CauHoi_Data[]>(environment.apiUrl+'/api/CauHoi/GetCauHoiById/'+id);
  }

  
  getks() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/50');
  }

  //Get cau hoi
  getAnswers(id:number){
    return this.http.get<LuaChon_DTO>(environment.apiUrl+'/api/LuaChon/GetLuaChonByMaCH/'+id)
  }



  Put_NCH(data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }
  Delete_NCH(id:Number,data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Delete_CauHoi/'+id,data);
  }
}
