import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { dotKhaoSat_Data } from 'src/app/model/DotKhaoSat/dotKhaoSat-Data.model';
import { dotKhaoSat_DTO } from 'src/app/model/DotKhaoSat/dotKhaoSat.model';
import { KhaoSat_DTO } from 'src/app/model/KhaoSat/khaoSat-DTO.model';
import { khaoSat } from 'src/app/model/KhaoSat/khaoSat.model';
import { CTKS_DN_CH_LC } from 'src/app/model/KhaoSat_DN/CTKS_DN_CH_LC.model';
import { khaoSat_DN } from 'src/app/model/KhaoSat_DN/khaoSat_DN.model';
import { CT_KhaoSatMn } from 'src/app/model/KhaoSat_Mn/chiTietKhaoSat_MN.model';
import { khaoSatMn_DTO } from 'src/app/model/KhaoSat_Mn/khaoSatMN-DTO.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DotKhaoSatService {

  constructor( private http: HttpClient) {

}


// get dữ liệu
  getall(data:dotKhaoSat_DTO):Observable<dotKhaoSat_DTO> {
    return this.http.post<dotKhaoSat_DTO>(environment.apiUrl+'/api/DotKhaoSat/GetAllDotKhaoSat',data);
  }

  Add(data:dotKhaoSat_DTO):Observable<dotKhaoSat_DTO>{
    return this.http.post<dotKhaoSat_DTO>(environment.apiUrl+'/api/DotKhaoSat/Add_Or_Update',data);
  }

  search(search:string,data:dotKhaoSat_DTO):Observable<dotKhaoSat_DTO>{
    return this.http.post<dotKhaoSat_DTO>(environment.apiUrl+'/api/DotKhaoSat/SearchDotKhaoSat/'+search,data);
  } 
  
  getOne(id:Number) {
    return this.http.get<dotKhaoSat_Data[]>(environment.apiUrl+'/api/DotKhaoSat/GetDotKhaoSatByID/'+id);
  }
  
  Put(data:dotKhaoSat_DTO):Observable<dotKhaoSat_DTO>{
    return this.http.post<dotKhaoSat_DTO>(environment.apiUrl+'/api/DotKhaoSat/Add_Or_Update',data);
  }
  Deleteks(id:Number,data:dotKhaoSat_DTO):Observable<dotKhaoSat_DTO>{
    return this.http.post<dotKhaoSat_DTO>(environment.apiUrl+'/api/DotKhaoSat/Delete_DotKhaoSat/'+id,data);
  }  
}