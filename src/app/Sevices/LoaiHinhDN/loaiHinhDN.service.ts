import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { KhaoSat_DTO } from 'src/app/model/KhaoSat/khaoSat-DTO.model';
import { khaoSat } from 'src/app/model/KhaoSat/khaoSat.model';
import { loaiHinhDN_DTO } from 'src/app/model/LoaiHinhDN/loaiHinhDN-DTO.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class loaiHinhDNService {

  constructor( private http: HttpClient) {

}


// get dữ liệu
  getall(data:loaiHinhDN_DTO):Observable<loaiHinhDN_DTO> {
    return this.http.post<loaiHinhDN_DTO>(environment.apiUrl+'/api/LoaiHinhDN/GetAllLoaiHinhDN',data);
  }


  Add_KS(data:khaoSat){
    return this.http.post<khaoSat>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }

  // themHoaDon(order:any){
  //   return this.http.post<Orders>(this.baseURL,order);    
  //  }
  //  themDetail(detail:any[]){
  //    return this.http.post<orderDetail>(this.baseURL,detail);
  //  }

  Post_Ks(a:any){
    console.log(a)
    this.http.post<KhaoSat_DTO>(environment.apiUrl+'/api/KhaoSat_DTO',a).subscribe({
      next: function(){console.log("successful!")},
      error:function(){console.log("Lỗi rồi, code lại")}
   });
  }
  

  Post_CtKs(CtKhaoSat:any[]){
    return this.http.post<khaoSat>(environment.apiUrl+'/api/KhaoSat_DTO',CtKhaoSat);
  }
  

}
