import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { CauHoi_DapAnDTO } from 'src/app/model/CauHoi_DapAnDTO/cauhoi-dapan-DTO.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CauHoiService {

  constructor( private http: HttpClient) {
    
  
   }


// get dữ liệu
getKS(data:CauHoi_DTO):Observable<CauHoi_DTO> {
  return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiKS',data);
}

  getall(data:CauHoi_DTO):Observable<CauHoi_DTO> {
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetAllCauHoi',data);
  }


  Add_NCH(data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }

  getOne(id:Number) {
    return this.http.get<CauHoi_Data[]>(environment.apiUrl+'/api/CauHoi/GetCauHoiById/'+id);
  }

  
  getCauHoi_50() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/50');
  }
  getCauHoi_51() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/51');
  }
  getCauHoi_52() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/52');
  }
  getCauHoi_53() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/53');
  }

  //Get cau hoi
  getAnswers(id:number){
    return this.http.get<LuaChon_DTO>(environment.apiUrl+'/api/LuaChon/GetLuaChonByMaCH/'+id)
  }

  searchCH(search:string,data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/SearchCauHoi/'+search,data);
  }
  
  Post_CH_DA(a:any){
    console.log(a)
    this.http.post<CauHoi_DapAnDTO>(environment.apiUrl+'/api/CauHoi_DapAnDTO',a).subscribe({
      next: function(){console.log("successful!")},
      error:function(){console.log("Lỗi rồi, code lại")}
   });
  }


  Put_NCH(data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }

  Delete_CH(id:Number,data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Delete_CauHoi/'+id,data);
  }


}
